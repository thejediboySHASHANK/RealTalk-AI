'use client'

import {useChatWindow} from "@/hooks/conversations/use-conversation";
import {Loader} from "@/components/loader";
import Bubble from "@/components/chatbot/bubble";

type Props = {};
const Messenger = (props: Props) => {
    const {
        messageWindowRef,
        register,
        onHandleSendMessage,
        chats,
        loading,
        chatRoom,
    } = useChatWindow();
    return (
        <div className="flex-1 flex flex-col h-0 relative">
            <div className="flex-1 h-0 w-full flex flex-col">
                <Loader loading={loading}>
                    <div
                        ref={messageWindowRef}
                        className="w-full flex-1 h-0 flex flex-col gap-3
                        pl-5 chat-window overflow-y-auto"
                    >
                        {chats.length ? (
                            chats.map((chat) => (
                                <Bubble
                                    key={chat.id}
                                    message={{
                                        role: chat.role!,
                                        content: chat.message,
                                    }}
                                    createdAt={chat.createdAt}
                                />
                            ))
                        ) : (
                            <div>
                                No chat selected
                            </div>
                        )}
                    </div>
                </Loader>

            </div>
        </div>
    );
};
export default Messenger;
