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
    z.string().describe('The title of a movie the user has watched')
  ).describe('A list of movies the user has watched in the past.'),
  numberOfRecommendations: z.number().min(1).max(10).default(5).describe('The number of movie recommendations to generate.')
});
export type MovieRecommendationsInput = z.infer<typeof MovieRecommendationsInputSchema>;

const MovieRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('A recommended movie title based on the viewing history.')
  ).describe('A list of movie recommendations.')
});
export type MovieRecommendationsOutput = z.infer<typeof MovieRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: MovieRecommendationsInput): Promise<MovieRecommendationsOutput> {
  return movieRecommendationsFlow(input);
}

const movieRecommendationsPrompt = ai.definePrompt({
  name: 'movieRecommendationsPrompt',
  input: {schema: MovieRecommendationsInputSchema},
  output: {schema: MovieRecommendationsOutputSchema},
  prompt: `You are a movie recommendation expert. Given a user's viewing history, you will provide personalized movie recommendations.

  Viewing History:
  {{#each viewingHistory}}
  - {{this}}
  {{/each}}

  Please provide {{numberOfRecommendations}} movie recommendations based on the viewing history above. Only respond with the titles of the movies.
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
