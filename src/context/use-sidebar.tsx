'use client'

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {useChatContext} from "@/context/user-chat-context";
import {onGetConversationMode, onToggleRealtime} from "@/actions/conversation";
import {useClerk} from "@clerk/nextjs";


const useSidebar = () => {
    const [expand, setExpand] = useState<boolean | undefined>(false)
    const router = useRouter();
    const pathName = usePathname();
    const {toast} = useToast();
    const [realtime, setRealtime] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {chatRoom} = useChatContext();

    const onActivateRealtime = async (e: any) => {
        try {
            const realtime = await onToggleRealtime(
                chatRoom!,
                e.target.ariaChecked = 'true' ? false : true
            )
            if (realtime) {
                setRealtime(realtime.chatRoom!.live);
                toast({
                    title: 'Realtime chat activated',
                    description: realtime.message,
                })
            }
        } catch (e) {
            console.log(e);
            return {status: 400}
        }
    }

    const onGetCurrentMode = async () => {
        setLoading(true);
        const mode = await onGetConversationMode(chatRoom!);
        if (mode && 'live' in mode) {
            setRealtime(mode.live);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (chatRoom) {
            onGetCurrentMode();
        }
    }, [chatRoom]);

    const page = pathName.split('/').pop();
    const {signOut} = useClerk();

    const onSignOut = () => signOut(() => router.push('/'));

    const onExpand = () => setExpand((prev) => !prev);

    return {
        expand,
        onExpand,
        page,
        onSignOut,
        realtime,
        onActivateRealtime,
        chatRoom,
        loading
    };
};
export default useSidebar;
