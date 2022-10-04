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
import {appImages} from '../../../../globals/utilities/assets';
import moment from 'moment';
import {colors} from '../../../../globals/utilities/colors';
const ConfirmedBooking = props => {
  const {item, data} = props.route.params;
  var endingDateFormated = moment(item.date, 'Do MMM , YYYY').format(
    'YYYY-MM-DD',
  );
  var endingDate = moment(endingDateFormated).fromNow();
  console.log(endingDate);
  const [confirmationModal, setConfirmationModal] = useState(
    endingDate.includes('in') ? true : false,
  );

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
              item.status == 'Pending'
                ? {color: 'red'}
                : {color: colors.lightGreen},
            ]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.heading}>Services</Text>
        <Text style={styles.label}>{item.service}</Text>
        <View style={styles.line} />
        <Text style={styles.heading}>Booking Details</Text>
        <Text style={styles.label}>{item.date}</Text>
        <Text style={styles.label}>{item.time}</Text>
        <View style={styles.line} />
        <Text style={styles.heading}>Package</Text>
        <Text style={styles.label}>{`${item.package.title} Package`}</Text>
        {/* <Text
          style={styles.label}>{`${item.package.time} Hours photoshoot`}</Text> */}
        <View style={styles.line} />
        <Text style={styles.heading}>Bill</Text>
        <Text style={styles.label}>{`${item.package.price}$`}</Text>
        <View style={styles.line} />
        <Text style={styles.SessionText}>Start Session?</Text>
        <View style={styles.rowView2}>
          <TouchableOpacity
            style={styles.RejectBtn}
            onPress={() => {
              props.navigation.navigate('Bookings');
            }}>
            <Text style={styles.RejectBtnText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.AcceptBtn}
            onPress={() => {
              props.navigation.navigate('Studio', {data, item});
            }}>
            <Text style={styles.AcceptBtnText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={confirmationModal} transparent={true}>
        <View style={styles.modalWrapper}>
          <View style={styles.Modalbackground}>
            <View style={styles.texasads}>
              <Text style={styles.confirmationMessage}>
                {`Your Session with ${item.name} is About to Start`}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.goBtn}
              onPress={() => {
                setConfirmationModal(false);
              }}>
              <Text style={styles.AcceptBtnText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ConfirmedBooking;
