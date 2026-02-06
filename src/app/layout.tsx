import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/context/app-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { SplashScreen } from '@/components/splash-screen';

export const metadata: Metadata = {
  title: 'FreeFlix',
  description: 'Regardez une variété de films gratuitement.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(262.1 83.3% 57.8%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z'></path><path d='m6.2 5.3 3.1 3.9'></path><path d='m12.4 3.4 3.1 4'></path><path d='M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z'></path></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <FirebaseClientProvider>
          <AppProvider>
            <SplashScreen />
            <div className="flex flex-col min-h-screen bg-background">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </AppProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
