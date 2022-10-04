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
  flMainView1: {
    paddingRight: responsiveWidth(5),
    paddingLeft: responsiveWidth(3.5),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(0.5),
    backgroundColor: colors.lightGrayBackground,
    borderLeftWidth: responsiveWidth(1.5),
    borderLeftColor: colors.yellow,
  },
  flMainView: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    borderBottomWidth: responsiveWidth(0.3),
    borderBottomColor: colors.lightText,
  },
  Text: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: fontSize.regular,
  },
  Text1: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsLight,
    fontSize: fontSize.regular,
    textAlign: 'right',
  },
  Text2: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.regular,
  },
});
