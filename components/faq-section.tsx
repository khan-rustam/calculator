import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-28 sm:py-36 md:py-32">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Find answers to common questions about EMI calculations and loans.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="relative rounded-2xl border bg-card p-1 shadow-lg">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/0 to-primary/20 p-px opacity-50"></div>
            <div className="relative rounded-xl bg-card p-5">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-muted px-1">
                  <AccordionTrigger className="font-display text-lg font-medium py-4 hover:no-underline text-left">
                    What is EMI?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1 text-muted-foreground text-left">
                    EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a
                    specified date each calendar month. EMIs are used to pay off both interest and principal each month
                    so that over a specified number of years, the loan is fully paid off along with interest.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b border-muted px-1">
                  <AccordionTrigger className="font-display text-lg font-medium py-4 hover:no-underline text-left">
                    How is EMI calculated?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1 text-muted-foreground text-left">
                    EMI is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is the loan
                    amount, R is the interest rate per month [annual interest rate/12/100], and N is the number of
                    monthly installments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b border-muted px-1">
                  <AccordionTrigger className="font-display text-lg font-medium py-4 hover:no-underline text-left">
                    Can I pay more than my EMI amount?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1 text-muted-foreground text-left">
                    Yes, you can pay more than your EMI amount. This is called prepayment or part-payment. Making
                    prepayments reduces your loan tenure and/or EMI amount. However, some lenders may charge a
                    prepayment penalty, so it's important to check with your lender before making extra payments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b border-muted px-1">
                  <AccordionTrigger className="font-display text-lg font-medium py-4 hover:no-underline text-left">
                    How does loan tenure affect my EMI?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1 text-muted-foreground text-left">
                    A longer loan tenure reduces your monthly EMI amount but increases the total interest paid over the
                    life of the loan. Conversely, a shorter loan tenure increases your monthly EMI but reduces the total
                    interest paid. You can use our EMI calculator to see how different loan tenures affect your monthly
                    payments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-b border-muted px-1">
                  <AccordionTrigger className="font-display text-lg font-medium py-4 hover:no-underline text-left">
                    What happens if I miss an EMI payment?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1 text-muted-foreground text-left">
                    Missing an EMI payment can result in late payment fees, negatively impact your credit score, and in
                    some cases, the lender may take legal action. If you're facing financial difficulties, it's best to
                    contact your lender immediately to discuss potential solutions like restructuring your loan.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="px-1">
                  <AccordionTrigger className="font-display text-lg font-medium py-4 hover:no-underline text-left">
                    Are EMI calculators accurate?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1 text-muted-foreground text-left">
                    Our EMI calculator provides highly accurate estimates based on the information you input. However,
                    the actual EMI may vary slightly depending on the exact terms of your loan agreement, processing
                    fees, and other charges levied by the lender. It's always best to confirm the final EMI amount with
                    your lender.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

