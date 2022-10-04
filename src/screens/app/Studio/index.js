import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {appImages} from '../../../globals/utilities/assets';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../../../globals/utilities/colors';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
const Studio = props => {
  const {item, data} = props.route.params;
  var endingDateFormated = moment(item.date, 'Do MMM , YYYY').format(
    'YYYY-MM-DD',
  );
  var endingDate = moment(endingDateFormated).fromNow();
  const endingTime = moment(item.time, 'hh:mm a').format('hh:mm:ss a');
  var today = new Date();
  var newTime =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  let currentTime = moment(newTime, 'hh:mm:ss a').format('hh:mm:ss a');
  var duration = moment.duration(
    moment(endingTime, 'HH:mm:ss a').diff(moment(currentTime, 'HH:mm:ss a')),
  );
  var seconds = parseInt(duration.asSeconds());
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    let interval = setInterval(() => {
      if (endingDate.includes('in') && endingDate.includes('days')) {
        setTime(endingDate);
      } else {
        setTime(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const RatingRB = useRef();
  const SuccessRB = useRef();
  const [check, setCheck] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <ScrollView style={styles.container}>
      <NewHeader title={'Studio Session'} />
      <Text style={styles.title}>TRACK ARTIST</Text>
      <Text style={styles.BoldHeading}>Location</Text>
      <View style={styles.mapcontainer}>
        <MapView
          scrollEnabled={false}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
          style={styles.map}
          region={{
            // latitude: 37.78825,
            // longitude: -122.4324,
            latitude: !item?.location.length ? 37.78825 : item?.location?.lat,
            longitude: !item.location.length ? -122.4324 : item?.location?.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}></MapView>
      </View>
      <Text style={styles.boldCnteredHeading}>Your Session</Text>
      <TouchableOpacity style={styles.StudioBtn}>
        <Text style={styles.StudioBtnText}>with {item.name}</Text>
      </TouchableOpacity>
      {/* {time.includes('in') && time.includes('days') ? (
        <>
          <Text style={styles.time}>{`ending ${time}`}</Text>
        </>
      ) : ( */}
      <>
        {time > 60 ? (
          <Text style={styles.time}>
            {Math.floor(time / 3600) +
              ' hours ' +
              Math.floor((time - Math.floor(time / 3600) * 3600) / 60) +
              ' minutes '}
          </Text>
        ) : (
          <>
            {time < 1 ? (
              <Text style={styles.time}>{'is Expired'}</Text>
            ) : (
              <Text style={styles.time}>{`ending ${time}`}</Text>
            )}
          </>
        )}
      </>
      {/* )} */}
      {time <= 30 ? (
        <TouchableOpacity
          style={styles.EndBtn}
          onPress={() => {
            SuccessRB.current.open();
            setTimeout(() => {
              SuccessRB.current.close();
              setTimeout(() => {
                RatingRB.current.open();
              }, 1000);
            }, 1000);
          }}>
          <Text style={styles.EndBtnText}>End Now</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.whiteCard}>
          <Text style={styles.Studio}>{item.name.toUpperCase()}</Text>
          <View style={styles.rowView}>
            <Image source={{uri: item.photo}} style={styles.photo} />
            <Text style={styles.detailsText}>
              {`You booked ${item.name} for  ${item.package.title} session for the date ${item.date} at ${item.time} in ${item.package.price}$.`}
            </Text>
          </View>
        </View>
      )}
      <View style={{height: responsiveHeight(5)}} />
      <RBSheet
        ref={SuccessRB}
        closeOnDragDown={false}
        // closeOnPressMask={true}
        height={responsiveHeight(8)}
        customStyles={{
          wrapper: {
            // backgroundColor: 'rgba(0,0,0,0.3)',
          },
          container: {
            backgroundColor: colors.lightGreen,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(5),
          },
          draggableIcon: {
            backgroundColor: colors.white,
            width: responsiveWidth(40),
          },
        }}>
        <Image source={appImages.whiteCircle} style={styles.whiteCircle} />
        <Text style={styles.sessionText}>Your Seesion is Ended.</Text>
        <View style={{width: responsiveFontSize(3.5)}} />
      </RBSheet>
      <RBSheet
        ref={RatingRB}
        closeOnDragDown={false}
        // closeOnPressMask={true}
        height={responsiveHeight(25)}
        customStyles={{
          wrapper: {
            // backgroundColor: 'rgba(0,0,0,0.3)',
          },
          container: {
            borderTopRightRadius: responsiveWidth(7),
            borderTopLeftRadius: responsiveWidth(7),
            elevation: 5,
            backgroundColor: colors.white,
            paddingHorizontal: responsiveWidth(8),
          },
          draggableIcon: {
            backgroundColor: colors.white,
            width: responsiveWidth(40),
          },
        }}>
        <Text style={styles.RateText}>Rate Alizay out of 5 star?</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          selectedStar={rating => {
            setRating(rating);
            setTimeout(() => {
              RatingRB.current.close();
              props.navigation.navigate('Home');
            }, 1000);
          }}
          starSize={responsiveFontSize(2.5)}
          containerStyle={styles.starContainer}
        />
        <TouchableOpacity
          style={styles.skip}
          onPress={() => {
            RatingRB.current.close();
            props.navigation.navigate('Home');
          }}>
          <Text style={styles.EndBtnText}>Skip</Text>
        </TouchableOpacity>
      </RBSheet>
    </ScrollView>
  );
};

export default Studio;
