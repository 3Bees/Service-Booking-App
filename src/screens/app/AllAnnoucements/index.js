import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {AllAnnoucementsData} from '../../../services/app/Annoucement';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import {colors} from '../../../globals/utilities/colors';
import {appImages} from '../../../globals/utilities/assets';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {getAllOfCollection} from '../../../Backend/utility';
import {getCurrentUserId} from '../../../Backend/auth';
import {db} from '../../../Backend/firebaseConfig';
import {fontFamily} from '../../../globals/utilities/fonts';
import {fontSize} from '../../../globals/utilities/size';
const AllAnnoucements = props => {
  const {flag} = props;
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    Annoucements();
  }, []);
  const Annoucements = async () => {
    const subscribe = db.collection('Annoucements').onSnapshot(async () => {
      let userId = await getCurrentUserId();
      await getAllOfCollection('Annoucements').then(res => {
        let arr = res.filter(val => val.userId !== userId);
        let Array = arr.filter(val => val.checked != true);
        setData(Array);
        setLoading(false);
      });
    });
    return subscribe;
  };
  const renderItem = (item, index) => {
    return (
      <View style={styles.MainView}>
        <View style={styles.imageView1}>
          <Image source={{uri: item.picture}} style={styles.photo} />
        </View>
        <View style={styles.detailsView}>
          <Text style={styles.name}>{item.userName}</Text>

          <View style={styles.rowView}>
            <View>
              <Text style={styles.userType}>{item.category}</Text>
            </View>
            <Text style={styles.time}>{moment(item.posted).fromNow()}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AnnoucementDetails', {item});
            }}>
            <Text style={styles.moreBtnText}>See More</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  if (flag) {
    return (
      <View>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: responsiveHeight(2),
                  color: colors.darkGray,
                  fontFamily: fontFamily.PoppinsExtraLight,
                  fontSize: fontSize.medium,
                }}>
                Empty
              </Text>
            );
          }}
        />
      </View>
    );
    // {
    //   loading ? (
    //     <ActivityIndicator
    //       color={colors.black}
    //       size={'large'}
    //       style={{marginTop: responsiveHeight(40), alignSelf: 'center'}}
    //     />
    //   ) : (
    //     <FlatList
    //       data={data}
    //       renderItem={({item, index}) => {
    //         return renderItem(item, index);
    //       }}
    //       ListEmptyComponent={() => {
    //         return (
    //           <Text
    //             style={{alignSelf: 'center', marginTop: responsiveHeight(5)}}>
    //             Empty
    //           </Text>
    //         );
    //       }}
    //     />
    //   );
    // }
  } else {
    return (
      <View style={styles.container}>
        <NewHeader title={'Home'} options search />
        {loading ? (
          <ActivityIndicator
            color={colors.black}
            size={'large'}
            style={{marginTop: responsiveHeight(40), alignSelf: 'center'}}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return renderItem(item, index);
            }}
            ListEmptyComponent={() => {
              return (
                <Text
                  style={{alignSelf: 'center', marginTop: responsiveHeight(5)}}>
                  Empty
                </Text>
              );
            }}
          />
        )}
      </View>
    );
  }
};
export default AllAnnoucements;
