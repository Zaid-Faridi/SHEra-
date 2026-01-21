import { StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function LogScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [painLevel, setPainLevel] = useState(0);
    const [flowType, setFlowType] = useState<string | null>(null);
    const [notes, setNotes] = useState('');

    const symptoms = [
        { id: 'acne', label: 'Acne', icon: 'sparkles' },
        { id: 'bloating', label: 'Bloating', icon: 'water' },
        { id: 'hirsutism', label: 'Excessive Hair', icon: 'cut' },
        { id: 'mood', label: 'Mood Swings', icon: 'sad' },
        { id: 'pelvic_pain', label: 'Pelvic Pain', icon: 'bandage' },
        { id: 'cramps', label: 'Cramps', icon: 'flash' },
        { id: 'energy', label: 'Low Energy', icon: 'battery-dead' },
    ];

    const flows = [
        { id: 'spotting', label: 'Spotting' },
        { id: 'light', label: 'Light' },
        { id: 'medium', label: 'Medium' },
        { id: 'heavy', label: 'Heavy' },
    ];

    const toggleSymptom = (id: string) => {
        if (selectedSymptoms.includes(id)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
        } else {
            setSelectedSymptoms([...selectedSymptoms, id]);
        }
    };

    const handleSave = () => {
        // In a real app, save to DB here
        router.back();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Symptoms Section */}
                <Text style={styles.sectionTitle}>How's your skin & body today?</Text>
                <View style={styles.symptomGrid}>
                    {symptoms.map(s => {
                        const isSelected = selectedSymptoms.includes(s.id);
                        return (
                            <TouchableOpacity
                                key={s.id}
                                style={[
                                    styles.symptomCard,
                                    isSelected && { borderColor: theme.tint, backgroundColor: `${theme.tint}10` }
                                ]}
                                onPress={() => toggleSymptom(s.id)}
                            >
                                <Ionicons
                                    name={s.icon as any}
                                    size={24}
                                    color={isSelected ? theme.tint : '#ccc'}
                                />
                                <Text style={[styles.symptomLabel, isSelected && { color: theme.tint }]}>
                                    {s.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Pelvic Pain Slider replacement (Buttons for simplicity) */}
                <Text style={styles.sectionTitle}>Pelvic Pain Level</Text>
                <View style={styles.painRow}>
                    {[0, 2, 4, 6, 8, 10].map(level => (
                        <TouchableOpacity
                            key={level}
                            style={[
                                styles.painCircle,
                                painLevel === level && { backgroundColor: theme.tint, borderColor: theme.tint }
                            ]}
                            onPress={() => setPainLevel(level)}
                        >
                            <Text style={[styles.painText, painLevel === level && { color: '#FFFFFF' }]}>
                                {level}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Period Flow Section */}
                <Text style={styles.sectionTitle}>Period Flow</Text>
                <View style={styles.flowRow}>
                    {flows.map(f => (
                        <TouchableOpacity
                            key={f.id}
                            style={[
                                styles.flowButton,
                                flowType === f.id && { backgroundColor: theme.tint, borderColor: theme.tint }
                            ]}
                            onPress={() => setFlowType(f.id)}
                        >
                            <Text style={[styles.flowText, flowType === f.id && { color: '#FFFFFF' }]}>
                                {f.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Notes Section */}
                <Text style={styles.sectionTitle}>Notes</Text>
                <TextInput
                    style={styles.notesInput}
                    placeholder="Anything else you'd like to track?"
                    multiline
                    numberOfLines={4}
                    value={notes}
                    onChangeText={setNotes}
                />

                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: theme.tint }]}
                    onPress={handleSave}
                >
                    <Text style={styles.saveText}>Save Log</Text>
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
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Outfit_600SemiBold',
        color: '#333333',
        marginBottom: 16,
        marginTop: 24,
    },
    symptomGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    symptomCard: {
        width: (width - 64) / 3,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
    },
    symptomLabel: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
        color: '#999999',
        marginTop: 8,
        textAlign: 'center',
    },
    painRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    painCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    painText: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: '#333333',
    },
    flowRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
    },
    flowButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
    },
    flowText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: '#333333',
    },
    notesInput: {
        backgroundColor: '#F9F9F9',
        borderRadius: 16,
        padding: 16,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlignVertical: 'top',
        height: 100,
    },
    saveButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    saveText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Outfit_600SemiBold',
    },
});
