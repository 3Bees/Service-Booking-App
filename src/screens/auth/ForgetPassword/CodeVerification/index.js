import React, {useEffect, useState} from 'react';
import {View, Image, Text, StatusBar, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../../globals/utilities/assets';
import {colors} from '../../../../globals/utilities/colors';
import {NewButton} from '../../../../components/general/button';
import CodeInput from 'react-native-code-input';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {fontFamily} from '../../../../globals/utilities/fonts';
const CodeVerification = props => {
  const {email} = props.route.params;
  const [code, setCode] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.black}
        translucent={false}
        barStyle={'light-content'}
      />
      <Text style={styles.extraBoldText}>{'C\t\tO'}</Text>
      <Text style={styles.extraBoldText1}>{'D\t\tE'}</Text>
      <Text style={styles.boldText}>{'VERIFICATION'}</Text>
      <Text style={styles.mediumText}>
        {`Enter one time password sent on your\nmail at ${email}`}
      </Text>
      <View style={styles.codeinputView}>
        <CodeInput
          activeColor={colors.white}
          inactiveColor={colors.white}
          autoFocus={false}
          inputPosition="center"
          size={responsiveWidth(17)}
          keyboardType="numeric"
          space={responsiveWidth(4)}
          codeLength={4}
          onFulfill={code => setCode(code)}
          codeInputStyle={{
            borderRadius: responsiveWidth(1),
            fontSize: responsiveFontSize(2.5),
            backgroundColor: colors.white,
            color: colors.black,
            fontFamily: fontFamily.MonstserratBold,
          }}
        />
      </View>
      <NewButton
        Title={'Next'}
        onPress={() => {
          props.navigation.navigate('NewPassword');
        }}
      />
    </View>
  );
};
export default CodeVerification;
