import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {Data} from '../../../../services/app/Annoucement';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import {colors} from '../../../../globals/utilities/colors';
import {appImages} from '../../../../globals/utilities/assets';
import moment from 'moment';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {AppButton} from '../../../../components/general/button';
import {addToArray, getData, saveData} from '../../../../Backend/utility';
import {getCurrentUserId} from '../../../../Backend/auth';
import Toast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
const AnnoucementDetails = props => {
  const {item} = props.route.params;
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userFcmToken, setuserFcmToken] = useState('');
  useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setuserFcmToken(fcmToken);
    }
  };
  const ApplyAnnoucement = async () => {
    let userId = await getCurrentUserId();
    await getData('users', userId).then(async userDetails => {
      let arr = item.responces;
      let found = arr.findIndex(value => value.userId === userId);
      console.log(found);
      if (found === -1) {
        setLoading(true);
        arr.push({
          userId: userDetails.id,
          name: `${userDetails.firstname} ${userDetails.lastname}`,
          photo: userDetails.profilePicture,
          service: userDetails.category,
          applyBy: userFcmToken,
          //   accepted: false,
        });
        await saveData('Annoucements', item.docId, {
          responces: arr,
        }).then(async () => {
          addToArray('Notification', item.userId, 'Notification', {
            userId: userDetails.id,
            name: `${userDetails.firstname} ${userDetails.lastname}`,
            docId: item.docId,
            title: item.title,
            type: 'annoucementrequest',
            time: moment(new Date()).format(),
          }).then(() => {
            setConfirmationModal(false);
            Toast.show('Successfully Applied');
            props.navigation.navigate('Success');
            setLoading(false);
          });
        });
      } else {
        Toast.show('Already Applied');
        setConfirmationModal(false);
      }
    });
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Annoucement'} backBtn />
      <View style={styles.MainView}>
        <View style={styles.imageview1}>
          <Image source={{uri: item.picture}} style={styles.photo} />
        </View>
        <View style={styles.detailsView}>
          <Text style={styles.name}>{item.userName}</Text>
          <View style={styles.rowView}>
            <View>
              <Text style={styles.userType}>{item.category}</Text>
            </View>
            <Text style={styles.time}>{moment(item.posted).fromNow()}</Text>
          </View>
          <Text style={styles.name}>{item.title}</Text>

          <Text style={styles.description}>{item.description}</Text>
          {/* <Image
            source={appImages.annoucement}
            style={styles.annoucementImage}
          /> */}
        </View>
      </View>
      <Text style={styles.locationText}>Location</Text>
      <View style={styles.mapcontainer}>
        <MapView
          scrollEnabled={true}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
          style={styles.map}
          // liteMode
          region={{
            latitude: item?.location.lat,
            longitude: item?.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: item.location.lat,
              longitude: item.location.lng,
            }}>
            <Icon
              type={'ionicon'}
              name={'location'}
              color={'blue'}
              size={responsiveFontSize(3)}
            />
          </Marker>
        </MapView>
      </View>
      <AppButton
        Title={'Apply'}
        ButtonStyles={styles.applyBtn}
        TitleStyles={styles.applyBtnText}
        onPress={() => {
          setConfirmationModal(true);
        }}
      />
      <Modal visible={confirmationModal} transparent={true}>
        <View style={styles.modalWrapper}>
          <View style={styles.Modalbackground}>
            <Text style={styles.confirmationMessage}>
              {'Are you sure you want to apply for this annoucement?'}
            </Text>
            <View style={styles.BtnsView}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  disabled={loading}
                  style={styles.RejectBtn}
                  onPress={() => {
                    setConfirmationModal(false);
                  }}>
                  <Text style={styles.RejectBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={loading}
                  style={styles.AcceptBtn}
                  onPress={() => {
                    ApplyAnnoucement();
                  }}>
                  {loading ? (
                    <ActivityIndicator color={colors.white} size={'small'} />
                  ) : (
                    <Text style={styles.AcceptBtnText}>Apply</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AnnoucementDetails;
