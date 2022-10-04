import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import TimePicker from 'react-native-wheel-time-picker';

import {colors} from '../../../../globals/utilities/colors';
import {appImages} from '../../../../globals/utilities/assets';
import {fontFamily} from '../../../../globals/utilities/fonts';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
const AddLocation = props => {
  const {value} = props.route.params;
  const [place, setPlace] = useState('');
  const ref = useRef();

  return (
    <View style={styles.container}>
      <NewHeader title={'Add Location'} backBtn />
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <View style={styles.Button}>
          <View style={styles.RowView}>
            {/* <Image source={appImages.locationIcon} style={styles.icon} />
            <TextInput
              style={styles.btnText}
              value={place}
              onChangeText={val => {
                setPlace(val);
              }}
            /> */}
            <GooglePlacesAutocomplete
              renderLeftButton={() => {
                return (
                  <Image source={appImages.locationIcon} style={styles.icon} />
                );
              }}
              ref={ref}
              fetchDetails
              placeholder="Add Place"
              textInputProps={{
                placeholderTextColor: colors.grayText,
              }}
              enableHighAccuracyLocation
              enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                // console.log(data, '\nss', details);
                setPlace({
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                  title: data.description,
                });
              }}
              styles={styles.btnText}
              query={{
                key: 'AIzaSyDOg2g1eycO5Z3wnr9F8Mdt-ryTJWgPQT8',
                language: 'en',
              }}
            />
          </View>
        </View>
        <View style={{height: responsiveHeight(50)}} />
      </ScrollView>
      {place === '' ? null : (
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => {
            props.navigation.navigate('CreateAnnoucement', {
              location: place,
              value,
            });
          }}>
          <Text style={styles.OkBtn}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddLocation;
