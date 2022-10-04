import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {Data} from '../../../services/app/Home';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../../globals/utilities/colors';
import {appImages} from '../../../globals/utilities/assets';
import LinearGradient from 'react-native-linear-gradient';

const Kits = props => {
  const {item} = props.route.params;
  const title = item.title;
  const renderItem = (item, index) => {
    if (item.name !== undefined) {
      return (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SearchDetails', {
              type: item.name === 'Model/Dancer' ? 'Models' : item.name,
            });
          }}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={
              title === 'Gold Kit'
                ? ['#EADA52', '#FFFBD3']
                :  title === 'Silver Kit' ?['#E8E8E88C', '#FFFFFF']:['#5e2909', '#984f14']
            }
            style={styles.Btn}>
            <Text style={styles.title}>
              {item.name === undefined
                ? null
                : item.name === 'Video'
                ? 'Select a ' + item.name + 'grapher'
                : item.name === 'Photo'
                ? 'Select a ' + item.name + 'grapher'
                : 'Select a ' + item.name}
            </Text>
            <Image source={item.image} style={styles.studioBg} />
          </LinearGradient>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Kits'} backBtn />
      <ScrollView>
        <View style={{height: responsiveHeight(5)}} />
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          colors={
            title === 'Gold Kit'
            ? ['#EADA52', '#FFFBD3']
            :  title === 'Silver Kit' ?['#E8E8E88C', '#FFFFFF']:['#5e2909', '#984f14']
        }
          style={styles.MainView}>
          <Text style={styles.Heading}>{item.title}</Text>
        </LinearGradient>
        <View>
          <FlatList
            data={item.details}
            keyExtractor={(item, index) => {
              item.id;
            }}
            renderItem={({item, index}) => {
              return renderItem(item, index);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Kits;
