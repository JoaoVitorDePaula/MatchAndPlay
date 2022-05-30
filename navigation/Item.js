import {Text, Button} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

const Item = ({item, onPress}) => {
  return (
    <Button title="botao" onPress={onPress} underlayColor="tranparent">
    </Button>
  );
};

export default Item;
