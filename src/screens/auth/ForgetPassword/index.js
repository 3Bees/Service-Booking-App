import React, {useEffect, useState} from 'react';
import {View, Image, Text, StatusBar, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../globals/utilities/assets';
import {colors} from '../../../globals/utilities/colors';
import {NewButton} from '../../../components/general/button';
import {WhiteTextInput} from '../../../components/general/TextInput';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements/dist/icons/Icon';
const ForgetPassword = props => {
  const [email, setEmail] = useState('');
  const [emailerror, setemailerror] = useState('');
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
    return check;
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.black}
        translucent={false}
        barStyle={'light-content'}
      />
      <Image source={appImages.lock} style={styles.logo} />
      <Text style={styles.boldText}>{'FORGET\n\t\tPASSWORD'}</Text>
      <Text style={styles.mediumText}>
        {'enter your registered email id to\nrecieve your reset password link.'}
      </Text>
      <View style={{height: responsiveHeight(3)}} />
      <WhiteTextInput
        placeholder={'Type Here'}
        image={appImages.emailoutline}
        value={email}
        onChangeText={val => {
          setEmail(val);
        }}
      />
      {!emailerror ? null : (
        <Text style={{color: 'red', marginLeft: responsiveWidth(5)}}>
          {emailerror}
        </Text>
      )}

      <View style={{height: responsiveHeight(4)}} />
      <NewButton
        Title={'Next'}
        onPress={() => {
          if (Validation()) {
            props.navigation.navigate('CodeVerification', {email});
          }
        }}
      />
    </View>
  );
};
export default ForgetPassword;
