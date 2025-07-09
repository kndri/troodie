import { PersonaScores, PersonaType, QuizAnswer } from '@/types/onboarding';
import { quizQuestions } from '@/data/quizQuestions';

export function calculatePersona(answers: QuizAnswer[]): {
  persona: PersonaType;
  scores: PersonaScores;
} {
  const scores: PersonaScores = {
    trendsetter: 0,
    culinary_adventurer: 0,
    luxe_planner: 0,
    hidden_gem_hunter: 0,
    comfort_seeker: 0,
    budget_foodie: 0,
    social_explorer: 0,
    local_expert: 0
  };

  // Apply scoring weights for each answer
  answers.forEach((answer) => {
    const question = quizQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find(o => o.id === answer.answerId);
    if (!option || !option.weights) return;

    // Apply weights with tie-breaking multipliers
    let multiplier = 1;
    if (answer.questionId === 1) multiplier = 1.5; // Friday night preference
    if (answer.questionId === 3) multiplier = 1.25; // Decision factors

    Object.entries(option.weights).forEach(([persona, weight]) => {
      scores[persona as keyof PersonaScores] += weight * multiplier;
    });
  });

  // Find highest scoring persona
  let highestScore = 0;
  let selectedPersona: PersonaType = 'social_explorer'; // Default fallback

  Object.entries(scores).forEach(([persona, score]) => {
    if (score > highestScore) {
      highestScore = score;
      selectedPersona = persona as PersonaType;
    }
  });

  return {
    persona: selectedPersona,
    scores
  };
}

export function getPersonaMatch(scores: PersonaScores): {
  primary: PersonaType;
  secondary: PersonaType[];
} {
  const sortedPersonas = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([persona]) => persona as PersonaType);

  return {
    primary: sortedPersonas[0],
    secondary: sortedPersonas.slice(1, 3)
  };
}