import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../globals/utilities/assets';
import {colors} from '../../../globals/utilities/colors';
import {AppButton, NewButton} from '../../../components/general/button';
import {ATextInput} from '../../../components/general/TextInput';
import {NewHeader} from '../../../components/general/header';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {launchImageLibrary} from 'react-native-image-picker';
import {uriToBlob, saveData, downloadImage} from '../../../Backend/utility';
import {storage} from '../../../Backend/firebaseConfig';
import Geolocation from 'react-native-geolocation-service';

const AddPortfolio = props => {
  const {data, password, image, usertype} = props.route.params;
  const [loading, setLoading] = useState(false);
  const [allImages, setAllimages] = useState([]);
  const [index, setIndex] = useState(0);
  const [select, setSelect] = useState(false);
  const Gallery = () => {
    var options = {
      title: 'Profile Photo',
      mediaType: data.category === 'Video' ? 'mixed' : 'photo',
      storageOptions: {
        // skipBackup: true,
        // path: 'images',
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
        saveImage(response.assets[0]);
      }
    });
  };
  const saveImage = async response => {
    let value = response.type.split('/', 1);
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
    let imagePath = `${kk}.${value}`;
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
            setLoading(false);
            // setImage(uri);
            console.log('uri==', uri);
            let arr = [...allImages];
            arr.push(uri);
            setAllimages(arr);
            setSelect(true);
          }
        });
      },
    );
  };
  const previousImage = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const NextImage = () => {
    if (index < allImages.length - 1) {
      setIndex(index + 1);
    }
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Add a portfolio'} backBtn />
      <Text style={styles.heading}>Portfolio</Text>
      <View style={styles.ImageView}>
        {!allImages.length ? (
          <View style={styles.grayView}>
            <Text style={styles.addImageText}>ADD PHOTOS/VIDEOS</Text>
          </View>
        ) : (
          <ImageBackground
            source={{uri: allImages[index]}}
            style={styles.image}>
            <TouchableOpacity
              onPress={() => {
                previousImage();
              }}>
              <Image source={appImages.cheveronleft} style={styles.arrowBtn} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                NextImage();
              }}>
              <Image source={appImages.cheveronRight} style={styles.arrowBtn} />
            </TouchableOpacity>
          </ImageBackground>
        )}
      </View>
      {select === false ? (
        <>
          <View style={{height: responsiveHeight(15)}} />
          <AppButton
            activity={loading}
            Title={'Add a portfolio'}
            onPress={() => {
              Gallery();
            }}
          />
        </>
      ) : (
        <View>
          <View style={{height: responsiveHeight(5)}} />
          <AppButton
            activity={loading}
            Title={'Select images/videos'}
            onPress={() => {
              Gallery();
            }}
          />
          <View style={{height: responsiveHeight(3)}} />
          <AppButton
            activity={loading}
            Title={'Save'}
            onPress={() => {
              //   if (usertype === 'Model' || usertype === 'Artist') {
              //     props.navigation.navigate('App');
              //   } else {
              props.navigation.navigate('AddPortfolio1', {
                images: allImages,
                details: data,
                password,
                image,
              });
              //   }
            }}
          />
        </View>
      )}
    </View>
  );
};

export default AddPortfolio;
