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
    backgroundColor: colors.white,
  },
  Heading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.h4,
    marginTop: responsiveHeight(1),
    textAlign: 'center',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(6),
  },
  Button: {
    width: responsiveWidth(40),
    marginHorizontal: responsiveWidth(5),
  },
  title: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
  },
  picture: {
    height: responsiveWidth(40),
    width: responsiveWidth(40),
    marginVertical: responsiveHeight(2),
    borderRadius: responsiveWidth(4),
  },
  Btn: {
    backgroundColor: colors.black,
    width: responsiveWidth(30),
    height: responsiveHeight(6),
    alignSelf: 'flex-end',
    borderRadius: responsiveWidth(2),
    position: 'absolute',
    bottom: responsiveHeight(10),
    right: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsRegular,
    marginTop: responsiveHeight(0.5),
  },
});
