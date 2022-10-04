import React, {useEffect} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const RekitDetails = props => {
  const {item} = props.route.params;
  console.log(item);
  const renderItem = (item, index) => {
    return (
      <View style={styles.Button}>
        <Text style={styles.title}>{item.item}</Text>
        <Image source={item.picture} style={styles.picture} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'REKIT'} backBtn />
      <Text style={styles.Heading}>{item.title}</Text>
      <View>
        <FlatList
          data={item.data}
          numColumns={2}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
        />
      </View>
      <TouchableOpacity style={styles.Btn}>
        <Text style={styles.btnText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RekitDetails;
