import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../../globals/utilities/assets';
import {colors} from '../../../../globals/utilities/colors';
import {AppButton} from '../../../../components/general/button';
import {ATextInput} from '../../../../components/general/TextInput';
import {NewHeader} from '../../../../components/general/header';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {NewPackages} from '../../../../services/auth';
import {saveData} from '../../../../Backend/utility';
import {getCurrentUserId, userSignUp} from '../../../../Backend/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
const publishableKey =
  'pk_test_51LM5RzLa8HxjzAgf1A0Xec16Sk0LzCK3tD0mY95pEceXnR5omZy7Tz1v7GtaxxFzq8Rh4BMkftxAS65FSHrFAAXU00djFXs9Ju';
const secretkey =
  'sk_test_51LM5RzLa8HxjzAgfTimbtKyMoFRFFVHGyvSrNcCOKxYY4xq7K1Ys7UTGAyUq3pLqrT70rmS5Ib6lOITRJpk8C0Tc00zEndg1He';
const client_id = 'ca_M4IoBcndgFanTbUDcVenLyEm9Drowo67';
const AddPortfolio1 = props => {
  const {images, details, password, image} = props.route.params;
  const [allImages, setAllimages] = useState(images);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(NewPackages);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('Premium');
  const [position, setPosition] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [webViewLoading, setWebViewLoading] = useState(false);
  const [code_Id, setCode_Id] = useState('');
  const [userFcmToken, setuserFcmToken] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getFcmToken();
    getLocation();
  }, []);
  const getUserBankDetails = async () => {
    setLoading(false);
    await AsyncStorage.setItem('email', details.email);
    props.navigation.navigate('BankToken');
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
  const ChangeNewPrice = val => {
    let arr = [...data];
    if (tab === 'Premium') {
      arr[0].Price = val;
      setData(arr);
    } else if (tab === 'Standard') {
      arr[1].Price = val;
      setData(arr);
    } else {
      arr[2].Price = val;
      setData(arr);
    }
  };
  const ChangeDescription = val => {
    let arr = [...data];
    if (tab === 'Premium') {
      arr[0].description = val;
      setData(arr);
    } else if (tab === 'Standard') {
      arr[1].description = val;
      setData(arr);
    } else {
      arr[2].description = val;
      setData(arr);
    }
  };
  const uploadinfoToFirebase = async () => {
    if (!data[0]?.Price || !data[1]?.Price || !data[2]?.Price) {
      Toast.show('Please fill packages prices', 1000);
    } else {
      setLoading(true);
      await userSignUp(details.email, password).then(async e => {
        let userid = await getCurrentUserId();
        let obj = details;
        obj.id = userid;
        obj.rating = [];
        obj.profilePicture = image;
        obj.location = position;
        obj.fcmToken = userFcmToken;
        if (e !== 'error') {
          await saveData('users', userid, {
            ...obj,
            Packages: data,
            Portfolio: images,
          }).then(async () => {
            await getUserBankDetails();
          });
        }
        setLoading(false);
      });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <NewHeader title={'Add a portfolio'} backBtn />
      <View style={styles.tabsView}>
        <TouchableOpacity
          onPress={() => {
            setTab('Premium');
          }}>
          <Text style={tab === 'Premium' ? styles.active : styles.inactive}>
            Premium
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab('Standard');
          }}>
          <Text style={tab === 'Standard' ? styles.active : styles.inactive}>
            Standard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab('Basic');
          }}>
          <Text style={tab === 'Basic' ? styles.active : styles.inactive}>
            Basic
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>
          {tab === 'Premium'
            ? 'Make a Premium Package'
            : tab === 'Standard'
            ? 'Make a Standard Package'
            : 'Make a Basic Package'}
        </Text>
      </View>
      {tab === 'Premium' ? (
        <>
          <View style={{height: responsiveHeight(1)}} />
          <Text style={styles.mediumHeading}>Price</Text>

          <ATextInput
            placeholder={'Price'}
            image={appImages.emailIcon}
            value={data[0].Price}
            onChangeText={val => {
              ChangeNewPrice(val);
            }}
          />
          <View style={{height: responsiveHeight(2)}} />

          <Text style={styles.mediumHeading}>Description</Text>

          <View style={styles.descriptionInput}>
            <TextInput
              placeholder="Description"
              multiline={true}
              value={data[0].description}
              onChangeText={val => ChangeDescription(val)}
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>
        </>
      ) : tab === 'Standard' ? (
        <>
          <View style={{height: responsiveHeight(1)}} />
          <Text style={styles.mediumHeading}>Price</Text>

          <ATextInput
            placeholder={'Price'}
            image={appImages.emailIcon}
            value={data[1].Price}
            onChangeText={val => {
              ChangeNewPrice(val);
            }}
          />
          <View style={{height: responsiveHeight(2)}} />

          <Text style={styles.mediumHeading}>Description</Text>

          <View style={styles.descriptionInput}>
            <TextInput
              placeholder="Description"
              multiline={true}
              value={data[1].description}
              onChangeText={val => ChangeDescription(val)}
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>
        </>
      ) : (
        <>
          <View style={{height: responsiveHeight(1)}} />
          <Text style={styles.mediumHeading}>Price</Text>

          <ATextInput
            placeholder={'Price'}
            image={appImages.emailIcon}
            value={data[2].Price}
            onChangeText={val => {
              ChangeNewPrice(val);
            }}
          />
          <View style={{height: responsiveHeight(2)}} />

          <Text style={styles.mediumHeading}>Description</Text>

          <View style={styles.descriptionInput}>
            <TextInput
              placeholder="Description"
              multiline={true}
              value={data[2].description}
              onChangeText={val => ChangeDescription(val)}
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>
        </>
      )}
      <View style={{height: responsiveHeight(5)}} />
      <AppButton
        Title={'Add a portfolio'}
        onPress={() => {
          //   Gallery();
        }}
      />
      <Text style={styles.heading}>Portfolio</Text>
      <View style={styles.ImageView}>
        <ImageBackground source={{uri: allImages[index]}} style={styles.image}>
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
      </View>
      <TouchableOpacity
        disabled={loading}
        style={styles.nextBtn}
        onPress={async () => {
          uploadinfoToFirebase();
        }}>
        {loading ? (
          <ActivityIndicator color={colors.white} size={'small'} />
        ) : (
          <Image source={appImages.greaterThan} style={styles.greaterThan} />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddPortfolio1;
