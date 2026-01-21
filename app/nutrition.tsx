import { StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Recipe {
    id: string;
    title: string;
    time: string;
    calories: string;
    phase: 'Follicular' | 'Luteal' | 'Ovulatory' | 'Menstrual' | 'All';
    image: string;
    tags: string[];
}

export default function NutritionVault() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [selectedPhase, setSelectedPhase] = useState('All');
    const recipes: Recipe[] = [
        {
            id: '1',
            title: 'Avocado & Egg Power Bowl',
            time: '15 min',
            calories: '320 kcal',
            phase: 'Follicular',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
            tags: ['High Protein', 'Insulin Friendly']
        },
        {
            id: '2',
            title: 'Quinoa & Salmon Salad',
            time: '25 min',
            calories: '450 kcal',
            phase: 'Ovulatory',
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&auto=format&fit=crop',
            tags: ['Omega-3', 'Anti-inflammatory']
        },
        {
            id: '3',
            title: 'Warm Sweet Potato Stew',
            time: '40 min',
            calories: '380 kcal',
            phase: 'Luteal',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=400&auto=format&fit=crop',
            tags: ['Complex Carbs', 'Magnesium']
        },
        {
            id: '4',
            title: 'Dark Chocolate & Berry Bark',
            time: '10 min',
            calories: '150 kcal',
            phase: 'Menstrual',
            image: 'https://images.unsplash.com/photo-1548592305-b77da1680584?q=80&w=400&auto=format&fit=crop',
            tags: ['Mood Boost', 'Low GI']
        }
    ];

    const phases = ['All', 'Menstrual', 'Follicular', 'Ovulatory', 'Luteal'];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Nutritional Vault</Text>
                    <Text style={styles.subtitle}>Insulin-friendly meals synced to your cycle</Text>
                </View>

                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color="#999" />
                    <TextInput
                        placeholder="Search recipes (e.g. Smoothie, Salmon)"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.phaseScroll}>
                    {phases.map(phase => (
                        <TouchableOpacity
                            key={phase}
                            style={[
                                styles.phaseItem,
                                selectedPhase === phase && { backgroundColor: theme.tint, borderColor: theme.tint }
                            ]}
                            onPress={() => setSelectedPhase(phase)}
                        >
                            <Text style={[
                                styles.phaseText,
                                selectedPhase === phase && { color: '#FFFFFF' }
                            ]}>
                                {phase === 'All' ? 'All Phases' : phase}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.recipeGrid}>
                    {recipes.filter(r => selectedPhase === 'All' || r.phase === selectedPhase).map(recipe => (
                        <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
                            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.8)']}
                                style={styles.recipeGradient}
                            >
                                <View style={styles.recipeBadge}>
                                    <Text style={styles.recipeBadgeText}>{recipe.phase}</Text>
                                </View>
                                <View style={styles.recipeInfo}>
                                    <Text style={styles.recipeTitle}>{recipe.title}</Text>
                                    <Text style={styles.recipeSubtle}>{recipe.time} • {recipe.calories}</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Nutritional Insights */}
                <View style={styles.insightBox}>
                    <View style={[styles.insightIcon, { backgroundColor: `${theme.tint}15` }]}>
                        <Ionicons name="bulb" size={24} color={theme.tint} />
                    </View>
                    <View style={styles.insightContent}>
                        <Text style={styles.insightTitle}>Pro-Tip: Seed Cycling</Text>
                        <Text style={styles.insightDesc}>
                            Integrating pumpkin and flax seeds during your follicular phase can help balance estrogen levels naturally.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        padding: 24,
        paddingTop: 60,
    },
    header: {
        marginBottom: 24,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 28,
        fontFamily: 'Outfit_700Bold',
        color: '#1A1A1A',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: '#666666',
        marginTop: 4,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        height: 52,
        borderRadius: 16,
        marginBottom: 24,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#1A1A1A',
    },
    phaseScroll: {
        marginBottom: 24,
        maxHeight: 40,
    },
    phaseItem: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginRight: 10,
        backgroundColor: '#FFFFFF',
    },
    phaseText: {
        fontSize: 13,
        fontFamily: 'Inter_600SemiBold',
        color: '#666',
    },
    recipeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    recipeCard: {
        width: (width - 64) / 2,
        height: 240,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: '#F0F0F0',
    },
    recipeImage: {
        width: '100%',
        height: '100%',
    },
    recipeGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '60%',
        justifyContent: 'flex-end',
        padding: 16,
    },
    recipeBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    recipeBadgeText: {
        fontSize: 10,
        fontFamily: 'Inter_700Bold',
        color: '#333',
    },
    recipeInfo: {
        backgroundColor: 'transparent',
    },
    recipeTitle: {
        fontSize: 15,
        fontFamily: 'Outfit_600SemiBold',
        color: '#FFFFFF',
    },
    recipeSubtle: {
        fontSize: 11,
        fontFamily: 'Inter_400Regular',
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    insightBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        padding: 20,
        borderRadius: 24,
        marginTop: 16,
        marginBottom: 40,
    },
    insightIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    insightContent: {
        flex: 1,
        marginLeft: 16,
        backgroundColor: 'transparent',
    },
    insightTitle: {
        fontSize: 16,
        fontFamily: 'Outfit_600SemiBold',
        color: '#1A1A1A',
    },
    insightDesc: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: '#666',
        marginTop: 4,
        lineHeight: 18,
    },
});
