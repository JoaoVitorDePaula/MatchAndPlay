import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [selected, setSelected] = useState(null);
  const handleSelected = (value) => {
    setSelected(value);
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <LocationAndPriceCard
          price={'100'}
          title={'Choice 3'}
          onPress={handleSelected}
          value={selected}
        />
        <LocationAndPriceCard
          price={'200'}
          title={'Choice 2'}
          onPress={handleSelected}
          value={selected}
        />
        <LocationAndPriceCard
          price={'300'}
          title={'Choice 1'}
          onPress={handleSelected}
          value={selected}
        />
      </ScrollView>
    </View>
  );
}

function LocationAndPriceCard({ price, title, onPress, value }) {
  return (
    <TouchableOpacity
      style={[styles.frame, { borderColor: value === title?"green":"red" }]}
      onPress={()=>onPress(title)}>
      <Text style={styles.priceTxt}>RM {price}</Text>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  frame: {
    borderWidth: 1,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 5,
    padding: 10,
  },
});