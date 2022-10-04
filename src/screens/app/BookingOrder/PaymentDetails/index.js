import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import stripe from 'tipsi-stripe';
import {styles} from './style';
import {NewHeader} from '../../../../components/general/header';
import {colors} from '../../../../globals/utilities/colors';
import {appImages} from '../../../../globals/utilities/assets';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getCurrentUserId} from '../../../../Backend/auth';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  getData,
  addToArray,
  saveData,
  getFCMToken,
} from '../../../../Backend/utility';
const publishableKey =
  'pk_test_51LXJ0GCLB2BCW1rGNRybYxcoSamIvhg7P18jVtqWKvoJI8N6drNav6LBzIbpdoCQbNeQMptJBI4BtxSZp0RWCTnz00iTQMtdJG';
const secretkey =
  'sk_test_51LXJ0GCLB2BCW1rGQc1oh9C35hKiJoEoSllJA1TS8cOdo3efPpevhmV6TIXTLeCIV74L1GmAEPR6GBBcrequRHAU007R6L54O9';
const client_id = 'ca_MFroHeQ8qMStuaZzCq8HBsemwHoJYxVr';
stripe.setOptions({
  publishableKey: publishableKey,
  androidPayMode: 'test',
});
// if (stripe.stripeInitialized) {
//   stripe.setOptions({
//     publishableKey: publishableKey,
//     androidPayMode: 'test',
//   });
// }

// stripe.setStripeAccount(
//   'sk_test_51LMqaqGn4bSr9JArGhyE4iunFkTwseOVZG1FtKkAT9N6n26RmZVHDQFMOgl9deVjvvmj6wnI6C2zvYjKQ5cTCKMm007UlHki3p',
// );

