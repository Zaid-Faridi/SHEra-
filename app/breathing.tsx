import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const { width } = Dimensions.get('window');

const BREATH_STEPS = [
    { label: 'Inhale', duration: 4000, color: '#FF9A9E' },
    { label: 'Hold', duration: 4000, color: '#A18CD1' },
    { label: 'Exhale', duration: 6000, color: '#F8B0B0' },
];

export default function BreathingScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [currentStep, setCurrentStep] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive) {
            const step = BREATH_STEPS[currentStep];

            // Animations
            if (currentStep === 0) { // Inhale
                Animated.parallel([
                    Animated.timing(scaleAnim, { toValue: 1.5, duration: step.duration, easing: Easing.linear, useNativeDriver: true }),
                    Animated.timing(opacityAnim, { toValue: 1, duration: step.duration, easing: Easing.linear, useNativeDriver: true }),
                ]).start();
            } else if (currentStep === 2) { // Exhale
                Animated.parallel([
                    Animated.timing(scaleAnim, { toValue: 1, duration: step.duration, easing: Easing.linear, useNativeDriver: true }),
                    Animated.timing(opacityAnim, { toValue: 0.3, duration: step.duration, easing: Easing.linear, useNativeDriver: true }),
                ]).start();
            }

            timer = setTimeout(() => {
                setCurrentStep((prev) => (prev + 1) % BREATH_STEPS.length);
            }, step.duration);
        } else {
            scaleAnim.setValue(1);
            opacityAnim.setValue(0.3);
        }
        return () => clearTimeout(timer);
    }, [currentStep, isActive]);

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#FFF5F5', '#FFFFFF']} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                            <Ionicons name="close" size={28} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Breathing Exercise</Text>
                        <TouchableOpacity style={styles.volumeBtn}>
                            <Ionicons name="volume-medium-outline" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.visualizerContainer}>
                            <Animated.View
                                style={[
                                    styles.circle,
                                    {
                                        transform: [{ scale: scaleAnim }],
                                        opacity: opacityAnim,
                                        backgroundColor: BREATH_STEPS[currentStep].color
                                    }
                                ]}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.stepLabel}>{isActive ? BREATH_STEPS[currentStep].label : 'Ready?'}</Text>
                                {isActive && (
                                    <View style={styles.dotContainer}>
                                        {BREATH_STEPS.map((_, i) => (
                                            <View key={i} style={[styles.dot, currentStep === i && styles.activeDot]} />
                                        ))}
                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={styles.instructionCard}>
                            <Text style={styles.instructionTitle}>4-4-6 Breathing Technique</Text>
                            <View style={styles.instructionList}>
                                <View style={styles.instructionItem}>
                                    <View style={[styles.stepNum, { backgroundColor: '#FF9A9E' }]}><Text style={styles.stepNumText}>1</Text></View>
                                    <Text style={styles.stepText}>Inhale slowly for 4 seconds</Text>
                                </View>
                                <View style={styles.instructionItem}>
                                    <View style={[styles.stepNum, { backgroundColor: '#A18CD1' }]}><Text style={styles.stepNumText}>2</Text></View>
                                    <Text style={styles.stepText}>Hold your breath for 4 seconds</Text>
                                </View>
                                <View style={styles.instructionItem}>
                                    <View style={[styles.stepNum, { backgroundColor: '#F8B0B0' }]}><Text style={styles.stepNumText}>3</Text></View>
                                    <Text style={styles.stepText}>Exhale gently for 6 seconds</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.startBtn, { backgroundColor: isActive ? '#F5F5F5' : theme.tint }]}
                            onPress={() => {
                                setIsActive(!isActive);
                                if (!isActive) setCurrentStep(0);
                            }}
                        >
                            <Text style={[styles.startBtnText, { color: isActive ? '#666' : '#FFF' }]}>
                                {isActive ? 'Pause' : 'Start Session'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1 },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 60,
    },
    closeBtn: { padding: 4 },
    headerTitle: { fontSize: 18, fontFamily: 'Outfit_600SemiBold', color: '#333' },
    volumeBtn: { padding: 4 },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    visualizerContainer: {
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        position: 'absolute',
    },
    textContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    stepLabel: {
        fontSize: 32,
        fontFamily: 'Outfit_700Bold',
        color: '#333',
        marginBottom: 12,
    },
    dotContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#333',
    },
    instructionCard: {
        width: width - 40,
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    instructionTitle: {
        fontSize: 16,
        fontFamily: 'Outfit_600SemiBold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 20,
    },
    instructionList: { backgroundColor: 'transparent' },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    stepNum: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    stepNumText: { color: '#FFF', fontSize: 12, fontFamily: 'Inter_700Bold' },
    stepText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#666' },
    startBtn: {
        width: width - 40,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startBtnText: { fontSize: 18, fontFamily: 'Outfit_600SemiBold' },
});
