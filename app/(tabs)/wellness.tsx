import { StyleSheet, ScrollView, TouchableOpacity, View as RNView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function WellnessScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <View style={styles.container}>
            <LinearGradient colors={[theme.tint, theme.tint]} style={styles.topBanner}>
                <SafeAreaView edges={['top']}>
                    <Text style={styles.bannerTitle}>Yoga & Wellness</Text>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* PCOD Yoga Poses Card */}
                <TouchableOpacity
                    style={styles.mainCard}
                    onPress={() => router.push('/yoga-poses')}
                >
                    <View style={[styles.iconBox, { backgroundColor: '#FFF5F5' }]}>
                        <Ionicons name="pulse" size={24} color="#FF9A9E" />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>PCOD Yoga Poses</Text>
                        <Text style={styles.cardSubtitle}>Specialized poses for hormonal balance</Text>
                    </View>
                </TouchableOpacity>

                {/* Breathing Exercise Card */}
                <TouchableOpacity
                    style={styles.mainCard}
                    onPress={() => router.push('/breathing')}
                >
                    <View style={[styles.iconBox, { backgroundColor: '#F5F5FC' }]}>
                        <Ionicons name="cloud-outline" size={24} color="#A18CD1" />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Breathing Exercise</Text>
                        <Text style={styles.cardSubtitle}>Guided pranayama for stress relief</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.sectionHeading}>Online Yoga Classes</Text>

                {/* Live Group Sessions */}
                <TouchableOpacity style={styles.mainCard}>
                    <View style={[styles.iconBox, { backgroundColor: '#FFF5F5' }]}>
                        <Ionicons name="people" size={24} color="#FF9A9E" />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Live Group Sessions</Text>
                        <Text style={styles.cardSubtitle}>Join live classes with certified yoga instructors</Text>
                        <View style={styles.metaRow}>
                            <Ionicons name="calendar-outline" size={14} color="#999" />
                            <Text style={styles.metaText}>Daily at 7 AM & 6 PM</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* On-Demand Library */}
                <TouchableOpacity style={styles.mainCard}>
                    <View style={[styles.iconBox, { backgroundColor: '#FADEDF' }]}>
                        <Ionicons name="videocam" size={24} color="#FF9A9E" />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>On-Demand Library</Text>
                        <Text style={styles.cardSubtitle}>Access 100+ pre-recorded yoga sessions</Text>
                        <View style={styles.metaRow}>
                            <Ionicons name="videocam-outline" size={14} color="#999" />
                            <Text style={styles.metaText}>Available 24/7</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topBanner: {
        height: 120,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    bannerTitle: {
        fontSize: 22,
        fontFamily: 'Outfit_700Bold',
        color: '#FFFFFF',
        marginTop: 10,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    mainCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F8F8F8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardInfo: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: 'Outfit_600SemiBold',
        color: '#1A1A1A',
    },
    cardSubtitle: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: '#999999',
        marginTop: 2,
    },
    sectionHeading: {
        fontSize: 15,
        fontFamily: 'Outfit_600SemiBold',
        color: '#1A1A1A',
        marginTop: 12,
        marginBottom: 16,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: 'transparent',
    },
    metaText: {
        fontSize: 11,
        fontFamily: 'Inter_500Medium',
        color: '#999999',
        marginLeft: 6,
    },
});
