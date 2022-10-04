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
  whiteCard: {
    backgroundColor: colors.white,
    width: responsiveWidth(84),
    alignSelf: 'center',
    // alignItems: 'center',
    borderRadius: responsiveWidth(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: responsiveHeight(4),
    paddingVertical: responsiveHeight(3),
  },
  whiteCard1: {
    backgroundColor: colors.white,
    width: responsiveWidth(84),
    alignSelf: 'center',
    // alignItems: 'center',
    borderRadius: responsiveWidth(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: responsiveHeight(4),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
  },
  heading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.h5,
    textAlign: 'left',
    marginLeft: responsiveWidth(5),
  },
  calanderIcon: {
    height: responsiveFontSize(2.5),
    width: responsiveFontSize(2.5),
    resizeMode: 'contain',
  },
  calanderbtn: {
    backgroundColor: colors.white,
    height: responsiveFontSize(4),
    width: responsiveFontSize(4),
    borderRadius: responsiveFontSize(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
  },
  photo: {
    height: responsiveHeight(6),
    width: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
    marginRight: responsiveWidth(3),
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginTop: responsiveHeight(0.5),
    fontSize: fontSize.large,
  },
  boldTitle: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginTop: responsiveHeight(0.5),
    fontSize: fontSize.semiMedium,
    marginLeft: responsiveWidth(4),
  },
  date: {
    color: colors.lightText,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.small,
  },
  btn: {
    color: colors.yellow,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: fontSize.medium,
  },
});
