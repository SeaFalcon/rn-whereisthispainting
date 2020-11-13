/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {ParallaxSwiper, ParallaxSwiperPage} from 'react-native-parallax-swiper';
import PaintingInfo from './components/PaintingInfo';
import PaintingImage from './components/PaintingImage';
import API from './lib/api';

const {width, height} = Dimensions.get('window');
const paintingIds = [436535, 436528, 436532];

export default function App2() {
  const [state, setState] = useState({
    info: [],
    isLoading: true,
  });

  const {info, isLoading} = state;

  useEffect(() => {
    Promise.all(
      paintingIds.map((id) => {
        API.get(`/objects/${id}`, {
          params: {
            results: 1,
            inc:
              'primaryImage,title,artistDisplayName,objectEndDate,repository',
          },
        })
          .then((result) => result.data)
          .then((result) => {
            setState({...state, info: [...info, result]});
          });
      }),
    ).then(() => {
      setTimeout(() => {
        setState({...state, isLoading: !isLoading});
      }, 3000);
    });
  });

  const myCustomAnimationValue = new Animated.Value(0);

  const getPageTransformStyle = (index) => ({
    transform: [
      {
        scale: myCustomAnimationValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8),
            index * (width + 8),
            (index + 1) * (width + 8),
          ],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        rotate: myCustomAnimationValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8),
            index * (width + 8),
            (index + 1) * (width + 8),
          ],
          outputRange: ['180deg', '0deg', '-180deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  return isLoading ? (
    <View style={[styles.spinnerContainer, styles.horizontal]}>
      <ActivityIndicator size="large" color="#00ffff" />
    </View>
  ) : (
    <ParallaxSwiper
      speed={0.5}
      animatedValue={myCustomAnimationValue}
      dividerWidth={8}
      dividerColor="black"
      backgroundColor="black"
      onMomentumScrollEnd={(activePageIndex) => console.log(activePageIndex)}
      progressBarBackgroundColor="rgba(0,0,0,0.25)"
      progressBarValueBackgroundColor="white">
      {info.map((element, index) => (
        <ParallaxSwiperPage
          BackgroundComponent={
            <PaintingImage
              id={element.ojbectId}
              width={width}
              height={height}
              imageURL={element.primaryImage}
            />
          }
          ForegroundComponent={
            <View style={styles.foregroundTextContainer}>
              <PaintingInfo
                id={element.objectId}
                title={element.title}
                artist={element.artistDisplayName}
                year={element.objectEndDate}
                location={element.repository}
              />
            </View>
          }
          key={index}
        />
      ))}
    </ParallaxSwiper>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width,
    height,
    resizeMode: 'cover',
  },
  foregroundTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.41,
    color: 'white',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
