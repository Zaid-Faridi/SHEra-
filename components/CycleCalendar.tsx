import React, { useState, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

const { width } = Dimensions.get('window');

interface CycleCalendarProps {
    currentDay: number;
    cycleLength: number;
}

export const CycleCalendar: React.FC<CycleCalendarProps> = ({ currentDay, cycleLength }) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const calendarData = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        // Padding for first week
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return { year, month, days };
    }, [currentDate]);

    // Intelligence: Simple prediction based on currentDay of cycle
    // For the current month, we assume today is "currentDay" of the cycle.
    // Last period started (today - currentDay + 1)
    const isDateMarked = (day: number) => {
        if (!day) return { isPeriod: false, isOvulation: false, isCurrent: false };

        const today = new Date();
        const isToday = day === today.getDate() &&
            calendarData.month === today.getMonth() &&
            calendarData.year === today.getFullYear();

        // Mock predictive markers based on currentDay
        // We assume the user is at "currentDay" in their cycle TODAY.
        // So day 1 of cycle was (today - currentDay)

        const dayDate = new Date(calendarData.year, calendarData.month, day);
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Difference in days from "today"
        const diffTime = dayDate.getTime() - todayDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

        // Cycle day for this date
        // cycleDay = currentDay + diffDays
        let cycleDay = (currentDay + diffDays) % cycleLength;
        if (cycleDay <= 0) cycleDay += cycleLength;

        const isPeriod = cycleDay <= 5;
        const isOvulation = cycleDay === Math.floor(cycleLength / 2);

        return { isPeriod, isOvulation, isCurrent: isToday };
    };

    const changeMonth = (offset: number) => {
        const newDate = new Date(calendarData.year, calendarData.month + offset, 1);
        setCurrentDate(newDate);
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Cycle Calendar</Text>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => changeMonth(-1)}>
                        <Ionicons name="chevron-back" size={20} color="#666" />
                    </TouchableOpacity>
                    <Text style={styles.monthName}>{monthNames[calendarData.month]} {calendarData.year}</Text>
                    <TouchableOpacity onPress={() => changeMonth(1)}>
                        <Ionicons name="chevron-forward" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.weekLabels}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(label => (
                    <Text key={label} style={styles.weekText}>{label}</Text>
                ))}
            </View>

            <View style={styles.grid}>
                {calendarData.days.map((day, index) => {
                    const { isPeriod, isOvulation, isCurrent } = isDateMarked(day as number);
                    return (
                        <View key={index} style={styles.dayCell}>
                            {day && (
                                <View style={[styles.dayContainer, isCurrent && styles.currentDay]}>
                                    <Text style={[styles.dayText, isCurrent && styles.currentDayText]}>{day}</Text>
                                    <View style={styles.dotContainer}>
                                        {isPeriod && <View style={styles.periodDot} />}
                                        {isOvulation && <View style={styles.ovulationDot} />}
                                    </View>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>

            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#FF9A9E' }]} />
                    <Text style={styles.legendText}>Period</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#FADEDF' }]} />
                    <Text style={styles.legendText}>Ovulation</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginTop: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 16,
        fontFamily: 'Outfit_600SemiBold',
        color: '#1A1A1A',
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    monthName: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: '#333',
        marginHorizontal: 16,
    },
    weekLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    weekText: {
        width: (width - 96) / 7,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: '#999',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
    },
    dayCell: {
        width: (width - 96) / 7,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    dayContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    currentDay: {
        backgroundColor: '#FF9A9E40', // Light coral highlight
        borderRadius: 20,
    },
    currentDayText: {
        color: '#FF9A9E',
        fontFamily: 'Inter_700Bold',
    },
    dayText: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: '#333',
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 2,
        backgroundColor: 'transparent',
    },
    periodDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#FF9A9E',
        marginHorizontal: 1,
    },
    ovulationDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#FADEDF', // Lighter pink
        marginHorizontal: 1,
    },
    legend: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: 'transparent',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
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
        fontFamily: 'Inter_400Regular',
        color: '#666',
    }
});
