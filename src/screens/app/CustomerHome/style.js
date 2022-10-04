import React from 'react';
import {Platform, StyleSheet} from 'react-native';
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
  mapcontainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(50),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    height: responsiveFontSize(5),
    width: responsiveFontSize(5),
    resizeMode: 'contain',
  },
  searchIcon: {
    height: responsiveHeight(3.5),
    width: responsiveWidth(7),
    resizeMode: 'contain',
  },
  inputView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    backgroundColor: colors.grayBackground,
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(2),
    paddingVertical: responsiveHeight(1.5),
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(5),
    borderRadius: responsiveWidth(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 0,
    width: responsiveWidth(70),
    paddingHorizontal: responsiveWidth(3),
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    marginTop: responsiveHeight(0.5),
    fontSize: fontSize.large,
  },
  Btn: {
    width: responsiveWidth(30),
    height: Platform.OS === 'ios' ? responsiveHeight(8) : responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: colors.white,
    marginVertical: responsiveHeight(2),
    marginLeft: responsiveWidth(10),
  },
  title: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    fontSize: fontSize.large,
    marginTop: responsiveHeight(0.5),
  },
  Title: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    // marginTop: responsiveHeight(0.5),
    fontSize: fontSize.h5,
    marginTop: responsiveHeight(2.2),
  },
  flMainView: {
    // width: responsiveWidth(84),
    // alignSelf: 'center',
    // marginTop: responsiveHeight(2),
  },
  icon: {
    height: responsiveWidth(22),
    width: '100%',
    // borderRadius: responsiveWidth(1.5),
    borderTopLeftRadius: responsiveWidth(1.5),
    borderTopRightRadius: responsiveWidth(1.5),
    // borderWidth: 1,
    // borderColor: 'red',
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
    height: responsiveWidth(40),
    width: responsiveWidth(40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
  },
  headerIcon: {
    resizeMode: 'contain',
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    marginTop: responsiveHeight(1.5),
  },
  headerView: {
    flexDirection: 'row',
    width: responsiveWidth(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(3),
    alignItems: 'flex-start',
  },
  welcomeText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsBold,
    fontSize: responsiveFontSize(2.5),
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: responsiveFontSize(1.7),
  },
});
