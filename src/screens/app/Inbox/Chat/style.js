import React from 'react';
import {Platform, StyleSheet} from 'react-native';
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
    height: responsiveWidth(12),
    width: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
    justifyContent: 'flex-end',
  },
  dot: {
    height: responsiveHeight(1),
    width: responsiveWidth(2),
    borderRadius: responsiveWidth(1),
    backgroundColor: colors.green,
    alignSelf: 'flex-end',
  },
  backBtn: {
    resizeMode: 'contain',
    height: responsiveHeight(2),
    width: responsiveWidth(4),
  },
  header: {
    width: responsiveWidth(100),
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? responsiveHeight(14) : responsiveHeight(12),
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(8),
    paddingBottom: responsiveHeight(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    borderRadius: 0.1,
    paddingTop: Platform.OS === 'android' ? 0 : responsiveHeight(4),
  },
  threedots: {
    resizeMode: 'contain',
    height: responsiveHeight(2.5),
    width: responsiveWidth(5),
  },
  imagestyl: {
    height: responsiveHeight(30),
    width: responsiveWidth(50),
    borderRadius: responsiveWidth(2),
    // resizeMode: 'contain',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(3),
    borderRadius: responsiveWidth(1),
    width: responsiveWidth(30),
    alignSelf: 'flex-end',
    marginRight: responsiveWidth(10),
    marginTop: responsiveHeight(6),
  },
  BtnsText: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.MonstserratMedium,
    marginVertical: responsiveHeight(0.5),
  },
  blockModalContainer: {
    backgroundColor: colors.white,
    width: responsiveWidth(100),
    paddingVertical: responsiveHeight(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderTopWidth: responsiveWidth(0.5),
    borderColor: colors.darkGray + '10',
  },
  wariningText: {
    color: colors.darkgrayBackground,
    textAlign: 'center',
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(5),
  },
  unBlockBtnText: {
    color: colors.white,
    fontSize: responsiveFontSize(1.5),
    fontFamily: fontFamily.PoppinsBold,
    marginTop: responsiveHeight(0.5),
  },
  unBlockBtn: {
    backgroundColor: colors.black,
    width: responsiveWidth(40),
    paddingVertical: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(3),
  },
  reportModalView: {
    width: responsiveWidth(90),
    backgroundColor: colors.white,
    paddingVertical: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(3),
  },
  reportText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    marginTop: responsiveHeight(0.5),
  },
  reportInput: {
    padding: 0,
    margin: 0,
    borderWidth: responsiveWidth(0.3),
    borderColor: colors.darkGray,
    paddingHorizontal: responsiveWidth(2),
    borderRadius: responsiveWidth(2),
    paddingVertical: responsiveHeight(1),
  },
  reportBtn: {
    height: responsiveHeight(6),
    width: responsiveWidth(86),
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(3),
  },
  reportBtnText: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsBold,
    marginTop: responsiveHeight(0.5),
  },
});
