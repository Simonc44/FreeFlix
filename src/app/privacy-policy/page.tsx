
export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-headline font-bold mb-8">Politique de confidentialité</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p className="text-sm">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        
        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Introduction</h2>
        <p>
          Bienvenue sur FreeFlix. Nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous
          collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site Web. Veuillez lire attentivement cette politique de confidentialité
          . Si vous n'êtes pas d'accord avec les termes de cette politique de confidentialité, veuillez ne pas accéder au site.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Collecte de vos informations</h2>
        <p>
          Nous pouvons collecter des informations vous concernant de différentes manières. Les informations que nous pouvons collecter sur le site incluent des données personnelles, telles que votre nom, votre adresse de livraison, votre adresse e-mail et votre numéro de téléphone, ainsi que des informations démographiques, telles que votre âge, votre sexe, votre ville natale et vos intérêts, que vous nous fournissez volontairement lorsque vous vous inscrivez sur le site ou lorsque vous choisissez de participer à diverses activités liées au site, telles que le chat en ligne et les forums de discussion.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Utilisation de vos informations</h2>
        <p>
          Disposer d'informations précises sur vous nous permet de vous offrir une expérience fluide, efficace et personnalisée. Plus précisément, nous pouvons utiliser les informations collectées à votre sujet via le site pour :
        </p>
        <ul>
          <li>Créer et gérer votre compte.</li>
          <li>Vous envoyer un e-mail concernant votre compte ou votre commande.</li>
          <li>Permettre les communications d'utilisateur à utilisateur.</li>
          <li>Exécuter et gérer les achats, les commandes, les paiements et autres transactions liées au site.</li>
          <li>Générer un profil personnel vous concernant pour rendre les futures visites sur le site plus personnalisées.</li>
        </ul>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Sécurité de vos informations</h2>
        <p>
          Nous utilisons des mesures de sécurité administratives, techniques et physiques pour aider à protéger vos informations personnelles. Bien que nous ayons pris des mesures raisonnables pour sécuriser les informations personnelles que vous nous fournissez, veuillez être conscient que malgré nos efforts, aucune mesure de sécurité n'est parfaite ou impénétrable, et aucune méthode de transmission de données ne peut être garantie contre toute interception ou autre type d'utilisation abusive.
        </p>

        <h2 className="text-2xl font-headline font-semibold mt-8 mb-4 text-foreground">Contactez-nous</h2>
        <p>
          Si vous avez des questions ou des commentaires sur cette politique de confidentialité, veuillez nous contacter à : contact@freeflix.com
        </p>
      </div>
    </div>
  );
}
