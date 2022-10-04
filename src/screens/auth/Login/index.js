import React, {useEffect, useState} from 'react';
import {View, Image, Text, StatusBar, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../globals/utilities/assets';
import {colors} from '../../../globals/utilities/colors';
import {AppButton} from '../../../components/general/button';
import {ATextInput} from '../../../components/general/TextInput';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {signInWithEmail} from '../../../Backend/auth';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = props => {
  const [isvisible, setIsvisible] = useState(true);
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [password, setPassword] = useState('');
  const [passworderror, setPassworderror] = useState('');
  const [loading, setLoading] = useState(false);

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
    } else {
      setPassworderror('');
    }
    return check;
  };
  const Login = async () => {
    if (Validation()) {
      setLoading(true);
      let isAuthenticated = await signInWithEmail(email, password);
      console.log(isAuthenticated);
      if (isAuthenticated) {
        await AsyncStorage.setItem('email', email);
        props.navigation.navigate('App');
      }
      setLoading(false);
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
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.greetingsText}>
          Hi there! Nice to see you again
        </Text>
        <View style={{height: responsiveHeight(2)}} />
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
        <View style={{height: responsiveHeight(2)}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Signup');
          }}>
          <Text style={styles.alreadyAccount}>
            Don’t have an account?{' '}
            <Text style={{color: colors.yellow}}>Sign up</Text>
          </Text>
        </TouchableOpacity>
        <View style={{height: responsiveHeight(2)}} />

        <AppButton
          activity={loading}
          Title={'Sign In'}
          onPress={async () => {
            Login();
          }}
        />
        <View style={{height: responsiveHeight(4)}} />
      </View>
    </View>
  );
};

export default Login;
