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
  applyBtn: {
    width: responsiveWidth(25),
    marginTop: responsiveHeight(2.5),
    height: responsiveHeight(5),
  },
  applyBtnText: {
    fontSize: fontSize.regular,
  },
  checkCircle: {
    height: responsiveHeight(12),
    width: responsiveWidth(24),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: responsiveHeight(8),
  },
  text: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: fontSize.medium,
    marginTop: responsiveHeight(6),
    marginBottom: responsiveHeight(35),
  },
});
