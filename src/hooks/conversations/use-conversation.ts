import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ConversationSearchSchema} from "@/schemas/comversation.schema";
import {useChatContext} from "@/context/user-chat-context";
import {useEffect, useState} from "react";
import {onGetChatMessages, onGetDomainChatRooms} from "@/actions/conversation";

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