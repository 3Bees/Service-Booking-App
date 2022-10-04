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
  extraBoldText: {
    color: colors.white,
    fontFamily: fontFamily.SourceSansProBold,
    fontSize: responsiveFontSize(10),
    textAlign: 'center',
    marginTop: responsiveHeight(15),
  },
  extraBoldText1: {
    color: colors.white,
    fontFamily: fontFamily.SourceSansProBold,
    fontSize: responsiveFontSize(10),
    textAlign: 'center',
    marginTop: responsiveHeight(-5),
  },
  boldText: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.h5,
    textAlign: 'center',
    lineHeight: responsiveHeight(5.4),
    // marginTop: responsiveHeight(1.5),
  },
  mediumText: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
    textAlign: 'center',
    lineHeight: responsiveHeight(3),
    marginTop: responsiveHeight(1),
  },
  codeinputView: {
    height: responsiveHeight(14),
  },
});
