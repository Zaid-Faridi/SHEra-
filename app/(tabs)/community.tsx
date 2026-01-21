import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

interface Post {
    id: string;
    author: string;
    isAnonymous: boolean;
    content: string;
    category: string;
    likes: number;
    comments: number;
    time: string;
}

export default function CommunityScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            author: 'Anonymous',
            isAnonymous: true,
            content: 'Has anyone experienced excessive fatigue during the follicular phase? I feel like I need 10 hours of sleep.',
            category: 'Symptoms',
            likes: 24,
            comments: 12,
            time: '2h ago'
        },
        {
            id: '2',
            author: 'Sarah M.',
            isAnonymous: false,
            content: 'Just started the inositol supplement recommended by the app. Hoping to see some results with my insulin resistance!',
            category: 'Nutrition',
            likes: 45,
            comments: 8,
            time: '5h ago'
        },
        {
            id: '3',
            author: 'Anonymous',
            isAnonymous: true,
            content: 'Dealing with a lot of acne flare-ups lately. Does Spearmint tea really help?',
            category: 'Skin Health',
            likes: 18,
            comments: 22,
            time: '1d ago'
        }
    ]);

    const categories = ['All', 'Symptoms', 'Nutrition', 'Skin Health', 'Success Stories', 'Mental Health'];

    const handleLike = (id: string) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Community</Text>
                <TouchableOpacity style={styles.notifBtn}>
                    <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#999" />
                <TextInput
                    placeholder="Search topics or posts..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
                {categories.map(cat => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.catItem,
                            selectedCategory === cat && { backgroundColor: theme.tint }
                        ]}
                        onPress={() => setSelectedCategory(cat)}
                    >
                        <Text style={[
                            styles.catText,
                            selectedCategory === cat && { color: '#FFFFFF' }
                        ]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.feedScroll}>
                {posts.filter(p => selectedCategory === 'All' || p.category === selectedCategory).map(post => (
                    <View key={post.id} style={styles.postCard}>
                        <View style={styles.postHeader}>
                            <View style={styles.authorRow}>
                                <View style={[styles.avatar, { backgroundColor: post.isAnonymous ? '#F0F0F0' : theme.tint }]}>
                                    <Ionicons
                                        name={post.isAnonymous ? 'person-outline' : 'person'}
                                        size={20}
                                        color={post.isAnonymous ? '#999' : '#FFF'}
                                    />
                                </View>
                                <View style={styles.authorInfo}>
                                    <Text style={styles.authorName}>{post.author}</Text>
                                    <Text style={styles.postTime}>{post.time} • {post.category}</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.postContent}>{post.content}</Text>

                        <View style={styles.postFooter}>
                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.actionBtn} onPress={() => handleLike(post.id)}>
                                    <Ionicons name="heart-outline" size={20} color="#666" />
                                    <Text style={styles.actionText}>{post.likes}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Ionicons name="chatbubble-outline" size={20} color="#666" />
                                    <Text style={styles.actionText}>{post.comments}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="share-outline" size={20} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={[styles.fab, { backgroundColor: theme.tint }]}>
                <Ionicons name="create-outline" size={28} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 28,
        fontFamily: 'Outfit_700Bold',
        color: '#1A1A1A',
    },
    notifBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginHorizontal: 24,
        paddingHorizontal: 16,
        height: 48,
        borderRadius: 16,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#1A1A1A',
    },
    catScroll: {
        paddingLeft: 24,
        maxHeight: 40,
        marginBottom: 24,
    },
    catItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F9F9F9',
        marginRight: 10,
    },
    catText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: '#666',
    },
    feedScroll: {
        flex: 1,
        paddingHorizontal: 24,
    },
    postCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authorInfo: {
        marginLeft: 12,
        backgroundColor: 'transparent',
    },
    authorName: {
        fontSize: 15,
        fontFamily: 'Outfit_600SemiBold',
        color: '#1A1A1A',
    },
    postTime: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: '#999',
        marginTop: 2,
    },
    postContent: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: '#333333',
        lineHeight: 22,
        marginBottom: 20,
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        paddingTop: 16,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
        backgroundColor: 'transparent',
    },
    actionText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: '#666',
        marginLeft: 6,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
});
