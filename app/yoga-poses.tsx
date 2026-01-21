import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const { width } = Dimensions.get('window');

const YOGA_POSES = [
    {
        id: '1',
        name: 'Butterfly Pose',
        sanskrit: 'Baddha Konasana',
        benefits: 'Stimulates ovaries, improves blood circulation in pelvic region',
        duration: '3 min 0 sec',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'Cobra Pose',
        sanskrit: 'Bhujangasana',
        benefits: 'Strengthens back muscles, improves posture, relieves stress',
        duration: '2 min 30 sec',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'Child’s Pose',
        sanskrit: 'Balasana',
        benefits: 'Calms the mind, relieves tension in neck and shoulders',
        duration: '4 min 0 sec',
        image: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?q=80&w=500&auto=format&fit=crop',
    },
];

export default function YogaPosesScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>PCOD Yoga Poses</Text>
                        <Text style={styles.headerSubtitle}>Choose a pose to begin</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {YOGA_POSES.map((pose) => (
                        <TouchableOpacity key={pose.id} style={styles.poseCard} activeOpacity={0.9}>
                            <Image source={{ uri: pose.image }} style={styles.poseImage} />
                            <View style={styles.poseInfo}>
                                <Text style={styles.poseName}>{pose.name}</Text>
                                <Text style={styles.poseSanskrit}>{pose.sanskrit}</Text>
                                <Text style={styles.poseBenefits}>{pose.benefits}</Text>
                                <View style={styles.poseMeta}>
                                    <Ionicons name="time-outline" size={14} color={theme.tint} />
                                    <Text style={[styles.poseTime, { color: theme.tint }]}>{pose.duration}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF5F5' },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'transparent',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerText: { backgroundColor: 'transparent' },
    headerTitle: { fontSize: 20, fontFamily: 'Outfit_700Bold', color: '#1A1A1A' },
    headerSubtitle: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#666' },
    scrollContent: { padding: 20 },
    poseCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        marginBottom: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    poseImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    poseInfo: {
        padding: 20,
        backgroundColor: 'transparent',
    },
    poseName: { fontSize: 18, fontFamily: 'Outfit_600SemiBold', color: '#1A1A1A' },
    poseSanskrit: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#FF9A9E', fontStyle: 'italic', marginBottom: 8 },
    poseBenefits: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 20, marginBottom: 12 },
    poseMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    poseTime: { fontSize: 12, fontFamily: 'Inter_600SemiBold', marginLeft: 4, color: '#FF9A9E' },
});
