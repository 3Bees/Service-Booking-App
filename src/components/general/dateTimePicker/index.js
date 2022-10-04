import {Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {buttonColor, textColor} from '../../constants/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {styles} from './style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import {appImages} from '../../../globals/utilities/assets';
import {ATextInput} from '../TextInput';
const DateSelect = props => {
  const {minimumDate, value, onChangeText} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(
    props.isVisible || false,
  );
  const [date, setDate] = useState('');
  useEffect(() => {
    setDate(props.initialDate);
  }, [props]);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(moment(date).format('MM/DD/YYYY'));
    props.getDate(moment(date).format('MM/DD/YYYY'));
    hideDatePicker();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={props.style}
      onPress={showDatePicker}>
      <ATextInput
        placeholder={'Date of Birth'}
        image={appImages.emailIcon}
        value={value}
        onChangeText={onChangeText}
        editable={false}
      />
      <DateTimePickerModal
        isVisible={props.isVisible || isDatePickerVisible}
        mode="date"
        // date={new Date()}
        // value={date}

        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        pickerContainerStyleIOS={{}}
        display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
        ref={props.ref}
        minimumDate={minimumDate}
      />
    </TouchableOpacity>
  );
};

const TimeSelect = props => {
  const {iconStyle, TextStyle} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  useEffect(() => {
    setDate(props.initialDate);
  }, [props]);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(moment(date).format('hh:mm A'));
    props.getDate(moment(date).format('hh:mm A'));
    hideDatePicker();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.dataPickerContainer}
      onPress={showDatePicker}>
      <Text style={TextStyle}>{date != '' ? date : props.placeHolder}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        // date={new Date()}
        // value={date}

        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        pickerContainerStyleIOS={{}}
        display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
      />
    </TouchableOpacity>
  );
};

export {DateSelect, TimeSelect};
