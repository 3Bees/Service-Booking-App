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
  RowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
    resizeMode: 'contain',
    // marginRight: responsiveWidth(5),
    marginTop: responsiveHeight(1.5),
  },
  btnText: {
    textInputContainer: {
      marginTop: responsiveHeight(2),
      width: responsiveWidth(90),
    },
    textInput: {
      color: colors.black,
      fontFamily: fontFamily.PoppinsMedium,
      fontSize: fontSize.large,
      marginTop: responsiveHeight(0.5),
    },
    listView: {
      color: 'black', //To see where exactly the list is
      zIndex: 1000, //To popover the component outwards
      position: 'absolute',
      top: responsiveHeight(9),
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
});
