import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - EMI Calculator",
  description: "Our privacy policy explains how we collect, use, and protect your information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">Privacy Policy</h1>
      
      <div className="space-y-6">
        <p className="text-muted-foreground">
          <strong className="font-semibold text-foreground">Last Updated: {new Date().toLocaleDateString()}</strong>
        </p>
        
        <p className="text-foreground">
          At EMI Calculator, we value your privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard your data when you use our website.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Information We Collect</h2>
        
        <p className="text-foreground">
          <strong className="font-semibold">Personal Information:</strong> We do not collect personally identifiable information unless you
          voluntarily provide it to us through contact forms or when subscribing to our newsletters.
        </p>
        
        <p className="text-foreground">
          <strong className="font-semibold">Usage Data:</strong> We automatically collect certain information when you visit our website, including:
        </p>
        
        <ul className="ml-6 list-disc space-y-2 text-foreground">
          <li>Your device's IP address</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent on those pages</li>
          <li>Time and date of your visit</li>
          <li>Other statistics</li>
        </ul>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">How We Use Your Information</h2>
        
        <p className="text-foreground">We use the collected data for various purposes:</p>
        
        <ul className="ml-6 list-disc space-y-2 text-foreground">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our service</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Cookies and Tracking Technologies</h2>
        
        <p className="text-foreground">
          We use cookies and similar tracking technologies to track activity on our website and hold certain information.
          Cookies are files with a small amount of data which may include an anonymous unique identifier.
        </p>
        
        <p className="text-foreground">
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          However, if you do not accept cookies, you may not be able to use some portions of our service.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Data Security</h2>
        
        <p className="text-foreground">
          The security of your data is important to us, but remember that no method of transmission over the Internet
          or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
          protect your personal data, we cannot guarantee its absolute security.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Third-Party Services</h2>
        
        <p className="text-foreground">
          We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf,
          perform service-related services, or assist us in analyzing how our service is used.
        </p>
        
        <p className="text-foreground">
          These third parties have access to your personal data only to perform these tasks on our behalf and are
          obligated not to disclose or use it for any other purpose.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Changes to This Privacy Policy</h2>
        
        <p className="text-foreground">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
        </p>
        
        <p className="text-foreground">
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
          are effective when they are posted on this page.
        </p>
        
        <h2 className="mt-8 text-xl font-semibold text-foreground">Contact Us</h2>
        
        <p className="text-foreground">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        
        <ul className="ml-6 list-disc space-y-2 text-foreground">
          <li>By email: privacy@emicalculator.com</li>
          <li>By visiting the contact page on our website</li>
        </ul>
      </div>
    </div>
  )
} 