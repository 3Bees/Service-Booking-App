import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {Data} from '../../../services/app/Annoucement';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import {colors} from '../../../globals/utilities/colors';
import {useIsFocused} from '@react-navigation/native';
import {
  addToArray,
  getAllOfCollection,
  getData,
  getDataWithSnapShot,
  saveData,
  updateArray,
} from '../../../Backend/utility';
import {getCurrentUserId} from '../../../Backend/auth';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
const MyAnnoucement = props => {
  const isFocused = useIsFocused();
  const [resquests, setRequests] = useState([]);
  const [responcesModal, setResponcesModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [currentItem, setCurrentItem] = useState('');
  useEffect(() => {
    if (isFocused) {
      Annoucements();
    }
  }, [isFocused, props]);
  const Annoucements = async () => {
    setLoading(true);
    let userId = await getCurrentUserId();
    await getDataWithSnapShot('Annoucements').then(async () => {
      await getAllOfCollection('Annoucements').then(res => {
        let arr = res.filter(val => val.userId === userId);
        //   console.log(arr[0].responces);
        setData(arr);
        setLoading(false);
      });
    });
  };
  const renderItem = (item, index) => {
    return (
      <View style={styles.MainView}>
        <View style={styles.imageView}>
          <Image source={{uri: item.picture}} style={styles.photo} />
        </View>
        <View style={styles.detailsView}>
          <View style={styles.rowView}>
            <Text style={styles.name}>{item.userName}</Text>
            <Text style={styles.time}>{moment(item.posted).fromNow()}</Text>
          </View>
          <TouchableOpacity
            style={styles.responcesBtn}
            onPress={() => {
              if (item.checked === false) {
                if (item.responces.length) {
                  setRequests(item.responces);
                  setResponcesModal(true);
                  setCurrentItem(item);
                }
              } else {
                Toast.show('Already Accepted');
              }
            }}>
            <Text style={styles.responcesBtnText}>
              {item.responces.length
                ? item.responces.length + ' ' + 'Responces'
                : 'No Responce'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Annoucement', {item});
            }}>
            <Text style={styles.moreBtnText}>See More</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderResponces = (item, index) => {
    return (
      <View style={styles.responcesView}>
        <TouchableOpacity>
          <View style={styles.photoView}>
            <Image source={{uri: item.photo}} style={styles.userPhoto} />
          </View>
        </TouchableOpacity>
        <View style={styles.responceSubview}>
          <Text style={styles.userName}>{item.name}</Text>
          <View style={styles.rowView1}>
            <TouchableOpacity
              style={styles.RejectBtn}
              onPress={async () => {
                let arr = [...resquests];
                console.log({arr});
                arr.splice(index, 1);
                console.log({arr});
                await saveData('Annoucements', currentItem.docId, {
                  responces: arr,
                }).then(() => {
                  Annoucements();
                  setResponcesModal(false);
                });
              }}>
              <Text style={styles.RejectBtnText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.AcceptBtn}
              onPress={() => {
                setResponcesModal(false);
                setConfirmationModal(true);
                setName(item.name);
                setCurrentUser(item);
              }}>
              <Text style={styles.AcceptBtnText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  if (loading) {
    return (
      <ActivityIndicator
        color={colors.black}
        size={'large'}
        style={{marginTop: responsiveHeight(45)}}
      />
    );
  }
  return (
    <View style={styles.container}>
      <NewHeader title={'ANNOUNCEMENT '} backBtn />
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return renderItem(item, index);
        }}
      />
      <Modal visible={responcesModal} transparent={true}>
        <TouchableOpacity
          onPress={() => setResponcesModal(false)}
          style={styles.modalWrapper}>
          <View style={styles.Modalbackground}>
            <FlatList
              data={resquests}
              renderItem={({item, index}) => {
                return renderResponces(item, index);
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.line} />;
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal visible={confirmationModal} transparent={true}>
        <View style={styles.modalWrapper}>
          <View style={styles.Modalbackground}>
            <Text style={styles.confirmationMessage}>
              {`Are you sure you want to add booking with ${name} on ${currentItem.date} at ${currentItem.time}?`}
            </Text>
            <View style={styles.BtnsView}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.RejectBtn}
                  onPress={() => {
                    setConfirmationModal(false);
                  }}>
                  <Text style={styles.RejectBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.AcceptBtn}
                  onPress={async () => {
                    setLoading(true);
                    let userId = await getCurrentUserId();
                    const myData = await getData('users', userId);
                    await saveData('Annoucements', currentItem.docId, {
                      checked: true,
                    })
                      .then(async () => {
                        await addToArray('Bookings', userId, 'Bookings', {
                          name: name,
                          date: currentItem.date,
                          time: currentItem.time,
                          location: {},
                          photo: currentUser.photo,
                          BookedBy: currentUser.userId,
                          RecievedBy: userId,
                          recieved: true,
                          type: 'annoucement',
                          status: 'Pending',
                          service: currentUser.service,
                          docId: currentItem.docId,
                          accepted: 'Pending',
                        });
                        await addToArray(
                          'Bookings',
                          currentUser.userId,
                          'Bookings',
                          {
                            name: `${myData.firstname} ${myData.lastname}`,
                            date: currentItem.date,
                            time: currentItem.time,
                            location: {},
                            photo: myData.profilePicture,
                            BookedBy: currentUser.userId,
                            RecievedBy: userId,
                            recieved: false,
                            type: 'annoucement',
                            status: 'Pending',
                            service: myData.category,
                            docId: currentItem.docId,
                            accepted: 'Pending',
                          },
                        );
                      })
                      .then(async () => {
                        await addToArray(
                          'Notification',
                          userId,
                          'Notification',
                          {
                            userId: currentUser.userId,
                            name: name,
                            docId: currentItem.docId,
                            title: currentItem.title,
                            type: 'annoucementbooking',
                            time: moment(new Date()).format(),
                            date: currentItem.date,
                          },
                        );
                        await addToArray(
                          'Notification',
                          currentUser.userId,
                          'Notification',
                          {
                            userId: userId,
                            name: `${myData.firstname} ${myData.lastname}`,
                            docId: currentItem.docId,
                            title: currentItem.title,
                            type: 'annoucementbooking',
                            time: moment(new Date()).format(),
                            date: currentItem.date,
                          },
                        );
                      })
                      .then(() => {
                        setConfirmationModal(false);
                        setBookingModal(true);
                        setTimeout(() => {
                          Toast.show('Booking Added');
                          setBookingModal(false);
                          setResponcesModal(false);
                          setLoading(false);
                        }, 3000);
                      });
                  }}>
                  <Text style={styles.AcceptBtnText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={bookingModal} transparent={true}>
        <View style={styles.modalWrapper}>
          <View style={styles.Modalbackground1}>
            <Icon
              type="ionicon"
              name="checkmark-circle"
              size={responsiveFontSize(4)}
              color={colors.black}
            />
            <Text style={styles.bookingText}>{'Booking Added'}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyAnnoucement;
