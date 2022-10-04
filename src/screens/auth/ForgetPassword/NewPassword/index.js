import React, {useEffect, useState} from 'react';
import {View, Image, Text, StatusBar, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../../globals/utilities/assets';
import {colors} from '../../../../globals/utilities/colors';
import {NewButton} from '../../../../components/general/button';
import {WhiteTextInput} from '../../../../components/general/TextInput';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements/dist/icons/Icon';
const NewPassword = props => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const Validation = () => {
    var check = true;
    if (newPassword === '') {
      setNewPasswordError('Enter New Password');
      check = false;
    } else if (newPassword.length < 8) {
      setNewPasswordError('Minimum 8 Characters');
      check = false;
    } else {
      setNewPasswordError('');
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Password Does not Match');
      check = false;
    } else {
      setConfirmPasswordError('');
    }
    return check;
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.black}
        translucent={false}
        barStyle={'light-content'}
      />
      <Image source={appImages.editCredentials} style={styles.logo} />
      <Text style={styles.boldText}>{'NEW\nCREDENTIALS'}</Text>
      <View style={{height: responsiveHeight(2)}} />
      <WhiteTextInput
        placeholder={'New Password'}
        image={appImages.lockSmall}
        value={newPassword}
        onChangeText={val => {
          setNewPassword(val);
        }}
      />
      {!newPasswordError ? null : (
        <Text style={{color: 'red', marginLeft: responsiveWidth(5)}}>
          {newPasswordError}
        </Text>
      )}
      <View style={{height: responsiveHeight(2)}} />
      <WhiteTextInput
        placeholder={'Confirm Password'}
        image={appImages.lockSmall}
        value={confirmPassword}
        onChangeText={val => {
          setConfirmPassword(val);
        }}
      />
      {!confirmPasswordError ? null : (
        <Text style={{color: 'red', marginLeft: responsiveWidth(5)}}>
          {confirmPasswordError}
        </Text>
      )}
      <View style={{height: responsiveHeight(4)}} />
      <NewButton
        Title={'Next'}
        onPress={() => {
          if (Validation()) {
            props.navigation.navigate('PasswordChanged');
          }
        }}
      />
    </View>
  );
};
export default NewPassword;
