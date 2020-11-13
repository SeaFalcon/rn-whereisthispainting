import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const info = [
  `
Title : Mona Lisa
Artist : Leonardo da Vinci
Location : Louvre museum, Paris
`,
  `
Title : Liebespaar
Artist : Gustav Klimt
Location : osterreichische galerie belvedere, Austria
`,
  `
Title : The Son of Man
Artist : René Magritte
Location : Private Collection
`,
];

export default function PaintingInfo({index}) {
  const [state, setState] = useState({
    isPressed: false,
    idx: index,
  });

  const {isPressed, idx} = state;

  function handlePressToggle() {
    setState({
      ...state,
      isPressed: !isPressed,
    });
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPressIn={handlePressToggle}
        style={styles.touchable}
        underlayColor="#FFFFFF00">
        <View style={styles.button}>
          <Text style={styles.welcome}>
            {!isPressed ? 'Where is this painting on display?' : info[index]}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF00',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
    backgroundColor: '#FFFFFF00',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: '#FFFFFF00',
    borderRadius: 100,
    height: 200,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
