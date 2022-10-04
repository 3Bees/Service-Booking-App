import React from 'react';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../../globals/utilities/colors';
import {fontSize} from '../../../globals/utilities/size';
import {fontFamily} from '../../../globals/utilities/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  heading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: fontSize.h3,
    marginTop: responsiveHeight(7),
  },
  wrapper: {
    width: responsiveWidth(84),
    alignSelf: 'center',
  },
  alreadyAccount: {
    textAlign: 'right',
    color: colors.black,
    fontSize: fontSize.small,
    fontFamily: fontFamily.PoppinsRegular,
    marginTop: responsiveHeight(0.5),
  },
  logo: {
    height: responsiveHeight(20),
    width: responsiveWidth(20),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: responsiveHeight(12),
  },
  greetingsText: {
    color: colors.lightText,
    fontSize: fontSize.semiMedium,
    fontFamily: fontFamily.PoppinsRegular,
  },
});
