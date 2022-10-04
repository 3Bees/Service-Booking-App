import React from 'react';
import { Platform, StyleSheet } from 'react-native';
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
  paymentText: {
    color: colors.black,
    width: responsiveWidth(84),
    alignSelf: 'center',
    fontFamily: fontFamily.MonstserratMedium,
    fontSize: fontSize.large,
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(2.5),
  },
  card: {
    width: responsiveWidth(84),
    height: responsiveHeight(25),
    resizeMode: 'contain',
  },
  cardView: {
    width: responsiveWidth(85.7),
    height: Platform.OS === 'android' ? responsiveHeight(25.1) : responsiveHeight(23.1),
    borderWidth: responsiveWidth(1),
    alignSelf: 'center',
    marginTop: responsiveHeight(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(7),
  },
  btn: {
    width: responsiveWidth(50),
    marginTop: responsiveHeight(3),
  },
  btnText: {
    fontSize: fontSize.regular,
  },
});
