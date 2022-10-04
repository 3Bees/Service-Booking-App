import React, {useEffect, useState} from 'react';
import {View, Alert, Text, StatusBar, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../globals/utilities/assets';
import {colors} from '../../../globals/utilities/colors';
import {AppButton} from '../../../components/general/button';
import {ATextInput} from '../../../components/general/TextInput';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {WebView} from 'react-native-webview';
import {getCurrentUserId, userSignUp} from '../../../Backend/auth';
import {saveData} from '../../../Backend/utility';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {} from '../../../Backend/auth';
const publishableKey =
  'pk_test_51LM5RzLa8HxjzAgf1A0Xec16Sk0LzCK3tD0mY95pEceXnR5omZy7Tz1v7GtaxxFzq8Rh4BMkftxAS65FSHrFAAXU00djFXs9Ju';
const secretkey =
  'sk_test_51LM5RzLa8HxjzAgfTimbtKyMoFRFFVHGyvSrNcCOKxYY4xq7K1Ys7UTGAyUq3pLqrT70rmS5Ib6lOITRJpk8C0Tc00zEndg1He';
const client_id = 'ca_M4IoBcndgFanTbUDcVenLyEm9Drowo67';
const Signup = props => {
  const [isvisible, setIsvisible] = useState(true);
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [password, setPassword] = useState('');
  const [passworderror, setPassworderror] = useState('');
  const [visible, setVisible] = useState(false);
  const [webViewLoading, setWebViewLoading] = useState(false);
  const [code_Id, setCode_Id] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Validation = () => {
    const re =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    var check = true;
    if (email === '') {
      setemailerror('Enter Email Address');
      check = false;
    } else if (!re.test(email)) {
      setemailerror('Email Format is Invalid');
      check = false;
    } else {
      setemailerror('');
    }
    if (password === '') {
      setPassworderror('Enter Password');
      check = false;
    } else if (password.length < 8) {
      setPassworderror('Minimum 8 Characters');
      check = false;
    } else {
      setPassworderror('');
    }
    return check;
  };

  const injectedJs = `
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location.search));
    `;
  const Signup = async () => {
    if (Validation()) {
      props.navigation.navigate('CreateProfile1', {
        authData: {
          email,
          password,
          agree,
          provider: 'email',
        },
      });

      // await userSignUp(email, password);
      // setVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.white}
        translucent={false}
        barStyle={'dark-content'}
      />

      <View style={styles.wrapper}>
        <Text style={styles.heading}>Sign Up</Text>
        <ATextInput
          placeholder={'Email'}
          image={appImages.emailIcon}
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
        />
        {!emailerror ? null : <Text style={{color: 'red'}}>{emailerror}</Text>}

        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          placeholder={'Password'}
          image={appImages.passwordIcon}
          iconName={isvisible ? 'md-eye' : 'md-eye-off'}
          iconType={'ionicon'}
          secureTextEntry={isvisible}
          eyePress={() => setIsvisible(!isvisible)}
          value={password}
          onChangeText={val => {
            setPassword(val);
          }}
        />
        {!passworderror ? null : (
          <Text style={{color: 'red'}}>{passworderror}</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ForgetPassword');
          }}>
          <Text style={styles.forgetPassBtn}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.rowView}>
          {agree ? (
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => {
                setAgree(false);
              }}>
              <Icon
                name="check"
                type="font-awesome-5"
                color={colors.white}
                size={responsiveFontSize(1)}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.uncheckedBox}
              onPress={() => {
                setAgree(true);
              }}
            />
          )}
          <Text style={styles.agreeText}>I agree to the</Text>
          <TouchableOpacity>
            <Text style={styles.termsText}>
              Terms of Services and Privacy Policy{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: responsiveHeight(6)}} />

        <AppButton
          Title={'Continue'}
          onPress={() => {
            Signup();
          }}
        />
        <View style={{height: responsiveHeight(4)}} />

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Login');
          }}>
          <Text style={styles.alreadyAccount}>
            Already have an account?{' '}
            <Text style={{color: colors.yellow}}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
