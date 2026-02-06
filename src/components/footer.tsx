import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card/50 border-t mt-12">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <Clapperboard className="h-6 w-6 text-primary" />
                <span className="font-headline text-2xl font-bold">FreeFlix</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                <Link href="/privacy-policy" className="transition-colors hover:text-foreground">
                    Politique de confidentialité
                </Link>
                <Link href="/terms-of-service" className="transition-colors hover:text-foreground">
                    Conditions d'utilisation
                </Link>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground/60">
            <p>&copy; {new Date().getFullYear()} FreeFlix. Tous droits réservés.</p>
            <p className="mt-2 text-xs max-w-2xl mx-auto">
               FreeFlix n'héberge aucun fichier, mais propose des liens vers des services tiers. Les questions juridiques doivent être traités avec les hébergeurs et les fournisseurs de fichiers. FreeFlix n'est pas responsable des fichiers multimédias diffusés par les fournisseurs de vidéos.
            </p>
        </div>
      </div>
    </footer>
  );
}
