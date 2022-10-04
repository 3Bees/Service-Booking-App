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
  photo: {
    height: responsiveHeight(7),
    width: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
  },
  imageview1: {
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
  description: {
    color: colors.black,
    fontFamily: fontFamily.MonstserratRegular,
    fontSize: responsiveFontSize(1.45),
    marginTop: responsiveHeight(3),
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
  annoucementImage: {
    width: responsiveWidth(70),
    height: responsiveHeight(20),
    marginTop: responsiveHeight(1),
  },
  locationText: {
    color: colors.black,
    marginLeft: responsiveWidth(25),
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
    fontSize: fontSize.regular,
  },
  mapcontainer: {
    width: responsiveWidth(70),
    height: responsiveHeight(17),
    marginLeft: responsiveWidth(22),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  userType: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.small,
  },
  applyBtn: {
    width: responsiveWidth(25),
    marginTop: responsiveHeight(2.5),
    marginLeft: responsiveWidth(5),
    height: responsiveHeight(5),
  },
  applyBtnText: {
    fontSize: fontSize.regular,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(196, 196, 196, 0.95)',
  },
  Modalbackground: {
    // backgroundColor: colors.white,
    width: responsiveWidth(90),
    alignSelf: 'center',
    borderRadius: responsiveHeight(3),
    paddingVertical: responsiveHeight(2),
    // borderWidth: responsiveWidth(0.1),
    // borderColor: colors.black,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 10,
  },
  RejectBtn: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(5),
    width: responsiveWidth(25),
    marginRight: responsiveWidth(2),
  },
  AcceptBtn: {
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(5),
    width: responsiveWidth(25),
  },
  confirmationMessage: {
    color: colors.black,
    alignSelf: 'center',
    fontFamily: fontFamily.MonstserratMedium,
    fontSize: fontSize.regular,
    backgroundColor: colors.white,
    padding: responsiveFontSize(1.5),
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(65),
    marginBottom: responsiveHeight(3),
  },
  BtnsView: {
    width: responsiveWidth(72),
    alignSelf: 'center',
    marginTop: responsiveHeight(1.5),
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
});
