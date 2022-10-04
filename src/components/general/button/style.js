import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors} from '../../../globals/utilities/colors';
import {fontFamily} from '../../../globals/utilities/fonts';

export const styles = StyleSheet.create({
  Button: {
    height: responsiveHeight(7),
    width: responsiveWidth(84),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: colors.white,
    fontFamily: fontFamily.PoppinsMedium,
    marginTop: responsiveHeight(0.5),
  },
  Button1: {
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    borderWidth: responsiveWidth(0.1),
    borderColor: colors.white,
  },
  buttonText1: {
    fontSize: responsiveFontSize(2.2),
    color: colors.white,
    fontFamily: fontFamily.PoppinsBold,
    marginTop: responsiveHeight(0.5),
  },
});
