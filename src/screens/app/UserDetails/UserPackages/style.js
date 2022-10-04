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
  tabsView: {
    width: responsiveWidth(100),
    paddingHorizontal: responsiveWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2.5),
  },
  active: {
    color: colors.yellow,
    fontFamily: fontFamily.MonstserratRegular,
    borderBottomWidth: responsiveWidth(1),
    borderBottomColor: colors.yellow,
    paddingBottom: responsiveHeight(1.5),
    fontSize: fontSize.medium,
  },
  inactive: {
    color: colors.lightText,
    fontFamily: fontFamily.MonstserratRegular,
    paddingBottom: responsiveHeight(1.5),
    fontSize: fontSize.medium,
    borderBottomWidth: responsiveWidth(1),
    borderBottomColor: colors.white,
  },
  rowView: {
    height: responsiveHeight(12),
    width: responsiveWidth(100),
    paddingHorizontal: responsiveWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: responsiveWidth(0.3),
    borderBottomWidth: responsiveWidth(0.3),
    borderColor: colors.lightText,
  },
  mediumText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.medium,
    marginVertical: responsiveHeight(0.5),
  },
  price: {
    color: colors.yellow,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.h5,
  },
  descriptionText: {
    width: responsiveWidth(84),
    alignSelf: 'center',
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.regular,
    marginTop: responsiveHeight(2),
  },
  btn: {
    backgroundColor: colors.black,
    width: responsiveWidth(30),
    height: responsiveHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(2),
    position: 'absolute',
    bottom: responsiveHeight(10),
    right: responsiveWidth(8),
  },
  btnText: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsMedium,
    marginTop: responsiveHeight(0.5),
  },
  priceContainer: {
    backgroundColor: colors.grayBackground,
    alignSelf: 'center',
    width: responsiveWidth(84),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  lable: {
    color: colors.black,
    fontFamily: fontFamily.MonstserratBold,
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(3),
  },
  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
  },

  text: {
    color: 'black',
    fontSize: 15,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'red',
  },

  username: {
    color: 'green',
    fontWeight: 'bold',
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
  },
});
