import { Clapperboard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Clapperboard className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for entertainment. All rights reserved. &copy; {new Date().getFullYear()} FreeFlix.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
