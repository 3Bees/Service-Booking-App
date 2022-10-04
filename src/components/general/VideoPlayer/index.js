import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Video from 'react-native-video';

export const Videos = ({paused, onPress, mainview, subview}) => {
  const videoPlayer = useRef();
  const [fullsize, setFullsize] = useState(true);
  return (
    <View>
      <Video
        // fullscreenAutorotate
        // fullscreenOrientation={'landscape'}
        // allowsExternalPlayback={false}
        // disableFocus={true}
        // playInBackground={false}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        // repeat={false}
        resizeMode="cover"
        // fullscreen={true}
        controls={true}
        paused={true}
        poster={
          'https://www.seekpng.com/png/detail/43-439373_white-play-button-png-for-kids-video.png'
        }
        ref={videoPlayer}
        style={{height: responsiveHeight(22), width: responsiveWidth(84)}}
      />
    </View>
  );
};
