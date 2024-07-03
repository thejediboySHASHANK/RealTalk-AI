import React from "react";
import {onLoginUser} from "@/actions/auth";
import {ChatProvider} from "@/context/user-chat-context";

type Props = {
    children: React.ReactNode;
};
const OwnerLayout = async (props: Props) => {
    const authenticated = await onLoginUser();
    if (!authenticated) return null;
    return (
        <ChatProvider>
            <div className="flex h-screen w-full">

            </div>
        </ChatProvider>
    );
};
export default OwnerLayout;
