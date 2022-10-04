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
  Title: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    // marginTop: responsiveHeight(0.5),
    fontSize: fontSize.large,
  },
  flMainView: {
    // width: responsiveWidth(84),
    alignSelf: 'center',
  },
  icon: {
    height: responsiveHeight(8),
    width: responsiveWidth(16),
    resizeMode: 'contain',
  },
  separator: {
    width: responsiveWidth(10),
    backgroundColor: 'red',
  },
  tabButton: {
    backgroundColor: colors.white,
    alignItems: 'center',
    marginVertical: responsiveHeight(3),
    // marginRight: responsiveWidth(10),
    height: responsiveHeight(13),
    width: responsiveWidth(26),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
  },
});
