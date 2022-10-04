//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styles from './styles';
import {Icon} from 'react-native-elements';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
const ProfileItem = ({onPress, title, iconName, iconType, iconSize}) => {
  return (
    <View style={styles.container}>
      <Icon
        name={iconName}
        type={iconType}
        size={responsiveFontSize(iconSize)}
        color="black"
      />
      <View style={styles.innerContainer}>
        <Text style={styles.nameText}>{title}</Text>
      </View>
    </View>
  );
};

export default ProfileItem;
