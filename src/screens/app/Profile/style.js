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
  pencilIcon: {
    height: responsiveFontSize(2.5),
    width: responsiveFontSize(2.5),
    resizeMode: 'contain',
  },
  rowView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  photo: {
    height: responsiveWidth(40),
    width: responsiveWidth(40),
    borderRadius: responsiveWidth(20),
    alignSelf: 'center',
  },
  photoView: {
    height: responsiveWidth(40),
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
    marginTop: responsiveHeight(1),
  },
  userName: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.h5,
    textAlign: 'center',
    marginVertical: responsiveHeight(1),
  },
  categoryText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.h6,
    textAlign: 'center',
  },
  DetailsView: {
    // marginLeft: responsiveWidth(10),
    // marginTop: responsiveHeight(1),
  },
  starContainer: {
    width: responsiveWidth(40),
    alignSelf: 'center',
  },
  ratings: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsRegular,
    textAlign: 'center',
    marginTop: responsiveHeight(0.5),
  },
  detailsText: {
    color: colors.black,
    fontFamily: fontFamily.MonstserratMedium,
    fontSize: fontSize.large,
    marginTop: responsiveHeight(1),
  },
  btn: {
    width: responsiveWidth(70),
    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(4),
  },
});
