import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';

export const CardAvatar = ({data, isActive, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View
        style={[
          styles.ViewImagem,
          {
            borderColor: isActive ? '#492BB3' : 'rgba(255, 255, 255, 1)',
          },
        ]}>
        <Image style={styles.jogosImage} source={{uri: data}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ViewImagem: {
    borderRadius: 100,
    marginLeft: 10,
    marginBottom: '8%',
    borderWidth: 4,
  },
  jogosImage: {
    backgroundColor: '#rgba(255, 255, 255, 0.4)',
    borderRadius: 100,
    height: 70,
    width: 70,
  },
});
