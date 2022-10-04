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
  mapcontainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(90),
    // marginLeft: responsiveWidth(22),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    height: responsiveFontSize(5),
    width: responsiveFontSize(5),
    resizeMode: 'contain',
  },
  whiteView: {
    height: responsiveHeight(15),
    width: responsiveWidth(100),
    backgroundColor: colors.white,
    borderTopLeftRadius: responsiveWidth(7),
    borderTopRightRadius: responsiveWidth(7),
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
  },
  greaterThanBtn: {
    backgroundColor: colors.black,
    height: responsiveHeight(7),
    width: responsiveWidth(22),
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  greaterThan: {
    height: responsiveFontSize(3),
    width: responsiveFontSize(3),
    resizeMode: 'contain',
  },
  boldHeading: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.large,
    marginTop: responsiveHeight(1),
  },
  grayHeading: {
    color: colors.darkGray,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.large,
    marginTop: responsiveHeight(1.5),
  },
  input: {
    textInput: {
      color: colors.black,
      fontFamily: fontFamily.PoppinsBold,
      fontSize: fontSize.large,
      marginTop: responsiveHeight(1),
    },
    listView: {
      color: 'black', //To see where exactly the list is
      zIndex: 1000, //To popover the component outwards
      position: 'absolute',
      bottom: responsiveHeight(15),
      width: responsiveWidth(90),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      backgroundColor: colors.white,
    },
  },
});
