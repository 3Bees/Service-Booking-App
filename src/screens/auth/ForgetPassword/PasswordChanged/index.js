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
const PasswordChanged = props => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.black}
        translucent={false}
        barStyle={'light-content'}
      />
      <Text style={styles.boldText}>{'PASSWORD\nUPDATED'}</Text>
      <Image source={appImages.circleCheck} style={styles.logo} />
      <View style={{height: responsiveHeight(1)}} />
      <NewButton
        Title={'LOGIN'}
        onPress={() => {
          props.navigation.navigate('Login');
        }}
      />
    </View>
  );
};
export default PasswordChanged;
