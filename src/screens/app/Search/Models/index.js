import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {styles} from './style';
import {NewHeader, SearchHeader} from '../../../../components/general/header';
import {ModelsDetails} from '../../../../services/app/Search';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {appImages} from '../../../../globals/utilities/assets';
import {getAllOfCollection} from '../../../../Backend/utility';
import {getCurrentUserId} from '../../../../Backend/auth';
const Models = props => {
  const {type, data} = props.route.params;
  console.log({type});
  // const [data, setData] = useState(ModelsDetails);
  const [dupData, setDupData] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState(30);
  const [rating, setRating] = useState(4);
  const [searchValue, setSearchValue] = useState('');

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          props.navigation.navigate('UserDetails', {item, type});
        }}>
        <View style={styles.photoView}>
          <Image source={{uri: item.profilePicture}} style={styles.photo} />
        </View>
        <Text style={styles.name}>{`${item.firstname}\n${item.lastname}`}</Text>
        <Text style={styles.userType}>{item.category}</Text>
      </TouchableOpacity>
    );
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
            props.navigation.navigate('Location', {
              type:
                type === 'Photographer'
                  ? 'Photo'
                  : type === 'Videographer'
                  ? 'Video'
                  : type,
            });
          }}
        />
      )}
      <View style={styles.flMainView}>
        <FlatList
          data={dupData ? dupData : data}
          numColumns={3}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
        />
      </View>
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

export default Models;
