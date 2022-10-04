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
  heading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(1.5),
  },
  FLView: {
    width: responsiveWidth(84),
    alignSelf: 'center',
  },
  checkBtn: {
    borderWidth: responsiveWidth(0.3),
    height: responsiveHeight(3),
    width: responsiveWidth(6),
    borderRadius: responsiveWidth(3),
    borderColor: colors.grayBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBtn: {
    backgroundColor: colors.yellow,
    height: responsiveHeight(2),
    width: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
  },
  flBtnView: {
    width: responsiveWidth(42),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1.5),
  },
  checkBtnText: {
    marginLeft: responsiveWidth(2.5),
    fontFamily: fontFamily.PoppinsRegular,
    marginTop: responsiveHeight(0.5),
    color: colors.black,
    fontSize: fontSize.large,
  },
  nextBtn: {
    height: responsiveHeight(8),
    width: responsiveWidth(24),
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: responsiveWidth(12),
    bottom: responsiveHeight(10),
    borderRadius: responsiveWidth(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  greaterThan: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
    resizeMode: 'contain',
  },
});
