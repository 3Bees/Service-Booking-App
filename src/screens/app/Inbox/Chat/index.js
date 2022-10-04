import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  LogBox,
  Modal,
  Text,
} from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  Actions,
} from 'react-native-gifted-chat';
import {styles} from './style';
import {appImages} from '../../../../globals/utilities/assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {launchImageLibrary} from 'react-native-image-picker';
import {colors} from '../../../../globals/utilities/colors';
import {fontFamily} from '../../../../globals/utilities/fonts';
import {getCurrentUserId} from '../../../../Backend/auth';
import {
  getData,
  addToArray,
  saveData,
  uriToBlob,
  downloadImage,
  getFCMToken,
  addToCollection,
} from '../../../../Backend/utility';
import {db, storage} from '../../../../Backend/firebaseConfig';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
const Chat = props => {
  const {item} = props.route.params;
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    const focusfordb = props.navigation.addListener('focus', async () => {
      getMessages();
      BlockCheck();
    });
    return focusfordb;
  }, [props]);

  const [messages, setMessages] = useState([]);
  const [messagetext, setMessagetext] = useState('');
  const [loader, setLoader] = useState(true);
  const [modal, setModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [report, setReport] = useState('');
  const [blockedBy, setBlockedBy] = useState('');

  const getMessages = async () => {
    const uid = await getCurrentUserId();

    db.collection('Chat')
      .doc(uid)
      .onSnapshot(async function (doc) {
        await getData('Chat', uid, item.id).then(async messages => {
          if (messages) {
            setMessages(messages.reverse());
          } else {
            setMessages([]);
          }
          setLoader(false);
        });
      });
  };
  const BlockCheck = async () => {
    setLoader(true);
    const uid = await getCurrentUserId();
    db.collection('BlockedChat')
      .doc(uid)
      .onSnapshot(async function (doc) {
        await getData('BlockedChat', uid, 'BlockedChat').then(async data => {
          if (data != false) {
            let arr = [...data];
            let check = arr.findIndex(() => item.id);

            if (check === -1) {
              setBlockModal(false);
            } else {
              setBlockModal(true);
              setBlockedBy('Myself');
            }
          } else {
            setBlockModal(false);
          }
        });
      });
    db.collection('BlockedChat')
      .doc(item.id)
      .onSnapshot(async function (doc) {
        await getData('BlockedChat', item.id, 'BlockedChat').then(data => {
          if (data != false) {
            let arr = [...data];
            let check = arr.findIndex(() => uid);

            if (check === -1) {
              setBlockModal(false);
            } else {
              setBlockModal(true);
              setBlockedBy('other');
            }
          } else {
            setBlockModal(false);
          }
        });
      });
    setLoader(false);
  };

  const onSend = useCallback(
    async (messages = []) => {
      let userID = await getCurrentUserId();
      let myfcm = await getFCMToken(userID);
      let receiverfcm = await getFCMToken(item.id);
      await getData('users', userID).then(async details => {
        let date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss a');
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        );
        messages[0].createdAt = Date.parse(messages[0].createdAt);
        messages[0].user.firstname = `${item.firstname}`;
        messages[0].user.lastname = `${item.lastname}`;
        messages[0].user.avatar = `${item.profilePicture}`;
        messages[0].user.userId = `${item.id}`;
        messages[0].senderFCM = myfcm;
        messages[0].receiverFCM = receiverfcm;
        await addToArray('Chat', details.id, item.id, messages[0]);
        messages[0].user.firstname = `${details.firstname}`;
        messages[0].user.lastname = `${details.lastname}`;
        messages[0].user.avatar = `${details.profilePicture}`;
        messages[0].user.userId = `${details.id}`;
        messages[0].user._id = 2;
        messages[0].senderFCM = myfcm;
        messages[0].receiverFCM = receiverfcm;
        await addToArray('Chat', item.id, details.id, messages[0]);
        await storeChatNotification(receiverfcm, details.firstname, details.id);
      });
    },
    [props.route.params],
  );
  const storeChatNotification = async (receiverFcm, senderName, myId) => {
    let timeStamp = moment().format('HHMMss');
    let obj = {
      fcmToken: receiverFcm,
      senderName: senderName,
      timeStamp: timeStamp,
    };
    await saveData('chatNotificaton', myId, obj);
  };
  function renderActions(props) {
    return (
      <Actions
        {...props}
        onPressActionButton={() => opengalleryimage(props)}
        icon={() => (
          <Image
            source={appImages.attachment}
            style={{
              height: responsiveHeight(3),
              width: responsiveWidth(6),
              resizeMode: 'contain',
              position: 'absolute',
              right: 0,
            }}
          />
        )}
      />
    );
  }
  const customInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={
          {
            //   borderTopColor: '#fff',
            //   borderTopWidth: 0,
            //   paddingTop: 5,
            //   marginBottom: responsiveHeight(1),
          }
        }
      />
    );
  };
  const renderComposer = props => {
    return (
      <View style={styles.messageBox}>
        <TextInput
          placeholder={'Type a message...'}
          placeholderTextColor={colors.lightText}
          value={messagetext}
          multiline={true}
          style={{
            color: 'black',
            fontSize: responsiveFontSize(1.8),
            width: responsiveWidth(40),
            //   padding: 5,
          }}
          onChangeText={messagetext => setMessagetext(messagetext)}
        />
      </View>
    );
  };
  const opengalleryimage = props => {
    var options = {
      title: 'ImagePicker',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        saveImage(response.assets[0], props);
      }
    });
  };
  const saveImage = async (response, props) => {
    setLoader(true);

    const profileImageResponse = response;
    let postObj = new Object();
    var today = new Date();
    var mili = today.getMilliseconds();
    let kk = Date.parse(today);
    kk = kk + mili;
    let responseloc = profileImageResponse;

    let image = responseloc.uri;
    let imagePath = kk;
    let file = await uriToBlob(image);
    const uploadTask = storage.ref(`Image/${imagePath}`).put(file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        if (progress == 100) {
        }
      },
      error => {
        console.log('error 1', error);
        setLoader(false);
      },
      async () => {
        await downloadImage('Image', imagePath).then(async uri => {
          if (uri) {
            let select = {
              image: '',
              video: '',
            };
            if (response.duration) {
              select['video'] = uri;
            } else {
              select['image'] = uri;
            }
            props.onSend({
              text: '',
              ...select,
            });

            setLoader(false);
          } else {
            setLoader(false);
          }
        });
      },
    );
  };
  const renderBubble = props => {
    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              borderBottomLeftRadius: responsiveWidth(0),
              borderBottomRightRadius: responsiveWidth(5),
              borderTopLeftRadius: responsiveWidth(5),
              borderTopRightRadius: responsiveWidth(5),
              backgroundColor: colors.yellow,
              paddingVertical: responsiveHeight(0.8),
              paddingHorizontal: 5,
            },
            right: {
              backgroundColor: colors.black,
              paddingVertical: responsiveHeight(0.8),
              paddingHorizontal: 5,
              borderBottomLeftRadius: responsiveWidth(5),
              borderBottomRightRadius: responsiveWidth(0),
              borderTopLeftRadius: responsiveWidth(5),
              borderTopRightRadius: responsiveWidth(5),
            },
          }}
          textStyle={{
            left: {
              color: 'white',
              fontFamily: fontFamily.RobotoMedium,
            },
            right: {
              color: 'white',
              fontFamily: fontFamily.RobotoMedium,
            },
          }}
          timeTextStyle={{
            right: {
              color: colors.halfWhite,
              textAlign: 'right',
            },
            left: {color: colors.halfWhite, textAlign: 'right'},
          }}
        />
      </View>
    );
  };
  const deleteThread = async () => {
    let uid = await getCurrentUserId();
    await getData('Chat', uid).then(async data => {
      await db
        .collection('Chat')
        .doc(uid)
        .delete()
        .then(async () => {
          let obj = data;
          delete obj[item.id];
          await saveData('Chat', uid, {...obj}).then(() => {
            Toast.show('Messages deleted');
            setModal(false);
            props.navigation.navigate('Inbox');
          });
        });
    });
  };
  const Block = async () => {
    let uid = await getCurrentUserId();
    await addToArray('BlockedChat', uid, 'BlockedChat', {
      userId: item.id,
    }).then(async () => {
      setModal(false);
      //   BlockCheck();
    });
  };
  const Unblock = async () => {
    let uid = await getCurrentUserId();
    await getData('BlockedChat', uid, 'BlockedChat')
      .then(async data => {
        let arr = [...data];
        let index = arr.findIndex(() => item.id);

        arr.splice(index, 1);
        await saveData('BlockedChat', uid, {BlockedChat: arr});
      })
      .then(() => {
        // BlockCheck();
        setBlockedBy('');
      });
    //   setBlockModal(false);
  };
  const reportSubmit = async () => {
    let uid = await getCurrentUserId();
    await addToArray('ChatReports', uid, 'ChatReports', {
      reportedId: item.id,
      reportedUser: `${item.firstname} ${item.lastname}`,
      details: report,
    }).then(() => {
      setReportModal(false);
    });
  };
  if (loader) {
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={appImages.HeaderBackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View>
          <ImageBackground
            source={{uri: item.profilePicture}}
            style={styles.photo}
            imageStyle={{borderRadius: responsiveWidth(6)}}></ImageBackground>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModal(true);
          }}>
          <Image source={appImages.threedots} style={styles.threedots} />
        </TouchableOpacity>
      </View>
      <GiftedChat
        // showUserAvatar
        messages={messages}
        onSend={messages => onSend(messages)}
        renderActions={renderActions}
        // renderMessageImage={renderMessageImage}
        renderBubble={renderBubble}
        renderInputToolbar={customInputToolbar}
        // renderComposer={renderComposer}
        // renderSend={props => {
        //   const {text, messageIdGenerator, user, onSend} = props;
        //   return (
        //     <View style={styles.sendView}>
        //       <TouchableOpacity
        //         onPress={() => {
        //           if (messagetext && onSend) {
        //             onSend(
        //               {
        //                 text: messagetext.trim(),
        //                 user: user,
        //                 _id: messageIdGenerator(),
        //               },
        //               true,
        //               setMessagetext(''),
        //             );
        //           }
        //         }}
        //         style={styles.sendButton}>
        //         <Icon
        //           type={'ionicon'}
        //           name={'send'}
        //           color={colors.black}
        //           size={20}
        //         />
        //         <Image
        //           resizeMode="cover"
        //           source={{uri: image}}
        //           style={styles.imagestyl}
        //         />
        //       </TouchableOpacity>
        //     </View>
        //   );
        // }}
        user={{
          _id: 1,
        }}
      />
      <Modal visible={modal} transparent={true}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => {
            setModal(false);
          }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                deleteThread();
              }}>
              <Text style={styles.BtnsText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModal(false);
                setReportModal(true);
              }}>
              <Text style={styles.BtnsText}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Block();
              }}>
              <Text style={styles.BtnsText}>Block</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal transparent={true} visible={blockModal}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={styles.blockModalContainer}>
            <Text style={styles.wariningText}>
              You've blocked messages {blockedBy == 'other' ? 'By' : 'from'}{' '}
              {`${item.firstname} ${item.lastname}'s account`}.{'\n'}You can't
              message in this chat and you won't receive their messages.
            </Text>
            {blockedBy == 'other' ? (
              <TouchableOpacity
                style={styles.unBlockBtn}
                onPress={() => {
                  props.navigation.goBack();
                }}>
                <Text style={styles.unBlockBtnText}>Go Back</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.unBlockBtn}
                  onPress={() => {
                    Unblock();
                  }}>
                  <Text style={styles.unBlockBtnText}>Tap to Unblock</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.unBlockBtn, {marginTop: responsiveHeight(0)}]}
                  onPress={() => {
                    props.navigation.goBack();
                  }}>
                  <Text style={styles.unBlockBtnText}>Go Back</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <Modal visible={reportModal} transparent={true}>
        <View style={[styles.modalBackground, {justifyContent: 'center'}]}>
          <View style={styles.reportModalView}>
            <Text style={styles.reportText}>Report</Text>
            <TextInput
              placeholder="write here..."
              value={report}
              onChangeText={val => {
                setReport(val);
              }}
              multiline={true}
              numberOfLines={6}
              textAlignVertical={'top'}
              style={styles.reportInput}
            />
            <View style={{height: responsiveHeight(2)}} />
            <TouchableOpacity
              style={[styles.reportBtn, {backgroundColor: colors.darkGray}]}
              onPress={() => {
                setReportModal(false);
              }}>
              <Text style={styles.reportBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reportBtn}
              onPress={() => {
                reportSubmit();
              }}>
              <Text style={styles.reportBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Chat;
