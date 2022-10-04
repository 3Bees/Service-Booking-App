import React, {useEffect, useState, useRef} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../../globals/utilities/assets';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Icon} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors} from '../../../../globals/utilities/colors';
import {ScrollView} from 'react-native-gesture-handler';

const Location = props => {
  const {type} = props.route.params;
  const ref = useRef();
  const [state, setstate] = useState({});
  return (
    <View style={styles.container}>
      <NewHeader title={'Select Location'} backBtn />
      <View style={styles.mapcontainer}>
        <MapView
          scrollEnabled={true}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
          style={styles.map}
          // liteMode
          region={{
            latitude: !state.length ? 37.78825 : state.lat,
            longitude: !state.length ? -122.4324 : state.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            draggable
            coordinate={{
              latitude: !state.length ? 37.78825 : state.lat,
              longitude: !state.length ? -122.4324 : state.lng,
            }}>
            <Image source={appImages.locationPin} style={styles.pin} />
          </Marker>
        </MapView>
      </View>
      <View style={styles.whiteView}>
        {/* <View>
            <Text style={styles.boldHeading}>Covent Garden,</Text>
            <Text style={styles.grayHeading}>London, United Kingdom</Text>
          </View> */}
        <GooglePlacesAutocomplete
          renderRightButton={() => {
            return (
              <TouchableOpacity
                style={styles.greaterThanBtn}
                onPress={() => {
                  props.navigation.navigate('SearchDetails', {
                    type,
                    location: state,
                  });
                }}>
                <Image
                  source={appImages.greaterThan}
                  style={styles.greaterThan}
                />
              </TouchableOpacity>
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
            //   console.log(data, '\nss', details);
            setstate({
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
              title: data.description,
            });
          }}
          styles={styles.input}
          query={{
            key: 'AIzaSyDOg2g1eycO5Z3wnr9F8Mdt-ryTJWgPQT8',
            language: 'en',
          }}
        />
      </View>
    </View>
  );
};

export default Location;
