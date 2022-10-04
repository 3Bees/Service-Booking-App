import React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  ActivityIndicator,
} from 'react-native';
import {appImages} from '../../globals/utilities/assets';
import {styles} from './style';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import {colors} from '../../../globals/utilities/colors';
import {fontSize} from '../../../globals/utilities/size';

export const AppButton = props => {
  const {Title, ButtonStyles, onPress, TitleStyles, activity = false} = props;
  return (
    <TouchableOpacity
      style={[styles.Button, ButtonStyles]}
      disabled={activity}
      onPress={onPress}>
      {activity ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={[styles.buttonText, TitleStyles]}>{Title}</Text>
      )}
    </TouchableOpacity>
  );
};
export const NewButton = props => {
  const {Title, onPress, activity = false, disabled = false} = props;
  return (
    <TouchableOpacity
      style={styles.Button1}
      disabled={disabled}
      onPress={onPress}>
      {activity ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={styles.buttonText1}>{Title}</Text>
      )}
    </TouchableOpacity>
  );
};
