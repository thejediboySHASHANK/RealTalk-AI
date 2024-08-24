import {FieldValues, UseFormRegister} from "react-hook-form";

type Props = {
    register: UseFormRegister<FieldValues>
    domains?:
        | {
        id: string;
        name: string;
        icon: string;
    }[]
        | undefined;
};
const ConversationSearch = ({register, domains}: Props) => {
    return (
        <div className="flex flex-col py-3">

        </div>
    );
};
export default ConversationSearch;
