import { StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [loading, setLoading] = useState(true);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const user = await AsyncStorage.getItem('user_session');
            const onboardingDone = await AsyncStorage.getItem('onboarding_complete');

            if (user) {
                if (onboardingDone === 'true') {
                    router.replace('/(tabs)');
                } else {
                    router.replace('/(onboarding)');
                }
            }
            setLoading(false);
        };
        checkSession();
    }, []);

    const passwordReqs = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
    };

    const isFormValid = isLogin
        ? email.includes('@') && password.length >= 8
        : nickname.length > 0 && email.includes('@') && Object.values(passwordReqs).every(Boolean);

    const handleAuth = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const userData = { id: 'user_123', email, nickname: nickname || 'Member' };
        await AsyncStorage.setItem('user_session', JSON.stringify(userData));

        if (isLogin) {
            const onboardingDone = await AsyncStorage.getItem('onboarding_complete');
            if (onboardingDone === 'true') {
                router.replace('/(tabs)');
            } else {
                router.replace('/(onboarding)');
            }
        } else {
            router.replace('/(onboarding)');
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.tint} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={theme.headerGradient as [string, string]}
                style={styles.background}
            />

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.card}>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoCircle}>
                                    <Ionicons name="leaf-outline" size={32} color={theme.tint} />
                                </View>
                                <Text style={styles.logoText}>SHEra</Text>
                                <Text style={styles.logoSubtext}>
                                    {isLogin ? 'Welcome back, Sister' : 'A private space for your cycle and hormones'}
                                </Text>
                            </View>

                            <View style={styles.form}>
                                {!isLogin && (
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Nickname</Text>
                                        <View style={[styles.inputContainer, { borderColor: theme.border }]}>
                                            <Ionicons name="person-outline" size={20} color="#ccc" style={styles.inputIcon} />
                                            <TextInput
                                                placeholder="Your nickname"
                                                placeholderTextColor="#ccc"
                                                style={styles.input}
                                                value={nickname}
                                                onChangeText={setNickname}
                                            />
                                        </View>
                                    </View>
                                )}

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <View style={[styles.inputContainer, { borderColor: theme.border }]}>
                                        <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.inputIcon} />
                                        <TextInput
                                            placeholder="your@email.com"
                                            placeholderTextColor="#ccc"
                                            style={styles.input}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputGroup}>
                                    <View style={styles.passwordHeader}>
                                        <Text style={styles.label}>Password</Text>
                                        {isLogin && (
                                            <TouchableOpacity>
                                                <Text style={[styles.forgotText, { color: theme.tint }]}>Forgot password?</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <View style={[styles.inputContainer, { borderColor: theme.border }]}>
                                        <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.inputIcon} />
                                        <TextInput
                                            placeholder="Enter your password"
                                            placeholderTextColor="#ccc"
                                            style={styles.input}
                                            secureTextEntry
                                            value={password}
                                            onChangeText={setPassword}
                                        />
                                    </View>
                                </View>

                                {!isLogin && (
                                    <View style={styles.requirements}>
                                        <ReqItem met={passwordReqs.length} text="At least 8 characters" />
                                        <ReqItem met={passwordReqs.uppercase} text="One uppercase letter" />
                                        <ReqItem met={passwordReqs.number} text="One number" />
                                    </View>
                                )}

                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        { backgroundColor: isFormValid ? theme.tint : '#E0E0E0' }
                                    ]}
                                    disabled={!isFormValid}
                                    onPress={handleAuth}
                                >
                                    <Text style={styles.buttonText}>
                                        {isLogin ? 'Login to Dashboard' : 'Continue to Wellness'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.toggleBtn}
                                    onPress={() => setIsLogin(!isLogin)}
                                >
                                    <Text style={styles.toggleText}>
                                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                                    </Text>
                                </TouchableOpacity>

                                <View style={styles.dividerRow}>
                                    <View style={styles.divider} />
                                    <Text style={styles.dividerText}>OR</Text>
                                    <View style={styles.divider} />
                                </View>

                                <TouchableOpacity style={styles.socialBtn}>
                                    <Ionicons name="logo-google" size={20} color="#EA4335" />
                                    <Text style={styles.socialBtnText}>Continue with Google</Text>
                                </TouchableOpacity>

                                <Text style={styles.footerText}>
                                    Your identity stays anonymous and secure
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

function ReqItem({ met, text }: { met: boolean, text: string }) {
    return (
        <View style={styles.reqItem}>
            <Ionicons
                name={met ? "checkmark-circle" : "ellipse-outline"}
                size={14}
                color={met ? "#4CAF50" : "#ccc"}
            />
            <Text style={[styles.reqText, { color: met ? "#4CAF50" : "#999" }]}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: 'transparent',
    },
    logoCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#F8B0B0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoText: {
        fontSize: 24,
        fontFamily: 'Outfit_700Bold',
        marginBottom: 4,
    },
    logoSubtext: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#666',
        textAlign: 'center',
    },
    form: {
        backgroundColor: 'transparent',
    },
    inputGroup: {
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 8,
        color: '#333',
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    forgotText: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        height: 52,
        paddingHorizontal: 16,
        backgroundColor: '#F9F9F9',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#333',
    },
    requirements: {
        marginBottom: 24,
        backgroundColor: 'transparent',
    },
    reqItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: 'transparent',
    },
    reqText: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        marginLeft: 6,
    },
    button: {
        height: 56,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#F8B0B0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Outfit_600SemiBold',
    },
    socialBtn: {
        flexDirection: 'row',
        height: 56,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    socialBtnText: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: '#333',
        marginLeft: 12,
    },
    toggleBtn: {
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: 'transparent',
    },
    toggleText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: '#666',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#EEEEEE',
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
        color: '#999',
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: '#999',
    },
});
