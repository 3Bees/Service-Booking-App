import React, {useEffect, useState} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {Maintabs} from '../../../services/app/Search';

const Search = props => {
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          props.navigation.navigate('SearchDetails', {type: item.title});
        }}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.Title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Search'} backBtn />
      <View style={styles.flMainView}>
        <FlatList
          data={Maintabs}
          numColumns={3}
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

export default Search;
