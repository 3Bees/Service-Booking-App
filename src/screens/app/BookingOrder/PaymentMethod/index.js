import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {colors} from '../../../../globals/utilities/colors';
import {appImages} from '../../../../globals/utilities/assets';
import {AppButton} from '../../../../components/general/button';
const PaymentMethod = props => {
  const {obj, obj2, id} = props.route.params;
  const [paymentMethod, setPaymentMethod] = useState('');
  return (
    <View style={styles.container}>
      <NewHeader title={'Payment Method'} backBtn />
      <Text style={styles.paymentText}>
        Select a payment method to proceed further
      </Text>
      <TouchableOpacity
        onPress={() => {
          setPaymentMethod('Debit');
        }}
        style={[
          styles.cardView,
          {
            borderColor:
              paymentMethod === 'Debit' ? colors.black : colors.white,
          },
        ]}>
        <Image source={appImages.creditCard} style={styles.card} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPaymentMethod('Paypal');
        }}
        style={[
          styles.cardView,
          {
            borderColor:
              paymentMethod === 'Paypal' ? colors.blue : colors.white,
          },
        ]}>
        <Image source={appImages.paypalCard} style={styles.card} />
      </TouchableOpacity>
      <AppButton
        Title={'Add payment method'}
        ButtonStyles={styles.btn}
        TitleStyles={styles.btnText}
        onPress={() => {
          props.navigation.navigate('PaymentDetails', {obj, obj2, id});
        }}
      />
    </View>
  );
};

export default PaymentMethod;
