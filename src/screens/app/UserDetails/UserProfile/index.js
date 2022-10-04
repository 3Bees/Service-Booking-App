import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {Icon} from 'react-native-elements';
import {colors} from '../../../../globals/utilities/colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../../globals/utilities/assets';
import StarRating from 'react-native-star-rating';
import {AppButton} from '../../../../components/general/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addToArray, saveData} from '../../../../Backend/utility';
import {getCurrentUserId} from '../../../../Backend/auth';
import Toast from 'react-native-simple-toast';
import {add} from 'react-native-reanimated';
const UserProfile = props => {
  const {item} = props.route.params;
  var arr = [...item?.rating];
  const sumall = arr
    .map(item => item.stars)
    .reduce((prev, curr) => prev + curr, 0);
  const [rating, setRating] = useState(sumall / arr.length);
  const GiveRatting = async rating => {
    let userId = await getCurrentUserId();
    let obj = {
      id: userId,
      stars: rating,
    };
    let found = arr.findIndex(value => value.id === userId);
    if (found === -1) {
      arr.push(obj);
      await addToArray('users', item?.id, 'rating', {...obj}).then(() => {
        Toast.show('Successfully Rated');
      });
    } else {
      Toast.show('Already Rated');
    }
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Profile'} />
      <View style={styles.rowView}>
        <View style={{width: responsiveWidth(3)}} />
        <View>
          <View style={styles.photoView}>
            <Image source={{uri: item.profilePicture}} style={styles.photo} />
          </View>
          <Text
            style={
              styles.userName
            }>{`${item.firstname} ${item?.lastname}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            // Usertype();
            props.navigation.navigate('Chat', {item});
          }}>
          <Image source={appImages.messageIcon} style={styles.pencilIcon} />
        </TouchableOpacity>
      </View>
      <StarRating
        disabled={false}
        halfStarEnabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={rating => {
          GiveRatting(rating);
        }}
        starSize={responsiveFontSize(2)}
        containerStyle={styles.starContainer}
      />
      {/* <Text style={styles.ratings}>{`${rating} (12)`}</Text> */}
      <View style={styles.DetailsView}>
        <Text style={styles.detailsText}>{item?.gender}</Text>
        <Text style={styles.detailsText}>{item?.address}</Text>
        {/* <Text style={styles.detailsText}>Francias, English</Text> */}
        <Text style={styles.detailsText}>
          {item?.category === 'Photo'
            ? 'Photographer'
            : item?.category === 'Video'
            ? 'Videographer'
            : item?.category}
        </Text>
        {/* <Text style={styles.detailsText}>13 Projects</Text> */}
      </View>
    </View>
  );
};

export default UserProfile;
