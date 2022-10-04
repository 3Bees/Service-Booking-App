import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../../globals/utilities/assets';
import {colors} from '../../../../globals/utilities/colors';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Icon} from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import {getCurrentUserId} from '../../../../Backend/auth';
import {addToArray, updateArray} from '../../../../Backend/utility';
const BookingDetails = props => {
  const {item, data} = props.route.params;
  console.log(item.location.length);
  const RatingRB = useRef();
  const [rating, setRating] = useState(0);
  let diff = moment(item.date, 'Do MMM , YYYY').fromNow();
  let check = diff.includes('ago');
  return (
    <ScrollView style={styles.container}>
      <NewHeader title={'Bookings'} />
      <View style={styles.wrapper}>
        <View style={styles.rowView}>
          <View style={styles.rowView1}>
            <Image source={{uri: item.photo}} style={styles.photo} />
            <Text style={styles.username}>{item.name}</Text>
          </View>
          <Text style={styles.statusText}>
            {item.status != 'Delivered' ? (
              <>{check ? "Time's Up" : item.status}</>
            ) : (
              item.status
            )}
          </Text>
        </View>
        <Text style={styles.heading}>Services</Text>
        <Text style={styles.label}>{item.service}</Text>
        <View style={styles.line} />
        <Text style={styles.heading}>Booking Details</Text>
        <Text style={styles.label}>{item.date}</Text>
        <Text style={styles.label}>{item.time}</Text>
        <View style={styles.line} />
        {item.type === 'annoucement' ? null : (
          <>
            <Text style={styles.heading}>Package</Text>
            <Text style={styles.label}>{`${item.package.title} Package`}</Text>
            {/* <Text style={styles.label}>
              {`${item.package.time} Hours Photoshoot + ${item.package.service} photos edited`}
            </Text> */}
            <View style={styles.line} />
            <Text style={styles.heading}>Bill</Text>
            <Text style={styles.label}>{`${item.package.price}$`}</Text>
            <View style={styles.line} />
          </>
        )}
        <Text style={styles.heading}>Location</Text>
        <View style={styles.mapcontainer}>
          <MapView
            scrollEnabled={false}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude:
                item.location.length === 'undefined' ||
                item.location.length === undefined
                  ? 37.78825
                  : item.location.lat,
              longitude:
                item.location.length === 'undefined' ||
                item.location.length === undefined
                  ? -122.4324
                  : item.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}></MapView>
        </View>
        {item.status === 'Pending' ? (
          <>
            <Text style={styles.SessionText}>Mark as completed?</Text>

            <View style={styles.rowView2}>
              <TouchableOpacity
                style={styles.RejectBtn}
                onPress={() => {
                  props.navigation.navigate('Home');
                }}>
                <Text style={styles.RejectBtnText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.AcceptBtn}
                onPress={async () => {
                  let userId = await getCurrentUserId();
                  let arr = [...data];
                  let index = arr.findIndex(val => val.docId == item.docId);
                  await updateArray(
                    'Bookings',
                    userId,
                    'Bookings',
                    {...item, status: 'Delivered'},
                    index,
                  ).then(() => {
                    RatingRB.current.open();
                  });
                }}>
                <Text style={styles.AcceptBtnText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={styles.completedBtn}
            onPress={() => {
              props.navigation.navigate('Home');
            }}>
            <Text style={styles.completedBtnText}>Completed</Text>
            <Icon
              type="Octicon"
              name="check"
              color={colors.white}
              size={responsiveFontSize(2.5)}
            />
          </TouchableOpacity>
        )}
      </View>
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
        <Text
          style={styles.RateText}>{`Rate ${item.name} out of 5 star?`}</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          selectedStar={async rating => {
            let userId = await getCurrentUserId();
            setRating(rating);
            let id = item.recieved == true ? item.BookedBy : item.RecievedBy;
            await addToArray('users', id, 'rating', {
              id: userId,
              stars: rating,
            }).then(() => {
              RatingRB.current.close();
              props.navigation.navigate('Bookings');
            });
          }}
          starSize={responsiveFontSize(2.5)}
          containerStyle={styles.starContainer}
        />
        <TouchableOpacity
          style={styles.skip}
          onPress={() => {
            RatingRB.current.close();
            props.navigation.navigate('Bookings');
          }}>
          <Text style={styles.EndBtnText}>Skip</Text>
        </TouchableOpacity>
      </RBSheet>
    </ScrollView>
  );
};

export default BookingDetails;
