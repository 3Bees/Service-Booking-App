import React, {useEffect, useState, useMemo} from 'react';
import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import TimePicker from 'react-native-wheel-time-picker';
import {colors} from '../../../globals/utilities/colors';
import {appImages} from '../../../globals/utilities/assets';
import {fontFamily} from '../../../globals/utilities/fonts';
const BookingOrder = props => {
  const {packageDetails, item, type} = props.route.params;
  const [date, setDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [selectedDate, setSelectedDate] = useState({});
  const [dateFlag, setDateFlag] = useState(true);
  const MILLISECONDS_PER_MINUTE = 60 * 1000;
  const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
  const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;
  const [timeValue, setTimeValue] = useState(Date.now() % MILLISECONDS_PER_DAY);
  const [hour, min] = useMemo(() => {
    return [
      Math.floor(timeValue / MILLISECONDS_PER_HOUR),
      Math.floor((timeValue % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
      Math.floor((timeValue % MILLISECONDS_PER_MINUTE) / 1000),
    ];
  }, [timeValue]);
  const _renderArrow = direction => {
    if (direction === 'left') {
      return (
        <View style={styles.calanderbtn}>
          <Image source={appImages.calendarLeft} style={styles.calanderIcon} />
        </View>
      );
    } else {
      return (
        <View style={styles.calanderbtn}>
          <Image source={appImages.calendarRight} style={styles.calanderIcon} />
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Balec Studio'} backBtn />
      <Text style={styles.Heading}>
        {dateFlag ? <>{date === '' ? 'Date' : 'Overview'}</> : 'Time'}
      </Text>
      {dateFlag ? (
        <View style={styles.whiteCard}>
          <Calendar
            onDayPress={day => {
              console.log('selected day', day);
              let newDate = day.dateString;
              setDate(newDate);
              setSelectedDate({
                [newDate]: {
                  selected: true,
                  selectedColor: colors.yellow,
                },
              });
            }}
            monthFormat={'MMMM yyyy'}
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            renderArrow={_renderArrow}
            hideArrows={false}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={false}
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            headerStyle={{
              backgroundColor: 'white',
              width: responsiveWidth(80),
              height: responsiveHeight(12),
              alignSelf: 'center',
              justifyContent: 'center',
              marginBottom: responsiveWidth(3),
            }}
            style={{
              width: responsiveWidth(80),
              alignSelf: 'center',
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#fff',
              textSectionTitleColor: 'black',
              textSectionTitleDisabledColor: '#d9e1e8',
              //   selectedDayBackgroundColor: colors.yellow,
              //   selectedDayTextColor: colors.white,
              todayTextColor: colors.black,
              dayTextColor: 'black',
              textDisabledColor: '#d9e1e8',
              // dotColor: '#4A65D1',
              // selectedDotColor: 'black',
              arrowColor: '#fff',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: 'black',
              indicatorColor: 'blue',
              textDayFontFamily: fontFamily.PoppinsBold,
              textMonthFontFamily: fontFamily.PoppinsExtraBold,
              textDayHeaderFontFamily: fontFamily.PoppinsBold,
              textDayFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
              textDayFontSize: responsiveFontSize(2),
              textMonthFontSize: responsiveFontSize(2.5),
              textDayHeaderFontSize: responsiveFontSize(2),
            }}
            markedDates={selectedDate}
          />
          {date !== '' ? (
            <View style={styles.optionsView}>
              <TouchableOpacity
                style={styles.optionsBtn1}
                onPress={() => {
                  setDate('');
                  setSelectedDate({});
                }}>
                <Text style={styles.cancelBtn}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionsBtn}
                onPress={() => {
                  setDateFlag(false);
                }}>
                <Text style={styles.OkBtn}>OK</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{height: responsiveHeight(4)}} />
          )}
        </View>
      ) : (
        <View>
          <TimePicker
            value={timeValue}
            wheelProps={{
              wheelHeight: responsiveHeight(8),
              itemHeight: responsiveHeight(3),
              selectedColor: 'white',
              disabledColor: 'gray',
              displayCount: 3,
              containerStyle: {
                height: responsiveHeight(12),
                width: responsiveWidth(25),
                // backgroundColor: 'red',
              },
            }}
            onChange={newValue => {
              setTimeValue(newValue);
              let hours = Math.floor(newValue / MILLISECONDS_PER_HOUR);
              let min = Math.floor(
                (newValue % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE,
              );
              let time = ` ${
                hours === 0 ? '12' : hours > 12 ? hours % 12 : hours
              }:${min < 10 ? '0' + min : min} ${hours >= 12 ? 'PM' : 'AM'}`;
              console.log({time});
              setNewTime(time);
              //   console.log(moment(newValue).format('h:mm'));
            }}
            containerStyle={styles.timePicker}
          />
          {newTime === '' ? null : (
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => {
                item?.category !== 'Studio' ? 
                props.navigation.navigate('SelectLocation', {
                  value: {date: date, time: newTime},
                  packageDetails,
                  item,
                  type,
                })
                :
                props.navigation.navigate('OrderSummary', {
                  value: {date: date, time: newTime},
                  packageDetails,
                  item,
                  type,
                  location: {},
                });
                setDateFlag(true);
                setDate('');
                setNewTime('');
              }}>
              <Text style={styles.OkBtn}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default BookingOrder;
