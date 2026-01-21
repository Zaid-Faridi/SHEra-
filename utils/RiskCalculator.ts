import { ONBOARDING_QUESTIONS } from '@/constants/Onboarding';

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface RiskResult {
    score: number;
    level: RiskLevel;
    recommendation: string;
    indicators: string[];
}

export const calculateRiskScore = (answers: Record<string, any>): RiskResult => {
    let totalScore = 0;
    const indicators: string[] = [];

    ONBOARDING_QUESTIONS.forEach(question => {
        const answer = answers[question.id];
        if (answer === undefined) return;

        if (question.type === 'single_choice') {
            const selectedOption = question.options?.find(o => o.value === answer);
            if (selectedOption?.weight) {
                totalScore += selectedOption.weight;
                // If weight is high, add to indicators (descriptive)
                const indicatorLabel = question.id === 'family_history' ? 'Family history of PCOS/Metabolic issues' :
                    question.id === 'excess_hair' ? 'Excess body/facial hair growth' :
                        question.id === 'period_regularity' ? 'Cycle irregularity detected' :
                            question.category;

                if (selectedOption.weight >= 10 && !indicators.includes(indicatorLabel)) {
                    indicators.push(indicatorLabel);
                }
            }
        }
    });

    // Cap score at 100
    const score = Math.min(totalScore, 100);

    let level: RiskLevel = 'Low';
    let recommendation = 'Your risk markers are low. Continue tracking your cycle to stay informed about your health.';

    if (score > 60) {
        level = 'High';
        recommendation = 'Your symptoms strongly align with PCOS markers. We recommend scheduling a consultation with a specialist for a formal diagnosis.';
    } else if (score > 30) {
        level = 'Medium';
        recommendation = 'You have some common PCOS indicators. Focus on insulin-friendly nutrition and consistent tracking to manage symptoms.';
    }

    return { score, level, recommendation, indicators };
};
