import {useForm} from "react-hook-form";
import {ChatBotMessageProps, ChatBotMessageSchema} from "@/schemas/comversation.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useRef, useState} from "react";
import {postToParent} from "@/lib/utils";
import {onAiChatBotAssistant, onGetCurrentChatBot} from "@/actions/bot";
import {UploadClient} from "@uploadcare/upload-client";

const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
})

export const useChatBot = () => {
    // WIP: Setup Realtime with pusher
    const {register, handleSubmit, reset}
        = useForm<ChatBotMessageProps>({
        resolver: zodResolver(ChatBotMessageSchema),
    });
    const [currentBot, setCurrentBot] = useState<
        | {
        name: string
        chatBot: {
            id: string
            icon: string | null
            welcomeMessage: string | null
            background: string | null
            textColor: string | null
            helpdesk: boolean
        } | null
        helpdesk: {
            id: string
            question: string
            answer: string
            domainId: string | null
        }[]
    }
        | undefined
    >();

    const messageWindowRef = useRef<HTMLDivElement | null>(null);
    const [botOpened, setBotOpened] = useState<boolean>(false);
    const onOpenChatBot = () => setBotOpened((prev) => !prev);
    const [loading, setLoading] = useState<boolean>(true);
    const [onChats, setOnChats] = useState<
        {role: 'assistant' | 'user'; content: string; link?: string}[]
    >([]);
    const [onAiTyping, setOnAiTyping] = useState<boolean>(false);
    const [currentBotId, setCurrentBotId] = useState<string>();
    const [onRealtime, setOnRealtime] = useState<
        {chatroom: string; mode: boolean} | undefined
    >(undefined);

    const onScrollToBottom = () => {
        messageWindowRef.current?.scroll({
            top: messageWindowRef.current.scrollHeight,
            left: 0,
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        onScrollToBottom();
    }, [onChats, messageWindowRef]);

    useEffect(() => {
        postToParent(
            JSON.stringify({
                width: botOpened ? 550 : 80,
                height: botOpened ? 800 : 80,
            })
        )
    }, [botOpened])

    let limitRequest = 0;

    useEffect(() => {
        window.addEventListener("message", (e) => {
            const botId = e.data;
            if (limitRequest < 1 && typeof botId == 'string') {
                onGetDomainChatBot(botId);
                limitRequest++;
            }
        })
    }, [])

    const onGetDomainChatBot = async (id: string) => {
        setCurrentBotId(id);
        const chatbot = await onGetCurrentChatBot(id);
        if (chatbot) {
            setOnChats((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: chatbot.chatBot?.welcomeMessage!,
                },
            ])
            setCurrentBot(chatbot);
            setLoading(false);
        }
    }

    const onStartChatting = handleSubmit(async (values) => {
        reset();
        if (values.image.length) {
            const uploaded = await upload.uploadFile(values.image[0]);
            setOnChats((prev: any) => [
                ...prev,
                {
                    role: 'user',
                    content: uploaded.uuid,
                },
            ]);
            setOnAiTyping(true);
            const response = await onAiChatBotAssistant(
                currentBotId!,
                onChats,
                'user',
                uploaded.uuid
            );
        }
    })
}