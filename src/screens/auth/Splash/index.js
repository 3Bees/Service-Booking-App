import React, {useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../globals/utilities/assets';
import {colors} from '../../../globals/utilities/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {saveData} from '../../../Backend/utility';
const Splash = props => {
  useEffect(() => {
    Permissions();
  }, []);
  const Permissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        authState();
      } else {
        console.log('Location permission denied');
        Toast.show('Allow Location Permission From Settings');
        BackHandler.exitApp();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const authState = async () => {
    let value = await AsyncStorage.getItem('email');
    if (value !== null) {
      setTimeout(() => {
        props.navigation.navigate('App');
      }, 2000);
    } else {
      setTimeout(() => {
        props.navigation.navigate('onBoarding');
      }, 2000);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.white}
        translucent={false}
        barStyle={'dark-content'}
      />
      <Image source={appImages.logo} style={styles.logo} />
    </View>
  );
};

export default Splash;
