import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    distance: string;
    image: string;
    availability: string;
}

export default function DoctorDiscovery() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [searchQuery, setSearchQuery] = useState('');

    const doctors: Doctor[] = [
        {
            id: '1',
            name: 'Dr. Emily Chen',
            specialty: 'Endocrinologist',
            rating: 4.9,
            reviews: 124,
            distance: '2.4 km',
            image: 'https://images.unsplash.com/photo-1559839734-2b71f15367ef?q=80&w=200&auto=format&fit=crop',
            availability: 'Tomorrow, 10:00 AM'
        },
        {
            id: '2',
            name: 'Dr. Michael Roberts',
            specialty: 'Gynecologist',
            rating: 4.8,
            reviews: 89,
            distance: '3.1 km',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop',
            availability: 'Today, 4:30 PM'
        },
        {
            id: '3',
            name: 'Dr. Sarah Williams',
            specialty: 'PCOS Specialist',
            rating: 5.0,
            reviews: 210,
            distance: '5.2 km',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&auto=format&fit=crop',
            availability: 'Wed, Jan 21'
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Find Specialists</Text>
                <Text style={styles.subtitle}>Book top PCOS & hormonal health experts</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color="#999" />
                    <TextInput
                        placeholder="Search doctors, clinics..."
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name="options-outline" size={20} color={theme.tint} />
                </TouchableOpacity>
            </View>

            {/* Map Placeholder */}
            <View style={styles.mapPlaceholder}>
                <LinearGradient
                    colors={['#E0EAFC', '#CFDEF3']}
                    style={styles.mapGradient}
                >
                    <Ionicons name="map" size={32} color="#4A90E2" />
                    <Text style={styles.mapText}>View Experts Nearby</Text>
                    <TouchableOpacity style={styles.mapBtn}>
                        <Text style={styles.mapBtnText}>Open Map</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <TouchableOpacity>
                    <Text style={[styles.seeAll, { color: theme.tint }]}>See all</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.doctorScroll}>
                {doctors.map(doc => (
                    <TouchableOpacity key={doc.id} style={styles.docCard}>
                        <Image source={{ uri: doc.image }} style={styles.docImage} />
                        <View style={styles.docInfo}>
                            <View style={styles.docHeader}>
                                <Text style={styles.docName}>{doc.name}</Text>
                                <View style={styles.ratingRow}>
                                    <Ionicons name="star" size={14} color="#FFD700" />
                                    <Text style={styles.ratingText}>{doc.rating}</Text>
                                </View>
                            </View>
                            <Text style={styles.docSpec}>{doc.specialty} • {doc.distance}</Text>

                            <View style={styles.availRow}>
                                <Ionicons name="calendar-outline" size={14} color="#666" />
                                <Text style={styles.availText}>Next: {doc.availability}</Text>
                            </View>

                            <View style={styles.cardActions}>
                                <TouchableOpacity style={[styles.bookBtn, { backgroundColor: theme.tint }]}>
                                    <Text style={styles.bookBtnText}>Book Appointment</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.chatBtn}>
                                    <Ionicons name="chatbubble-ellipses-outline" size={18} color={theme.tint} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 60,
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
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 24,
        backgroundColor: 'transparent',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        height: 52,
        borderRadius: 16,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#1A1A1A',
    },
    filterBtn: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPlaceholder: {
        marginHorizontal: 24,
        height: 120,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 32,
    },
    mapGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        fontSize: 14,
        fontFamily: 'Outfit_600SemiBold',
        color: '#4A90E2',
        marginTop: 8,
    },
    mapBtn: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 12,
        marginTop: 10,
    },
    mapBtnText: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
        color: '#4A90E2',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Outfit_600SemiBold',
        color: '#1A1A1A',
    },
    seeAll: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    doctorScroll: {
        paddingHorizontal: 24,
    },
    docCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    docImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    docInfo: {
        flex: 1,
        marginLeft: 16,
        backgroundColor: 'transparent',
    },
    docHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    docName: {
        fontSize: 16,
        fontFamily: 'Outfit_700Bold',
        color: '#1A1A1A',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    ratingText: {
        fontSize: 12,
        fontFamily: 'Inter_700Bold',
        color: '#B7791F',
        marginLeft: 4,
    },
    docSpec: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: '#666',
        marginTop: 4,
    },
    availRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: 'transparent',
    },
    availText: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
        color: '#666',
        marginLeft: 6,
    },
    cardActions: {
        flexDirection: 'row',
        marginTop: 12,
        backgroundColor: 'transparent',
    },
    bookBtn: {
        flex: 1,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookBtnText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Outfit_600SemiBold',
    },
    chatBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
});
