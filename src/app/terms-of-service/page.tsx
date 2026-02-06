
export default function TermsOfServicePage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-headline font-bold mb-8">Conditions d'utilisation</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p className="text-sm">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        
        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">1. Acceptation des conditions</h2>
        <p>
          En utilisant nos services, vous acceptez d'être lié par ces Conditions. Si vous n’acceptez pas d’être lié par ces Conditions, n’utilisez pas les services.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">2. Politique de confidentialité</h2>
        <p>
          Veuillez vous référer à notre Politique de confidentialité pour obtenir des informations sur la manière dont nous collectons, utilisons et divulguons les informations de nos utilisateurs. Vous reconnaissez et acceptez que votre utilisation des services est soumise à notre Politique de confidentialité.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">3. Contenu et droits sur le contenu</h2>
        <p>
          Aux fins des présentes Conditions, le "Contenu" désigne le texte, les graphiques, les images, la musique, les logiciels, l'audio, la vidéo, les œuvres d'auteur de toute nature, ainsi que les informations ou autres matériels qui sont publiés, générés, fournis ou autrement mis à disposition via les services.
        </p>
        
        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">4. Interdictions générales</h2>
        <p>
            Vous acceptez de ne rien faire de ce qui suit :
        </p>
        <ul>
            <li>Publier, télécharger, soumettre ou transmettre tout Contenu qui : (i) enfreint, détourne ou viole un brevet, un droit d'auteur, une marque, un secret commercial, des droits moraux ou d'autres droits de propriété intellectuelle d'un tiers, ou des droits de publicité ou de confidentialité ;</li>
            <li>Utiliser, afficher, refléter ou encadrer les services ou tout élément individuel au sein des services, le nom de FreeFlix, toute marque, logo ou autre information exclusive de FreeFlix, ou la mise en page et la conception de toute page ou formulaire contenu sur une page, sans le consentement écrit exprès de FreeFlix ;</li>
            <li>Tenter de sonder, d'analyser ou de tester la vulnérabilité de tout système ou réseau FreeFlix ou de violer toute mesure de sécurité ou d'authentification ;</li>
        </ul>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">5. Résiliation</h2>
        <p>
          Nous pouvons résilier votre accès et votre utilisation des services, à notre seule discrétion, à tout moment et sans préavis.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Contactez-nous</h2>
        <p>
          Si vous avez des questions sur ces Conditions, veuillez nous contacter à : contact@freeflix.com
        </p>
      </div>
    </div>
  );
}
