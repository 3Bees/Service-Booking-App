import React, {useEffect, useState} from 'react';
import {
  Home,
  Inbox,
  Bookings,
  Notifications,
  Profile,
  EditProfile,
  CreateAnnoucement,
  DateTime,
  Rekit,
  RekitDetails,
  MyAnnoucement,
  Annoucement,
  AllAnnoucements,
  AnnoucementDetails,
  Success,
  ConfirmedBooking,
  Studio,
  Search,
  SearchDetails,
  Models,
  Location,
  UserDetails,
  UserProfile,
  UserPackages,
  BookingOrder,
  OrderSummary,
  PaymentMethod,
  PaymentDetails,
  HomeDetails,
  BookingDetails,
  AddLocation,
  Chat,
  CustomerHome,
  SelectLocation,
  Kits,
} from '../../screens/app/index';
import {Icon} from 'react-native-elements';
import {Text, View, Image, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../globals/utilities/assets';
import {colors} from '../../globals/utilities/colors';
const MainApp = createStackNavigator();
const tabBarHeight =
  Platform.OS === 'android' ? responsiveHeight(10) : responsiveHeight(9);
const HomeStack = createStackNavigator();
const InboxStack = createStackNavigator();
const BookingsStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
import CustomeDrawar from '../Drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      showLabel={false}
      initialRouteName={'Home'}>
      <HomeStack.Screen name={'Home'} component={Home} />
      <HomeStack.Screen name={'AllAnnoucements'} component={AllAnnoucements} />
    </HomeStack.Navigator>
  );
};
const InboxStackScreens = () => {
  return (
    <InboxStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={'Inbox'}>
      <InboxStack.Screen name={'Inbox'} component={Inbox} />
    </InboxStack.Navigator>
  );
};
const BookingsStackScreens = () => {
  return (
    <BookingsStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={'Bookings'}>
      <BookingsStack.Screen name={'Bookings'} component={Bookings} />
      <BookingsStack.Screen
        name={'ConfirmedBooking'}
        component={ConfirmedBooking}
      />
    </BookingsStack.Navigator>
  );
};
const NotificationStackScreens = () => {
  return (
    <NotificationStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={'Notifications'}>
      <NotificationStack.Screen
        name={'Notifications'}
        component={Notifications}
      />
    </NotificationStack.Navigator>
  );
};

const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={'Profile'}>
      <ProfileStack.Screen name={'Profile'} component={Profile} />
    </ProfileStack.Navigator>
  );
};
const MainTabScreens = props => {
  const [isVisible, setIsVisible] = useState(true);

  const keyboardWillShow = event => {
    setIsVisible(false);
  };

  const keyboardWillHide = event => {
    setIsVisible(true);
  };

  return (
    <MainTab.Navigator
      barStyle={{backgroundColor: 'white'}}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        allowFontScaling: true,
        tabBarShowLabel: false,
        gestureEnabled: false,
        tabBarStyle: {
          backgroundColor: 'white',
          display: 'flex',
          width: responsiveWidth(100),
          alignSelf: 'center',
          height: tabBarHeight,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          //   position: 'absolute',
          paddingHorizontal: responsiveWidth(2.5),
        },
      }}
      initialRouteName={'Home'}>
      <MainTab.Screen
        name={'Home'}
        component={HomeStackScreens}
        initialParams={{chk: false}}
        options={() => ({
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.homeActive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.homeInactive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            );
          },
        })}
      />

      <MainTab.Screen
        name={'Inbox'}
        component={InboxStackScreens}
        options={props => ({
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.inboxActive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.inboxInactive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            );
          },
        })}
      />
      <MainTab.Screen
        name={'Bookings'}
        component={BookingsStackScreens}
        options={props => ({
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.bookingActive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.bookingInactive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            );
          },
        })}
      />

      <MainTab.Screen
        name={'Notifications'}
        component={NotificationStackScreens}
        options={props => ({
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.notificationActive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.notificationInactive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            );
          },
        })}
      />
      <MainTab.Screen
        name={'Profile'}
        component={ProfileStackScreens}
        options={props => ({
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.profileActive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(19),
                }}>
                <Image
                  source={appImages.profileInactive}
                  style={{
                    height: responsiveHeight(3),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            );
          },
        })}
      />
    </MainTab.Navigator>
  );
};

const App = () => {
  return (
    <Drawer.Navigator
      panThreshold
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomeDrawar {...props} />}>
      <Drawer.Screen name={'Main'} component={MainTabScreens} />
      <Drawer.Screen name={'EditProfile'} component={EditProfile} />
      <Drawer.Screen name={'CreateAnnoucement'} component={CreateAnnoucement} />
      <Drawer.Screen name={'DateTime'} component={DateTime} />
      <Drawer.Screen name={'Rekit'} component={Rekit} />
      <Drawer.Screen name={'RekitDetails'} component={RekitDetails} />
      <Drawer.Screen name={'MyAnnoucement'} component={MyAnnoucement} />
      <Drawer.Screen name={'Annoucement'} component={Annoucement} />
      <Drawer.Screen
        name={'AnnoucementDetails'}
        component={AnnoucementDetails}
      />
      <Drawer.Screen name={'Success'} component={Success} />
      <Drawer.Screen name={'Studio'} component={Studio} />
      <Drawer.Screen name={'Search'} component={Search} />
      <Drawer.Screen name={'SearchDetails'} component={SearchDetails} />
      <Drawer.Screen name={'Models'} component={Models} />
      <Drawer.Screen name={'Location'} component={Location} />
      <Drawer.Screen name={'UserDetails'} component={UserDetails} />
      <Drawer.Screen name={'UserProfile'} component={UserProfile} />
      <Drawer.Screen name={'UserPackages'} component={UserPackages} />
      <Drawer.Screen name={'BookingOrder'} component={BookingOrder} />
      <Drawer.Screen name={'OrderSummary'} component={OrderSummary} />
      <Drawer.Screen name={'PaymentMethod'} component={PaymentMethod} />
      <Drawer.Screen name={'PaymentDetails'} component={PaymentDetails} />
      <Drawer.Screen name={'HomeDetails'} component={HomeDetails} />
      <Drawer.Screen name={'BookingDetails'} component={BookingDetails} />
      <Drawer.Screen name={'AddLocation'} component={AddLocation} />
      <Drawer.Screen name={'Chat'} component={Chat} />
      <Drawer.Screen name={'CustomerHome'} component={CustomerHome} />
      <Drawer.Screen name={'SelectLocation'} component={SelectLocation} />
      <Drawer.Screen name={'Kits'} component={Kits} />
    </Drawer.Navigator>
  );
};

export default App;
