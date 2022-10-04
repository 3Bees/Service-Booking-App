import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {Data} from '../../../../services/app/Annoucement';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import {colors} from '../../../../globals/utilities/colors';
import {appImages} from '../../../../globals/utilities/assets';
import moment from 'moment';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Annoucement = props => {
  const {item} = props.route.params;
  return (
    <View style={styles.container}>
      <NewHeader title={'My Announcement'} backBtn />
      <View style={styles.MainView}>
        <View style={styles.photoView}>
          <Image source={{uri: item.picture}} style={styles.photo} />
        </View>
        <View style={styles.detailsView}>
          <View style={styles.rowView}>
            <Text style={styles.name}>{item.userName}</Text>
            <Text style={styles.time}>{moment(item.posted).fromNow()}</Text>
          </View>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>
      <Text style={[styles.name, {marginLeft: responsiveWidth(21.5)}]}>
        {item.title}{' '}
      </Text>
      <Text style={styles.description}>{item.description}</Text>
      {/* <Image source={appImages.annoucement} style={styles.annoucementImage} /> */}
      <View style={styles.line} />
      <Text style={styles.locationText}>Location</Text>
      <View style={styles.mapcontainer}>
        <MapView
          scrollEnabled={true}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
          style={styles.map}
          // liteMode
          region={{
            latitude: item?.location?.lat,
            longitude: item?.location?.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: item.location.lat,
              longitude: item.location.lng,
            }}>
            <Icon
              type={'ionicon'}
              name={'location'}
              color={'blue'}
              size={responsiveFontSize(3)}
            />
          </Marker>
        </MapView>
      </View>
    </View>
  );
};

export default Annoucement;
