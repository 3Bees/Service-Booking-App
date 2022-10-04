import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  dataPickerContainer: {
    borderWidth: responsiveWidth(0.3),
    width: responsiveWidth(40),
    height: responsiveHeight(7),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    paddingLeft: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    borderColor: 'red',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
