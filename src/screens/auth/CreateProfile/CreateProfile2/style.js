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
  heading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(1.5),
  },
  grayView: {
    height: responsiveWidth(40),
    width: responsiveWidth(40),
    backgroundColor: colors.darkGray,
    alignSelf: 'center',
    borderRadius: responsiveWidth(20),
    marginTop: responsiveHeight(4),
  },
});
