export type QuestionType = 'single_choice' | 'multi_choice' | 'text' | 'numeric' | 'date';

export type QuestionCategory =
    | 'BASIC PROFILE'
    | 'MENSTRUAL HEALTH'
    | 'PCOD / PCOS INDICATORS'
    | 'LIFESTYLE & METABOLIC HEALTH'
    | 'MENTAL HEALTH'
    | 'ADOLESCENT HEALTH'
    | 'RED-FLAG SAFETY CHECK';

export interface OnboardingQuestion {
    id: string;
    question: string;
    type: QuestionType;
    icon: string;
    category: QuestionCategory;
    options?: { label: string; value: any; weight?: number }[];
    condition?: {
        dependsOn: string;
        showIf: any[]; // Changed to array for flexible matching
    };
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
    // 1. BASIC PROFILE
    {
        id: 'age_group',
        question: "What is your age group?",
        type: 'single_choice',
        icon: 'person-outline',
        category: 'BASIC PROFILE',
        options: [
            { label: 'Below 13', value: 'below_13' },
            { label: '13–15', value: '13_15' },
            { label: '16–18', value: '16_18' },
            { label: '19–25', value: '19_25' },
            { label: '26–35', value: '26_35' },
            { label: '36+', value: '36_plus' }
        ]
    },
    {
        id: 'first_period_age',
        question: "Age at first period (if applicable):",
        type: 'single_choice',
        icon: 'calendar-outline',
        category: 'BASIC PROFILE',
        options: [
            { label: 'Not started yet', value: 'not_started' },
            { label: 'Below 10', value: 'below_10', weight: 8 },
            { label: '10–12', value: '10_12' },
            { label: '13–15', value: '13_15' },
            { label: 'After 15', value: 'after_15', weight: 5 }
        ]
    },
    {
        id: 'body_type',
        question: "Current body type (self-perceived):",
        type: 'single_choice',
        icon: 'body-outline',
        category: 'BASIC PROFILE',
        options: [
            { label: 'Underweight', value: 'underweight' },
            { label: 'Average', value: 'average' },
            { label: 'Slightly overweight', value: 'slightly_overweight', weight: 5 },
            { label: 'Overweight', value: 'overweight', weight: 10 }
        ]
    },
    {
        id: 'hormonal_med',
        question: "Are you currently on hormonal medication/birth control?",
        type: 'single_choice',
        icon: 'medical-outline',
        category: 'BASIC PROFILE',
        options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Not sure', value: 'not_sure' }
        ]
    },

    // 2. MENSTRUAL HEALTH
    {
        id: 'period_regularity',
        question: "How regular are your periods?",
        type: 'single_choice',
        icon: 'repeat-outline',
        category: 'MENSTRUAL HEALTH',
        options: [
            { label: 'Regular (21–35 days)', value: 'regular', weight: 0 },
            { label: 'Sometimes irregular', value: 'sometimes', weight: 10 },
            { label: 'Very irregular', value: 'very_irregular', weight: 20 },
            { label: 'Periods stopped / not started', value: 'stopped', weight: 25 }
        ]
    },
    {
        id: 'cycle_length_avg',
        question: "Average cycle length:",
        type: 'single_choice',
        icon: 'calendar-outline',
        category: 'MENSTRUAL HEALTH',
        options: [
            { label: 'Less than 21 days', value: 'less_21', weight: 10 },
            { label: '21–35 days', value: '21_35', weight: 0 },
            { label: 'More than 35 days', value: 'more_35', weight: 15 },
            { label: 'Unsure', value: 'unsure', weight: 5 }
        ]
    },
    {
        id: 'bleeding_duration',
        question: "Duration of bleeding:",
        type: 'single_choice',
        icon: 'water-outline',
        category: 'MENSTRUAL HEALTH',
        options: [
            { label: '1–2 days', value: '1_2', weight: 5 },
            { label: '3–5 days', value: '3_5', weight: 0 },
            { label: '6–7 days', value: '6_7', weight: 2 },
            { label: 'More than 7 days', value: 'more_7', weight: 8 }
        ]
    },
    {
        id: 'flow_intensity',
        question: "Menstrual flow intensity:",
        type: 'single_choice',
        icon: 'color-fill-outline',
        category: 'MENSTRUAL HEALTH',
        options: [
            { label: 'Light', value: 'light' },
            { label: 'Normal', value: 'normal' },
            { label: 'Heavy', value: 'heavy', weight: 5 },
            { label: 'Very heavy', value: 'very_heavy', weight: 10 }
        ]
    },
    {
        id: 'period_symptoms',
        question: "Period symptoms you experience:",
        type: 'single_choice',
        icon: 'bandage-outline',
        category: 'MENSTRUAL HEALTH',
        options: [
            { label: 'Mild discomfort', value: 'mild' },
            { label: 'Pain needing medication', value: 'medication', weight: 5 },
            { label: 'Severe pain affecting daily activities', value: 'severe', weight: 15 },
            { label: 'No pain', value: 'none' }
        ]
    },

    // 3. PCOD / PCOS INDICATORS
    {
        id: 'excess_hair',
        question: "Excess facial/body hair growth?",
        type: 'single_choice',
        icon: 'sparkles-outline',
        category: 'PCOD / PCOS INDICATORS',
        options: [
            { label: 'No', value: 'no' },
            { label: 'Mild', value: 'mild', weight: 5 },
            { label: 'Moderate', value: 'moderate', weight: 10 },
            { label: 'Severe', value: 'severe', weight: 15 }
        ]
    },
    {
        id: 'adult_acne',
        question: "Acne after teenage years:",
        type: 'single_choice',
        icon: 'sunny-outline',
        category: 'PCOD / PCOS INDICATORS',
        options: [
            { label: 'None', value: 'none' },
            { label: 'Occasional', value: 'occasional', weight: 3 },
            { label: 'Persistent', value: 'persistent', weight: 8 },
            { label: 'Severe', value: 'severe', weight: 12 }
        ]
    },
    {
        id: 'weight_changes',
        question: "Weight changes in last year:",
        type: 'single_choice',
        icon: 'trending-up-outline',
        category: 'PCOD / PCOS INDICATORS',
        options: [
            { label: 'Stable', value: 'stable' },
            { label: 'Mild gain', value: 'mild_gain', weight: 4 },
            { label: 'Sudden/unexplained gain', value: 'sudden_gain', weight: 12 },
            { label: 'Sudden loss', value: 'sudden_loss', weight: 5 }
        ]
    },
    {
        id: 'hair_loss',
        question: "Hair fall or thinning on scalp:",
        type: 'single_choice',
        icon: 'cut-outline',
        category: 'PCOD / PCOS INDICATORS',
        options: [
            { label: 'No', value: 'no' },
            { label: 'Mild', value: 'mild', weight: 3 },
            { label: 'Moderate', value: 'moderate', weight: 7 },
            { label: 'Severe', value: 'severe', weight: 10 }
        ]
    },
    {
        id: 'dark_patches',
        question: "Dark skin patches:",
        type: 'single_choice',
        icon: 'brush-outline',
        category: 'PCOD / PCOS INDICATORS',
        options: [
            { label: 'No', value: 'no' },
            { label: 'Slight', value: 'slight', weight: 5 },
            { label: 'Clearly visible', value: 'clear', weight: 10 },
            { label: 'Unsure', value: 'unsure' }
        ]
    },
    {
        id: 'family_history',
        question: "Family history of PCOS/diabetes/thyroid?",
        type: 'single_choice',
        icon: 'people-outline',
        category: 'PCOD / PCOS INDICATORS',
        options: [
            { label: 'Yes', value: 'yes', weight: 10 },
            { label: 'No', value: 'no' },
            { label: 'Not sure', value: 'not_sure', weight: 2 }
        ]
    },

    // 4. LIFESTYLE & METABOLIC HEALTH
    {
        id: 'activity_level',
        question: "Physical activity level:",
        type: 'single_choice',
        icon: 'fitness-outline',
        category: 'LIFESTYLE & METABOLIC HEALTH',
        options: [
            { label: 'Daily', value: 'daily' },
            { label: '3–4 times/week', value: '3_4_times' },
            { label: '1–2 times/week', value: '1_2_times', weight: 3 },
            { label: 'Rarely', value: 'rarely', weight: 8 }
        ]
    },
    {
        id: 'sleep_duration',
        question: "Average sleep per night:",
        type: 'single_choice',
        icon: 'moon-outline',
        category: 'LIFESTYLE & METABOLIC HEALTH',
        options: [
            { label: 'Less than 5 hours', value: 'less_5', weight: 10 },
            { label: '5–6 hours', value: '5_6', weight: 5 },
            { label: '7–8 hours', value: '7_8' },
            { label: 'More than 8 hours', value: 'more_8' }
        ]
    },
    {
        id: 'energy_levels',
        question: "Energy levels:",
        type: 'single_choice',
        icon: 'battery-charging-outline',
        category: 'LIFESTYLE & METABOLIC HEALTH',
        options: [
            { label: 'Energetic', value: 'energetic' },
            { label: 'Slightly tired', value: 'tired', weight: 2 },
            { label: 'Often exhausted', value: 'exhausted', weight: 7 },
            { label: 'Extremely fatigued', value: 'fatigued', weight: 12 }
        ]
    },
    {
        id: 'diet_pattern',
        question: "Diet pattern:",
        type: 'single_choice',
        icon: 'nutrition-outline',
        category: 'LIFESTYLE & METABOLIC HEALTH',
        options: [
            { label: 'Mostly balanced', value: 'balanced' },
            { label: 'Mixed', value: 'mixed', weight: 2 },
            { label: 'High sugar/junk', value: 'sugar_junk', weight: 10 },
            { label: 'Irregular/skipped meals', value: 'irregular_skipped', weight: 5 }
        ]
    },

    // 5. MENTAL HEALTH
    {
        id: 'emotional_drain',
        question: "Emotional drainage (last 2 weeks):",
        type: 'single_choice',
        icon: 'sad-outline',
        category: 'MENTAL HEALTH',
        options: [
            { label: 'Never', value: 'never' },
            { label: 'Sometimes', value: 'sometimes', weight: 4 },
            { label: 'Often', value: 'often', weight: 8 },
            { label: 'Almost always', value: 'always', weight: 12 }
        ]
    },
    {
        id: 'stress_level',
        question: "Stress levels:",
        type: 'single_choice',
        icon: 'alert-circle-outline',
        category: 'MENTAL HEALTH',
        options: [
            { label: 'Low', value: 'low' },
            { label: 'Moderate', value: 'moderate', weight: 4 },
            { label: 'High', value: 'high', weight: 8 },
            { label: 'Extreme', value: 'extreme', weight: 15 }
        ]
    },
    {
        id: 'concentration_diff',
        question: "Difficulty concentrating?",
        type: 'single_choice',
        icon: 'brain-outline',
        category: 'MENTAL HEALTH',
        options: [
            { label: 'No', value: 'no' },
            { label: 'Occasionally', value: 'occasionally', weight: 3 },
            { label: 'Frequently', value: 'frequently', weight: 7 },
            { label: 'Almost daily', value: 'daily', weight: 10 }
        ]
    },
    {
        id: 'mood_changes',
        question: "Mood changes:",
        type: 'single_choice',
        icon: 'happy-outline',
        category: 'MENTAL HEALTH',
        options: [
            { label: 'Rare', value: 'rare' },
            { label: 'Occasional', value: 'occasional', weight: 2 },
            { label: 'Frequent', value: 'frequent', weight: 6 },
            { label: 'Constant', value: 'constant', weight: 10 }
        ]
    },

    // 6. ADOLESCENT HEALTH (Conditional)
    {
        id: 'adolescent_regularity',
        question: "Period regularity since starting:",
        type: 'single_choice',
        icon: 'stats-chart-outline',
        category: 'ADOLESCENT HEALTH',
        condition: {
            dependsOn: 'age_group',
            showIf: ['below_13', '13_15', '16_18']
        },
        options: [
            { label: 'Regular', value: 'regular' },
            { label: 'Irregular but improving', value: 'improving', weight: 2 },
            { label: 'Still very irregular', value: 'very_irregular', weight: 8 },
            { label: 'Not started', value: 'not_started' }
        ]
    },
    {
        id: 'academic_pressure',
        question: "Academic pressure:",
        type: 'single_choice',
        icon: 'school-outline',
        category: 'ADOLESCENT HEALTH',
        condition: {
            dependsOn: 'age_group',
            showIf: ['below_13', '13_15', '16_18']
        },
        options: [
            { label: 'No impact', value: 'none' },
            { label: 'Mild stress', value: 'mild', weight: 2 },
            { label: 'High stress', value: 'high', weight: 6 },
            { label: 'Overwhelming', value: 'overwhelming', weight: 10 }
        ]
    },
    {
        id: 'eating_habits',
        question: "Eating habits:",
        type: 'single_choice',
        icon: 'restaurant-outline',
        category: 'ADOLESCENT HEALTH',
        condition: {
            dependsOn: 'age_group',
            showIf: ['below_13', '13_15', '16_18']
        },
        options: [
            { label: 'Regular meals', value: 'regular' },
            { label: 'Sometimes skip meals', value: 'skip_sometimes', weight: 3 },
            { label: 'Frequently skip meals', value: 'skip_frequent', weight: 8 },
            { label: 'Restrictive eating', value: 'restrictive', weight: 12 }
        ]
    },

    // 7. RED-FLAG SAFETY CHECK
    {
        id: 'self_harm',
        question: "Thoughts of self-harm?",
        type: 'single_choice',
        icon: 'alert-outline',
        category: 'RED-FLAG SAFETY CHECK',
        options: [
            { label: 'No', value: 'no' },
            { label: 'Rare', value: 'rare', weight: 10 },
            { label: 'Sometimes', value: 'sometimes', weight: 25 },
            { label: 'Often', value: 'often', weight: 50 }
        ]
    },
    {
        id: 'period_stop_3m',
        question: "Periods stopped for 3 months?",
        type: 'single_choice',
        icon: 'stop-circle-outline',
        category: 'RED-FLAG SAFETY CHECK',
        options: [
            { label: 'No', value: 'no' },
            { label: 'Yes', value: 'yes', weight: 30 },
            { label: 'Not sure', value: 'not_sure', weight: 5 }
        ]
    },
    {
        id: 'severe_pelvic_pain',
        question: "Severe pelvic pain?",
        type: 'single_choice',
        icon: 'bandage-outline',
        category: 'RED-FLAG SAFETY CHECK',
        options: [
            { label: 'No', value: 'no' },
            { label: 'Mild', value: 'mild', weight: 5 },
            { label: 'Severe', value: 'severe', weight: 25 },
            { label: 'Ongoing', value: 'ongoing', weight: 20 }
        ]
    }
];
