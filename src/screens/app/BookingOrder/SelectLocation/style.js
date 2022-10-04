import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
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
  mapcontainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(50),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    height: responsiveFontSize(5),
    width: responsiveFontSize(5),
    resizeMode: 'contain',
  },
  searchIcon: {
    height: responsiveHeight(3.5),
    width: responsiveWidth(7),
    resizeMode: 'contain',
    marginTop: responsiveHeight(1.5),
  },
  inputView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    backgroundColor: colors.white,
    marginTop: responsiveHeight(2),
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(5),
    borderRadius: responsiveWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 0,
    width: responsiveWidth(70),
    paddingHorizontal: responsiveWidth(3),
    fontFamily: fontFamily.PoppinsMedium,
    marginTop: responsiveHeight(8),
    fontSize: fontSize.large,
    zIndex: 1,
    listView: {
      color: 'black', //To see where exactly the list is
      zIndex: 1000, //To popover the component outwards
      position: 'absolute',
      top: responsiveScreenHeight(5),
      width: responsiveWidth(86),
    },
  },
  heading: {
    color: colors.black,
    marginLeft: responsiveWidth(8),
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.regular,
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(2),
  },
  optional: {
    color: colors.lightText,
    fontSize: fontSize.small,
    fontFamily: fontFamily.PoppinsMedium,
  },
  boldHeading: {
    color: colors.black,
    fontSize: fontSize.large,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginLeft: responsiveWidth(2),
  },
  btns: {
    height: responsiveHeight(10),
    width: responsiveWidth(90),
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomWidth: responsiveWidth(0.3),
    borderColor: colors.darkGray,
  },
  title: {
    color: colors.black,
    fontSize: fontSize.large,
    fontFamily: fontFamily.PoppinsRegular,
    marginLeft: responsiveWidth(2),
  },
  header: {
    backgroundColor: colors.black,
    height:
      Platform.OS === 'android' ? responsiveHeight(10) : responsiveHeight(12),
    width: responsiveWidth(100),
    paddingHorizontal: responsiveWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? responsiveHeight(3) : 0,
  },
  photo: {
    height: responsiveHeight(6),
    width: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
  },
  name: {
    color: colors.white,
    marginLeft: responsiveWidth(2),
    fontSize: fontSize.large,
    fontFamily: fontFamily.MonstserratSemiBold,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipBtn: {
    height: responsiveHeight(7),
    width: responsiveWidth(25),
    backgroundColor: colors.black,
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: responsiveHeight(3),
    right: responsiveWidth(8),
  },
  skipText: {
    color: colors.white,
    fontSize: fontSize.large,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginTop: responsiveHeight(0.5),
  },
});
