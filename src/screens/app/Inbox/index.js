import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {Data} from '../../../services/app/Inbox';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {NewHeader} from '../../../components/general/header';
import {getData, getAllOfCollection} from '../../../Backend/utility';
import {getCurrentUserId} from '../../../Backend/auth';
import {colors} from '../../../globals/utilities/colors';
import moment from 'moment';
import {db} from '../../../Backend/firebaseConfig';

const Inbox = props => {
  useEffect(() => {
    Messages();
  }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Messages = async () => {
    setLoading(true);
    let userId = await getCurrentUserId();
    db.collection('Chat')
      .doc(userId)
      .onSnapshot(async function (doc) {
        let chatData = await getData('Chat', userId);
        if (chatData === false) {
          setLoading(false);
          setData([]);
        } else {
          let keys = Object.keys(chatData);
          let arr = [];
          keys.forEach(item => {
            let Array = chatData[item];
            let userData = Array.filter(val => val.user.id !== userId);
            let newArr = userData.slice(-1)[0];
            arr.push(newArr);
          });
          setData(arr);
          setLoading(false);
        }
      });
  };
  const renderItem = (item, index) => {
    console.log('===========>', item);
    return (
      <TouchableOpacity
        style={index === 0 ? styles.flMainView1 : styles.flMainView}
        onPress={async () => {
          props.navigation.navigate('Chat', {
            item: {
              id: item.user.userId,
              profilePicture: item.user.avatar,
              firstname: item.user.firstname,
              lastname: item.user.lastname,
            },
          });
        }}>
        <ImageBackground
          source={{uri: item.user.avatar}}
          style={styles.photo}
          imageStyle={{borderRadius: responsiveWidth(8)}}>
          {/* {item.active === true ? <View style={styles.dot} /> : null} */}
        </ImageBackground>
        <View style={styles.subView}>
          <Text
            style={
              styles.name
            }>{`${item.user.firstname} ${item.user.lastname}`}</Text>
          <Text style={styles.message}>{item.text}</Text>
        </View>
        <Text style={styles.time}>{moment(item.time).format('hh:mm a')}</Text>
      </TouchableOpacity>
    );
  };
  if (loading) {
    return (
      <ActivityIndicator
        color={colors.black}
        size={'large'}
        style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
      />
    );
  }
  return (
    <View style={styles.container}>
      <NewHeader title={'Messages'} />
      <View>
        <FlatList
          data={data}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: responsiveHeight(5),
                }}>
                No Chat History
              </Text>
            );
          }}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
        />
      </View>
    </View>
  );
};

export default Inbox;
