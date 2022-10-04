import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {Icon} from 'react-native-elements';
import {colors} from '../../../../globals/utilities/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../../../globals/utilities/assets';
import {AppButton} from '../../../../components/general/button';
import {ATextInput} from '../../../../components/general/TextInput';
import {launchImageLibrary} from 'react-native-image-picker';
import {uriToBlob, saveData, downloadImage} from '../../../../Backend/utility';
import {storage} from '../../../../Backend/firebaseConfig';
import {getCurrentUserId} from '../../../../Backend/auth';
const EditProfile = props => {
  const {data} = props.route.params;
  const [firstname, setFirstname] = useState(data.firstname);
  const [lastname, setLastname] = useState(data.lastname);
  const [address, setAddress] = useState(data.address);
  const [gender, setGender] = useState(data.gender);
  const [email, setEmail] = useState(data.email);
  const [number, setNumber] = useState(data.number);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(data.profilePicture);
  const Gallery = () => {
    var options = {
      title: 'Profile Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        //setFilePath(response);
        console.log('>>>>>>>>>>>>', response);
        // setImage(response.assets[0].uri);
        saveImage(response.assets[0]);
      }
    });
  };
  const saveImage = async response => {
    setLoading(true);
    const profileImageResponse = response;
    let postObj = new Object();
    var today = new Date();
    var mili = today.getMilliseconds();
    let kk = Date.parse(today);
    kk = kk + mili;
    let responseloc = profileImageResponse;
    console.log('r4', responseloc);
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
        setLoading(false);
      },
      async () => {
        await downloadImage('Image', imagePath).then(async uri => {
          if (uri) {
            let userId = await getCurrentUserId();

            await saveData('users', userId, {
              profilePicture: uri,
            }).then(() => {
              setImage(uri);
              setLoading(false);
            });
            console.log('uri==', uri);
          }
        });
      },
    );
  };
  const updateProfile = async () => {
    const userId = await getCurrentUserId();
    setLoading(true);
    const updateObj = {};
    if (firstname) {
      updateObj['firstname'] = firstname;
    }
    if (lastname) {
      updateObj['lastname'] = lastname;
    }

    if (number) {
      updateObj['number'] = number;
    }

    if (address) {
      updateObj['address'] = address;
    }

    if (Object.keys(updateObj).length > 0) {
      console.log(updateObj);
      await saveData('users', userId, updateObj);
      props.navigation.navigate('Profile');
      setLoading(false);
    } else {
      props.navigation.navigate('Profile');
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Edit Profile'} backBtn />
      <View style={styles.photoView}>
        <Image source={{uri: image}} style={styles.photo} />
      </View>
      <View style={{height: responsiveHeight(4)}} />
      <AppButton
        activity={loading}
        Title={'Change Photo'}
        onPress={() => {
          Gallery();
        }}
      />
      <View style={{height: responsiveHeight(3)}} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Text style={styles.heading}>Info</Text>
        <ATextInput
          image={appImages.nameIcon}
          value={firstname}
          onChangeText={val => {
            setFirstname(val);
          }}
        />
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          image={appImages.nameIcon}
          value={lastname}
          onChangeText={val => {
            setLastname(val);
          }}
        />
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          image={appImages.addressIcon}
          value={address}
          onChangeText={val => {
            setAddress(val);
          }}
        />
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          image={appImages.nameIcon}
          value={gender}
          onChangeText={val => {
            setGender(val);
          }}
        />
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          image={appImages.emailIcon}
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
          editable={false}
        />
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          image={appImages.numberIcon}
          value={number}
          onChangeText={val => {
            setNumber(val);
          }}
        />
        <AppButton
          Title={'Done'}
          ButtonStyles={styles.btn}
          activity={loading}
          onPress={() => {
            updateProfile();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfile;
