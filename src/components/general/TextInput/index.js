import React from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../../globals/utilities/colors';
import {fontSize} from '../../../globals/utilities/size';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import styles from './style';
export const ATextInput = ({
  image,
  placeholder,
  onChangeText,
  keyboardType,
  MyStyles,
  value,
  onSubmitEditing,
  itsStyle,
  iconName,
  iconType,
  iconStyles,
  iconSize,
  iconColor,
  secureTextEntry,
  numberOfLines,
  label,
  LabelStyles,
  eyePress,
  togglePassword,
  multiline,
  editable,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, MyStyles]}>
      <Image source={image} style={styles.imageIcon} />
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.grayText}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        editable={editable}
        style={[styles.input, itsStyle]}
      />
      <Icon
        type={iconType}
        name={iconName}
        color={colors.darkgrayBackground}
        size={responsiveFontSize(2)}
        onPress={eyePress}
      />
    </View>
  );
};
export const WhiteTextInput = ({
  image,
  placeholder,
  onChangeText,
  keyboardType,
  MyStyles,
  value,
  onSubmitEditing,
  itsStyle,
  iconName,
  iconType,
  iconStyles,
  iconSize,
  iconColor,
  secureTextEntry,
  numberOfLines,
  label,
  LabelStyles,
  eyePress,
  togglePassword,
  ...otherProps
}) => {
  return (
    <View style={[styles.container1, MyStyles]}>
      <Image source={image} style={styles.imageIcon1} />
      <View style={styles.line} />
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input1, itsStyle]}
      />
    </View>
  );
};
