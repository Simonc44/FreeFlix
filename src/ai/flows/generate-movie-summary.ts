'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate concise movie summaries.
 *
 * - generateMovieSummary - A function that generates a movie summary.
 * - GenerateMovieSummaryInput - The input type for the generateMovieSummary function.
 * - GenerateMovieSummaryOutput - The return type for the generateMovieSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMovieSummaryInputSchema = z.object({
  movieTitle: z.string().describe('Le titre du film.'),
  movieDescription: z.string().describe('Une description détaillée du film.'),
});
export type GenerateMovieSummaryInput = z.infer<typeof GenerateMovieSummaryInputSchema>;

const GenerateMovieSummaryOutputSchema = z.object({
  summary: z.string().describe('Un résumé concis du film.'),
});
export type GenerateMovieSummaryOutput = z.infer<typeof GenerateMovieSummaryOutputSchema>;

export async function generateMovieSummary(input: GenerateMovieSummaryInput): Promise<GenerateMovieSummaryOutput> {
  return generateMovieSummaryFlow(input);
}

const generateMovieSummaryPrompt = ai.definePrompt({
  name: 'generateMovieSummaryPrompt',
  input: {schema: GenerateMovieSummaryInputSchema},
  output: {schema: GenerateMovieSummaryOutputSchema},
  prompt: `Vous êtes un expert en résumé de films. Veuillez fournir un résumé court et concis du film suivant, pas plus de 50 mots.\n\nTitre du film: {{{movieTitle}}}\nDescription du film: {{{movieDescription}}}`, 
});

const generateMovieSummaryFlow = ai.defineFlow(
  {
    name: 'generateMovieSummaryFlow',
    inputSchema: GenerateMovieSummaryInputSchema,
    outputSchema: GenerateMovieSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateMovieSummaryPrompt(input);
    return output!;
  }
);
