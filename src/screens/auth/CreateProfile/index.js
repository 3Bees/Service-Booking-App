import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../globals/utilities/assets';
import {colors} from '../../../globals/utilities/colors';
import {AppButton} from '../../../components/general/button';
import {ATextInput} from '../../../components/general/TextInput';
import {NewHeader} from '../../../components/general/header';
import {ProfileType} from '../../../services/auth/index';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CreateProfile = props => {
  const [userType, setUserType] = useState(ProfileType);
  const [flag, setFlag] = useState(false);
  const renderItem = (item, index) => {
    return (
      <View style={styles.flBtnView}>
        {item.type === undefined ? null : (
          <>
            {item.check === true ? (
              <TouchableOpacity style={styles.checkBtn}>
                <View style={styles.checkedBtn} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.checkBtn}
                onPress={() => {
                  let arr = [...userType];
                  arr.forEach(element => {
                    element.check = false;
                    arr[index].check = true;
                    setFlag(true);
                  });
                  setUserType(arr);
                }}
              />
            )}
            <Text style={styles.checkBtnText}>{item.type}</Text>
          </>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Create Profile'} />
      <Text style={styles.heading}>Type</Text>
      <View style={styles.FLView}>
        <FlatList
          numColumns={2}
          data={userType}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
        />
      </View>
      {flag ? (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={async () => {
            let arr = [...userType];
            let checkedType = arr.filter(val => val.check === true);
            let type = checkedType[0].type;
            await AsyncStorage.setItem('userType', checkedType[0].type);
            if (checkedType[0].type === 'Guest') {
              props.navigation.navigate('App', {screen: 'CustomerHome'});
            } else {
              props.navigation.navigate('CreateProfile1', {
                usertype: type,
              });
            }
          }}>
          <Image source={appImages.greaterThan} style={styles.greaterThan} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CreateProfile;
