import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import moment from 'moment';
import {getCurrentUserId} from '../../../../Backend/auth';
import {getData} from '../../../../Backend/utility';
import uuid from 'react-native-uuid';
const OrderSummary = props => {
  const {value, packageDetails, item, type, location} = props.route.params;
  return (
    <View style={styles.container}>
      <NewHeader title={'Order Summary'} backBtn />
      <View style={styles.rowView}>
        <View style={styles.imageView}>
          <Image source={{uri: item.profilePicture}} style={styles.photo} />
        </View>
        <View>
          <Text
            style={styles.name}>{`${item.firstname} ${item.lastname}`}</Text>
          <Text style={styles.userType}>{`${
            item.category === 'Photo' || item.category === 'Video'
              ? `${item.category}grapher`
              : `${item.category}`
          }`}</Text>
        </View>
      </View>
      <Text style={styles.boldHeading}>Services</Text>
      <Text style={styles.label}>{`${type}`}</Text>
      <Text style={styles.boldHeading}>Date & Time</Text>
      <Text style={styles.label}>
        {moment(value.date).format('Do MMM , YYYY')}
      </Text>
      <Text style={styles.label}>
        {/* {moment(value.time, 'hhmm').format('LT')} */}
        {value.time}
      </Text>
      <Text style={styles.boldHeading}>Package</Text>
      <Text style={styles.label}>{packageDetails.title + ' Package'}</Text>
      <Text style={styles.boldHeading}>Total</Text>
      <Text style={styles.label}>{packageDetails.price + '$ only'}</Text>
      <TouchableOpacity
        style={styles.doneBtn}
        onPress={async () => {
          let userId = await getCurrentUserId();
          const myData = await getData('users', userId);
          let docId = uuid.v4();
          props.navigation.navigate('PaymentMethod', {
            obj: {
              name: `${item.firstname} ${item.lastname}`,
              date: moment(value.date).format('Do MMM , YYYY'),
              time: value.time,
              location: location,
              photo: item.profilePicture,
              BookedBy: myData.id,
              RecievedBy: item.id,
              recieved: true,
              type: type,
              status: 'Pending',
              accepted: 'Pending',
              service: type,
              docId: docId,
              package: packageDetails,
            },
            obj2: {
              name: `${myData.firstname} ${myData.lastname}`,
              date: moment(value.date).format('Do MMM , YYYY'),
              time: value.time,
              location: location,
              photo: myData.profilePicture,
              BookedBy: myData.id,
              RecievedBy: item.id,
              recieved: false,
              type: type,
              status: 'Pending',
              accepted: 'Pending',
              service: type,
              docId: docId,
              package: packageDetails,
            },
            id: item.id,
          });
        }}>
        <Text style={styles.OkBtn}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSummary;
