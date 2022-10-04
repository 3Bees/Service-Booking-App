import React from 'react';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../../../globals/utilities/colors';
import {fontSize} from '../../../../globals/utilities/size';
import {fontFamily} from '../../../../globals/utilities/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  boldText: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.h5,
    textAlign: 'center',
    lineHeight: responsiveHeight(4),
    marginTop: responsiveHeight(17),
  },
  logo: {
    resizeMode: 'contain',
    height: responsiveHeight(17),
    width: responsiveWidth(34),
    alignSelf: 'center',
    marginVertical: responsiveHeight(3),
  },
});
