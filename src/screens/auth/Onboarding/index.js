import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../globals/utilities/assets';
import {colors} from '../../../globals/utilities/colors';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentUserId} from '../../../Backend/auth';
import {getData} from '../../../Backend/utility';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
const Onboarding = props => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '533412933327-cu2d33i20hiffdqhvpjvl32lsg70bd60.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
    });
  }, []);
  const Googlelogin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth()
        .signInWithCredential(googleCredential)
        .then(async data => {
          setLoading(true);
          let userID = await getCurrentUserId();
          console.log(userID);
          await getData('users', userID).then(async res => {
            console.log(res);
            if (res == false) {
              setLoading(false);
              props.navigation.navigate('CreateProfile1', {
                authData: {
                  email: data.additionalUserInfo.profile.email,
                  password: data.additionalUserInfo.profile.email,
                  agree: true,
                  provider: 'socail',
                },
              });
            } else {
              await AsyncStorage.setItem(
                'email',
                data.additionalUserInfo.profile.email,
              ).then(() => {
                setLoading(false);
                props.navigation.navigate('App');
              });
            }
          });
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const Facebooklogin = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
        // 'user_friends',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return await auth()
        .signInWithCredential(facebookCredential)
        .then(async data => {
          let userID = await getCurrentUserId();
          await getData('users', userID).then(async res => {
            console.log(res);
            if (res == false) {
              setLoading(false);
              props.navigation.navigate('CreateProfile1', {
                authData: {
                  email: data.additionalUserInfo.profile.email,
                  password: data.additionalUserInfo.profile.email,
                  agree: true,
                  provider: 'socail',
                },
              });
            } else {
              await AsyncStorage.setItem(
                'email',
                data.additionalUserInfo.profile.email,
              ).then(() => {
                setLoading(false);
                props.navigation.navigate('App');
              });
            }
          });
        });
    } catch (error) {
      // Toast.show(error, Toast.SHORT);
      console.log('ERROR FROM FB LOGIN++', error);
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
      <Text style={styles.heading}>Make it Happen</Text>
      <TouchableOpacity
        style={styles.Button}
        disabled={loading}
        onPress={() => {
          props.navigation.navigate('Signup');
        }}>
        <Text style={styles.btnLabelBold}>Sign up with Email ID</Text>
      </TouchableOpacity>
      <View style={styles.rowView}>
        <TouchableOpacity
          style={styles.ButtonSmall}
          disabled={loading}
          onPress={() => Facebooklogin()}>
          {loading ? (
            <ActivityIndicator color={colors.black} size={'small'} />
          ) : (
            <>
              <Image source={appImages.fbIcon} style={styles.btnIcons} />
              <Text style={styles.btnLabel}>Facebook</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtonSmall}
          disabled={loading}
          onPress={() => {
            Googlelogin();
          }}>
          {loading ? (
            <ActivityIndicator color={colors.black} size={'small'} />
          ) : (
            <>
              <Image source={appImages.googleIcon} style={styles.btnIcons} />
              <Text style={styles.btnLabel}>Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => {
          props.navigation.navigate('Login');
        }}>
        <Text style={styles.loginBtn}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;
