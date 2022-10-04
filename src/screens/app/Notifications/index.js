import React, {useEffect, useState} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {Data} from '../../../services/app/Notification';
import {NewHeader} from '../../../components/general/header';
import {getData, getDataWithSnapShot} from '../../../Backend/utility';
import {getCurrentUserId} from '../../../Backend/auth';
import moment from 'moment';
import {fontFamily} from '../../../globals/utilities/fonts';
const Notifications = props => {
  const [data, setData] = useState('');
  useEffect(() => {
    Notifi();
  }, []);
  const Notifi = async () => {
    let userId = await getCurrentUserId();
    await getData('Notification', userId, 'Notification').then(res => {
      if (res) {
        setData(res?.reverse());
      }
    });
  };
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.type === 'annoucementrequest') {
            props.navigation.navigate('MyAnnoucement');
          } else {
            props.navigation.navigate('Bookings');
          }
        }}
        style={item.type === 'studio' ? styles.flMainView1 : styles.flMainView}>
        {item.type === 'annoucementrequest' ? (
          <>
            <Text style={styles.Text2}>
              {`${item.name} applied on your annoucement "${item.title}"`}
            </Text>
            <Text style={styles.Text1}>{moment(item.time).fromNow()}</Text>
          </>
        ) : item.type === 'studio' ? (
          <>
            <Text style={item.type === 'studio' ? styles.Text : styles.Text2}>
              {`${item.name} applied on your annoucement "${item.title}"`}
            </Text>
            <Text style={item.type === 'studio' ? null : styles.Text1}>
              {moment(item.time).fromNow()}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.Text2}>
              {`You got a new booking on `}
              <Text
                style={[
                  styles.Text1,
                  {fontFamily: fontFamily.PoppinsBold},
                ]}>{`${item.date}`}</Text>
            </Text>
            <Text style={styles.Text1}>{moment(item.time).fromNow()}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Notifications'} />

      <View>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
        />
      </View>
    </View>
  );
};

export default Notifications;
