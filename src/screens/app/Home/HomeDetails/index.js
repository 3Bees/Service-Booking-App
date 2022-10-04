import React, {useEffect, useState} from 'react';
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
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {appImages} from '../../../../globals/utilities/assets';
import {colors} from '../../../../globals/utilities/colors';
import {getCurrentUserId} from '../../../../Backend/auth';
import {saveData, updateArray} from '../../../../Backend/utility';
import moment from 'moment';
const HomeDetails = props => {
  const {item, data} = props.route.params;

  const [confirmation, setConfirmation] = useState(
    item.accepted == 'Pending' ? false : true,
  );

  const storeconfirmBookingNotification = async item => {
    console.log('item', item);
    if (
      item.type === 'Photographer' ||
      item.type === 'Videographer' ||
      item.type === 'Studio' ||
      item.type === 'Models'
    ) {
      let timeStamp = moment().format('HHMMss');
      let obj = {
        fcmToken: item.fcmToken,
        name: item.name,
        timeStamp: timeStamp,
        orderType: item.type,
      };
      await saveData('orderConfirmationNotification', item.BookedBy, obj);
    }
  };
  const confirmBooking = async () => {
    let userId = await getCurrentUserId();
    let arr = [...data];
    let index = arr.findIndex(val => val.docId == item.docId);
    await updateArray(
      'Bookings',
      userId,
      'Bookings',
      {...item, accepted: 'Delivered'},
      index,
    ).then(async () => {
      await storeconfirmBookingNotification(item);
      if (item.type == 'Studio') {
        props.navigation.navigate('Studio', {data, item});
      } else {
        props.navigation.navigate('Home');
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      <NewHeader title={'Bookings'} />
      <View style={styles.wrapper}>
        <View style={styles.rowView}>
          <View style={styles.rowView1}>
            <Image source={{uri: item.photo}} style={styles.photo} />
            <Text style={styles.username}>{item.name}</Text>
          </View>
          <Text
            style={[
              styles.statusText,
              {color: item.accepted != 'Pending' ? colors.lightGreen : 'red'},
            ]}>
            {item.accepted != 'Pending' ? 'Confirmed' : 'Pending'}
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

            <View style={styles.line} />
            <Text style={styles.heading}>Bill</Text>
            <Text style={styles.label}>{`${item.package.price} $`}</Text>
            <View style={styles.line} />
          </>
        )}
        {item.accepted == 'Pending' ? (
          <>
            <Text style={styles.SessionText}>Confirm Booking?</Text>

            <View style={styles.rowView2}>
              <TouchableOpacity
                style={styles.RejectBtn}
                onPress={() => {
                  props.navigation.navigate('Home');
                }}>
                <Text style={styles.RejectBtnText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.AcceptBtn}
                onPress={() => confirmBooking()}>
                <Text style={styles.AcceptBtnText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default HomeDetails;
