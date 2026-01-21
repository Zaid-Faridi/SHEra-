import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Profile</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={styles.subtitle}>Manage your health data and app settings here.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Outfit_700Bold',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        marginTop: 10,
        opacity: 0.6,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
