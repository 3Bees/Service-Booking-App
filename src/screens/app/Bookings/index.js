import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {Calendar} from 'react-native-calendars';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../../globals/utilities/colors';
import {fontFamily} from '../../../globals/utilities/fonts';
import {NewHeader} from '../../../components/general/header';
import {Icon} from 'react-native-elements';
import {appImages} from '../../../globals/utilities/assets';
import moment from 'moment';
import {getData} from '../../../Backend/utility';
import {getCurrentUserId} from '../../../Backend/auth';
import {FlatList} from 'react-native-gesture-handler';
import {db} from '../../../Backend/firebaseConfig';
const Bookings = props => {
  const [dates, setDates] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [seletedData, setSelectedData] = useState();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    BookingsDetails();
  }, []);
  const BookingsDetails = async () => {
    let subscribe = db.collection('Bookings').onSnapshot(async () => {
      let userId = await getCurrentUserId();
      await getData('Bookings', userId).then(res => {
        let arr = res.Bookings;
        setData(arr);
        let Dates = {};
        arr?.forEach(element => {
          let date = moment(element.date, 'Do MMM , YYYY').format('YYYY-MM-DD');
          Dates[date] = {
            customStyles: {
              container: {
                backgroundColor: colors.white,
              },
              text: {
                color: colors.yellow,
                fontWeight: 'bold',
              },
            },
          };
        });
        setDates(Dates);
        setSelectedDate(Dates);
      });
    });
    setLoader(false);
    return subscribe;
  };
  const filterData = date => {
    if (data) {
      let arr = [...data];
      console.log(arr);
      let newArr = arr?.filter(res => res.date === date);
      console.log('new array', newArr);
      let obj = selectedDate;
      let Newdate = moment(date, 'Do MMM , YYYY').format('YYYY-MM-DD');
      const keys = Object.keys(obj);
      keys.forEach(item => {
        if (item === Newdate) {
          obj[item] = {
            customStyles: {
              container: {
                backgroundColor: colors.yellow,
              },
              text: {
                color: colors.white,
                fontWeight: 'bold',
              },
            },
          };
        } else {
          obj[item] = {
            customStyles: {
              container: {
                backgroundColor: colors.white,
              },
              text: {
                color: colors.yellow,
                fontWeight: 'bold',
              },
            },
          };
        }
      });
      setSelectedDate(obj);
      setSelectedData(newArr);
    }
  };
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
  if (loader) {
    return (
      <ActivityIndicator
        color={colors.black}
        size={'large'}
        style={{marginTop: responsiveHeight(45)}}
      />
    );
  }
  return (
    <View style={styles.container}>
      <NewHeader title={'Bookings'} />
      <ScrollView>
        <View style={styles.whiteCard}>
          <Text style={styles.heading}>Overview</Text>
          <Calendar
            onDayPress={day => {
              let newDate = moment(day.dateString).format('Do MMM , YYYY');
              console.log(newDate);
              filterData(newDate);
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
              selectedDayBackgroundColor: colors.white,
              selectedDayTextColor: colors.yellow,
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
            markingType={'custom'}
            markedDates={selectedDate}
          />
        </View>
        <FlatList
          data={seletedData}
          renderItem={({item, index}) => {
            return (
              <View style={styles.whiteCard1}>
                <View style={styles.profileView}>
                  <Image source={{uri: item.photo}} style={styles.photo} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                {item.type === 'annoucement' ? null : (
                  <Text style={styles.boldTitle}>Premium Package</Text>
                )}
                <View style={styles.detailsView}>
                  <Text style={styles.date}>{item.date}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (item.type === 'Studio') {
                        if (item.recieved == true) {
                          props.navigation.navigate('ConfirmedBooking', {
                            item,
                            data,
                          });
                        } else {
                          props.navigation.navigate('Studio', {
                            item,
                            data,
                          });
                        }
                      } else {
                        if (item.recieved == true) {
                          props.navigation.navigate('BookingDetails', {
                            item,
                            data,
                          });
                        } else {
                          props.navigation.navigate('HomeDetails', {
                            item,
                            data,
                          });
                        }
                      }
                    }}>
                    <Text style={styles.btn}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <View style={{height: responsiveHeight(1)}} />
      </ScrollView>
    </View>
  );
};

export default Bookings;
