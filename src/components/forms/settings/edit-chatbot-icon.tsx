import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {Section} from "@/components/section-label";

type Props = {
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    chatBot: {
        id: string
        icon: string | null
        welcomeMessage: string | null
    } | null
};
const EditChatbotIcon = ({
                             register,
                             errors,
                             chatBot
                         }: Props) => {
    return (
        <div className="py-5 flex flex-col gap-5 items-start">
            <Section
                label="Chatbot icon"
                message="Change the icon for the chatbot"
            />
        </div>
    );
};
export default EditChatbotIcon;
