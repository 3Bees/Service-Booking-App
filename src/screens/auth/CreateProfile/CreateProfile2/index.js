import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import {styles} from './style';
import {AppButton} from '../../../../components/general/button';
import {NewHeader} from '../../../../components/general/header';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {launchImageLibrary} from 'react-native-image-picker';
import {uriToBlob, saveData, downloadImage} from '../../../../Backend/utility';
import {storage} from '../../../../Backend/firebaseConfig';
import {getCurrentUserId, userSignUp} from '../../../../Backend/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import {WebView} from 'react-native-webview';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
const publishableKey =
  'pk_test_51LM5RzLa8HxjzAgf1A0Xec16Sk0LzCK3tD0mY95pEceXnR5omZy7Tz1v7GtaxxFzq8Rh4BMkftxAS65FSHrFAAXU00djFXs9Ju';
const secretkey =
  'sk_test_51LM5RzLa8HxjzAgfTimbtKyMoFRFFVHGyvSrNcCOKxYY4xq7K1Ys7UTGAyUq3pLqrT70rmS5Ib6lOITRJpk8C0Tc00zEndg1He';
const client_id = 'ca_M4IoBcndgFanTbUDcVenLyEm9Drowo67';
const CreateProfile2 = props => {
  const {usertype, password, data, provider} = props.route.params;
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [visible, setVisible] = useState(false);
  const [webViewLoading, setWebViewLoading] = useState(false);
  const [code_Id, setCode_Id] = useState('');
  const [userFcmToken, setuserFcmToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    getFcmToken();
    getLocation();
  }, []);
  const getUserBankDetails = async () => {
    setLoading(false);
    await AsyncStorage.setItem('email', data.email);
    props.navigation.navigate('BankToken');
    // setVisible(true);
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log(position, 'This is Location');
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setPosition(currentLocation);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setuserFcmToken(fcmToken);
    }
  };
  const Gallery = () => {
    var options = {
      title: 'Profile Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        //setFilePath(response);
        console.log('>>>>>>>>>>>>', response);
        let arr = [...image];
        setImage(response.assets[0].uri);
        saveImage(response.assets[0]);
      }
    });
  };
  const saveImage = async response => {
    setLoading(true);
    const profileImageResponse = response;
    let postObj = new Object();
    var today = new Date();
    var mili = today.getMilliseconds();
    let kk = Date.parse(today);
    kk = kk + mili;
    let responseloc = profileImageResponse;
    console.log('r4', responseloc);
    let image = responseloc.uri;
    let imagePath = kk;
    let file = await uriToBlob(image);
    const uploadTask = storage.ref(`Image/${imagePath}`).put(file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        if (progress == 100) {
        }
      },
      error => {
        console.log('error 1', error);
        setLoading(false);
      },
      async () => {
        await downloadImage('Image', imagePath).then(async uri => {
          if (uri) {
            setLoading(false);
            setImage(uri);
            console.log('uri==', uri);
          }
        });
      },
    );
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Create Profile'} backBtn />
      <Text style={styles.heading}>Profile Photo</Text>
      {image === '' ? (
        <View style={styles.grayView} />
      ) : (
        <Image source={{uri: image}} style={styles.grayView} />
      )}
      {image === '' ? (
        <>
          <View style={{height: responsiveHeight(15)}} />
          <AppButton
            Title={'Choose a photo'}
            onPress={() => {
              Gallery();
            }}
          />
        </>
      ) : (
        <View>
          <View style={{height: responsiveHeight(15)}} />
          <AppButton
            Title={'Save'}
            activity={loading}
            onPress={async () => {
              if (usertype === 'SEARCH FOR  A SERVICE AS') {
                setLoading(true);
                if (provider === 'socail') {
                  let userID = await getCurrentUserId();
                  let obj = data;
                  obj.id = userID;
                  obj.rating = [];
                  obj.profilePicture = image;
                  obj.location = position;
                  obj.fcmToken = userFcmToken;

                  await saveData('users', userID, obj).then(async () => {
                    setLoading(false);
                    await AsyncStorage.setItem('email', data.email);
                    setLoading(false);
                    props.navigation.navigate('App');
                  });
                  setLoading(false);
                } else {
                  await userSignUp(data.email, password).then(async e => {
                    let userid = await getCurrentUserId();
                    let obj = data;
                    obj.id = userid;
                    obj.rating = [];
                    obj.profilePicture = image;
                    obj.location = position;
                    obj.fcmToken = userFcmToken;
                    console.log('error', e);
                    if (e !== 'error') {
                      await saveData('users', userid, obj).then(async () => {
                        await AsyncStorage.setItem('email', data.email);
                        props.navigation.navigate('App');
                      });
                    }
                    setLoading(false);
                  });
                }
              } else {
                props.navigation.navigate('AddPortfolio', {
                  data,
                  password,
                  image,
                  provider,
                  usertype,
                });
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

export default CreateProfile2;
