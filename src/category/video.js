import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ source }) => {
  const videoRef = useRef();

  return (
      <Video
        source={source}
        ref={videoRef}
        onEnd={() => console.log('Video ended!')}
        style={styles.video}
        muted={false}
        repeat={true}
        controls={false}
        resizeMode = {`cover`}
      />  
  
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    //justifyContent: 'center',
    //alignItems: 'center', 
  },
  video: {
    width: '100%',
    height: 300,
  },
});

export default VideoPlayer;