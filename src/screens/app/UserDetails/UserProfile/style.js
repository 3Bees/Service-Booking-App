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
  pencilIcon: {
    height: responsiveFontSize(4),
    width: responsiveFontSize(4),
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
    alignSelf: "center"
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
    marginTop: responsiveHeight(3),
    alignSelf: "center"
  },
  userName: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
    textAlign: 'center',
    marginTop: responsiveHeight(2),
  },
  DetailsView: {
    marginLeft: responsiveWidth(10),
    marginTop: responsiveHeight(2),
  },
  starContainer: {
    width: responsiveWidth(35),
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
    fontFamily: fontFamily.MonstserratRegular,
    fontSize: fontSize.large,
    marginTop: responsiveHeight(1),
  },
  btn: {
    width: responsiveWidth(70),
    marginTop: responsiveHeight(15),
  },
});
