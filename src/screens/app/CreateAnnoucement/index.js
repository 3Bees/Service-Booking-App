import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import {colors} from '../../../globals/utilities/colors';
import {appImages} from '../../../globals/utilities/assets';
import moment from 'moment';
import {addToArray, getData, saveData} from '../../../Backend/utility';
import {getCurrentUserId} from '../../../Backend/auth';
import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
const CreateAnnoucement = props => {
  const {value, location} = props.route.params;
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const newAnnoucement = async () => {
    let userId = await getCurrentUserId();
    if (Validation()) {
      setLoading(true);
      let docId = uuid.v4();
      await getData('users', userId).then(async userDetails => {
        console.log({userDetails});
        let currentTime = moment(new Date()).format();
        await saveData('Annoucements', docId, {
          userId: userId,
          date: moment(value.date).format('Do MMM , YYYY'),
          time: value.time,
          description: description,
          picture: userDetails.profilePicture,
          userName: `${userDetails.firstname}  ${userDetails.lastname}`,
          posted: currentTime,
          responces: [],
          checked: false,
          category: userDetails.category,
          docId: docId,
          title: title,
          location: location,
        }).then(() => {
          setLoading(false);
          props.navigation.navigate('MyAnnoucement');
          setDescription('');
        });
      });
    }
  };
  const Validation = () => {
    var check = true;
    if (value === null) {
      Toast.show('Select Date and Time');
      check = false;
    } else if (location === 'Add Place' || location === '') {
      Toast.show('Select Location');
      check = false;
    } else if (description.length < 1) {
      Toast.show('Enter Description');
      check = false;
    }
    return check;
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Create an announcement'} backBtn />
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          props.navigation.navigate('DateTime', {
            location: location ? location : 'Add Place',
          });
        }}>
        <View style={styles.RowView}>
          <Image source={appImages.dateIcon} style={styles.icon} />
          <Text style={styles.btnText}>
            {value && value.date
              ? moment(value.date).format('Do MMM , YYYY') + ' ' + value.time
              : 'Add Date and Time'}
          </Text>
        </View>
        <Icon
          type="feather"
          name="chevron-right"
          color={colors.yellow}
          size={responsiveFontSize(4)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          props.navigation.navigate('AddLocation', {
            value: value ? value : 'Add Date and Time',
          });
        }}>
        <View style={styles.RowView}>
          <Image source={appImages.locationIcon} style={styles.icon} />
          <Text style={styles.btnText}>
            {location ? location.title : 'Add Place'}
          </Text>
        </View>
        <Icon
          type="feather"
          name="chevron-right"
          color={colors.yellow}
          size={responsiveFontSize(4)}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Enter Title"
        value={title}
        onChangeText={val => setTitle(val)}
        style={styles.titleInput}
      />
      <TextInput
        placeholder="Write something..."
        placeholderTextColor={colors.lightText}
        value={description}
        onChangeText={val => {
          setDescription(val);
        }}
        multiline={true}
        style={styles.input}
      />
      <TouchableOpacity
        disabled={loading}
        style={styles.doneBtn}
        onPress={() => {
          newAnnoucement();
        }}>
        {loading ? (
          <ActivityIndicator color={colors.white} size={'small'} />
        ) : (
          <Text style={styles.OkBtn}>Done</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreateAnnoucement;
