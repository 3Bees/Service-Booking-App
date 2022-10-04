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
import {Data} from '../../../../services/app/Annoucement';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import {colors} from '../../../../globals/utilities/colors';
import {appImages} from '../../../../globals/utilities/assets';
import moment from 'moment';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {AppButton} from '../../../../components/general/button';
const Success = props => {
  return (
    <View style={styles.container}>
      <NewHeader title={'Success'} backBtn />
      <Image source={appImages.checkCircle} style={styles.checkCircle} />
      <Text style={styles.text}>
        {'You have successfully applied for this \nannoucement.'}
      </Text>
      <AppButton
        Title={'Done'}
        ButtonStyles={styles.applyBtn}
        TitleStyles={styles.applyBtnText}
        onPress={() => {
          props.navigation.navigate('AllAnnoucements');
        }}
      />
    </View>
  );
};

export default Success;
