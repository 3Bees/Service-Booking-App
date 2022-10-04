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
  icon: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
    resizeMode: 'contain',
    marginRight: responsiveWidth(5),
  },
  Button: {
    width: responsiveWidth(100),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: responsiveHeight(9),
    borderBottomWidth: responsiveWidth(0.3),
    borderBottomColor: colors.lightText,
    paddingHorizontal: responsiveWidth(5),
  },
  RowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: fontSize.large,
  },
  input: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    marginTop: responsiveHeight(1),
    fontSize: fontSize.large,
    padding: 0,
    margin: 0,
  },
  doneBtn: {
    width: responsiveWidth(25),
    backgroundColor: colors.black,
    marginRight: responsiveWidth(5),
    borderRadius: responsiveWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(5),
    position: 'absolute',
    bottom: responsiveHeight(15),
    right: responsiveWidth(5),
  },
  OkBtn: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.medium,
    marginTop: responsiveHeight(0.5),
  },
  titleInput: {
    height: responsiveHeight(9),
    borderBottomWidth: responsiveWidth(0.3),
    borderBottomColor: colors.lightText,
    paddingHorizontal: responsiveWidth(5),
    color: colors.black,
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.PoppinsBold,
    padding: 0,
    margin: 0,
  },
});
