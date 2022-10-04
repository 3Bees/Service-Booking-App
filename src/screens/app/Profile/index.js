import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {Icon} from 'react-native-elements';
import {colors} from '../../../globals/utilities/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../globals/utilities/assets';
import StarRating from 'react-native-star-rating';
import {AppButton} from '../../../components/general/button';
import {getData} from '../../../Backend/utility';
import {getCurrentUserId} from '../../../Backend/auth';
import {useIsFocused} from '@react-navigation/native';
import ProfileItem from '../../../components/general/profileItem/profileItem';
import {ScrollView} from 'react-native';

const Profile = props => {
  const isFocused = useIsFocused();
  const [data, setData] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (isFocused) {
      userDetails();
    }
  }, [props, isFocused]);
  const userDetails = async () => {
    let userId = await getCurrentUserId();
    await getData('users', userId).then(res => {
      if (res.rating.length) {
        var arr = [...res.rating];
        const sumall = arr
          .map(item => item.stars)
          .reduce((prev, curr) => prev + curr, 0);
        let totalValue = sumall / arr.length;
        setRating(Math.floor(totalValue));
      }
      setData(res);
      setNumber(res.number);
      setLoading(false);
    });
  };
  if (loading) {
    return (
      <ActivityIndicator
        color={colors.black}
        size={'large'}
        style={{marginTop: responsiveHeight(46)}}
      />
    );
  }

  return (
    <View style={styles.container}>
      <NewHeader title={'Profile'} />
      <ScrollView>
        <View style={styles.rowView}>
          <View style={{width: responsiveWidth(3)}} />
          <View>
            <View style={styles.photoView}>
              <Image
                source={{uri: `${data.profilePicture}`}}
                style={styles.photo}
              />
            </View>
            <Text
              style={
                styles.userName
              }>{`${data.firstname} ${data.lastname}`}</Text>
            {/* <Text style={styles.categoryText}>{data.category}</Text> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('EditProfile', {data});
            }}>
            <Image source={appImages.pencil} style={styles.pencilIcon} />
          </TouchableOpacity>
        </View>
        <StarRating
          disabled={true}
          halfStarEnabled={false}
          maxStars={5}
          rating={rating}
          // selectedStar={rating => setRating(rating)}
          starSize={responsiveFontSize(2.5)}
          containerStyle={styles.starContainer}
        />
        <Text style={styles.ratings}>{`${rating} (5)`}</Text>
        <View style={styles.DetailsView}>
          <ProfileItem
            iconName={'gender-male'}
            iconSize={2.5}
            iconType="material-community"
            onPress={() => {}}
            title={data.gender}
          />
          <ProfileItem
            iconName={'address'}
            iconSize={2.5}
            iconType="entypo"
            onPress={() => {}}
            title={data.address}
          />
          <ProfileItem
            iconName={'business-center'}
            iconSize={2.5}
            iconType="materialicon"
            onPress={() => {}}
            title={data.businessname}
          />
          <ProfileItem
            iconName={'email'}
            iconSize={2.5}
            iconType="materialicon"
            onPress={() => {}}
            title={data.email}
          />
          <ProfileItem
            iconName={'local-phone'}
            iconSize={2.5}
            iconType="materialicon"
            onPress={() => {}}
            title={data.number}
          />
        </View>
     
          <AppButton
            Title={'CREATE AN ANNOUNCEMENT'}
            ButtonStyles={styles.btn}
            onPress={() => {
              props.navigation.navigate('CreateAnnoucement', {value: null});
            }}
          />
  
      </ScrollView>
    </View>
  );
};

export default Profile;
