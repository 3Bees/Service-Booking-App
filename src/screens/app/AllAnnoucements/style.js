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
    height: responsiveHeight(7),
    width: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
  },
  imageView1: {
    height: responsiveHeight(7),
    width: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  MainView: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    // alignItems: 'center',
    borderBottomWidth: responsiveWidth(0.1),
    borderBottomColor: colors.lightText,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1.5),
  },
  detailsView: {
    paddingLeft: responsiveWidth(3),
    width: responsiveWidth(70),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  moreBtnText: {
    color: colors.yellow,
    alignSelf: 'flex-end',
    fontFamily: fontFamily.MonstserratRegular,
    fontSize: fontSize.small,
  },
  description: {
    color: colors.black,
    fontFamily: fontFamily.MonstserratRegular,
    fontSize: responsiveFontSize(1.45),
    marginTop: responsiveHeight(2),
  },
  time: {
    color: colors.lightText,
    fontFamily: fontFamily.MonstserratRegular,
    fontSize: fontSize.regular,
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.semiMedium,
    marginTop: responsiveHeight(0.5),
  },
  userType: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.small,
  },
});