const PaymentDetails = props => {
  const {obj, obj2, id} = props.route.params;
  const SuccessRB = useRef();
  const [cardNumber, setCardNumber] = useState('4242424242424242');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [CVV, setCVV] = useState('');
  const [loading, setLoading] = useState();
  const Savedata = async () => {
    setLoading(true);
    let uid = await getCurrentUserId();
    await getData('users', uid).then(u => {
      let Coursearr = [...u.PurchasedCourse];
      console.log('????', Coursearr);
      Coursearr.push(data.id);
      saveData('Users', uid, {
        PurchasedCourse: Coursearr,
      });
    });
  };
  const transferHandler = async (tid, obj) => {
    const {amount, stripe_user_id} = obj;
    console.log(obj);
    let charges = parseFloat(amount).toFixed(1) * 100;
    const body = {};
    (body['amount'] = charges),
      (body['currency'] = 'usd'),
      (body['destination'] = stripe_user_id);
    body['source_transaction'] = tid;
    fetch('https://us-central1-rekr-161b7.cloudfunctions.net/payWithStripe', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${secretkey}`,
      },
      // Use a proper HTTP method
      method: 'post',
      body: Object.keys(body)
        .map(key => key + '=' + body[key])
        .join('&'),
    })
      .then(response => response.json())
      .then(async result => {
        if (!result.error) {
          delete obj['stripe_user_id'];
          delete obj['tokenId'];

          await saveDataWithoutDocId('Payments', obj).then(async ress => {
            await saveData('Payments', ress._documentPath._parts[1], {
              id: ress._documentPath._parts[1],
            });
          });
          Toast.show('Purchase Successful');
          Savedata();
        } else {
          console.log('Error', result.error);
          Alert.alert('Failure', result.error.message, [
            {
              text: 'OK',
            },
          ]);
        }
      })
      .catch(err => {
        console.log('Collect Erro', err);
        Alert.alert('Failure', err.message, [
          {
            text: 'OK',
          },
        ]);
      });
  };
  const charge = async i => {
    let amount = 100;
    // let TotalPrise = parseInt(amount) * 100;
    const body = {};
    (body['amount'] = 200),
      (body['currency'] = 'usd'),
      (body['source'] = i.tokenId);
    body['capture'] = true;
    let data = await fetch('https://api.stripe.com/v1/' + 'charges', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${secretkey}`,
      },
      method: 'post',
      body: Object.keys(body)
        .map(key => key + '=' + body[key])
        .join('&'),
    });

    let commits = await data
      .json()
      .then(response => {
        try {
          console.log(response);
          transferHandler(response.id, i);
        } catch (e) {
          console.log(e);
          Alert.alert('Failure', 'Failed to checkout. Please try again.', [
            {
              text: 'OK',
            },
          ]);
        }
      })
      .catch(err => {
        Alert.alert('Failure', err.error.message, [
          {
            text: 'OK',
          },
        ]);
      });
  };
  const payNow = async () => {
    // alert('called');
    setLoading(true);
    const userId = await getCurrentUserId();
    const userInfo = await getData('users', userId);
    const result = await getData('users', obj.RecievedBy);

    if (result.bankInfo) {
      let temp = {
        date: moment().format('llll'),
        sendId: userInfo.id,
        sendName: userInfo.firstname,
        stripe_user_id: result.bankInfo.stripe_user_id,
        tokenId: '',
        amount: 100,
        flag: false,
      };
      const params = {
        number: cardNumber,
        expMonth: 11,
        expYear: 2023,
        cvc: CVV,
        currency: 'usd',
      };
      try {
        await stripe
          .paymentRequestWithCardForm({
            // Only iOS support this options
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
              billingAddress: {
                name: 'Enappd Store',
                line1: 'Canary Place',
                line2: '3',
                city: 'Macon',
                state: '',
                country: 'Estonia',
                postalCode: '31217',
                email: 'admin@enappd.com',
              },
            },
          })
          .then(async token => {
            console.log('data obj', token);
            await doPayment(token);
          });
      } catch (error) {}
      // await stripe
      //   .createTokenWithCard(params)
      //   .then(async token => {
      //     temp.tokenId = token.tokenId;
      //     console.log('data obj', temp);
      //     await doPayment(temp);
      //   })
      //   .catch(error => {
      //     console.log('error in catch ', error);
      //   });
    } else {
      console.log('====================================');
      console.log('else');
      console.log('====================================');
      // setTimeout(() => {
      //   Toast.show(
      //     "Unable to can't send tip because " +
      //       result.name +
      //       ' has not added his bank details',
      //   );
      // }, 2000);
    }
  };
  const AddBooking = async () => {
    setLoading(true);
    await payNow();
    let userId = await getCurrentUserId();
    let fcm = await getFCMToken(userId);
    await addToArray('Bookings', userId, 'Bookings', {...obj, fcmToken: fcm});
    await addToArray('Bookings', id, 'Bookings', {...obj2, fcmToken: fcm});
    await addToArray('Notification', userId, 'Notification', {
      userId: id,
      name: obj.name,
      docId: obj.docId,
      type: obj.type,
      fcmToken: fcm,
      time: moment(new Date()).format(),
      date: obj.date,
    });
    await addToArray('Notification', id, 'Notification', {
      userId: userId,
      name: obj2.name,
      docId: obj.docId,
      type: obj.type,
      time: moment(new Date()).format(),
      date: obj.date,
      fcmToken: fcm,
    }).then(() => {
      SuccessRB.current.open();
      setTimeout(() => {
        SuccessRB.current.close();
        setLoading(false);
        props.navigation.navigate('Home');
      }, 1000);
    });
  };
  const doPayment = async token => {
    const userId = await getCurrentUserId();
    const userInfo = await getData('users', userId);
    const result = await getData('users', obj.RecievedBy);
    fetch('https://us-central1-rekr-161b7.cloudfunctions.net/payWithStripe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 100,
        currency: 'aed',
        token: token,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error('ye error hy', error);
      });
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'Payment Method'} backBtn />
      <Text style={styles.paymentText}>Add Credit Card </Text>
      <View style={styles.inputView}>
        <Text style={styles.label}>Card number</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="0000   0000   0000    0000"
            style={styles.cardInput}
            value={cardNumber}
            placeholderTextColor="black"
            onChangeText={text => {
              if (text.length === 4) {
                setCardNumber(`${text.substring(0, 5)}\t`);
              } else if (text.length === 9) {
                setCardNumber(`${text.substring(0, 10)}\t`);
              } else if (text.length === 14) {
                setCardNumber(`${text.substring(0, 15)}\t`);
              } else {
                setCardNumber(text);
              }
            }}
            maxLength={19}
            keyboardType={'numeric'}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                setCardNumber('');
              }
            }}
          />
          {cardNumber.length === 19 ? (
            <Image
              source={appImages.masterCardIcon}
              style={styles.masterCardIcon}
            />
          ) : (
            <View style={{width: responsiveWidth(6)}} />
          )}
          <Image source={appImages.CardIcon} style={styles.CardIcon} />
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Cardholder name</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="ex. Jonathan Paul Ive"
            value={cardHolder}
            placeholderTextColor="black"
            style={styles.otherInputStyle}
            onChangeText={val => {
              setCardHolder(val);
            }}
          />
        </View>
      </View>
      <View style={styles.rowView}>
        <View style={styles.inputView1}>
          <Text style={styles.label}>Expiry date</Text>
          <View style={styles.input1}>
            <TextInput
              placeholder="MM   /   YYYY"
              value={expiryDate}
              style={styles.otherInputStyle}
              placeholderTextColor="black"
              onChangeText={val => {
                if (val.length === 2) {
                  setExpiryDate(`${val.substring(0, 5)}\t/ `);
                } else {
                  setExpiryDate(val);
                }
              }}
              maxLength={10}
              keyboardType={'numeric'}
            />
          </View>
        </View>
        <View style={styles.inputView1}>
          <View style={styles.rowView1}>
            <Text style={styles.label}>CVV / CVC</Text>
            <Text style={styles.label1}>?</Text>
          </View>
          <View style={styles.input1}>
            <TextInput
              placeholder="3-4 digits"
              style={styles.otherInputStyle}
              value={CVV}
              maxLength={4}
              placeholderTextColor="black"
              keyboardType={'numeric'}
              onChangeText={val => {
                setCVV(val);
              }}
            />
          </View>
        </View>
      </View>
      <Text style={styles.message}>
        We will send you an order details to your email after the successfull
        payment
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          AddBooking();
        }}>
        {loading ? (
          <ActivityIndicator color={colors.white} size={'small'} />
        ) : (
          <>
            <Image source={appImages.lockIconP} style={styles.lockIconP} />
            <Text style={styles.BtnText}>Pay for the order</Text>
          </>
        )}
      </TouchableOpacity>
      <RBSheet
        ref={SuccessRB}
        closeOnDragDown={false}
        // closeOnPressMask={true}
        height={responsiveHeight(8)}
        customStyles={{
          wrapper: {
            // backgroundColor: 'rgba(0,0,0,0.3)',
          },
          container: {
            backgroundColor: colors.lightGreen,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(5),
          },
          draggableIcon: {
            backgroundColor: colors.white,
            width: responsiveWidth(40),
          },
        }}>
        <Image source={appImages.whiteCircle} style={styles.whiteCircle} />
        <Text style={styles.sessionText}>
          Your payment is successfully done.
        </Text>
        <View style={{width: responsiveFontSize(3.5)}} />
      </RBSheet>
    </View>
  );
};

export default PaymentDetails;
