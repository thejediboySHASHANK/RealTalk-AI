import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChatBotMessageSchema, ConversationSearchSchema} from "@/schemas/comversation.schema";
import {useChatContext} from "@/context/user-chat-context";
import {useEffect, useRef, useState} from "react";
import {
    onGetChatMessages,
    onGetDomainChatRooms,
    onOwnerSendMessage, onRealTimeChat,
    onViewUnReadMessages
} from "@/actions/conversation";
import {getMonthName, pusherClient} from "@/lib/utils";

export const useConversation = () => {
    const {register, watch} = useForm({
        resolver: zodResolver(ConversationSearchSchema),
        mode: "onChange",
    });
    const {
        setLoading: loadMessages,
        setChats,
        setChatRoom
    } = useChatContext();

    const [chatRooms, setChatRooms] = useState<
        {
            chatRoom: {
                id: string
                createdAt: Date
                message: {
                    message: string
                    createdAt: Date
                    seen: boolean
                }[]
            }[]
            email: string | null
        }[]
    >([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const search = watch(async (value) => {
            setLoading(true)
            try {
                const rooms = await onGetDomainChatRooms(value.domain)
                if (rooms) {
                    setLoading(false)
                    setChatRooms(rooms.customer)
                }
            } catch (error) {
                console.log(error)
            }
        })
        return () => search.unsubscribe()
    }, [watch])

    const onGetActiveChatMessages = async (id: string) => {
        try {
            loadMessages(true);
            const messages = await onGetChatMessages(id);
            if (messages) {
                setChatRoom(id);
                loadMessages(false);
                setChats(messages[0].message);
            }
        } catch (e) {
            console.log(`ON_GET_ACTIVE_CHAT_MESSAGES ERROR: ${e}`)
        }
    }

    return {
        register,
        chatRooms,
        loading,
        onGetActiveChatMessages,
    }
}

export const useChatTime = (createdAt: Date, roomId: string) => {
    const {chatRoom} = useChatContext();
    const [messageSentAt, setMessageSentAt] = useState<string>();
    const [urgent, setUrgent] = useState<boolean>(false);

    const onSetMessageRecievedDate = () => {
        const dt = new Date(createdAt)
        const current = new Date()
        const currentDate = current.getDate()
        const hr = dt.getHours()
        const min = dt.getMinutes()
        const date = dt.getDate()
        const month = dt.getMonth()
        const difference = currentDate - date

        if (difference <= 0) {
            setMessageSentAt(`${hr}:${min}${hr > 12 ? 'PM' : 'AM'}`)
            if (current.getHours() - dt.getHours() < 2) {
                setUrgent(true)
            }
        } else {
            setMessageSentAt(`${date} ${getMonthName(month)}`)
        }
    }

    const onSeenChat = async () => {
        if (chatRoom == roomId && urgent) {
            await onViewUnReadMessages(roomId)
            setUrgent(false)
        }
    }

    useEffect(() => {
        onSeenChat()
    }, [chatRoom])

    useEffect(() => {
        onSetMessageRecievedDate()
    }, [])

    return {messageSentAt, urgent, onSeenChat}
}

export const useChatWindow = () => {
    const {chats, loading, setChats, chatRoom} = useChatContext();
    const messageWindowRef = useRef<HTMLDivElement | null>(null);
    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        resolver: zodResolver(ChatBotMessageSchema),
        mode: "onChange",
    });
    const onScrollToBottom = () => {
        messageWindowRef.current?.scrollTo({
            top: messageWindowRef.current.scrollHeight,
            left: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        onScrollToBottom();
    }, [chats, messageWindowRef])

    // WIP: Setup Pusher
    // useEffect(() => {
    //     if (chatRoom) {
    //         pusherClient.subscribe(chatRoom);
    //         pusherClient.bind('realtime-mode', (data: any) => {
    //             setChats((prev) => [...prev, data.chat]);
    //         });
    //
    //         return () => pusherClient.unsubscribe('realtime-mode');
    //     }
    // }, [chatRoom])

    const onHandleSendMessage = handleSubmit(async (values) => {
        try {
            const message = await onOwnerSendMessage(
                chatRoom!,
                values.content,
                'assistant'
            )
            if (message) {
                setChats((prev) => [...prev, message.message[0]])
                // WIP: Uncomment this when pusher setup is done
                // await onRealTimeChat(
                //     chatRoom!,
                //     message.message[0].message,
                //     message.message[0].id,
                //     'assistant'
                // )
            }
        } catch (e) {
            console.log(`ON_HANDLE_SEND_MESSAGE ERROR: ${e}`)
        }
    })

    return {
        messageWindowRef,
        register,
        onHandleSendMessage,
        chats,
        loading,
        chatRoom,
    }
}