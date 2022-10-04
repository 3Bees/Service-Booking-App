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
  Heading: {
    color: colors.black,
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(4),
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.h5,
  },
  whiteCard: {
    backgroundColor: colors.white,
    width: responsiveWidth(84),
    alignSelf: 'center',
    // alignItems: 'center',
    borderRadius: responsiveWidth(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: responsiveHeight(4),
    paddingTop: responsiveHeight(5),
    paddingBottom: responsiveHeight(1),
  },
  calanderbtn: {
    backgroundColor: colors.white,
    height: responsiveFontSize(4),
    width: responsiveFontSize(4),
    borderRadius: responsiveFontSize(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calanderIcon: {
    height: responsiveFontSize(2.5),
    width: responsiveFontSize(2.5),
    resizeMode: 'contain',
  },
  optionsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  optionsBtn: {
    width: responsiveWidth(20),
    backgroundColor: colors.black,
    marginRight: responsiveWidth(5),
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(5),
  },
  optionsBtn1: {
    width: responsiveWidth(20),
    // marginRight: responsiveWidth(5),
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    height: responsiveHeight(4),
  },
  cancelBtn: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.medium,
    marginTop: responsiveHeight(0.5),
  },
  OkBtn: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.medium,
    marginTop: responsiveHeight(0.5),
  },
  timePicker: {
    backgroundColor: colors.black,
    width: responsiveWidth(90),
    alignSelf: 'center',
    height: responsiveHeight(20),
    marginTop: responsiveHeight(20),
  },
  timeValue: {
    marginVertical: responsiveHeight(3),
  },
  doneBtn: {
    width: responsiveWidth(30),
    backgroundColor: colors.black,
    marginRight: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(20),
  },
});
