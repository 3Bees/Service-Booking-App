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
  Title: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
    fontSize: fontSize.h5,
  },
  flMainView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  MainView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.5),
  },
  photo: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    marginRight: responsiveWidth(5),
  },
  moreBtnText: {
    color: colors.yellow,
    fontFamily: fontFamily.MonstserratRegular,
    marginBottom: responsiveHeight(0.5),
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: fontSize.medium,
  },
  emptyList: {
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsExtraLight,
    color: colors.darkGray,
  },
});
