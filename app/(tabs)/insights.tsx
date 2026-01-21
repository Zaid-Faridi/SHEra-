import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart, LineChart } from 'react-native-chart-kit';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function InsightsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const symptomData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [2, 5, 8, 4, 3, 1, 2] // Intensity score
    }]
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Insights</Text>
          <Text style={styles.subtitle}>Analyzing your patterns for better harmony</Text>
        </View>

        {/* Highlight Card */}
        <LinearGradient
          colors={['#A1C4FD', '#C2E9FB']}
          style={styles.highlightCard}
        >
          <Ionicons name="stats-chart" size={24} color="#FFFFFF" />
          <Text style={styles.highlightTitle}>Cycle Regularity</Text>
          <Text style={styles.highlightValue}>92% Stable</Text>
          <Text style={styles.highlightDesc}>Your cycle has been consistent for the last 3 months.</Text>
        </LinearGradient>

        {/* Symptom Intensity Chart */}
        <Text style={styles.sectionTitle}>Symptom Intensity</Text>
        <View style={styles.chartCard}>
          <BarChart
            data={symptomData}
            width={width - 56}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => theme.tint,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, 0.4)`,
              style: { borderRadius: 16 },
              propsForBackgroundLines: { strokeDasharray: "", stroke: "#F0F0F0" },
            }}
            style={styles.chart}
            verticalLabelRotation={0}
            showValuesOnTopOfBars
          />
        </View>

        {/* Weight Trend */}
        <Text style={styles.sectionTitle}>Weight Trend</Text>
        <View style={styles.chartCard}>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr'],
              datasets: [{ data: [64, 63.5, 62.8, 62.4] }]
            }}
            width={width - 56}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => '#84FAB0',
              labelColor: (opacity = 1) => `rgba(0, 0, 0, 0.4)`,
              propsForDots: { r: "4", strokeWidth: "2", stroke: "#84FAB0" },
              propsForBackgroundLines: { stroke: "#F0F0F0" },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Insight Snippets */}
        <Text style={styles.sectionTitle}>Pattern Detection</Text>
        <View style={styles.snippetCard}>
          <Ionicons name="bulb-outline" size={20} color={theme.tint} />
          <Text style={styles.snippetText}>
            Bloating correlates with dairy intake on Day 5 and Day 7 of your cycle.
          </Text>
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
    marginBottom: 32,
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
  highlightCard: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 32,
  },
  highlightTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    marginTop: 12,
  },
  highlightValue: {
    fontSize: 28,
    fontFamily: 'Outfit_700Bold',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  highlightDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Outfit_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 32,
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
    paddingRight: 0,
  },
  snippetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 20,
    marginBottom: 40,
  },
  snippetText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#444',
    marginLeft: 12,
    lineHeight: 20,
  },
});
