import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../../globals/utilities/colors';
import {fontFamily} from '../../../globals/utilities/fonts';
import {fontSize} from '../../../globals/utilities/size';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: responsiveWidth(90),
  },
  innerContainer: {
    borderBottomWidth: 0.5,
    borderColor: colors.grayBorder,
    alignItems: 'flex-start',
    width: responsiveWidth(80),
    paddingVertical: responsiveHeight(1.5),
  },
  nameText: {
    color: colors.black,
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: fontSize.h5,
    paddingLeft: responsiveWidth(2),
  },
});

//make this component available to the app
export default styles;
