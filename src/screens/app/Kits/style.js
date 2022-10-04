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
  rowView: {
    width: responsiveWidth(84),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: responsiveHeight(3),
    alignItems: 'center',
  },
  heading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.h5,
  },
  goldGrain: {
    height: responsiveHeight(6),
    width: responsiveWidth(12),
    resizeMode: 'contain',
    marginLeft: responsiveWidth(5),
  },
  studioBg: {
    height: responsiveHeight(12),
    width: responsiveWidth(42),
    alignSelf: 'center',
    // resizeMode: 'contain',
    borderTopRightRadius: responsiveWidth(2),
    borderBottomRightRadius: responsiveWidth(2),
  },
  title: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    // position: 'absolute',
    fontSize: fontSize.medium,
  },
  TitleView: {
    backgroundColor: colors.white,
    width: responsiveWidth(40),
    height: responsiveHeight(12),
    justifyContent: 'center',
  },
  Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(3),
  },
  Heading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.large,
    // marginTop: responsiveHeight(1),
    // marginLeft: responsiveWidth(5),
  },
  MainView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: responsiveHeight(1),
    backgroundColor: colors.white,
    borderRadius: responsiveWidth(3),
    paddingVertical: responsiveHeight(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    // marginBottom: responsiveHeight(3),
    alignItems: 'center',
  },
});
