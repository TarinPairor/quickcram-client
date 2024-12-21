import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function InfoAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-0">
        <AccordionTrigger>
          <div className="font-bold text-lg">Some common questions</div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion
            type="single"
            collapsible
            className=" flex flex-col items-center"
          >
            <AccordionItem value="item-1" className="w-full">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent className="">
                Type in a general event description, and the AI will generate a
                calendar event for you!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="w-full">
              <AccordionTrigger>
                Do I have to set up anything for it to connect to my Google
                Calendar
              </AccordionTrigger>
              <AccordionContent className="">
                Nope. Just login and you're good to go.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="w-full">
              <AccordionTrigger>What is an example prompt?</AccordionTrigger>
              <AccordionContent className="">
                Meet John at 2pm on Friday at Starbucks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="w-full">
              <AccordionTrigger>
                What details should I provide?
              </AccordionTrigger>
              <AccordionContent className="">
                At least a summary. A start time, and an end time or length
                should be provided.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="w-full">
              <AccordionTrigger>Any extra details?</AccordionTrigger>
              <AccordionContent className="">
                A location and a description are optional, but can be helpful.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
