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
    marginTop: responsiveHeight(14),
    marginBottom: responsiveHeight(7),
  },
  wrapper: {
    width: responsiveWidth(84),
    alignSelf: 'center',
  },
  forgetPassBtn: {
    color: colors.grayText + 80,
    fontSize: fontSize.regular,
    alignSelf: 'flex-end',
    fontFamily: fontFamily.RobotoRegular,
    marginTop: responsiveHeight(2),
  },
  rowView: {
    marginTop: responsiveHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(84),
    alignSelf: 'center',
  },
  checkBox: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(1),
  },
  uncheckedBox: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    borderWidth: responsiveWidth(0.2),
    borderColor: colors.yellow,
    borderRadius: responsiveWidth(1),
  },
  agreeText: {
    color: colors.black,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginTop: responsiveHeight(0.5),
    marginLeft: responsiveWidth(1.5),
  },
  termsText: {
    color: colors.yellow,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginTop: responsiveHeight(0.5),
    marginLeft: responsiveWidth(1.5),
  },
  alreadyAccount: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.small,
    fontFamily: fontFamily.PoppinsRegular,
    marginTop: responsiveHeight(0.5),
  },
});
