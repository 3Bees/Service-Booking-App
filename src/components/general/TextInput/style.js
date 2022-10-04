import {Platform, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../../globals/utilities/colors';
import {fontFamily} from '../../../globals/utilities/fonts';
import {fontSize} from '../../../globals/utilities/size';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.grayBackground,
    alignSelf: 'center',
    width: responsiveWidth(84),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: responsiveWidth(70),
    paddingHorizontal: responsiveWidth(3),
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    marginTop: responsiveHeight(0.5),
  },
  imageIcon: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(2),
    resizeMode: 'contain',
  },
  container1: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input1: {
    width: responsiveWidth(75),
    // paddingHorizontal: responsiveWidth(3),
    color: colors.black,
    fontFamily: fontFamily.PoppinsMedium,
    marginTop: responsiveHeight(0.5),
  },
  imageIcon1: {
    height: responsiveFontSize(2),
    width: responsiveFontSize(4),
    resizeMode: 'contain',
  },
  line: {
    width: responsiveWidth(0.3),
    height: responsiveHeight(6),
    backgroundColor: colors.black,
    marginHorizontal: responsiveWidth(1.5),
  },
});
