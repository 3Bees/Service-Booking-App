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
  photo: {
    height: responsiveWidth(22),
    width: responsiveWidth(22),
    borderRadius: responsiveWidth(11),
    // resizeMode: 'contain',
    marginRight: responsiveWidth(3),
  },
  rowView: {
    width: responsiveWidth(84),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(14),
  },
  rowView1: {
    width: responsiveWidth(84),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(6),
    justifyContent: 'space-between',
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
  },
  userType: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.regular,
  },
  rightArrow: {
    height: responsiveFontSize(2.5),
    width: responsiveFontSize(2.5),
    resizeMode: 'contain',
  },
  line: {
    width: responsiveWidth(100),
    height: responsiveWidth(0.1),
    backgroundColor: colors.lightText,
  },
  headings: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
  },
  wrapper: {
    width: responsiveWidth(84),
    alignSelf: 'center',
  },
  descriptionInput: {
    backgroundColor: colors.grayBackground,
    alignSelf: 'center',
    width: responsiveWidth(84),
    borderRadius: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1),
    marginVertical: responsiveHeight(1),
  },
  image: {
    height: responsiveHeight(22),
    width: responsiveWidth(84),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
  },
  image1: {
    width: responsiveWidth(84),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(3),
    position: 'absolute',
    top: responsiveHeight(13),
    zIndex: 1,
  },
  arrowBtn: {
    height: responsiveFontSize(3),
    width: responsiveFontSize(3),
    resizeMode: 'contain',
  },
  mapcontainer: {
    width: responsiveWidth(84),
    height: responsiveHeight(16),
    borderRadius: responsiveWidth(5),
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: responsiveHeight(16),
    width: responsiveWidth(84),
  },
  descriptionText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: fontSize.regular,
  },
});
