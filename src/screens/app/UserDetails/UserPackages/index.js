import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import ParsedText from 'react-native-parsed-text';

const UserPackages = props => {
  const {item, type} = props.route.params;
  console.log(item.Packages);
  const [tab, setTab] = useState('Premium');
  const handleUrlPress = async (url = '', matchIndex) => {
    await Linking.openURL(`http://${url}`);
  };
  const handlePhonePress = async (phone, matchIndex) => {
    await Linking.openURL(`tel:${phone}`);
  };

  //   const handleNamePress = (name, matchIndex /*: number*/) => {
  //     alert(`Hello ${name}`);
  //   };

  const handleEmailPress = async (email, matchIndex) => {
    await Linking.openURL(`mailto:${email}`);
  };

  const renderText = (matchingString, matches) => {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  };
  return (
    <View style={styles.container}>
      <NewHeader title={item.name} backBtn subtitle={item.userType} />
      <View style={styles.tabsView}>
        <TouchableOpacity
          onPress={() => {
            setTab('Premium');
          }}>
          <Text style={tab === 'Premium' ? styles.active : styles.inactive}>
            Premium
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab('Standard');
          }}>
          <Text style={tab === 'Standard' ? styles.active : styles.inactive}>
            Standard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab('Basic');
          }}>
          <Text style={tab === 'Basic' ? styles.active : styles.inactive}>
            Basic
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.lable}>Price</Text>
      <View>
        {tab === 'Premium' ? (
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{`${item.Packages[0].Price}$`}</Text>
          </View>
        ) : tab === 'Standard' ? (
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{`${item.Packages[1].Price}$`}</Text>
          </View>
        ) : (
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{`${item.Packages[2].Price}$`}</Text>
          </View>
        )}
      </View>
      <Text style={styles.lable}>Description</Text>
      <View>
        {tab === 'Premium' ? (
          <View style={styles.priceContainer}>
            <ParsedText
              style={styles.text}
              parse={[
                {
                  type: 'url',
                  style: styles.url,
                  onPress: () => handleUrlPress(item.Packages[0].description),
                },
                {
                  type: 'phone',
                  style: styles.phone,
                  onPress: () => handlePhonePress(item.Packages[0].description),
                },
                {
                  type: 'email',
                  style: styles.email,
                  onPress: () => handleEmailPress(item.Packages[0].description),
                },
              ]}
              childrenProps={{allowFontScaling: false}}>
              {item.Packages[0].description}
            </ParsedText>
          </View>
        ) : tab === 'Standard' ? (
          <View style={styles.priceContainer}>
            <ParsedText
              style={styles.text}
              parse={[
                {
                  type: 'url',
                  style: styles.url,
                  onPress: () => handleUrlPress(item.Packages[0].description),
                },
                {
                  type: 'phone',
                  style: styles.phone,
                  onPress: () => handlePhonePress(item.Packages[0].description),
                },
                {
                  type: 'email',
                  style: styles.email,
                  onPress: () => handleEmailPress(item.Packages[0].description),
                },
              ]}
              childrenProps={{allowFontScaling: false}}>
              {item.Packages[1].description}
            </ParsedText>
          </View>
        ) : (
          <View style={styles.priceContainer}>
            <ParsedText
              style={styles.text}
              parse={[
                {
                  type: 'url',
                  style: styles.url,
                  onPress: () => handleUrlPress(item.Packages[0].description),
                },
                {
                  type: 'phone',
                  style: styles.phone,
                  onPress: () => handlePhonePress(item.Packages[0].description),
                },
                {
                  type: 'email',
                  style: styles.email,
                  onPress: () => handleEmailPress(item.Packages[0].description),
                },
              ]}
              childrenProps={{allowFontScaling: false}}>
              {item.Packages[2].description}
            </ParsedText>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          props.navigation.navigate('BookingOrder', {
            packageDetails: {
              title: tab,
              //   time:
              //     tab === 'Premium'
              //       ? item.Packages[0].details.hours
              //       : tab === 'Standard'
              //       ? item.Packages[1].details.hours
              //       : item.Packages[2].details.hours,
              price:
                tab === 'Premium'
                  ? item.Packages[0].Price
                  : tab === 'Standard'
                  ? item.Packages[1].Price
                  : item.Packages[2].Price,
              //   service:
              //     tab === 'Premium'
              //       ? item.Packages[0].details.photosEdited
              //       : tab === 'Standard'
              //       ? item.Packages[1].details.photosEdited
              //       : item.Packages[2].details.photosEdited,
            },
            item: item,
            type,
          });
        }}>
        <Text style={styles.btnText}>Book Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserPackages;
