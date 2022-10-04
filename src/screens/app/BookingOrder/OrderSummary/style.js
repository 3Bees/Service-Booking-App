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
    height: responsiveHeight(12),
    width: responsiveWidth(24),
    borderRadius: responsiveWidth(3),
  },
  rowView: {
    width: responsiveWidth(84),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: responsiveHeight(3),
  },
  imageView: {
    backgroundColor: colors.white,
    height: responsiveHeight(12),
    width: responsiveWidth(24),
    borderRadius: responsiveWidth(3),
    marginRight: responsiveWidth(4),
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
  name: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
  },
  userType: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.medium,
    marginTop: responsiveHeight(0.5),
  },
  boldHeading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.large,
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(2),
  },
  label: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.medium,
    marginLeft: responsiveWidth(8),
    // marginTop: responsiveHeight(0.5),
  },
  doneBtn: {
    width: responsiveWidth(30),
    backgroundColor: colors.black,
    marginRight: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(15),
  },
  OkBtn: {
    color: colors.white,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.medium,
    marginTop: responsiveHeight(0.5),
  },
});
