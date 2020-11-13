/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {ParallaxSwiper, ParallaxSwiperPage} from 'react-native-parallax-swiper';
import PaintingInfo from './components/PaintingInfo';
import API from './lib/api';

const {width, height} = Dimensions.get('window');

export default function App() {
  const [info, setInfo] = useState({});

  const myCustomAnimatedValue = new Animated.Value(0);

  const paintingIds = [436535, 436528, 436532];

  const getPageTransformStyle = (index) => ({
    transform: [
      {
        scale: myCustomAnimatedValue.interpolate({
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
        rotate: myCustomAnimatedValue.interpolate({
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

  useEffect(() => {
    async function getPaintingInfo() {
      paintingIds.map(async (id) => {
        const response = await API.get(`/objects/${id}`, {
          params: {
            result: 1,
            inc:
              'primaryImage,title,artistDisplayName,objectEndDate,repository',
          },
        });

        const result = response.data;
        setInfo(result);
      });
    }

    // console.log(info);

    getPaintingInfo();
  });

  return (
    <View>
      <Text>sdf,dsm</Text>
      <ParallaxSwiper
        speed={0.5}
        animatedValue={myCustomAnimatedValue}
        dividerWidth={8}
        dividerColor="black"
        backgroundColor="black"
        onMomentumScrollEnd={(activePageIndex) => console.log(activePageIndex)}
        showProgressBar={true}
        progressBarBackgroundColor="rgba(0,0,0,0.25)"
        progressBarValueBackgroundColor="white">
        <ParallaxSwiperPage
          BackgroundComponent={
            <Image
              source={{uri: 'https://goo.gl/wtHtxG'}}
              style={styles.backgroundImage}
            />
          }
          ForegroundComponent={
            <View style={styles.foregroundTextContainer}>
              <Animated.Text
                style={[styles.foregroundText, getPageTransformStyle(0)]}>
                <PaintingInfo index={0} />
              </Animated.Text>
            </View>
          }
        />
        <ParallaxSwiperPage
          BackgroundComponent={
            <Image
              source={{uri: 'https://goo.gl/gt4rWa'}}
              style={styles.backgroundImage}
            />
          }
          ForegroundComponent={
            <View style={styles.foregroundTextContainer}>
              <Animated.Text
                style={[styles.foregroundText, getPageTransformStyle(1)]}>
                <PaintingInfo index={1} />
              </Animated.Text>
            </View>
          }
        />
        <ParallaxSwiperPage
          BackgroundComponent={
            <Image
              source={{uri: 'https://goo.gl/KAaVXt'}}
              style={styles.backgroundImage}
            />
          }
          ForegroundComponent={
            <View style={styles.foregroundTextContainer}>
              <Animated.Text
                style={[styles.foregroundText, getPageTransformStyle(2)]}>
                <PaintingInfo index={2} />
              </Animated.Text>
            </View>
          }
        />
      </ParallaxSwiper>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width,
    height,
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
});
