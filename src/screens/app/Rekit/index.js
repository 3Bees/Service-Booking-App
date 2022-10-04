import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styles} from './style';
import {NewHeader} from '../../../components/general/header';
import {rekitss} from '../../../services/app/Rekit';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {appImages} from '../../../globals/utilities/assets';
import {saveData} from '../../../Backend/utility';
import {AppButton} from '../../../components/general/button';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import {ATextInput} from '../../../components/general/TextInput';

const Rekit = props => {
  const {type, item} = props.route.params;
  const [tab, setTab] = useState('Premium');
  const [data, setData] = useState(item.Packages);
  const photoIncrement = () => {
    let arr = [...data];
    if (tab === 'Premium') {
      let n = parseInt(arr[0].details.photosEdited) + 1;
      arr[0].details.photosEdited = JSON.stringify(n);
      setData(arr);
      console.log(n);
    } else if (tab === 'Standard') {
      let n = parseInt(arr[1].details.photosEdited) + 1;
      arr[1].details.photosEdited = JSON.stringify(n);
      setData(arr);
    } else {
      let n = parseInt(arr[2].details.photosEdited) + 1;
      arr[2].details.photosEdited = JSON.stringify(n);
      setData(arr);
    }
  };
  const photoDecrement = () => {
    let arr = [...data];

    if (tab === 'Premium') {
      if (data[0].details.photosEdited > 5) {
        let n = parseInt(arr[0].details.photosEdited) - 1;
        arr[0].details.photosEdited = JSON.stringify(n);
        setData(arr);
      }
    } else if (tab === 'Standard') {
      if (data[1].details.photosEdited > 3) {
        let n = parseInt(arr[1].details.photosEdited) - 1;
        arr[1].details.photosEdited = JSON.stringify(n);
        setData(arr);
      }
    } else {
      if (data[2].details.photosEdited > 2) {
        let n = parseInt(arr[2].details.photosEdited) - 1;
        arr[2].details.photosEdited = JSON.stringify(n);
        setData(arr);
      }
    }
  };
  const ChangePhoto = val => {
    let arr = [...data];
    if (tab === 'Premium') {
      arr[0].details.photosEdited = val;
      setData(arr);
    } else if (tab === 'Standard') {
      arr[1].details.photosEdited = val;
      setData(arr);
    } else {
      arr[2].details.photosEdited = val;
      setData(arr);
    }
  };
  const photoshootIncrement = () => {
    let arr = [...data];
    if (tab === 'Premium') {
      let n = parseInt(arr[0].details.hours) + 1;
      arr[0].details.hours = JSON.stringify(n);
      setData(arr);
    } else if (tab === 'Standard') {
      let n = parseInt(arr[1].details.hours) + 1;
      arr[1].details.hours = JSON.stringify(n);
      setData(arr);
    } else {
      let n = parseInt(arr[2].details.hours) + 1;
      arr[2].details.hours = JSON.stringify(n);
      setData(arr);
    }
  };
  const photoshootDecrement = () => {
    let arr = [...data];

    if (tab === 'Premium') {
      if (data[0].details.hours > 2) {
        let n = parseInt(arr[0].details.hours) - 1;
        arr[0].details.hours = JSON.stringify(n);
        setData(arr);
      }
    } else if (tab === 'Standard') {
      if (data[1].details.hours > 2) {
        let n = parseInt(arr[1].details.hours) - 1;
        arr[1].details.hours = JSON.stringify(n);
        setData(arr);
      }
    } else {
      if (data[2].details.hours > 1) {
        let n = parseInt(arr[2].details.hours) - 1;
        arr[2].details.hours = JSON.stringify(n);
        setData(arr);
      }
    }
  };
  const ChangePhotoshoot = val => {
    let arr = [...data];
    if (tab === 'Premium') {
      arr[0].details.hours = val;
      setData(arr);
    } else if (tab === 'Standard') {
      arr[1].details.hours = val;
      setData(arr);
    } else {
      arr[2].details.hours = val;
      setData(arr);
    }
  };
  const priceIncrement = () => {
    let arr = [...data];
    if (tab === 'Premium') {
      let n = parseInt(arr[0].details.price) + 1;
      arr[0].details.price = JSON.stringify(n);
      setData(arr);
    } else if (tab === 'Standard') {
      let n = parseInt(arr[1].details.price) + 1;
      arr[1].details.price = JSON.stringify(n);
      setData(arr);
    } else {
      let n = parseInt(arr[2].details.price) + 1;
      arr[2].details.price = JSON.stringify(n);
      setData(arr);
    }
  };
  const priceDecrement = () => {
    let arr = [...data];
    if (tab === 'Premium') {
      if (arr[0].details.price > 60) {
        let n = parseInt(arr[0].details.price) - 1;
        arr[0].details.price = JSON.stringify(n);
        setData(arr);
      }
    } else if (tab === 'Standard') {
      if (arr[1].details.price > 40) {
        let n = parseInt(arr[1].details.price) - 1;
        arr[1].details.price = JSON.stringify(n);
        setData(arr);
      }
    } else {
      if (arr[2].details.price > 20) {
        let n = parseInt(arr[2].details.price) - 1;
        arr[2].details.price = JSON.stringify(n);
        setData(arr);
      }
    }
  };
  const ChangePrice = val => {
    let arr = [...data];
    if (tab === 'Premium') {
      arr[0].details.price = val;
      setData(arr);
    } else if (tab === 'Standard') {
      arr[1].details.price = val;
      setData(arr);
    } else {
      arr[2].details.price = val;
      setData(arr);
    }
  };
  const packsIncrement = () => {
    let arr = [...data];
    if (tab === 'Premium') {
      let n = parseInt(arr[0].details.packs) + 1;
      arr[0].details.packs = JSON.stringify(n);
      setData(arr);
    } else if (tab === 'Standard') {
      let n = parseInt(arr[1].details.packs) + 1;
      arr[1].details.packs = JSON.stringify(n);
      setData(arr);
    } else {
      let n = parseInt(arr[2].details.packs) + 1;
      arr[2].details.packs = JSON.stringify(n);
      setData(arr);
    }
  };
  const packsDecrement = () => {
    let arr = [...data];
    if (tab === 'Premium') {
      if (arr[0].details.packs > 1) {
        let n = parseInt(arr[0].details.packs) - 1;
        arr[0].details.packs = JSON.stringify(n);
        setData(arr);
      }
    } else if (tab === 'Standard') {
      if (arr[1].details.packs > 1) {
        let n = parseInt(arr[1].details.packs) - 1;
        arr[1].details.packs = JSON.stringify(n);
        setData(arr);
      }
    } else {
      if (arr[2].details.packs > 1) {
        let n = parseInt(arr[2].details.packs) - 1;
        arr[2].details.packs = JSON.stringify(n);
        setData(arr);
      }
    }
  };
  const ChangePacks = val => {
    let arr = [...data];
    if (tab === 'Premium') {
      arr[0].details.packs = val;
      setData(arr);
    } else if (tab === 'Standard') {
      arr[1].details.packs = val;
      setData(arr);
    } else {
      arr[2].details.packs = val;
      setData(arr);
    }
  };
  const renderItem = (item, index) => {
    return (
      <View>
        <View
          style={
            index === 0 || index === 2 ? styles.rightItems : styles.leftItems
          }>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </View>
    );
  };
  const ChangeNewPrice = val => {
    let arr = [...data];
    if (tab === 'Premium') {
      arr[0].Price = val;
      setData(arr);
    } else if (tab === 'Standard') {
      arr[1].Price = val;
      setData(arr);
    } else {
      arr[2].Price = val;
      setData(arr);
    }
  };
  const ChangeDescription = val => {
    let arr = [...data];
    if (tab === 'Premium') {
      arr[0].description = val;
      setData(arr);
    } else if (tab === 'Standard') {
      arr[1].description = val;
      setData(arr);
    } else {
      arr[2].description = val;
      setData(arr);
    }
  };
  return (
    <View style={styles.container}>
      <NewHeader title={'REKIT'} backBtn />
      {type === 'OFFER A SERVICE AS' ? (
        <ScrollView>
          <View style={styles.tabsView}>
            <TouchableOpacity
              onPress={() => {
                setTab('Premium');
              }}>
              <Text style={tab === 'Premium' ? styles.active : styles.inactive}>
                Premium
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTab('Standard');
              }}>
              <Text
                style={tab === 'Standard' ? styles.active : styles.inactive}>
                Standard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTab('Basic');
              }}>
              <Text style={tab === 'Basic' ? styles.active : styles.inactive}>
                Basic
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.rowView}>
            <Text style={styles.boldText}>Set num of photos edited </Text>
            <View style={styles.counterBox}>
              <View style={styles.textView}>
                {tab === 'Premium' ? (
                  <TextInput
                    value={data[0].details.photosEdited}
                    style={{padding: 0}}
                    maxLength={2}
                    keyboardType={'numeric'}
                    onChangeText={val => {
                      ChangePhoto(val);
                    }}
                  />
                ) : tab === 'Standard' ? (
                  <TextInput
                    value={data[1].details.photosEdited}
                    style={{padding: 0}}
                    maxLength={2}
                    keyboardType={'numeric'}
                    onChangeText={val => {
                      ChangePhoto(val);
                    }}
                  />
                ) : (
                  <TextInput
                    value={data[2].details.photosEdited}
                    style={{padding: 0}}
                    maxLength={2}
                    keyboardType={'numeric'}
                    onChangeText={val => {
                      ChangePhoto(val);
                    }}
                  />
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    photoIncrement();
                  }}>
                  <Image
                    style={styles.triangleIcon}
                    source={appImages.triangleup}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    photoDecrement();
                  }}>
                  <Image
                    style={styles.triangleIcon}
                    source={appImages.triangledown}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
          {/* <View style={styles.rowView}>
            <Text style={styles.boldText}>Set the num of photoshoot hrs</Text>
            <View style={styles.counterBox}>
              <View style={styles.textView}>
                {tab === 'Premium' ? (
                  <View style={styles.rrowview}>
                    <TextInput
                      value={data[0].details.hours}
                      style={{padding: 0, width: responsiveWidth(4)}}
                      maxLength={2}
                      keyboardType={'numeric'}
                      onChangeText={val => {
                        ChangePhotoshoot(val);
                      }}
                    />
                    <Text>hrs</Text>
                  </View>
                ) : tab === 'Standard' ? (
                  <View style={styles.rrowview}>
                    <TextInput
                      value={data[1].details.hours}
                      style={{padding: 0, width: responsiveWidth(4)}}
                      maxLength={2}
                      keyboardType={'numeric'}
                      onChangeText={val => {
                        ChangePhotoshoot(val);
                      }}
                    />
                    <Text>hrs</Text>
                  </View>
                ) : (
                  <View style={styles.rrowview}>
                    <TextInput
                      value={data[2].details.hours}
                      style={{padding: 0, width: responsiveWidth(4)}}
                      maxLength={2}
                      keyboardType={'numeric'}
                      onChangeText={val => {
                        ChangePhotoshoot(val);
                      }}
                    />
                    <Text>hrs</Text>
                  </View>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    photoshootIncrement();
                  }}>
                  <Image
                    style={styles.triangleIcon}
                    source={appImages.triangleup}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    photoshootDecrement();
                  }}>
                  <Image
                    style={styles.triangleIcon}
                    source={appImages.triangledown}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.boldText}>Set your price</Text>
            <View style={styles.counterBox}>
              <View style={styles.textView}>
                {tab === 'Premium' ? (
                  <View style={styles.rrowview}>
                    <TextInput
                      value={data[0].details.price}
                      style={{padding: 0, width: responsiveWidth(4)}}
                      maxLength={2}
                      keyboardType={'numeric'}
                      onChangeText={val => {
                        ChangePrice(val);
                      }}
                    />
                    <Text>$</Text>
                  </View>
                ) : tab === 'Standard' ? (
                  <View style={styles.rrowview}>
                    <TextInput
                      value={data[1].details.price}
                      style={{padding: 0, width: responsiveWidth(4)}}
                      maxLength={2}
                      keyboardType={'numeric'}
                      onChangeText={val => {
                        ChangePrice(val);
                      }}
                    />
                    <Text>$</Text>
                  </View>
                ) : (
                  <View style={styles.rrowview}>
                    <TextInput
                      value={data[2].details.price}
                      style={{padding: 0, width: responsiveWidth(4)}}
                      maxLength={2}
                      keyboardType={'numeric'}
                      onChangeText={val => {
                        ChangePrice(val);
                      }}
                    />
                    <Text>$</Text>
                  </View>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    priceIncrement();
                  }}>
                  <Image
                    style={styles.triangleIcon}
                    source={appImages.triangleup}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    priceDecrement();
                  }}>
                  <Image
                    style={styles.triangleIcon}
                    source={appImages.triangledown}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.boldText}>Set num of packs</Text>
            <View style={styles.counterBox}>
              <View style={styles.textView}>
                {tab === 'Premium' ? (
                  <TextInput
                    value={data[0].details.packs}
                    style={{padding: 0, width: responsiveWidth(4)}}
                    maxLength={2}
                    keyboardType={'numeric'}
                    onChangeText={val => {
                      ChangePacks(val);
                    }}
                  />
                ) : tab === 'Standard' ? (
                  <TextInput
                    value={data[1].details.packs}
                    style={{padding: 0, width: responsiveWidth(4)}}
                    maxLength={2}
                    keyboardType={'numeric'}
                    onChangeText={val => {
                      ChangePacks(val);
                    }}
                  />
                ) : (
                  <TextInput
                    value={data[2].details.packs}
                    style={{padding: 0, width: responsiveWidth(4)}}
                    maxLength={2}
                    keyboardType={'numeric'}
                    onChangeText={val => {
                      ChangePacks(val);
                    }}
                  />
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    packsIncrement();
                  }}>
                  <Image
                    style={styles.triangleIcon}
                    source={appImages.triangleup}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    packsDecrement();
                  }}>
                  <Image
                    style={styles.triangleIcon}
                    source={appImages.triangledown}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
          {tab === 'Premium' ? (
            <>
              <View style={{height: responsiveHeight(1)}} />
              <Text style={styles.mediumHeading}>Price</Text>

              <ATextInput
                placeholder={'Price'}
                image={appImages.emailIcon}
                value={data[0].Price}
                onChangeText={val => {
                  ChangeNewPrice(val);
                }}
              />
              <View style={{height: responsiveHeight(2)}} />

              <Text style={styles.mediumHeading}>Description</Text>

              <View style={styles.descriptionInput}>
                <TextInput
                  placeholder="Description"
                  multiline={true}
                  value={data[0].description}
                  onChangeText={val => ChangeDescription(val)}
                  numberOfLines={5}
                  textAlignVertical={'top'}
                />
              </View>
            </>
          ) : tab === 'Standard' ? (
            <>
              <View style={{height: responsiveHeight(1)}} />
              <Text style={styles.mediumHeading}>Price</Text>

              <ATextInput
                placeholder={'Price'}
                image={appImages.emailIcon}
                value={data[1].Price}
                onChangeText={val => {
                  ChangeNewPrice(val);
                }}
              />
              <View style={{height: responsiveHeight(2)}} />

              <Text style={styles.mediumHeading}>Description</Text>

              <View style={styles.descriptionInput}>
                <TextInput
                  placeholder="Description"
                  multiline={true}
                  value={data[1].description}
                  onChangeText={val => ChangeDescription(val)}
                  numberOfLines={5}
                  textAlignVertical={'top'}
                />
              </View>
            </>
          ) : (
            <>
              <View style={{height: responsiveHeight(1)}} />
              <Text style={styles.mediumHeading}>Price</Text>

              <ATextInput
                placeholder={'Price'}
                image={appImages.emailIcon}
                value={data[2].Price}
                onChangeText={val => {
                  ChangeNewPrice(val);
                }}
              />
              <View style={{height: responsiveHeight(2)}} />

              <Text style={styles.mediumHeading}>Description</Text>

              <View style={styles.descriptionInput}>
                <TextInput
                  placeholder="Description"
                  multiline={true}
                  value={data[2].description}
                  onChangeText={val => ChangeDescription(val)}
                  numberOfLines={5}
                  textAlignVertical={'top'}
                />
              </View>
            </>
          )}
          <AppButton
            Title={'Update'}
            onPress={async () => {
              await saveData('users', item.id, {Packages: data}).then(() => {
                Toast.show('Updated successfully');
              });
            }}
            ButtonStyles={styles.btn}
          />
        </ScrollView>
      ) : (
        <ScrollView>
          <Text style={styles.heading}>Select your Specific Needs</Text>
          <View>
            <FlatList
              data={rekitss}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Kits', {item});
                    }}
                    activeOpacity={1}>
                    <LinearGradient
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 1}}
                      colors={
                        index === 0
                          ? ['#EADA52', '#FFFBD3']
                          :  index === 1 ?['#E8E8E88C', '#FFFFFF']:['#5e2909', '#984f14']
                      }
                      style={styles.MainView}>
                      <Text style={styles.Heading}>{item.title}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Rekit;
