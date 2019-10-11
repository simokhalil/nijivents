import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import { getMonthDays } from './helpers/calendar';

const styles = StyleSheet.create({
  monthsContainer: {
    height: 50,
    marginVertical: 10,
  },
  monthsWrapper: {
    height: 50,
    alignItems: 'center',
  },
  month: {
    marginHorizontal: 20,
  },
  monthText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  monthTextSelected: {
    color: '#001472',
  },
  daysContainer: {
    height: 100,
    marginVertical: 10,
  },
  daysWrapper: {
  },
  day: {
    marginHorizontal: 20,
    width: 55,
    height: 100,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daySelected: {
    backgroundColor: '#001472',
  },
  dayTextDate: {
    fontSize: 28,
    color: '#001472',
  },
  dayTextDay: {
    fontSize: 11,
    marginBottom: 10,
    color: '#001472',
  },
  dayTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  hoursContainer: {
    height: 50,
    marginVertical: 20,
  },
  hoursWrapper: {
    height: 50,
    alignItems: 'center',
  },
  hour: {
    marginHorizontal: 10,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourSelected: {
    backgroundColor: '#001472',
  },
  hourText: {
    fontSize: 20,
    color: '#001472',
  },
  hourTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

const { width } = Dimensions.get('window');

const now = new Date();
const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const weekDaysShort = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class DatePicker extends Component {
  state = {
    selectedMonth: now.getMonth() + 1,
    selectedDay: now.getDate(),
    selectedHours: now.getHours(),
    selectedMinutes: Math.ceil(now.getMinutes() / 15) * 15,
    selectedYear: now.getFullYear(),
  };

  onDateChanged = () => {
    const {
      selectedYear,
      selectedMonth,
      selectedDay,
      selectedHours,
      selectedMinutes,
    } = this.state;
    const { onDateChanged } = this.props;
    const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHours, selectedMinutes);
    onDateChanged(selectedDate);
  };

  onMonthSelected = (monthIndex) => {
    const { selectedYear } = this.state;
    let { selectedDay } = this.state;
    const selectedMonth = monthIndex + 1;
    const nbDaysInSelectedMonth = getMonthDays(selectedMonth, selectedYear);

    if (selectedDay > nbDaysInSelectedMonth) {
      selectedDay = nbDaysInSelectedMonth;
    }

    this.setState({
      selectedMonth,
      selectedDay,
    });
  };

  onDaySelected = (day) => {
    this.setState({
      selectedDay: day,
    });
  };

  onHourSelected = (hour) => {
    this.setState({
      selectedHours: hour.hours,
      selectedMinutes: hour.minutes,
    });
  };

  getDayFromDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return weekDaysShort[date.getDay()];
  };

  render() {
    const {
      selectedYear, selectedDay, selectedMonth, selectedHours, selectedMinutes,
    } = this.state;

    const monthname = months[
      Math.max(0, Math.min(selectedMonth - 1, 11))
    ];

    const daysArray = Array.from({ length: getMonthDays(selectedMonth, selectedYear) }, (v, k) => k + 1);

    const hoursArray = [];
    for (let hours = 0; hours <= 23; hours += 1) {
      for (let minutes = 0; minutes <= 45; minutes += 15) {
        hoursArray.push({
          label: `${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(-2)}`,
          hours,
          minutes,
        });
      }
    }

    return (
      <View>

        <Text>{`${selectedDay} ${monthname} ${selectedYear}`}</Text>
        <Text>{new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHours, selectedMinutes).toISOString()}</Text>

        <View style={styles.monthsContainer}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.monthsWrapper}
            showsHorizontalScrollIndicator={false}
            ref={(ref) => { this.monthsScrollView = ref; }}
          >
            {months.map((month, index) => (
              <TouchableOpacity
                key={index}
                style={styles.month}
                onPress={() => this.onMonthSelected(index)}
                onLayout={(event) => {
                  if (selectedMonth === index + 1) {
                    const { nativeEvent: { layout } } = event;
                    this.monthsScrollView.scrollTo({ x: layout.x - (width / 2) + (layout.width / 2), y: layout.y });
                  }
                }}
              >
                <Text style={[styles.monthText, (selectedMonth === index + 1) && styles.monthTextSelected]}>{month}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.daysContainer}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.daysWrapper}
            showsHorizontalScrollIndicator={false}
            ref={(ref) => { this.daysScrollView = ref; }}
          >
            {daysArray.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.day, day === selectedDay && styles.daySelected]}
                onPress={() => this.onDaySelected(day)}
                onLayout={(event) => {
                  if (day === selectedDay) {
                    const { nativeEvent: { layout } } = event;
                    this.daysScrollView.scrollTo({ x: layout.x - (width / 2) + (layout.width / 2), y: layout.y });
                  }
                }}
              >
                <Text style={[styles.dayTextDay, day === selectedDay && styles.dayTextSelected]}>{this.getDayFromDate(day, selectedMonth, selectedYear).toUpperCase()}</Text>
                <Text style={[styles.dayTextDate, day === selectedDay && styles.dayTextSelected]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.hoursContainer}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.hoursWrapper}
            showsHorizontalScrollIndicator={false}
            ref={(ref) => { this.hoursScrollView = ref; }}
          >
            {hoursArray.map((hour, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.hour, hour.hours === selectedHours && hour.minutes === selectedMinutes && styles.hourSelected]}
                onPress={() => this.onHourSelected(hour)}
                onLayout={(event) => {
                  if (hour.hours === selectedHours && hour.minutes === selectedMinutes) {
                    const { nativeEvent: { layout } } = event;
                    this.hoursScrollView.scrollTo({ x: layout.x - (width / 2) + (layout.width / 2), y: layout.y });
                  }
                }}
              >
                <Text style={[styles.hourText, hour.hours === selectedHours && hour.minutes === selectedMinutes && styles.hourTextSelected]}>{hour.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </View>
    );
  }
}

DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  onDateChanged: PropTypes.func,
};

DatePicker.defaultProps = {
  date: new Date(),
  onDateChanged: () => true,
};

export default DatePicker;
