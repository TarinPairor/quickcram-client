import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const subElements = [
  {
    question: "What does QuickCram do?",
    answer:
      "Type (or record) in an event description, and the AI will generate a calendar event for you in Google Calendar!",
  },
  {
    question: "How can I write my event? Give an example.",
    answer: "Meet John at 2pm on Friday at Starbucks.",
  },
  {
    question: "What details should I provide?",
    answer:
      "At least a summary. A start time, and an end or time period should be provided.",
  },
  {
    question: "Any extra details?",
    answer: "A location and a description are optional, but can be helpful.",
  },
  {
    question: "What is the Start/Stop button?",
    answer:
      "It can record your voice and convert it to text. FYI, it resets when you click it again.",
  },
  {
    question:
      "Do I have to set up anything for it to connect to my Google Calendar?",
    answer: "Just login and you're good to go.",
  },
  {
    question: "Why can't I see the event on my Google Calendar after adding?",
    answer:
      "If there is an access error, try getting access again by clicking on the Profile Picture - Get Access Token.",
  },
];

const SubElement = ({
  value,
  question,
  answer,
}: {
  value: string;
  question: string;
  answer: string;
}) => (
  <AccordionItem value={value} className="w-full">
    <AccordionTrigger>{question}</AccordionTrigger>
    <AccordionContent>{answer}</AccordionContent>
  </AccordionItem>
);

export default function InfoAccordion() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-0">
        <AccordionTrigger>
          <div className="font-bold text-lg">Some common questions</div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion
            type="single"
            collapsible
            className="flex flex-col items-center"
          >
            {subElements.map((element, index) => (
              <SubElement
                key={"item-" + index}
                value={"item-" + index}
                question={element.question}
                answer={element.answer}
              />
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
