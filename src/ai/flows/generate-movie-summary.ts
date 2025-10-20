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
  movieTitle: z.string().describe('The title of the movie.'),
  movieDescription: z.string().describe('A detailed description of the movie.'),
});
export type GenerateMovieSummaryInput = z.infer<typeof GenerateMovieSummaryInputSchema>;

const GenerateMovieSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the movie.'),
});
export type GenerateMovieSummaryOutput = z.infer<typeof GenerateMovieSummaryOutputSchema>;

export async function generateMovieSummary(input: GenerateMovieSummaryInput): Promise<GenerateMovieSummaryOutput> {
  return generateMovieSummaryFlow(input);
}

const generateMovieSummaryPrompt = ai.definePrompt({
  name: 'generateMovieSummaryPrompt',
  input: {schema: GenerateMovieSummaryInputSchema},
  output: {schema: GenerateMovieSummaryOutputSchema},
  prompt: `You are an expert movie summarizer.  Please provide a short, concise summary of the following movie, no more than 50 words.\n\nMovie Title: {{{movieTitle}}}\nMovie Description: {{{movieDescription}}}`, 
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
