import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
import {saveData} from '../../../Backend/utility';
import {getCurrentUserId} from '../../../Backend/auth';
import stripe from 'tipsi-stripe';
import styles from './styles';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
const publishableKey =
  'pk_test_51LXJ0GCLB2BCW1rGNRybYxcoSamIvhg7P18jVtqWKvoJI8N6drNav6LBzIbpdoCQbNeQMptJBI4BtxSZp0RWCTnz00iTQMtdJG';
const secretkey =
  'sk_test_51LXJ0GCLB2BCW1rGQc1oh9C35hKiJoEoSllJA1TS8cOdo3efPpevhmV6TIXTLeCIV74L1GmAEPR6GBBcrequRHAU007R6L54O9';
const client_id = 'ca_MFroHeQ8qMStuaZzCq8HBsemwHoJYxVr';
stripe.setOptions({
  publishableKey: publishableKey,
  androidPayMode: 'test',
});
const BankToken = props => {
  const [visible, setVisible] = useState(false);
  const [webViewLoading, setWebViewLoading] = useState(false);
  const [code_Id, setCode_Id] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const accountHandler = async () => {
    console.log('code_Id', code_Id);
    const userId = await getCurrentUserId();
    var myHeaders = new Headers();
    var formdata = new FormData();
    formdata.append('client_secret', secretkey);
    formdata.append('code', code_Id);
    formdata.append('grant_type', 'authorization_code');
    setIsLoading(true);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://connect.stripe.com/oauth/token', requestOptions)
      .then(response => response.json())
      .then(async result => {
        if (!result.error) {
          await saveData('users', userId, {bankInfo: result}).then(() => {
            setIsLoading(false);
          });
        } else {
          alert(result.error);
          console.log('result.error', result.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };
  const _onNavigationStateChange = async webViewState => {
    try {
      var urlString = webViewState.url;
      let codeArray = urlString.split('&');
      let codeArray_child = codeArray[1].split('=');

      if (codeArray_child[0] === 'code') {
        // console.log('urlString', urlString);
        // console.log('codeArray', codeArray);
        console.log('codeArray_child', codeArray_child);
        setCode_Id(codeArray_child[1]);
        setVisible(false);
        accountHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const injectedJs = `
        window.ReactNativeWebView.postMessage(JSON.stringify(window.location.search));
        `;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          zIndex: 100,
        }}>
        <WebView
          useWebKit
          style={{
            margin: responsiveHeight(1),
            marginTop: responsiveHeight(5),
          }}
          source={{
            uri: 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://connect.stripe.com/connect/default/oauth/test&client_id=ca_MFroHeQ8qMStuaZzCq8HBsemwHoJYxVr',
          }}
          onMessage={async data => {
            let params = new URL(data.nativeEvent.url.toString());
            let params2 = new URLSearchParams(params.search);
            let code = params2.get('code');
            if (code !== null) {
              var myHeaders = new Headers();
              myHeaders.append('Authorization', `Bearer ${secretkey}`);
              var formdata = new FormData();
              formdata.append('code', code);
              formdata.append('grant_type', 'authorization_code');
              const userId = await getCurrentUserId();
              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow',
              };
              setVisible(false);
              fetch('https://connect.stripe.com/oauth/token', requestOptions)
                .then(response => response.json())
                .then(async result => {
                  console.log(result, userId);
                  await saveData('users', userId, {bankInfo: result}).then(
                    () => {
                      Alert.alert(
                        'Payment Added',
                        'Your payment information was added',
                        [{text: 'OK', onPress: () => {}}],
                        {cancelable: false},
                      );
                    },
                    props.navigation.navigate('App'),
                  );
                })
                .catch(error => console.log('error', error));
            }
          }}
          injectedJavaScript={injectedJs}
          startInLoadingState={true}
          scalesPageToFit={true}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          onLoadStart={() => {
            setWebViewLoading(true);
          }}
          onLoadEnd={() => {
            console.log('LOAD END');
            setWebViewLoading(false);
          }}
          onError={err => {
            console.log('ERROR ');
            console.log(err);
          }}
        />
      </View>
    </View>
  );
};

export default BankToken;
