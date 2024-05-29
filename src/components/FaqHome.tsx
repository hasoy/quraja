import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";

export default function Component() {
  const questions = [
    {
      title: "What is this product?",
      content:
        "This product is a powerful platform for building and deploying web applications. It provides a suite of tools and services to help teams of all sizes ship features faster and more efficiently.",
    },
  ];
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get answers to the most common questions about our product.
            </p>
          </div>
          <Accordion className="space-y-2" collapsible type="single">
            {questions.map((question) => (
              <AccordionItem key={question.title} value={question.title}>
                <AccordionTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-600">
                  {question.title}
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 py-3 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  {question.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
