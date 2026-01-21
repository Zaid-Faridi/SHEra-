import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, BackHandler, Dimensions, Image } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { RiskResult } from '@/utils/RiskCalculator';

const { width } = Dimensions.get('window');

export default function OnboardingSummary() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<RiskResult | null>(null);

    // Prevent going back to questionnaire
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        const loadResult = async () => {
            try {
                const saved = await AsyncStorage.getItem('risk_result');
                if (saved) {
                    setResult(JSON.parse(saved));
                }
            } catch (e) {
                console.error('Failed to load risk result', e);
            } finally {
                setLoading(false);
            }
        };
        loadResult();
    }, []);

    const handleFinish = async () => {
        await AsyncStorage.setItem('onboarding_complete', 'true');
        router.replace('/(tabs)');
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                <ActivityIndicator size="large" color={theme.tint} />
            </View>
        );
    }

    const { score = 0, level = 'Low', recommendation = '', indicators = [] } = result || {};
    const riskColor = level === 'High' ? '#FF4D4D' : level === 'Medium' ? '#FFA500' : '#48BB78';
    const riskBg = level === 'High' ? '#FFEDED' : level === 'Medium' ? '#FFF9F0' : '#F0FFF4';

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <SafeAreaView style={styles.header}>
                    <View style={styles.headerIconContainer}>
                        <Ionicons name="sparkles" size={32} color={theme.tint} />
                    </View>
                    <Text style={styles.headerTitle}>Your Health Profile</Text>
                    <Text style={styles.headerSubtitle}>Based on your responses</Text>
                </SafeAreaView>

                {/* Risk Assessment Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.cardIcon, { backgroundColor: riskBg }]}>
                            <Ionicons name={level === 'Low' ? "checkmark-circle" : "alert-circle"} size={28} color={riskColor} />
                        </View>
                        <View style={styles.cardHeaderInfo}>
                            <Text style={styles.cardTitle}>PCOS Risk Assessment</Text>
                            <Text style={[styles.cardSubtitle, { color: '#666' }]}>{level} Likelihood</Text>
                        </View>
                    </View>

                    <View style={styles.scoreRow}>
                        <Text style={styles.scoreLabel}>Risk Score</Text>
                        <Text style={styles.scoreText}>{score}/100</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${score}%`, backgroundColor: riskColor }]} />
                    </View>

                    {indicators.length > 0 && (
                        <View style={styles.indicatorsList}>
                            <Text style={styles.listTitle}>Key indicators identified:</Text>
                            {indicators.map((ind, i) => (
                                <View key={i} style={styles.indicatorItem}>
                                    <View style={styles.bullet} />
                                    <Text style={styles.indicatorText}>{ind}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryText}>{recommendation}</Text>
                    </View>
                </View>

                {/* Recommendations Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
                    <View style={styles.recCard}>
                        <View style={styles.recIcon}>
                            <Ionicons name="moon" size={24} color={theme.tint} />
                        </View>
                        <View style={styles.recContent}>
                            <Text style={styles.recTitle}>Improve Sleep Quality</Text>
                            <Text style={styles.recDesc}>Aim for 7-8 hours of quality sleep. Sleep deprivation can worsen PCOS symptoms.</Text>
                        </View>
                    </View>
                </View>

                {/* What's Next Card */}
                <LinearGradient
                    colors={[theme.tint, theme.secondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.nextCard}
                >
                    <Text style={styles.nextTitle}>What's Next?</Text>
                    {[
                        'Track your daily symptoms in the Home tab',
                        'Try PCOS-friendly yoga sessions in the Yoga tab',
                        'Connect with our supportive community',
                        'Find specialists in the Doctors tab'
                    ].map((item, i) => (
                        <View key={i} style={styles.nextItem}>
                            <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
                            <Text style={styles.nextItemText}>{item}</Text>
                        </View>
                    ))}
                </LinearGradient>

                <TouchableOpacity
                    style={[styles.startBtn, { backgroundColor: theme.tint }]}
                    onPress={handleFinish}
                >
                    <Text style={styles.startBtnText}>Start Your Journey</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFF" marginLeft={8} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF9FA',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 60,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
        backgroundColor: 'transparent',
    },
    headerIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFF1F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Outfit_600SemiBold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#999',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        width: '100%',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: 'transparent',
    },
    cardIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeaderInfo: {
        marginLeft: 16,
        backgroundColor: 'transparent',
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: 'Outfit_600SemiBold',
        color: '#1A1A1A',
    },
    cardSubtitle: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: 'transparent',
    },
    scoreLabel: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
        color: '#999',
    },
    scoreText: {
        fontSize: 12,
        fontFamily: 'Inter_700Bold',
        color: '#333',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 24,
    },
    progressBarFill: {
        height: '100%',
    },
    indicatorsList: {
        backgroundColor: 'transparent',
        marginBottom: 24,
    },
    listTitle: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    indicatorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: 'transparent',
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#F8B0B0',
        marginRight: 12,
    },
    indicatorText: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#666',
    },
    summaryBox: {
        backgroundColor: '#FFF1F5',
        padding: 16,
        borderRadius: 16,
    },
    summaryText: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: '#333',
        lineHeight: 18,
    },
    section: {
        width: '100%',
        marginBottom: 24,
        backgroundColor: 'transparent',
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: 'Outfit_600SemiBold',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    recCard: {
        flexDirection: 'row',
        backgroundColor: '#F9F9F9',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    recIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    recContent: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    recTitle: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        color: '#1A1A1A',
    },
    recDesc: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: '#666',
        marginTop: 4,
        lineHeight: 16,
    },
    nextCard: {
        width: '100%',
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
    },
    nextTitle: {
        fontSize: 18,
        fontFamily: 'Outfit_600SemiBold',
        color: '#FFF',
        marginBottom: 16,
    },
    nextItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    nextItemText: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#FFF',
        marginLeft: 12,
    },
    startBtn: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F8B0B0',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    startBtnText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Outfit_600SemiBold',
    },
});
