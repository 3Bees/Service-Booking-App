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
  logo: {
    height: responsiveHeight(20),
    width: responsiveWidth(20),
    resizeMode: 'contain',
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(10),
  },
  heading: {
    fontSize: responsiveFontSize(6),
    marginLeft: responsiveWidth(8),
    color: colors.yellow,
    fontFamily: 'BebasNeue-Regular',
  },
  Button: {
    width: responsiveWidth(84),
    alignSelf: 'center',
    marginTop: responsiveHeight(28),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(2),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  ButtonSmall: {
    width: responsiveWidth(40),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(2),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnLabelBold: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginTop: responsiveHeight(0.5),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(84),
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
  },
  btnIcons: {
    height: responsiveHeight(2),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    marginRight: responsiveWidth(1.5),
  },
  btnLabel: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.RobotoMedium,
  },
  loginBtn: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.small,
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
  },
});
