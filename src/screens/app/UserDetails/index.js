import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../globals/utilities/assets';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Videos} from '../../../components/general/VideoPlayer';
import Video from 'react-native-video';
import {getCurrentUserId} from '../../../Backend/auth';
import {getData} from '../../../Backend/utility';

const UserDetails = props => {
  const videoPlayer = useRef();
  const {item, type} = props.route.params;
  const [disableBtn, setDisableBtn] = useState(false);
  useEffect(() => {
    Usertype();
  }, []);
  const Usertype = async () => {
    let userId = await getCurrentUserId();
    let userData = await getData('users', userId);
    console.log('====================================');
    console.log(userData?.type, item);
    console.log('====================================');
    // if (item.type == 'SEARCH A SERVICE AS') {
    if (!item.type == 'OFFER A SERVICE AS') {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const [index, setIndex] = useState(0);

  const [allImages, setAllimages] = useState(item.Portfolio);
  const previousImage = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const NextImage = () => {
    if (index < allImages.length - 1) {
      setIndex(index + 1);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <NewHeader title={type} backBtn />
      <TouchableOpacity
        style={styles.rowView}
        onPress={() => {
          props.navigation.navigate('UserProfile', {item});
        }}>
        <Image source={{uri: item.profilePicture}} style={styles.photo} />
        <View>
          <Text
            style={styles.name}>{`${item.firstname} ${item.lastname}`}</Text>
          <Text style={styles.userType}>{item.category}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity
        style={styles.rowView1}
        disabled={disableBtn}
        onPress={() => {
          props.navigation.navigate('UserPackages', {item, type});
        }}>
        <Text style={styles.headings}>Packages</Text>
        <Image source={appImages.cheveronRightY} style={styles.rightArrow} />
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Text style={styles.headings}>Portfolio</Text>

        {item.Portfolio[index].includes('image') ? (
          <ImageBackground
            source={{uri: item.Portfolio[index]}}
            style={styles.image}
            imageStyle={{borderRadius: responsiveWidth(4)}}>
            <TouchableOpacity
              onPress={() => {
                previousImage();
              }}>
              <Image source={appImages.cheveronleft} style={styles.arrowBtn} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                NextImage();
              }}>
              <Image source={appImages.cheveronRight} style={styles.arrowBtn} />
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <>
            <View style={styles.image1}>
              <TouchableOpacity
                onPress={() => {
                  previousImage();
                }}>
                <Image
                  source={appImages.cheveronleft}
                  style={styles.arrowBtn}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  NextImage();
                }}>
                <Image
                  source={appImages.cheveronRight}
                  style={styles.arrowBtn}
                />
              </TouchableOpacity>
            </View>

            <Video
              source={{
                uri: item.Portfolio[index],
              }}
              resizeMode="cover"
              controls={true}
              paused={true}
              poster={
                'https://www.seekpng.com/png/detail/43-439373_white-play-button-png-for-kids-video.png'
              }
              ref={videoPlayer}
              style={{height: responsiveHeight(22), width: responsiveWidth(84)}}
            />
          </>
        )}

        <Text style={styles.headings}>Description</Text>
        <View style={styles.descriptionInput}>
          <Text style={styles.descriptionText}>{`${item?.description}`}</Text>
        </View>
        <Text style={styles.headings}>Location</Text>
        <View style={styles.mapcontainer}>
          {item?.location.latitude && (
            <MapView
              scrollEnabled={false}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: item?.location?.latitude,
                longitude: item?.location?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}></MapView>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserDetails;
