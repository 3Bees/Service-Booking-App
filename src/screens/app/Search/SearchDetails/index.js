import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import {styles} from './style';
import {SearchHeader, NewHeader} from '../../../../components/general/header';
import {Models} from '../../../../services/app/Search';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../../globals/utilities/assets';
import {getAllOfCollection} from '../../../../Backend/utility';
import {getCurrentUserId} from '../../../../Backend/auth';
import {colors} from '../../../../globals/utilities/colors';
import * as geolib from 'geolib';

const SearchDetails = props => {
  useEffect(() => {
    AllUsers();
    FetchNearby();
  }, [props]);
  const {type, location} = props.route.params;
  const [data, setData] = useState(Models);
  const [filterModal, setFilterModal] = useState(false);
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState(30);
  const [rating, setRating] = useState(4);
  const [searchValue, setSearchValue] = useState('');
  const [dupData, setDupData] = useState('');
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(false);
  const AllUsers = async () => {
    let userID = await getCurrentUserId();
    setLoading(true);
    await getAllOfCollection('users').then(async result => {
      if (type === 'Models') {
        let arr = result.filter(val => val.category === 'Model/Dancers');
        let newArr = arr.filter(val => val.id !== userID);
        setData(newArr);
        setLoading(false);
      } else {
        let arr = result.filter(val => val.category === type);
        let newArr = arr.filter(val => val.id !== userID);
        setData(newArr);
        setLoading(false);
      }
    });
  };
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          props.navigation.navigate('UserDetails', {
            type:
              type === 'Photo'
                ? 'Photographer'
                : type === 'Video'
                ? 'Videographer'
                : type,
            item,
          });
        }}>
        <View style={styles.photoView}>
          <Image source={{uri: item.profilePicture}} style={styles.photo} />
        </View>
        <Text style={styles.name}>{`${item.firstname}\n${item.lastname}`}</Text>
        <Text style={styles.userType}>{item.category}</Text>
      </TouchableOpacity>
    );
  };
  const Find = val => {
    if (val !== '') {
      let arr = [...data];
      let newArr = arr.filter(
        item =>
          String(item.firstname).toLowerCase().includes(val) ||
          String(item.lastname).toLowerCase().includes(val) ||
          String(item.firstname).includes(val) ||
          String(item.lastname).includes(val),
      );
      setDupData(newArr);
    } else {
      setDupData('');
    }
  };
  const RatingDecrement = () => {
    if (rating > 1) {
      setRating(rating - 1);
    }
  };
  const RatingIncrement = () => {
    if (rating < 5) {
      setRating(rating + 1);
    }
  };
  const AgeDecrement = () => {
    if (age > 1) {
      setAge(age - 1);
    }
  };
  const Filter = () => {
    let arr = [...data];
    let newArr = arr.filter(
      val => val.gender === gender || val.age === age || val.rating === rating,
    );
    setDupData(newArr);
    setFilterModal(false);
  };
  const FetchNearby = () => {
    if (location != undefined) {
      let arr = [...data];

      let dubArr = arr.filter(
        item =>
          geolib.isPointWithinRadius(
            {
              latitude: item?.location?.latitude,
              longitude: item?.location?.longitude,
            },
            {
              latitude: location.lat,
              longitude: location.lng,
            },
            10 * 1000,
          ) == true,
      );
      console.log({dubArr});
      setNearby(dubArr);
    }
  };
  if (loading) {
    return (
      <ActivityIndicator
        size={'large'}
        color={colors.black}
        style={{marginTop: responsiveHeight(45)}}
      />
    );
  }
  return (
    <View style={styles.container}>
      {type === 'Models' || type === 'Artist' ? (
        <NewHeader
          title={type}
          backBtn
          menu
          onPress={() => {
            setFilterModal(true);
          }}
        />
      ) : (
        <SearchHeader
          backBtn
          search={searchValue}
          onChangeText={val => {
            setSearchValue(val);
            Find(val);
          }}
          locationPress={() => {
            props.navigation.navigate('Location', {type});
          }}
        />
      )}
      <ScrollView>
        <View style={{height: responsiveHeight(3)}} />
        {!nearby.length ? null : (
          <>
            <Text style={styles.Title}>Explore nearby</Text>
            <View style={styles.flMainView}>
              <FlatList
                data={nearby}
                numColumns={3}
                renderItem={({item, index}) => {
                  return renderItem(item, index);
                }}
              />
            </View>
          </>
        )}

        <View style={styles.headerRow}>
          <Text style={styles.Title}>
            {type === 'Photo'
              ? 'Photographer'
              : type === 'Video'
              ? 'Videographer'
              : type}
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Models', {
                  type:
                    type === 'Photo'
                      ? 'Photographer'
                      : type === 'Video'
                      ? 'Videographer'
                      : type,
                  data,
                });
              }}>
              <Text style={styles.MoreBtnText}>See More</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flMainView}>
          <FlatList
            data={dupData ? dupData : data}
            numColumns={3}
            renderItem={({item, index}) => {
              return renderItem(item, index);
            }}
          />
        </View>
      </ScrollView>
      <Modal visible={filterModal} transparent={true}>
        <View style={styles.modalWrapper}>
          <View style={styles.Modalbackground}>
            <Text style={styles.FilterText}>Filter</Text>
            <View style={styles.rowView}>
              <Text style={styles.boldHeading}>Gender</Text>
              <View style={styles.rowView1}>
                <TouchableOpacity
                  onPress={() => {
                    setGender('Female');
                  }}>
                  <Image
                    source={appImages.cheveronLeftY}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.label}>{gender}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setGender('Male');
                  }}>
                  <Image
                    source={appImages.cheveronRightY}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.rowView}>
              <Text style={styles.boldHeading}>Age</Text>
              <View style={styles.rowView1}>
                <TouchableOpacity
                  onPress={() => {
                    AgeDecrement();
                  }}>
                  <Image
                    source={appImages.cheveronLeftY}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.label}>{age}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setAge(age + 1);
                  }}>
                  <Image
                    source={appImages.cheveronRightY}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.rowView}>
              <Text style={styles.boldHeading}>Rating</Text>
              <View style={styles.rowView1}>
                <TouchableOpacity onPress={() => RatingDecrement()}>
                  <Image
                    source={appImages.cheveronLeftY}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.label}>{rating}</Text>
                <TouchableOpacity
                  onPress={() => {
                    RatingIncrement();
                  }}>
                  <Image
                    source={appImages.cheveronRightY}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.greaterThanBtn}
            onPress={() => {
              Filter();
            }}>
            <Image source={appImages.greaterThan} style={styles.greaterThan} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default SearchDetails;
