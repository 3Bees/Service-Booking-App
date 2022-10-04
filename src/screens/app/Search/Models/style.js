import React from 'react';
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../../../globals/utilities/colors';
import { fontSize } from '../../../../globals/utilities/size';
import { fontFamily } from '../../../../globals/utilities/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabButton: {
    marginRight: responsiveWidth(9),
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  photo: {
    height: responsiveHeight(11),
    width: responsiveWidth(22),
    // resizeMode: 'contain',
    borderRadius: responsiveWidth(1),
  },
  flMainView: {
    width: responsiveWidth(84),
    alignSelf: 'center',
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: responsiveFontSize(1.4),
    marginTop: responsiveHeight(0.5),
    width: responsiveWidth(22),
    textAlign: "center"
  },
  userType: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.tiny,
    marginTop: responsiveHeight(-0.5),
  },
  photoView: {
    height: responsiveHeight(11),
    width: responsiveWidth(22),
    borderRadius: responsiveWidth(2),
    backgroundColor: colors.white,
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
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(196, 196, 196, 0.95)',
  },
  Modalbackground: {
    backgroundColor: colors.white,
    width: responsiveWidth(70),
    alignSelf: 'center',
    borderRadius: responsiveHeight(3),
    paddingVertical: responsiveHeight(2),
    // borderWidth: responsiveWidth(0.1),
    // borderColor: colors.black,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  FilterText: {
    color: colors.black,
    alignSelf: 'center',
    fontFamily: fontFamily.PoppinsBold,
    marginTop: responsiveHeight(1.5),
  },
  boldHeading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginTop: responsiveHeight(0.5),
    fontSize: fontSize.large,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(70),
    paddingLeft: responsiveWidth(7),
    paddingRight: responsiveWidth(3),
    height: responsiveHeight(6),
  },
  rowView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(30),
  },
  arrowIcon: {
    height: responsiveFontSize(2.5),
    width: responsiveFontSize(2.5),
    resizeMode: 'contain',
  },
  label: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    marginTop: responsiveHeight(0.5),
  },
  line: {
    height: responsiveWidth(0.1),
    backgroundColor: colors.lightText,
  },
  greaterThan: {
    height: responsiveFontSize(2.5),
    width: responsiveFontSize(2.5),
    resizeMode: 'contain',
  },
  greaterThanBtn: {
    height: responsiveFontSize(5),
    width: responsiveFontSize(5),
    borderRadius: responsiveFontSize(2.5),
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: responsiveHeight(5),
    right: responsiveWidth(15),
  },
});
