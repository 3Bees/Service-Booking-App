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
    height: responsiveHeight(7),
    width: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
  },
  photoView: {
    height: responsiveHeight(7),
    width: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
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
  MainView: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    alignItems: 'center',
  },
  detailsView: {
    marginLeft: responsiveWidth(3),
    width: responsiveWidth(73),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: {
    color: colors.black,
    fontFamily: fontFamily.MonstserratRegular,
    fontSize: responsiveFontSize(1.45),
    width: responsiveWidth(76),
    alignSelf: 'flex-end',
    marginRight: responsiveWidth(5),
    marginTop: responsiveHeight(2),
  },
  time: {
    color: colors.lightText,
    fontFamily: fontFamily.MonstserratRegular,
    fontSize: fontSize.regular,
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.semiMedium,
    marginTop: responsiveHeight(0.5),
  },
  annoucementImage: {
    width: responsiveWidth(76),
    alignSelf: 'flex-end',
    marginRight: responsiveWidth(5),
    height: responsiveHeight(25),
    marginVertical: responsiveHeight(1.5),
  },
  locationText: {
    color: colors.black,
    marginLeft: responsiveWidth(23),
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
    fontSize: fontSize.regular,
  },
  mapcontainer: {
    width: responsiveWidth(76),
    height: responsiveHeight(20),
    alignSelf: 'flex-end',
    marginRight: responsiveWidth(5),
    marginTop: responsiveHeight(1),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  category: {
    color: colors.black,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.PoppinsRegular,
  },
  line: {
    height: responsiveWidth(0.3),
    backgroundColor: colors.lightText + 50,
    marginVertical: responsiveHeight(0.5),
  },
});
