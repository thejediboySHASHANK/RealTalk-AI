'use client'

import {useHelpDesk} from "@/hooks/settings/use-settings";
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {Section} from "@/components/section-label";
import FormGenerator from "@/components/forms/form-generator";
import {Button} from "@/components/ui/button";
import {Loader} from "@/components/loader";
import Accordion from "@/components/accordion";
import form from "@/components/forms/settings/form";

type Props = {
    id: string;
};
const HelpDesk = ({id}: Props) => {
    //useHelpDesk hook for this component
    const {
        register,
        errors,
        onSubmitQuestion,
        isQuestions,
        loading
    } = useHelpDesk(id);

    return (
        <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
            <CardContent className="p-6 border-r-[1px]">
                <CardTitle>Help Desk</CardTitle>
                <form
                    className="flex flex-col gap-6 mt-10"
                    onSubmit={onSubmitQuestion}
                >
                    <div className="flex flex-col gap-3">
                        <Section
                            label="Question"
                            message="Add a question that you believe is frequently asked by your customers."
                        />
                        <FormGenerator
                            type="text"
                            inputType="input"
                            placeholder="Type your question"
                            register={register}
                            name="question"
                            errors={errors}
                            form="help-desk-form"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Section
                            label="Answer to question"
                            message="The answer for the questions above."
                        />
                        <FormGenerator
                            type="text"
                            inputType="textarea"
                            placeholder="Type your answer"
                            register={register}
                            name="answer"
                            errors={errors}
                            form="help-desk-form"
                            lines={5}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150
                        ease-in-out text-white font-semibold"
                    >
                        Create
                    </Button>
                </form>
            </CardContent>
            <CardContent className="p-6 overflow-y-auto chat-window">
                <Loader loading={loading}>
                    {isQuestions.length ? (
                        isQuestions.map((question) => (
                            <Accordion
                                key={question.id}
                                trigger={question.question}
                                content={question.answer}
                            />
                        ))
                    ) : (
                        <CardDescription>No Questions to show</CardDescription>
                    )}
                </Loader>
            </CardContent>
        </Card>
    );
};
export default HelpDesk;
