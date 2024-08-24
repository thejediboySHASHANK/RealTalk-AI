'use client'

import {useFilterQuestions, useHelpDesk} from "@/hooks/settings/use-settings";
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {Section} from "@/components/section-label";
import FormGenerator from "@/components/forms/form-generator";
import {Button} from "@/components/ui/button";
import {Loader} from "@/components/loader";
import Accordion from "@/components/accordion";

type Props = {
    id: string;
};
const FilterQuestions = ({id}: Props) => {
    const {
        register,
        errors,
        onAddFilterQuestions,
        isQuestions,
        loading
    } = useFilterQuestions(id);

    return (
        <Card
            className="w-full grid grid-cols-1 lg:grid-cols-2"
        >
            <CardContent className="p-6 border-r-[1px]">
                <CardTitle>Help Desk</CardTitle>
                <form
                    onSubmit={onAddFilterQuestions}
                    className="flex flex-col gap-6 mt-10"
                >
                    <div className="flex flex-col gap-3">
                        <Section
                            label="Question"
                            message="Add a question that you want your chatbot to ask"
                        />
                        <FormGenerator
                            type="text"
                            inputType="input"
                            placeholder="Type your question"
                            register={register}
                            name="question"
                            errors={errors}
                            form="filter-questions-form"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Section
                            label="Answer to Question"
                            message="The answer for the question above"
                        />
                        <FormGenerator
                            type="text"
                            inputType="textarea"
                            placeholder="Type your answer"
                            register={register}
                            name="answer"
                            errors={errors}
                            form="filter-questions-form"
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
                            <p
                                key={question.id}
                                className="font-bold"
                            >
                                {question.question}
                            </p>
                        ))
                    ) : (
                        <CardDescription>
                            No questions found
                        </CardDescription>
                    )}
                </Loader>
            </CardContent>
        </Card>
    );
};
export default FilterQuestions;
