import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {Data} from '../../../../services/app/Home';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../../../globals/utilities/colors';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {appImages} from '../../../../globals/utilities/assets';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
const APIKEY = 'AIzaSyDOg2g1eycO5Z3wnr9F8Mdt-ryTJWgPQT8';
Geocoder.init(APIKEY, {language: 'en'});
import {Icon} from 'react-native-elements';
const SelectLocation = props => {
  const ref = useRef();
  const nearByUrl =
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
  const coordReverseUrl =
    'https://maps.googleapis.com/maps/api/geocode/json?address=';
  const {packageDetails, value, item, type} = props.route.params;
  const [loader, setLoader] = useState(true);
  const [location, setLocation] = useState({});
  const [data, setData] = useState('');
  const [searchValue, setsearchValue] = useState('');
  useEffect(() => {
    fetchNearestPlacesFromGoogle();
  }, []);
  const getLocationFromlang = async e => {
    let loc = e.nativeEvent.coordinate;
    const url =
      coordReverseUrl + loc.latitude + ',' + loc.longitude + '&key=' + APIKEY;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 'OK') {
          // setsearchValue(responseJson?.results?.[0]?.formatted_address);
          ref.current.setAddressText(
            responseJson?.results?.[1]?.formatted_address,
          );
          ref.current.focus();
        } else {
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const fetchNearestPlacesFromGoogle = () => {
    Geolocation.getCurrentPosition(
      async position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let radMetter = 2 * 1000;
        const url =
          nearByUrl +
          latitude +
          ',' +
          longitude +
          '&radius=' +
          radMetter +
          '&key=' +
          APIKEY;

        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(res => {
            var places = [];
            for (let googlePlace of res.results) {
              var place = {};
              var lat = googlePlace.geometry.location.lat;
              var lng = googlePlace.geometry.location.lng;
              var coordinate = {
                lat: lat,
                lng: lng,
              };
              place['placeTypes'] = googlePlace.types;
              place['coordinate'] = coordinate;
              place['placeId'] = googlePlace.place_id;
              place['placeName'] = googlePlace.name;
              places.push(place);
            }
            setData(places);
            setLoader(false);
          })
          .catch(error => {
            console.log(error);
          });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  if (loader) {
    return (
      <ActivityIndicator
        color={colors.black}
        size={'large'}
        style={{marginTop: responsiveHeight(50)}}
      />
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <StatusBar
          backgroundColor={colors.black}
          barStyle={'light-content'}
          translucent={false}
        />
        <View style={styles.header}>
          <View style={styles.rowView}>
            <Image source={packageDetails.photo} style={styles.photo} />
            <Text style={styles.name}>{packageDetails.name}</Text>
          </View>
          <Icon
            type="materialIcons"
            name="location-on"
            color={colors.yellow}
            size={responsiveFontSize(3.5)}
          />
        </View>
        <Text style={styles.heading}>
          Where would you like to shoot?{'\t\t'}
          <Text style={styles.optional}>(optional)</Text>
        </Text>
        <View style={styles.mapcontainer}>
          <MapView
            scrollEnabled={true}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
            style={styles.map}
            // liteMode
            region={{
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              draggable
              onDragEnd={e => getLocationFromlang(e)}
              coordinate={{
                latitude: location.lat,
                longitude: location.lng,
              }}>
              <Image source={appImages.locationPin} style={styles.pin} />
            </Marker>
          </MapView>
          <View style={styles.inputView}>
            <GooglePlacesAutocomplete
              renderLeftButton={() => {
                return (
                  <Image
                    source={appImages.searchIcon}
                    style={styles.searchIcon}
                  />
                );
              }}
              renderRightButton={() => {
                return (
                  <Icon
                    type="materialIcons"
                    name="location-on"
                    color={colors.yellow}
                    size={responsiveFontSize(3.5)}
                    style={{
                      marginTop: responsiveHeight(1.5),
                    }}
                  />
                );
              }}
              ref={ref}
              fetchDetails
              placeholder={searchValue.length > 0 ? searchValue : 'Search'}
              getDefaultValue={() => {
                return searchValue; // text input default value
              }}
              textInputProps={{
                placeholderTextColor: colors.darkGray,
                color: colors.darkGray,
              }}
              enableHighAccuracyLocation
              enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                props.navigation.navigate('OrderSummary', {
                  value,
                  packageDetails,
                  item,
                  type,
                  location: details.geometry.location,
                });
                setLocation(details.geometry.location);
              }}
              listView={{color: 'black'}}
              styles={{...styles.input, description: {color: 'black'}}}
              query={{key: APIKEY, language: 'en'}}
            />
          </View>
        </View>
        <View style={styles.btns}>
          <Text style={styles.boldHeading}>Nearby Places</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => {
            item.id;
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.btns}
                onPress={() => {
                  props.navigation.navigate('OrderSummary', {
                    value,
                    packageDetails,
                    item: props.route.params.item,
                    type,
                    location: item.coordinate,
                  });
                }}>
                {console.log('item', item)}
                <Text style={styles.title}>{item.placeName}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => {
          props.navigation.navigate('OrderSummary', {
            value,
            packageDetails,
            item,
            type,
            location: {},
          });
        }}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectLocation;
