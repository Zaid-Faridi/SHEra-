import { StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import React, { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { CycleCalendar } from '@/components/CycleCalendar';

const { width } = Dimensions.get('window');

// Hormone data generator based on cycle length
const generateHormoneData = (cycleLength: number = 28) => {
  const labels = ['1', '7', '14', '21', cycleLength.toString()];
  // Estrogen peaks at ovulation (day ~14 for 28 day cycle, or mid-cycle)
  const peakDayIndex = 2; // day 14
  const estrogen = [20, 40, 95, 45, 20];
  const progesterone = [5, 5, 15, 85, 20];
  return { labels, estrogen, progesterone };
};

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [nickname, setNickname] = useState('Sister');
  const [cycleLength, setCycleLength] = useState(28);
  const [currentDay, setCurrentDay] = useState(12);

  useEffect(() => {
    const loadUserData = async () => {
      const progress = await AsyncStorage.getItem('onboarding_progress');
      if (progress) {
        const { answers } = JSON.parse(progress);
        if (answers.nickname) setNickname(answers.nickname);
        if (answers.cycle_length) setCycleLength(Number(answers.cycle_length));
      }
    };
    loadUserData();
  }, []);

  const hormoneData = useMemo(() => generateHormoneData(cycleLength), [cycleLength]);


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <LinearGradient
          colors={theme.headerGradient as [string, string]}
          style={styles.header}
        >
          <SafeAreaView style={styles.headerSafe}>
            <View style={styles.headerTop}>
              <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/profile')}>
                <Ionicons name="person-circle-outline" size={32} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.headerContentLeft}>
                <Text style={styles.greeting}>Hello, {nickname} ✨</Text>
                <Text style={styles.cycleDay}>Day {currentDay} of your Follicular Phase</Text>
              </View>
            </View>

            {/* Cycle Progress Card */}
            <View style={styles.cycleCard}>
              <View style={styles.cycleInfo}>
                <Text style={styles.cycleTitle}>Next Period in</Text>
                <Text style={styles.cycleValue}>{cycleLength - currentDay} Days</Text>
              </View>
              <View style={styles.cycleVisual}>
                <View style={styles.circleOuter}>
                  <View style={[styles.circleInner, { borderTopColor: '#FFFFFF', transform: [{ rotate: `${(currentDay / cycleLength) * 360}deg` }] }]} />
                  <Text style={styles.circleText}>OVULATION</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Cycle Calendar */}
          <CycleCalendar currentDay={currentDay} cycleLength={cycleLength} />

          {/* Today's Focus */}
          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <Text style={styles.sectionTitle}>Today's Focus</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: theme.tint }]}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.taskGrid}>
            <TaskCard
              icon="water-outline"
              title="Log Symptoms"
              color="#FF9A9E"
              onPress={() => router.push('/log')}
            />
            <TaskCard
              icon="footsteps-outline"
              title="Daily Steps"
              color="#A18CD1"
              onPress={() => { }}
            />
            <TaskCard
              icon="nutrition-outline"
              title="Nutritional Vault"
              color="#84FAB0"
              onPress={() => router.push('/nutrition')}
            />
            <TaskCard
              icon="chatbubbles-outline"
              title="Community"
              color="#A1C4FD"
              onPress={() => router.push('/(tabs)/community')}
            />
            <TaskCard
              icon="fitness-outline"
              title="Yoga & Wellness"
              color="#A18CD1"
              onPress={() => router.push('/wellness')}
            />
          </View>

          <Text style={styles.sectionTitle}>Daily Hormone Hacks</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hacksScroll}>
            <HackCard
              icon="nutrition"
              title="Low GI Snack"
              desc="Almonds stabilize blood sugar today."
              color="#FFE1E1"
              iconColor="#F8B0B0"
            />
            <HackCard
              icon="fitness"
              title="Strength Prep"
              desc="High energy today - perfect for lifting!"
              color="#E1F5FE"
              iconColor="#4FC3F7"
            />
            <HackCard
              icon="bed"
              title="Sleep Hygiene"
              desc="Cool room (18°C) boosts melatonin."
              color="#F3E5F5"
              iconColor="#BA68C8"
            />
          </ScrollView>

          {/* AI Insight Card */}
          <Text style={styles.sectionTitle}>Your AI Insight</Text>
          <LinearGradient
            colors={['#FFF5F5', '#FFFFFF']}
            style={styles.insightCard}
          >
            <View style={styles.insightHeader}>
              <Ionicons name="sparkles" size={20} color={theme.tint} />
              <Text style={[styles.insightTitle, { color: theme.tint }]}>Hormonal Sync</Text>
            </View>
            <Text style={styles.insightText}>
              You're in your Follicular phase! Focus on high-intensity strength training today to manage cortisol levels effectively.
            </Text>
          </LinearGradient>

          {/* Hormone Curve Chart */}
          <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Hormone Curve</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: theme.tint }]} />
                <Text style={styles.legendText}>Estrogen</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#A1C4FD' }]} />
                <Text style={styles.legendText}>Progesterone</Text>
              </View>
            </View>
            <LineChart
              data={{
                labels: hormoneData.labels,
                datasets: [
                  {
                    data: hormoneData.estrogen,
                    color: (opacity = 1) => theme.tint,
                    strokeWidth: 3,
                  },
                  {
                    data: hormoneData.progesterone,
                    color: (opacity = 1) => '#A1C4FD',
                    strokeWidth: 3,
                  }
                ],
              }}
              width={width - 56}
              height={180}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, 0.4)`,
                propsForDots: { r: "0" },
                propsForBackgroundLines: {
                  strokeDasharray: "",
                  stroke: "#F0F0F0",
                },
              }}
              bezier
              style={styles.chart}
            />
            <Text style={styles.chartFooter}>Day of cycle</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const TaskCard = React.memo(({ icon, title, color, onPress }: { icon: any, title: string, color: string, onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.taskCard} onPress={onPress}>
      <View style={[styles.taskIconContainer, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.taskTitle}>{title}</Text>
    </TouchableOpacity>
  );
});

const StatCard = React.memo(({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
});

const HackCard = React.memo(({ icon, title, desc, color, iconColor }: { icon: any, title: string, desc: string, color: string, iconColor: string }) => {
  return (
    <View style={[styles.hackCard, { backgroundColor: color }]}>
      <View style={styles.hackHeader}>
        <Ionicons name={icon as any} size={20} color={iconColor} />
        <Text style={[styles.hackTitle, { color: iconColor }]}>{title}</Text>
      </View>
      <Text style={styles.hackDesc}>{desc}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerSafe: {
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  profileBtn: {
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  headerContentLeft: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  greeting: {
    fontSize: 22,
    fontFamily: 'Outfit_700Bold',
    color: '#FFFFFF',
  },
  cycleDay: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cycleCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    padding: 24,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cycleInfo: {
    backgroundColor: 'transparent',
  },
  cycleTitle: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cycleValue: {
    fontSize: 32,
    fontFamily: 'Outfit_700Bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  cycleVisual: {
    backgroundColor: 'transparent',
  },
  circleOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  circleText: {
    fontSize: 8,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    padding: 24,
    marginTop: -20,
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Outfit_600SemiBold',
    color: '#1A1A1A',
  },
  statsScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  statCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#999999',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: '#333333',
    marginTop: 4,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  taskGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  taskCard: {
    width: (width - 64) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  taskIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#333333',
  },
  hacksScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  hackCard: {
    width: 200,
    borderRadius: 20,
    padding: 16,
    marginRight: 16,
  },
  hackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  hackTitle: {
    fontSize: 12,
    fontFamily: 'Outfit_700Bold',
    marginLeft: 8,
  },
  hackDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: '#444',
    lineHeight: 18,
  },
  insightCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FFEFEF',
    marginBottom: 32,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  insightTitle: {
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
    marginLeft: 8,
  },
  insightText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    backgroundColor: 'transparent',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#666',
  },
  chart: {
    paddingRight: 0,
    borderRadius: 16,
  },
  chartFooter: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    color: '#999',
    marginTop: 8,
  },
});
