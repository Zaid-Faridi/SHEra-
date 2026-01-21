import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function OnboardingWelcome() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome to Shera</Text>
                    <Text style={styles.subtitle}>
                        Your personalized companion for managing PCOS and menstrual health with confidence.
                    </Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: Colors[colorScheme].tint }]}
                        onPress={() => router.push('/(onboarding)/questions')}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                    <Text style={styles.loginText}>
                        Already have an account? <Text style={[styles.loginLink, { color: Colors[colorScheme].tint }]}>Login</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    textContainer: {
        marginTop: 100,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Outfit_700Bold',
        lineHeight: 40,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        lineHeight: 26,
        opacity: 0.7,
    },
    footer: {
        marginBottom: 24,
        backgroundColor: 'transparent',
    },
    button: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Outfit_600SemiBold',
    },
    loginText: {
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        opacity: 0.7,
    },
    loginLink: {
        fontFamily: 'Inter_600SemiBold',
    },
});
