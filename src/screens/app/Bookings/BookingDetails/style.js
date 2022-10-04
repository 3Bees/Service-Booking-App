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
  wrapper: {
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: responsiveHeight(2),
  },
  photo: {
    height: responsiveHeight(5.5),
    width: responsiveWidth(12),
    borderRadius: responsiveWidth(5.5),
    marginRight: responsiveWidth(3),
  },
  rowView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.h5,
    marginTop: responsiveHeight(0.5),
  },
  statusText: {
    color: colors.yellow,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
  },
  heading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
    marginBottom: responsiveHeight(0.5),
  },
  label: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.semiMedium,
  },
  line: {
    height: responsiveWidth(0.1),
    backgroundColor: colors.lightText,
    marginVertical: responsiveHeight(1),
  },
  SessionText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(2),
    fontSize: fontSize.large,
    // marginLeft: responsiveWidth(8),
  },
  rowView2: {
    width: responsiveWidth(50),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  RejectBtn: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(7),
    width: responsiveWidth(20),
    marginRight: responsiveWidth(2),
  },
  AcceptBtn: {
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(7),
    width: responsiveWidth(20),
  },
  RejectBtnText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.regular,
    marginTop: responsiveHeight(0.5),
  },
  AcceptBtnText: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.regular,
    marginTop: responsiveHeight(0.5),
  },
  modalWrapper: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(196, 196, 196, 0.95)',
  },
  Modalbackground: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    borderRadius: responsiveHeight(3),
    paddingVertical: responsiveHeight(2),
  },
  confirmationMessage: {
    color: colors.black,
    alignSelf: 'center',
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: fontSize.label,
    backgroundColor: colors.white,
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(55),
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(6),
    borderColor: colors.yellow,
    borderWidth: responsiveWidth(0.5),
    marginTop: responsiveHeight(30),
  },
  goBtn: {
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(6),
    width: responsiveWidth(30),
    alignSelf: 'center',
    marginTop: responsiveHeight(30),
  },
  mapcontainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(20),
    // marginLeft: responsiveWidth(8),
    borderRadius: responsiveWidth(5),
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: responsiveHeight(20),
    width: responsiveWidth(90),
  },
  completedBtn: {
    width: responsiveWidth(35),
    height: responsiveHeight(6),
    backgroundColor: colors.black,
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(6),
    marginBottom: responsiveHeight(3),
    flexDirection: 'row',
  },
  completedBtnText: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsMedium,
    marginTop: responsiveHeight(0.5),
    fontSize: fontSize.regular,
    marginRight: responsiveWidth(2),
  },
  RateText: {
    marginTop: responsiveHeight(2),
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
  },
  starContainer: {
    width: responsiveWidth(40),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
  skip: {
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(7),
    width: responsiveWidth(25),
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(3),
  },
  EndBtnText: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.regular,
    marginTop: responsiveHeight(0.5),
  },
});