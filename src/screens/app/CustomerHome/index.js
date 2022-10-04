import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  TextInput,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {Data} from '../../../services/app/Home';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../../globals/utilities/colors';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {appImages} from '../../../globals/utilities/assets';
import {Icon} from 'react-native-elements';
import {Searchtabs} from '../../../services/app/Search';
import {useNavigation} from '@react-navigation/native';

const CustomerHome = props => {
  const navigation = useNavigation();
  const {name} = props;
  const [search, setSearch] = useState('');
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          navigation.navigate('SearchDetails', {type: item.title});
        }}>
        <Image source={item.icon} style={styles.icon} />
        <Text
          style={[
            styles.Title,
            {color: index === 0 ? colors.yellow : colors.black},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.white}
        barStyle={'dark-content'}
        translucent={false}
      />
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image source={appImages.HeaderOptionBtn} style={styles.headerIcon} />
        </TouchableOpacity>
        <View style={{marginRight: responsiveWidth(10)}}>
          <Text style={styles.welcomeText}>WELCOME BACK</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={{width: responsiveWidth(4)}} />
      </View>
      <View style={styles.inputView}>
        <Image source={appImages.searchIcon} style={styles.searchIcon} />
        <TextInput
          placeholder="What are you looking for?"
          style={styles.input}
          value={search}
          onChangeText={val => {
            setSearch(val);
          }}
          placeholderTextColor={colors.black}
        />
        <Icon
          type="materialIcons"
          name="location-on"
          color={colors.yellow}
          size={responsiveFontSize(3.5)}
        />
      </View>
      <View style={styles.flMainView}>
        <FlatList
          data={Searchtabs}
          numColumns={2}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
        />
      </View>
    </View>
  );
};

export default CustomerHome;
