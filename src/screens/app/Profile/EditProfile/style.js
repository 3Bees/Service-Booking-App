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
  photo: {
    height: responsiveWidth(40),
    width: responsiveWidth(40),
    borderRadius: responsiveWidth(20),
    alignSelf: 'center',
  },
  photoView: {
    height: responsiveHeight(20),
    width: responsiveWidth(40),
    borderRadius: responsiveWidth(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
  heading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(1.5),
  },
  wrapper: {
    width: responsiveWidth(84),
    alignSelf: 'center',
  },
  btn: {
    width: responsiveWidth(35),
    alignSelf: 'flex-end',
    marginVertical: responsiveHeight(10),
  },
});
