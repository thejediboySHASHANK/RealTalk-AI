import {
    Accordion as ShadcnAccordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";

type Props = {
    trigger: string;
    content: string;
};
const Accordion = ({
                       trigger,
                       content,
                   }: Props) => {
    // WIP: Enable Markdown mode for content so the answers are displayed in newline
    return (
        <ShadcnAccordion
            type="single"
            collapsible
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>{trigger}</AccordionTrigger>
                <AccordionContent>{content}</AccordionContent>
            </AccordionItem>
        </ShadcnAccordion>
    );
};
export default Accordion;
