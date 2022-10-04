import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import {styles} from './style';
import {appImages} from '../../../../globals/utilities/assets';
import {colors} from '../../../../globals/utilities/colors';
import {AppButton} from '../../../../components/general/button';
import {ATextInput} from '../../../../components/general/TextInput';
import {NewHeader} from '../../../../components/general/header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DateSelect} from '../../../../components/general/dateTimePicker';
import moment from 'moment';
const CreateProfile1 = props => {
  const {authData} = props.route.params;
  const [firstname, setFirstname] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastname, setLastname] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [businessname, setBusinessname] = useState('');
  const [businessnameError, setBusinessnameError] = useState('');
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [number, setNumber] = useState('');
  const [numberError, setNumberError] = useState('');
  const [wage, setWage] = useState('');
  const [wageError, setWageError] = useState('');
  const [description, setDesciption] = useState('');
  const [descriptionError, setDesciptionError] = useState('');
  const [type, setType] = useState('');
  const [typeError, setTypeError] = useState('');
  const [offer, setOffer] = useState(true);
  const [search, setSearch] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [DOB, setDOB] = useState('');
  const [DOBerror, setDOBerror] = useState('');
  const Validation = () => {
    const re =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    var check = true;
    if (email === '') {
      setEmailError('Enter Email Address');
      check = false;
    } else if (!re.test(email)) {
      setEmailError('Email Format is Invalid');
      check = false;
    } else {
      setEmailError('');
    }
    if ((offer === true && type === 'Model/Dancers') || type === 'Artist') {
      if (wage === '') {
        setWageError('Enter Wage');
        check = false;
      } else {
        setWageError('');
      }
    }
    if (firstname === '') {
      setFirstnameError('Enter First Name');
      check = false;
    } else if (firstname.length < 2) {
      setFirstnameError('Minimum 2 Characters');
      check = false;
    } else {
      setFirstnameError('');
    }
    if (lastname === '') {
      setLastnameError('Enter Last Name');
      check = false;
    } else if (lastname.length < 2) {
      setLastnameError('Minimum 2 Characters');
      check = false;
    } else {
      setLastnameError('');
    }
    if (businessname === '') {
      type === 'Studio'
        ? setBusinessnameError("Enter Studio's Name")
        : type === 'Video' || type === 'Photo'
        ? setBusinessnameError('Enter Business Name')
        : setBusinessnameError('Enter Nickname Name');
      check = false;
    } else if (businessname.length < 2) {
      setBusinessnameError('Minimum 2 Characters');
      check = false;
    } else {
      setBusinessnameError('');
    }
    if (address === '') {
      setAddressError('Enter Address');
      check = false;
    } else {
      setAddressError('');
    }
    if (gender === '') {
      setGenderError('Select Your Gender');
      check = false;
    } else {
      setGenderError('');
    }
    if (number === '') {
      setNumberError('Enter Number');
      check = false;
    } else {
      setNumberError('');
    }
    if (type === '') {
      setTypeError('Select Type');
      check = false;
    } else {
      setTypeError('');
    }
    if (description === '') {
      setDesciptionError('Enter Description');
      check = false;
    } else {
      setDesciptionError('');
    }
    if (type === 'Model/Dancers' || type === 'Artist') {
      if (DOB === '') {
        setDOBerror('Select Date of Birth');
        check = false;
      } else {
        setDOBerror('');
      }
    }
    return check;
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Create Profile'} backBtn />

      <ScrollView keyboardShouldPersistTaps="always">
        <Text style={styles.heading}>Type</Text>
        <View style={styles.rowView}>
          <View style={styles.flBtnView}>
            {offer === true ? (
              <TouchableOpacity style={styles.checkBtn}>
                <View style={styles.checkedBtn} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.checkBtn}
                onPress={async () => {
                  setOffer(true);
                  setSearch(false);
                  await AsyncStorage.setItem('userType', 'Provider');
                }}
              />
            )}
            <Text style={styles.checkBtnText}>{'OFFER A SERVICE AS'}</Text>
          </View>
          <View style={styles.flBtnView}>
            {search === true ? (
              <TouchableOpacity style={styles.checkBtn}>
                <View style={styles.checkedBtn} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.checkBtn}
                onPress={async () => {
                  await AsyncStorage.setItem('userType', 'Customer');

                  setOffer(false);
                  setSearch(true);
                }}
              />
            )}
            <Text style={styles.checkBtnText}>{'SEARCH FOR A SERVICE AS'}</Text>
          </View>
        </View>
        <View style={styles.pickerView}>
          <RNPickerSelect
            placeholder={{label: 'Select your type', value: null}}
            Icon={() => (
              <Icon
                name="chevron-thin-down"
                type="entypo"
                color={colors.darkGray}
                size={responsiveWidth(4.5)}
                style={{marginTop: responsiveHeight(3)}}
              />
            )}
            style={{
              inputIOS: styles.inputIOS,
              inputAndroid: styles.inputAndroid,
              placeholder: {color: colors.black},
            }}
            useNativeAndroidPickerStyle={false}
            items={
              offer
                ? [
                    {label: 'Studio', value: 'Studio'},
                    {label: 'Photo', value: 'Photo'},
                    {label: 'Video', value: 'Video'},
                    {label: 'Model/Dancers', value: 'Model/Dancers'},
                    // {label: 'Artist', value: 'Artist'},
                  ]
                : [
                    {label: 'Business', value: 'Business'},
                    {label: 'Artist', value: 'Artist'},
                    {label: 'Model/Dancers', value: 'Model/Dancers'},
                  ]
            }
            onValueChange={async value => {
              setType(value);
              await AsyncStorage.setItem('type', JSON.stringify(value));
            }}
          />
        </View>
        {!typeError ? null : (
          <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
            {typeError}
          </Text>
        )}
        <Text style={styles.heading}>Info</Text>

        <ATextInput
          placeholder={'First Name'}
          image={appImages.nameIcon}
          value={firstname}
          onChangeText={val => {
            setFirstname(val);
          }}
        />
        {!firstnameError ? null : (
          <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
            {firstnameError}
          </Text>
        )}
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          placeholder={'Last Name'}
          image={appImages.nameIcon}
          value={lastname}
          onChangeText={val => {
            setLastname(val);
          }}
        />
        {!lastnameError ? null : (
          <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
            {lastnameError}
          </Text>
        )}
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          placeholder={'Address'}
          image={appImages.addressIcon}
          value={address}
          onChangeText={val => {
            setAddress(val);
          }}
        />
        {!addressError ? null : (
          <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
            {addressError}
          </Text>
        )}
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          placeholder={
            type === 'Studio'
              ? "Studio's Name"
              : type === 'Video' || type === 'Photo'
              ? 'Business Name'
              : 'Nickname'
          }
          image={type === 'Studio' ? appImages.studioIcon : appImages.nameIcon}
          value={businessname}
          onChangeText={val => {
            setBusinessname(val);
          }}
        />
        {!businessnameError ? null : (
          <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
            {businessnameError}
          </Text>
        )}
        <View style={{height: responsiveHeight(2)}} />
        <View
          style={[
            styles.pickerView,
            {marginTop: 0, width: responsiveWidth(84)},
          ]}>
          <Image
            source={appImages.nameIcon}
            style={{
              height: responsiveFontSize(2),
              width: responsiveFontSize(2),
              resizeMode: 'contain',
              marginLeft: responsiveWidth(3),
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{label: 'Gender', value: null}}
            style={{
              inputIOS: styles.inputIOS,
              inputAndroid: styles.inputAndroid1,
              placeholder: {color: colors.black},
            }}
            onValueChange={value => {
              if (value === 'Others') {
                setTimeout(() => {
                  setGenderModal(true);
                }, 2000);
              } else {
                setGender(value);
              }
            }}
            items={[
              {label: 'Male', value: 'Male'},
              {label: 'Female', value: 'Female'},
              {label: 'Others', value: 'Others'},
            ]}
          />
        </View>
        {!genderError ? null : (
          <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
            {genderError}
          </Text>
        )}
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          placeholder={'Email'}
          image={appImages.emailIcon}
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
        />
        {!emailError ? null : (
          <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
            {emailError}
          </Text>
        )}
        <View style={{height: responsiveHeight(2)}} />
        <ATextInput
          placeholder={'Number'}
          image={appImages.numberIcon}
          value={number}
          keyboardType={'phone-pad'}
          onChangeText={val => {
            setNumber(val);
          }}
        />
        {!numberError ? null : (
          <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
            {numberError}
          </Text>
        )}
        {type === 'Model/Dancers' || type === 'Artist' ? (
          <>
            <View style={{height: responsiveHeight(2)}} />

            <DateSelect
              getDate={date => {
                setDOB(date);
              }}
              value={DOB}
            />
            {!DOBerror ? null : (
              <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
                {DOBerror}
              </Text>
            )}
          </>
        ) : null}
        {(offer && type == 'Model/Dancers') || type == 'Artist' ? (
          <>
            <View style={{height: responsiveHeight(2)}} />
            <ATextInput
              placeholder={'Wage'}
              image={appImages.emailIcon}
              value={wage}
              onChangeText={val => {
                setWage(val);
              }}
            />
            {!wageError ? null : (
              <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
                {wageError}
              </Text>
            )}
          </>
        ) : null}

        <View style={{height: responsiveHeight(3)}} />
        <Text style={styles.mediumHeading}>Description</Text>
        <View style={{height: responsiveHeight(1)}} />
        <View style={styles.descriptionInput}>
          <TextInput
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into "
            multiline={true}
            value={description}
            onChangeText={val => setDesciption(val)}
            numberOfLines={5}
            textAlignVertical={'top'}
          />
        </View>
        {!descriptionError ? null : (
          <Text style={{color: 'red', marginLeft: responsiveWidth(8)}}>
            {descriptionError}
          </Text>
        )}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => {
            if (Validation()) {
              var years = moment().diff(DOB, 'years', false);
              props.navigation.navigate('CreateProfile2', {
                usertype: offer
                  ? 'OFFER A SERVICE AS'
                  : 'SEARCH FOR  A SERVICE AS',
                password: authData.password,
                provider: authData.provider,
                data: {
                  email: authData.email,
                  Termsandconditions: authData.agree,
                  type: offer
                    ? 'OFFER A SERVICE AS'
                    : 'SEARCH FOR  A SERVICE AS',
                  category: type,
                  firstname: firstname,
                  lastname: lastname,
                  address: address,
                  businessname: businessname,
                  gender: gender,
                  number: number,
                  wage: wage,
                  description: description,
                  age: years,
                },
              });
            }
          }}>
          <Image source={appImages.greaterThan} style={styles.greaterThan} />
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={genderModal} transparent={true}>
        <View style={styles.modalWrapper}>
          <View style={styles.Modalbackground}>
            <Text style={styles.genderText}>Enter Your Gender</Text>
            <ATextInput
              placeholder={'Enter Your Gender'}
              image={appImages.emailIcon}
              value={gender}
              keyboardType={'default'}
              onChangeText={val => {
                setGender(val);
              }}
            />
            <TouchableOpacity
              style={styles.DoneBtn}
              onPress={() => {
                setGenderModal(false);
              }}>
              <Text style={styles.DoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateProfile1;
