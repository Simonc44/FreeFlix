'use server';

/**
 * @fileOverview Personalized movie recommendations based on viewing history.
 *
 * - getPersonalizedRecommendations - A function that generates movie recommendations based on user's viewing history.
 * - MovieRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - MovieRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MovieRecommendationsInputSchema = z.object({
  viewingHistory: z.array(
    z.string().describe('Le titre d\'un film que l\'utilisateur a regardé')
  ).describe('Une liste de films que l\'utilisateur a regardés par le passé.'),
  numberOfRecommendations: z.number().min(1).max(10).default(5).describe('Le nombre de recommandations de films à générer.')
});
export type MovieRecommendationsInput = z.infer<typeof MovieRecommendationsInputSchema>;

const MovieRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('Un titre de film recommandé basé sur l\'historique de visionnage.')
  ).describe('Une liste de recommandations de films.')
});
export type MovieRecommendationsOutput = z.infer<typeof MovieRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: MovieRecommendationsInput): Promise<MovieRecommendationsOutput> {
  return movieRecommendationsFlow(input);
}

const movieRecommendationsPrompt = ai.definePrompt({
  name: 'movieRecommendationsPrompt',
  input: {schema: MovieRecommendationsInputSchema},
  output: {schema: MovieRecommendationsOutputSchema},
  prompt: `Vous êtes un expert en recommandation de films. Étant donné l'historique de visionnage d'un utilisateur, vous fournirez des recommandations de films personnalisées.

  Historique de visionnage:
  {{#each viewingHistory}}
  - {{this}}
  {{/each}}

  Veuillez fournir {{numberOfRecommendations}} recommandations de films basées sur l'historique de visionnage ci-dessus. Ne répondez qu'avec les titres des films.
  `
});

const movieRecommendationsFlow = ai.defineFlow(
  {
    name: 'movieRecommendationsFlow',
    inputSchema: MovieRecommendationsInputSchema,
    outputSchema: MovieRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await movieRecommendationsPrompt(input);
    return output!;
  }
);
