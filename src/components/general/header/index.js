import React from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {styles} from './style';
import {colors} from '../../../globals/utilities/colors';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {appImages} from '../../../globals/utilities/assets';
import {fontFamily} from '../../../globals/utilities/fonts';
import {fontSize} from '../../../globals/utilities/size';
export const NewHeader = props => {
  const navigation = useNavigation();
  const {title, backBtn, menu, options, search, onPress, subtitle, disabled} =
    props;
  return (
    <View>
      <StatusBar
        backgroundColor={colors.black}
        translucent={false}
        barStyle={'light-content'}
      />
      <View
        style={{
          width: responsiveWidth(100),
          backgroundColor: colors.black,
          flexDirection: 'row',
          alignItems: 'center',
          height: responsiveHeight(12),
          justifyContent: 'space-between',
          paddingHorizontal: responsiveWidth(8),
          paddingBottom:
            Platform.OS === 'android'
              ? responsiveHeight(3)
              : responsiveHeight(0.5),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
          borderRadius: 0.1,
        }}>
        {backBtn ? (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={appImages.HeaderBackBtn}
              style={{
                resizeMode: 'contain',
                height: responsiveHeight(2),
                width: responsiveWidth(4),
              }}
            />
          </TouchableOpacity>
        ) : options ? (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              source={appImages.HeaderOptionBtn}
              style={{
                resizeMode: 'contain',
                height: responsiveHeight(2),
                width: responsiveWidth(4),
              }}
            />
          </TouchableOpacity>
        ) : (
          <View style={{width: responsiveWidth(4)}} />
        )}
        <View>
          <Text
            style={{
              color: colors.white,
              fontFamily: fontFamily.PoppinsBold,
              fontSize: responsiveFontSize(2.5),
              marginTop: responsiveHeight(0.5),
              textAlign: 'center',
            }}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={{
                color: colors.white,
                fontFamily: fontFamily.PoppinsRegular,
                fontSize: responsiveFontSize(1.3),
                // marginTop: responsiveHeight(0.5),
                textAlign: 'center',
              }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {search ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Image
              source={appImages.HeaderSearchBtn}
              style={{
                resizeMode: 'contain',
                height: responsiveHeight(2.5),
                width: responsiveWidth(5),
              }}
            />
          </TouchableOpacity>
        ) : menu ? (
          <TouchableOpacity onPress={onPress}>
            <Image
              source={appImages.HeaderMenuBtn}
              style={{
                resizeMode: 'contain',
                height: responsiveHeight(3),
                width: responsiveWidth(6),
              }}
            />
          </TouchableOpacity>
        ) : (
          <View style={{width: responsiveWidth(5)}} />
        )}
      </View>
    </View>
  );
};
export const SearchHeader = props => {
  const navigation = useNavigation();
  const {search, onChangeText, locationPress} = props;
  return (
    <View>
      <StatusBar
        backgroundColor={colors.black}
        translucent={false}
        barStyle={'light-content'}
      />
      <View
        style={{
          width: responsiveWidth(100),
          backgroundColor: colors.black,
          flexDirection: 'row',
          alignItems: 'center',
          height: responsiveHeight(12),
          justifyContent: 'space-between',
          paddingHorizontal: responsiveWidth(8),
          paddingBottom: Platform.OS === 'ios' ? 0 : responsiveHeight(3),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
          borderRadius: 0.1,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={appImages.HeaderBackBtn}
            style={{
              resizeMode: 'contain',
              height: responsiveHeight(2),
              width: responsiveWidth(4),
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: colors.white,
            width: responsiveWidth(70),
            borderRadius: responsiveWidth(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(3),
            paddingVertical: responsiveHeight(1),
          }}>
          <Image
            source={appImages.searchIcon}
            style={{
              width: responsiveWidth(6),
              height: responsiveHeight(3),
              resizeMode: 'contain',
            }}
          />
          <TextInput
            placeholder="search"
            value={search}
            onChangeText={onChangeText}
            style={{
              padding: 0,
              width: responsiveWidth(53),
              color: colors.black,
              fontFamily: fontFamily.PoppinsSemiBold,
              marginTop: responsiveHeight(0.5),
              paddingLeft: responsiveWidth(4),
              fontSize: fontSize.medium,
            }}
            placeholderTextColor={colors.black}
          />
          <TouchableOpacity onPress={locationPress}>
            <Image
              source={appImages.locationPin}
              style={{
                width: responsiveWidth(4),
                height: responsiveHeight(2),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: responsiveWidth(4)}} />
      </View>
    </View>
  );
};
