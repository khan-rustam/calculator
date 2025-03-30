import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer - EMI Calculator",
  description: "Disclaimer regarding the use of our EMI calculator and information on our website.",
}

export default function DisclaimerPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">Disclaimer</h1>
      
      <div className="space-y-6">
        <p className="text-muted-foreground">
          <strong className="font-semibold text-foreground">Last Updated: {new Date().toLocaleDateString()}</strong>
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Information Accuracy</h2>
        
        <p className="text-foreground">
          The information provided on EMI Calculator is for general informational and educational purposes only.
          We make every effort to ensure that the information on our website is accurate and up-to-date, but we 
          make no representations or warranties of any kind, express or implied, about the completeness, accuracy,
          reliability, suitability, or availability of the information, products, services, or related graphics
          contained on the website.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Not Financial Advice</h2>
        
        <p className="text-foreground">
          The content on our website, including our EMI calculator tool, should not be considered as financial advice.
          The calculations provided are estimates based on the input you provide and standard financial formulas.
          The actual EMI amounts, interest rates, and terms may vary based on various factors including but not limited to:
        </p>
        
        <ul className="ml-6 list-disc space-y-2 text-foreground">
          <li>Your credit score and financial history</li>
          <li>The lender's specific policies and assessment</li>
          <li>Economic conditions and changes in interest rates</li>
          <li>Additional fees, taxes, and charges not included in our calculations</li>
        </ul>
        
        <p className="text-foreground">
          We strongly recommend that you consult with a qualified financial advisor, banker, or loan officer before
          making any financial decisions or commitments.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Third-Party Content</h2>
        
        <p className="text-foreground">
          Our website may include content from third parties, including links to other websites. We do not control,
          monitor, or endorse the content of any third-party website and are not responsible for any damages or losses
          incurred as a result of any transactions or interactions with third parties linked from our website.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Use at Your Own Risk</h2>
        
        <p className="text-foreground">
          Your use of any information or materials on this website is entirely at your own risk, for which we shall not
          be liable. It shall be your own responsibility to ensure that any products, services, or information available
          through this website meet your specific requirements.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Technical Issues</h2>
        
        <p className="text-foreground">
          We do not guarantee that our website will be secure or free from bugs or viruses. You are responsible for
          configuring your information technology, computer programs, and platform in order to access our website.
          You should use your own virus protection software.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Changes to Our Website</h2>
        
        <p className="text-foreground">
          We reserve the right to make changes to our website, policies, and these terms and conditions at any time.
          If you continue to use our website after such changes, you are agreeing to be bound by the revised policy.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Limitation of Liability</h2>
        
        <p className="text-foreground">
          In no event will EMI Calculator be liable for any loss or damage including without limitation, indirect or
          consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising
          out of, or in connection with, the use of this website.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Contact Information</h2>
        
        <p className="text-foreground">
          If you have any questions or concerns about this disclaimer, please contact us:
        </p>
        
        <ul className="ml-6 list-disc space-y-2 text-foreground">
          <li>By email: legal@emicalculator.com</li>
          <li>By visiting the contact page on our website</li>
        </ul>
      </div>
    </div>
  )
} 