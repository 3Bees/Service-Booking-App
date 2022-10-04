import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import AllAnnoucements from '../AllAnnoucements';
import CustomerHome from '../CustomerHome';
import {colors} from '../../../globals/utilities/colors';
import {getCurrentUserId} from '../../../Backend/auth';
import {getData} from '../../../Backend/utility';
import moment from 'moment';
import {db} from '../../../Backend/firebaseConfig';
const Home = props => {
  const [check, setCheck] = useState(null);
  const [type, setType] = useState('');
  const [userName, setUserName] = useState('');
  const [isloading, setisLoading] = useState(true);
  const [pendingBookings, setPendingBookings] = useState('');
  const [upcomingBookings, setUpcomingBookings] = useState('');
  const [pastBookings, setPastBookings] = useState('');
  const [data, setData] = useState('');
  useEffect(() => {
    Bookings();
    userData();
  }, []);
  const Bookings = async () => {
    let subscribe = db.collection('Bookings').onSnapshot(async () => {
      setisLoading(true);
      let bookingsData = [];
      let userId = await getCurrentUserId();
      bookingsData = await getData('Bookings', userId, 'Bookings');
      let upcoming = [];
      let past = [];
      let pending = [];
      let recieved = [];
      let booked = [];
      if (bookingsData) {
        recieved = bookingsData?.filter(item => {
          return item?.recieved == true;
        });
      }
      if (bookingsData) {
        booked = bookingsData?.filter(item => {
          return item?.recieved == false;
        });
      }
      if (recieved) {
        recieved?.forEach(element => {
          if (element?.status == 'Pending') {
            pending.push(element);
          } else {
            let diff = moment(element.date, 'Do MMM , YYYY').fromNow();
            if (diff?.includes('ago')) {
              past.push(element);
            } else {
              upcoming.push(element);
            }
          }
        });
      }
      if (booked) {
        booked?.forEach(element => {
          if (element?.accepted == 'Pending') {
            pending.push(element);
          } else {
            let diff = moment(element.date, 'Do MMM , YYYY').fromNow();
            if (diff?.includes('ago')) {
              past.push(element);
            } else {
              upcoming.push(element);
            }
          }
        });
      }

      setPendingBookings(pending);
      setData(bookingsData);
      setUpcomingBookings(upcoming);
      setPastBookings(past);
      setisLoading(false);
    });
    return subscribe;
  };
  const userData = async () => {
    setisLoading(true);
    let userId = await getCurrentUserId();
    await getData('users', userId).then(data => {
      let name = `${data.firstname} ${data.lastname}`;
      console.log(name);
      setUserName(name);
      setType(data.category);
      if (data?.type === 'SEARCH FOR  A SERVICE AS') {
        setCheck(true);
      } else {
        setCheck(false);
      }
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    });
  };
  const renderItem = (item, index) => {
    return (
      <View style={styles.MainView}>
        <View style={styles.detailsView}>
          <Image source={{uri: item?.photo}} style={styles.photo} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (item.type === 'Studio') {
              if (item?.recieved == true) {
                props.navigation.navigate('Bookings', {
                  screen: 'ConfirmedBooking',
                  params: {item, data},
                });
              } else {
                if (item?.accepted == 'Pending') {
                  props.navigation.navigate('HomeDetails', {
                    item,
                    data,
                  });
                } else {
                  props.navigation.navigate('Studio', {
                    item,
                    data,
                  });
                }
              }
            } else {
              if (item?.recieved == true) {
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
          <Text style={styles.moreBtnText}>See More</Text>
        </TouchableOpacity>
      </View>
    );
  };
  if (isloading) {
    return (
      <ActivityIndicator
        color={colors.black}
        size={'large'}
        style={{marginTop: responsiveHeight(45)}}
      />
    );
  }
  return (
    <ScrollView style={styles.container}>
      {check ? (
        <CustomerHome name={userName} />
      ) : (
        <>
          {type === '"Model/Dancers"' || type === 'Model/Dancers' ? (
            <AllAnnoucements />
          ) : (
            <>
              <NewHeader title={'Home'} options search />

              <Text style={styles.Title}>{'Pending'}</Text>

              <View style={styles.flMainView}>
                <FlatList
                  data={pendingBookings}
                  renderItem={({item, index}) => {
                    return renderItem(item, index);
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <Text style={styles.Title}>{'Upcoming'}</Text>
              <View style={styles.flMainView}>
                <FlatList
                  data={upcomingBookings}
                  renderItem={({item, index}) => {
                    return renderItem(item, index);
                  }}
                />
              </View>
              <Text style={styles.Title}>{'Past'}</Text>
              <View style={styles.flMainView}>
                <FlatList
                  data={pastBookings}
                  renderItem={({item, index}) => {
                    return renderItem(item, index);
                  }}
                />
              </View>
              <Text style={styles.Title}>{'Announcement'}</Text>
              <AllAnnoucements flag />

              {/* </View>
                    );
                  }}
                />
              </View> */}
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Home;
