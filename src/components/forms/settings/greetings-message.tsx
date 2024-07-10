import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {Section} from "@/components/section-label";
import FormGenerator from "@/components/forms/form-generator";

type GreetingMessageProps = {
    message: string;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
};
const GreetingsMessage = ({
                              message,
                              register,
                              errors
                          }: GreetingMessageProps) => {
    return (
        <div className="flex flex-col gap-2">
            <Section
                label="Greeting Message"
                message="Customize your welcome message"
            />
            <div className="lg:w-[500px]">
                <FormGenerator
                    type="text"
                    inputType="textarea"
                    placeholder={message}
                    register={register}
                    name="welcomeMessage"
                    errors={errors}
                    lines={2}
                />
            </div>
        </div>
    );
};
export default GreetingsMessage;
