import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: {
          height: 65,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 5,
          paddingTop: 5,
          overflow: 'visible',
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
            },
            android: {
              elevation: 10,
            },
            web: {
              boxShadow: '0 -4px 15px rgba(0,0,0,0.05)',
            }
          })
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 10,
          marginTop: -2,
        },
        tabBarItemStyle: {
          height: 55,
          justifyContent: 'center',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        }}
      />

      <Tabs.Screen
        name="wellness"
        options={{
          title: 'Wellness',
          tabBarIcon: ({ color }) => <TabBarIcon name="pulse" color={color} />,
        }}
      />

      <Tabs.Screen
        name="ai-bot"
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/ai-chat')}
              style={styles.aiButtonWrapper}
            >
              <View style={styles.aiButtonContainer}>
                <LinearGradient
                  colors={theme.headerGradient as [string, string]}
                  style={styles.aiButton}
                >
                  <Ionicons name="sparkles" size={24} color="#FFFFFF" />
                </LinearGradient>
                <Text style={[styles.aiLabel, { color: props.accessibilityState?.selected ? theme.tint : '#999' }]}>SHERa AI</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => <TabBarIcon name="people-outline" color={color} />,
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color }) => <TabBarIcon name="analytics-outline" color={color} />,
        }}
      />

      {/* Hide the profile screen from tabs */}
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  aiButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  aiButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -15,
  },
  aiButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F8B0B0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 2,
  },
  aiLabel: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    marginTop: 2,
  }
});
