import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/context/app-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='hsl(24 95% 53%)' stroke='hsl(0 0% 8%)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M4 11v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8'/><path d='m4 11 8-8 8 8'/><path d='M4 4v.01'/><path d='M8 4v.01'/><path d='M12 4v.01'/><path d='M16 4v.01'/></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppProvider>
          <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
