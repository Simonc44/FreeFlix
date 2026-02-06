import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clapperboard } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <Clapperboard className="w-24 h-24 text-primary mb-4" />
      <h1 className="text-4xl font-headline font-bold mb-2">404 - Page non trouvée</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Oups ! Il semble que cette bobine a été coupée. La page que vous recherchez n'existe pas.
      </p>
      <Button asChild size="lg">
        <Link href="/">Retour à l'accueil</Link>
      </Button>
    </div>
  )
}
