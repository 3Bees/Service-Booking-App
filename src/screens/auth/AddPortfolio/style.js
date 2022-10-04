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
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(2),
  },
  ImageView: {
    width: responsiveWidth(84),
    alignSelf: 'center',
  },
  grayView: {
    height: responsiveHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkGray,
  },
  addImageText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    marginTop: responsiveHeight(0.5),
    fontSize: fontSize.medium,
  },
  image: {
    height: responsiveHeight(25),
    width: responsiveWidth(84),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(3),
  },
  arrowBtn: {
    height: responsiveFontSize(4),
    width: responsiveFontSize(4),
    resizeMode: 'contain',
  },
});
