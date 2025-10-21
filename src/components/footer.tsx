import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-28 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Clapperboard className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Conçu pour le divertissement. Tous droits réservés. &copy; {new Date().getFullYear()} FreeFlix.
            </p>
            <p className="text-center text-xs text-muted-foreground/60 md:text-left">
              Avertissement : FreeFlix est un projet de démonstration. Le contenu est fourni à des fins éducatives et nous ne détenons aucun droit.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="transition-colors hover:text-foreground">Politique de confidentialité</Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-foreground">Conditions d'utilisation</Link>
        </div>
      </div>
    </footer>
  );
}
