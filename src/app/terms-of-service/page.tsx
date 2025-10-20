
export default function TermsOfServicePage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-headline font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">1. Agreement to Terms</h2>
        <p>
          By using our services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the services.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">2. Privacy Policy</h2>
        <p>
          Please refer to our Privacy Policy for information on how we collect, use, and disclose information from our users. You acknowledge and agree that your use of the services is subject to our Privacy Policy.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">3. Content and Content Rights</h2>
        <p>
          For purposes of these Terms, "Content" means text, graphics, images, music, software, audio, video, works of authorship of any kind, and information or other materials that are posted, generated, provided, or otherwise made available through the services.
        </p>
        
        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">4. General Prohibitions</h2>
        <p>
            You agree not to do any of the following:
        </p>
        <ul>
            <li>Post, upload, publish, submit or transmit any Content that: (i) infringes, misappropriates or violates a third party’s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy;</li>
            <li>Use, display, mirror or frame the services or any individual element within the services, FreeFlix’s name, any FreeFlix trademark, logo or other proprietary information, or the layout and design of any page or form contained on a page, without FreeFlix’s express written consent;</li>
            <li>Attempt to probe, scan or test the vulnerability of any FreeFlix system or network or breach any security or authentication measures;</li>
        </ul>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">5. Termination</h2>
        <p>
          We may terminate your access to and use of the services, at our sole discretion, at any time and without notice to you.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at: contact@freeflix.com
        </p>
      </div>
    </div>
  );
}
