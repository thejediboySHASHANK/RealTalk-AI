"use client"

import {useConversation} from "@/hooks/conversations/use-conversation";
import TabsMenu from "@/components/tabs";
import {TABS_MENU} from "@/constants/menu";
import {TabsContent} from "@/components/ui/tabs";
import ConversationSearch from "@/components/conversations/search";

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
                </TabsContent>
            </TabsMenu>
        </div>
    );
};
export default ConversationMenu;
