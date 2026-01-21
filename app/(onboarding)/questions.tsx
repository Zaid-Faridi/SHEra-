import { useState, useMemo, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { ONBOARDING_QUESTIONS, OnboardingQuestion } from '@/constants/Onboarding';
import { calculateRiskScore } from '@/utils/RiskCalculator';

const { width } = Dimensions.get('window');

export default function OnboardingQuestions() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [selectedTemp, setSelectedTemp] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Load persisted progress & Check completion
    useEffect(() => {
        const checkStatusAndLoad = async () => {
            try {
                const complete = await AsyncStorage.getItem('onboarding_complete');
                if (complete === 'true') {
                    router.replace('/(onboarding)/summary');
                    return;
                }

                const saved = await AsyncStorage.getItem('onboarding_progress');
                if (saved) {
                    const { answers: storedAnswers, index } = JSON.parse(saved);
                    setAnswers(storedAnswers);
                    setCurrentIndex(index);
                }
            } catch (e) {
                console.error('Failed to load progress', e);
            } finally {
                setLoading(false);
            }
        };
        checkStatusAndLoad();
    }, []);

    // Save progress
    useEffect(() => {
        if (!loading) {
            AsyncStorage.setItem('onboarding_progress', JSON.stringify({ answers, index: currentIndex }));
        }
    }, [answers, currentIndex, loading]);

    // Filter questions based on conditions
    const visibleQuestions = useMemo(() => {
        return ONBOARDING_QUESTIONS.filter(q => {
            if (!q.condition) return true;
            const dependentAnswer = answers[q.condition.dependsOn];
            if (!dependentAnswer) return false;
            if (Array.isArray(q.condition.showIf)) {
                return q.condition.showIf.includes(dependentAnswer);
            }
            return dependentAnswer === q.condition.showIf;
        });
    }, [answers]);

    const currentQuestion = visibleQuestions[currentIndex];
    const progress = (currentIndex + 1) / visibleQuestions.length;

    const handleSelect = (value: any) => {
        setSelectedTemp(value);

        // Immediate store to "database" behavior
        const updatedAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(updatedAnswers);
        AsyncStorage.setItem('onboarding_progress', JSON.stringify({ answers: updatedAnswers, index: currentIndex + 1 }));

        setTimeout(async () => {
            setSelectedTemp(null);

            if (currentIndex < visibleQuestions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                const result = calculateRiskScore(updatedAnswers);
                await AsyncStorage.setItem('risk_result', JSON.stringify(result));
                await AsyncStorage.setItem('onboarding_complete', 'true');
                router.replace('/(onboarding)/summary');
            }
        }, 300); // Quick transition
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            router.back();
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.tint} />
            </View>
        );
    }

    if (!currentQuestion) return null;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={theme.headerGradient as [string, string]}
                style={styles.headerArea}
            >
                <SafeAreaView style={styles.headerContent}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <View style={styles.iconSection}>
                        <View style={styles.iconCircle}>
                            <Ionicons name={currentQuestion.icon as any} size={40} color="#FFFFFF" />
                        </View>
                        <View style={styles.progressWrapper}>
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                            </View>
                            <Text style={styles.progressText}>{currentIndex + 1} / {visibleQuestions.length}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <View style={styles.questionCard}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.categoryBadge}>
                        <Text style={[styles.categoryText, { color: theme.tint }]}>{currentQuestion.category}</Text>
                    </View>
                    <Text style={styles.questionText}>{currentQuestion.question}</Text>

                    <View style={styles.optionsContainer}>
                        {currentQuestion.options?.map((option) => {
                            const isSelected = selectedTemp === option.value;
                            return (
                                <TouchableOpacity
                                    key={String(option.value)}
                                    style={[
                                        styles.optionButton,
                                        isSelected && { backgroundColor: theme.tint, borderColor: theme.tint }
                                    ]}
                                    onPress={() => handleSelect(option.value)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        isSelected && { color: '#FFFFFF', fontFamily: 'Inter_600SemiBold' }
                                    ]}>
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerArea: {
        height: '40%',
        justifyContent: 'center',
    },
    headerContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    backButton: {
        marginTop: 10,
        width: 40,
        height: 40,
    },
    iconSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    progressWrapper: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    progressBarBg: {
        width: width * 0.6,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    progressText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        opacity: 0.8,
    },
    questionCard: {
        flex: 1,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#FFFFFF',
        paddingTop: 40,
        paddingHorizontal: 24,
    },
    categoryBadge: {
        alignSelf: 'center',
        backgroundColor: '#FFF5F5',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 16,
    },
    categoryText: {
        fontSize: 10,
        fontFamily: 'Inter_700Bold',
        letterSpacing: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    questionText: {
        fontSize: 20,
        fontFamily: 'Outfit_600SemiBold',
        textAlign: 'center',
        color: '#333333',
        marginBottom: 40,
        lineHeight: 28,
    },
    optionsContainer: {
        backgroundColor: 'transparent',
    },
    optionButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#F0F0F0',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    optionText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        color: '#333333',
    },
});
