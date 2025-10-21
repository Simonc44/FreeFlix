'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/app-provider";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { signup, user } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (password.length < 6) {
            toast({
                variant: "destructive",
                title: "Mot de passe trop court",
                description: "Votre mot de passe doit contenir au moins 6 caractères.",
            });
            setIsLoading(false);
            return;
        }

        try {
            await signup(name, email, password);
            toast({
                title: "Compte créé !",
                description: "Votre compte a été créé avec succès. Vous êtes maintenant connecté.",
            });
            router.push('/');
        } catch (error: any) {
            console.error(error);
            let description = "Une erreur est survenue. Veuillez réessayer.";
            if (error.code === 'auth/email-already-in-use') {
                description = "Cette adresse e-mail est déjà utilisée par un autre compte.";
            }
            toast({
                variant: "destructive",
                title: "Erreur d'inscription",
                description: description,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">Créer un compte</CardTitle>
                    <CardDescription>
                        Rejoignez FreeFlix et découvrez des films incroyables. La création d'un compte vous permet de sauvegarder votre liste de films et d'y accéder n'importe où.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom d'utilisateur</Label>
                            <Input id="name" type="text" placeholder="Votre nom" required value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="exemple@domaine.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            S'inscrire
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Vous avez déjà un compte ?{' '}
                            <Link href="/login" className="font-semibold text-primary hover:underline">
                                Connectez-vous
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
