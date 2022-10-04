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
  flMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  subView: {
    width: responsiveWidth(60),
    marginHorizontal: responsiveWidth(3),
  },
  photo: {
    height: responsiveHeight(8),
    width: responsiveWidth(16),
    borderRadius: responsiveWidth(8),
    justifyContent: 'flex-end',
  },
  dot: {
    height: responsiveHeight(1.5),
    width: responsiveWidth(3),
    borderRadius: responsiveWidth(1.5),
    backgroundColor: colors.green,
    alignSelf: 'flex-end',
  },
  flMainView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: responsiveWidth(5),
    paddingLeft: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(2),
    backgroundColor: colors.lightGrayBackground,
    borderLeftWidth: responsiveWidth(1.5),
    borderLeftColor: colors.yellow,
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    marginTop: responsiveHeight(0.5),
  },
  message: {
    color: colors.black,
    fontFamily: fontFamily.MonstserratRegular,
    fontSize: fontSize.medium,
  },
  time: {
    color: colors.lightText,
    fontSize: fontSize.small,
    fontFamily: fontFamily.MonstserratRegular,
    marginBottom: responsiveHeight(3),
  },
});
