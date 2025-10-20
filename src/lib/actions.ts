'use server';

import { getPersonalizedRecommendations, MovieRecommendationsInput, MovieRecommendationsOutput } from '@/ai/flows/movie-recommendations';
import { generateMovieSummary, GenerateMovieSummaryInput, GenerateMovieSummaryOutput } from '@/ai/flows/generate-movie-summary';

export async function getRecommendationsAction(input: MovieRecommendationsInput): Promise<MovieRecommendationsOutput> {
  try {
    const result = await getPersonalizedRecommendations(input);
    return result;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return { recommendations: [] };
  }
}

export async function getSummaryAction(input: GenerateMovieSummaryInput): Promise<GenerateMovieSummaryOutput> {
  try {
    const result = await generateMovieSummary(input);
    return result;
  } catch (error) {
    console.error('Error generating summary:', error);
    return { summary: 'Could not generate a summary at this time.' };
  }
}
