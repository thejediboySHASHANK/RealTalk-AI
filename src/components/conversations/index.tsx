"use client"

import {useConversation} from "@/hooks/conversations/use-conversation";
import TabsMenu from "@/components/tabs";
import {TABS_MENU} from "@/constants/menu";
import {TabsContent} from "@/components/ui/tabs";
import ConversationSearch from "@/components/conversations/search";
import {Loader} from "@/components/loader";
import {CardDescription} from "@/components/ui/card";
import ChatCard from "@/components/conversations/chat-card";
import {Separator} from "@/components/ui/separator";

type Props = {
    domains?:
        | {
        id: string;
        name: string;
        icon: string;
    }[]
        | undefined;
};
const ConversationMenu = ({domains}: Props) => {
    const {
        register,
        chatRooms,
        loading,
        onGetActiveChatMessages,
    } = useConversation();

    return (
        <div className="py-3 px-8">
            <TabsMenu triggers={TABS_MENU}>
                <TabsContent value="unread">
                    <ConversationSearch
                        domains={domains}
                        register={register}
                    />
                    <div className="flex flex-col">
                        <Loader loading={loading}>
                            {chatRooms.length ? (
                                chatRooms.map((room) => (
                                    <ChatCard
                                        seen={room.chatRoom[0].message[0]?.seen}
                                        id={room.chatRoom[0].id}
                                        onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                                        createdAt={room.chatRoom[0].message[0]?.createdAt}
                                        key={room.chatRoom[0].id}
                                        title={room.email!}
                                        description={room.chatRoom[0].message[0]?.message}
                                    />
                                ))
                            ) : (
                                <CardDescription>No chats for you domain yet</CardDescription>
                            )}
                        </Loader>
                    </div>
                </TabsContent>
                <TabsContent value="all">
                    <Separator
                        orientation="horizontal"
                        className="mt-5"
                    />
                    all
                </TabsContent>
                <TabsContent value="expired">
                    <Separator
                        orientation="horizontal"
                        className="mt-5"
                    />
                    expired
                </TabsContent>
                <TabsContent value="starred">
                    <Separator
                        orientation="horizontal"
                        className="mt-5"
                    />
                    starred
                </TabsContent>
            </TabsMenu>
        </div>
    );
};
export default ConversationMenu;
