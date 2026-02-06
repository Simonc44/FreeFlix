'use server';

import { getPersonalizedRecommendations, MovieRecommendationsInput, MovieRecommendationsOutput } from '@/ai/flows/movie-recommendations';
import { generateMovieSummary, GenerateMovieSummaryInput, GenerateMovieSummaryOutput } from '@/ai/flows/generate-movie-summary';

export async function getRecommendationsAction(input: MovieRecommendationsInput): Promise<MovieRecommendationsOutput> {
  try {
    const result = await getPersonalizedRecommendations(input);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'obtention des recommandations :', error);
    return { recommendations: [] };
  }
}

export async function getSummaryAction(input: GenerateMovieSummaryInput): Promise<GenerateMovieSummaryOutput> {
  try {
    const result = await generateMovieSummary(input);
    return result;
  } catch (error) {
    console.error('Erreur lors de la génération du résumé :', error);
    return { summary: 'Impossible de générer un résumé pour le moment.' };
  }
}
