import { StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    time: string;
}

export default function AIChatScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const scrollViewRef = useRef<ScrollView>(null);

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm SHERa, your hormonal health companion. How are you feeling today?",
            sender: 'ai',
            time: '09:00 AM'
        },
        {
            id: '2',
            text: "I noticed you're on Day 12 of your cycle. Your estrogen is currently rising, which might boost your energy!",
            sender: 'ai',
            time: '09:00 AM'
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: generateAIResponse(input),
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const generateAIResponse = (query: string) => {
        const q = query.toLowerCase();
        if (q.includes('bloating')) return "Bloating is common during the luteal phase due to rising progesterone. Try reducing salt and staying hydrated. Peppermint tea might also help!";
        if (q.includes('exercise')) return "Since you're in the follicular phase, your body handles stress better. It's a great time for HIIT or heavy lifting!";
        if (q.includes('acne')) return "Hormonal acne often correlates with insulin spikes. Focus on a low-glycemic diet today and keep your skin hydrated.";
        return "That's interesting! Based on your recent logs, I recommend keeping a close eye on your sleep quality this week. Is there anything specific you'd like to know about PCOS management?";
    };

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages, isTyping]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={theme.headerGradient as [string, string]}
                style={styles.header}
            >
                <SafeAreaView style={styles.headerSafe}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => { }}>
                            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <View style={styles.headerCenter}>
                            <View style={styles.aiAvatar}>
                                <Ionicons name="sparkles" size={20} color={theme.tint} />
                            </View>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headerTitle}>SHERa AI</Text>
                                <Text style={styles.headerStatus}>Always listening • Online</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.chatArea}
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map(msg => (
                        <View
                            key={msg.id}
                            style={[
                                styles.messageWrapper,
                                msg.sender === 'user' ? styles.userWrapper : styles.aiWrapper
                            ]}
                        >
                            <View
                                style={[
                                    styles.messageBubble,
                                    msg.sender === 'user' ? [styles.userBubble, { backgroundColor: theme.tint }] : styles.aiBubble
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.messageText,
                                        msg.sender === 'user' ? styles.userText : styles.aiText
                                    ]}
                                >
                                    {msg.text}
                                </Text>
                            </View>
                            <Text style={styles.messageTime}>{msg.time}</Text>
                        </View>
                    ))}
                    {isTyping && (
                        <View style={[styles.messageWrapper, styles.aiWrapper]}>
                            <View style={[styles.messageBubble, styles.aiBubble, styles.typingBubble]}>
                                <ActivityIndicator size="small" color={theme.tint} />
                            </View>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.inputArea}>
                    <TouchableOpacity style={styles.attachmentBtn}>
                        <Ionicons name="add-circle-outline" size={24} color="#999" />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Ask SHERa anything..."
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, { backgroundColor: input.trim() ? theme.tint : '#F0F0F0' }]}
                        onPress={handleSend}
                        disabled={!input.trim()}
                    >
                        <Ionicons name="send" size={20} color={input.trim() ? '#FFFFFF' : '#999'} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingBottom: 20,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    headerSafe: {
        backgroundColor: 'transparent',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: 'transparent',
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    aiAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    headerTextContainer: {
        marginLeft: 12,
        backgroundColor: 'transparent',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Outfit_700Bold',
        color: '#FFFFFF',
    },
    headerStatus: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: 'rgba(255, 255, 255, 0.8)',
    },
    chatArea: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100,
    },
    messageWrapper: {
        marginBottom: 20,
        maxWidth: '80%',
        backgroundColor: 'transparent',
    },
    userWrapper: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    aiWrapper: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    messageBubble: {
        padding: 16,
        borderRadius: 24,
    },
    userBubble: {
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        backgroundColor: '#F5F5F5',
        borderBottomLeftRadius: 4,
    },
    typingBubble: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    messageText: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        lineHeight: 22,
    },
    userText: {
        color: '#FFFFFF',
    },
    aiText: {
        color: '#333',
    },
    messageTime: {
        fontSize: 10,
        fontFamily: 'Inter_400Regular',
        color: '#999',
        marginTop: 6,
        marginHorizontal: 4,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? 32 : 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
    },
    attachmentBtn: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        maxHeight: 100,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
});
