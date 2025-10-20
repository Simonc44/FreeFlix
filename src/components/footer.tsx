import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Clapperboard className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Conçu pour le divertissement. Tous droits réservés. &copy; {new Date().getFullYear()} FreeFlix.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="transition-colors hover:text-foreground">Politique de confidentialité</Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-foreground">Conditions d'utilisation</Link>
        </div>
      </div>
    </footer>
  );
}
