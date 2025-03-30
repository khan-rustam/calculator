import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - EMI Calculator",
  description: "Terms and conditions for using our EMI calculator and related services.",
}

export default function TermsOfServicePage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">Terms of Service</h1>
      
      <div className="space-y-6">
        <p className="text-muted-foreground">
          <strong className="font-semibold text-foreground">Last Updated: {new Date().toLocaleDateString()}</strong>
        </p>
        
        <p className="text-foreground">
          Welcome to EMI Calculator. Please read these Terms of Service carefully before using our website.
          By accessing or using our website, you agree to be bound by these Terms.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
        
        <p className="text-foreground">
          By accessing or using our website, you agree to comply with and be bound by these Terms of Service.
          If you do not agree to these Terms, please do not use our website.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">2. Use of Our Services</h2>
        
        <p className="text-foreground">
          Our EMI Calculator is designed to provide estimates for educational purposes only.
          The results provided by our calculator should not be considered as financial advice.
          We recommend consulting with a financial advisor before making any financial decisions.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">3. User Conduct</h2>
        
        <p className="text-foreground">You agree not to use our website:</p>
        
        <ul className="ml-6 list-disc space-y-2 text-foreground">
          <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", 
              "chain letter", "spam", or any other similar solicitation</li>
          <li>To impersonate or attempt to impersonate EMI Calculator, an EMI Calculator employee, 
              another user, or any other person or entity</li>
          <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
        </ul>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">4. Intellectual Property</h2>
        
        <p className="text-foreground">
          The EMI Calculator website and its original content, features, and functionality are owned by EMI Calculator
          and are protected by international copyright, trademark, patent, trade secret, and other intellectual
          property or proprietary rights laws.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">5. Accuracy of Information</h2>
        
        <p className="text-foreground">
          We strive to provide accurate and reliable information through our website. However, we cannot guarantee
          the accuracy, completeness, or reliability of any information or results provided through our services.
          Any reliance you place on such information is strictly at your own risk.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">6. Third-Party Links</h2>
        
        <p className="text-foreground">
          Our website may contain links to third-party websites or services that are not owned or controlled by EMI Calculator.
          EMI Calculator has no control over, and assumes no responsibility for, the content, privacy policies,
          or practices of any third-party websites or services.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
        
        <p className="text-foreground">
          In no event shall EMI Calculator, nor its directors, employees, partners, agents, suppliers, or affiliates,
          be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation,
          loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        
        <ul className="ml-6 list-disc space-y-2 text-foreground">
          <li>Your access to or use of or inability to access or use the service</li>
          <li>Any conduct or content of any third party on the service</li>
          <li>Any content obtained from the service</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">8. Changes to These Terms</h2>
        
        <p className="text-foreground">
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
          provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
          will be determined at our sole discretion.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">9. Governing Law</h2>
        
        <p className="text-foreground">
          These Terms shall be governed and construed in accordance with the laws of India, without regard to
          its conflict of law provisions.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">10. Contact Us</h2>
        
        <p className="text-foreground">
          If you have any questions about these Terms, please contact us:
        </p>
        
        <ul className="ml-6 list-disc space-y-2 text-foreground">
          <li>By email: terms@emicalculator.com</li>
          <li>By visiting the contact page on our website</li>
        </ul>
      </div>
    </div>
  )
} 