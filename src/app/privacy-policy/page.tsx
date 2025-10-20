
export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-headline font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Introduction</h2>
        <p>
          Welcome to FreeFlix. We are committed to protecting your privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy
          policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Collection of Your Information</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes personal data, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Email you regarding your account or order.</li>
          <li>Enable user-to-user communications.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
          <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
        </ul>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at: contact@freeflix.com
        </p>
      </div>
    </div>
  );
}
