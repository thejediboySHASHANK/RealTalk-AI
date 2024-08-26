'use client'
import React from 'react'
import {useChatBot} from "@/hooks/chatbot/use-chatbot";

type Props = {};
const AiChatBot = (props: Props) => {
    const {

    } = useChatBot();
    return (
        <div>Chatbot</div>
    );
};
export default AiChatBot;
