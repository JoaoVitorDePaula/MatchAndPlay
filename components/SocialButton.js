import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({
  buttonTitle,
  buttonType,
  color,
  backgroundColor,
  ...rest
}) => {
  let bgColor = backgroundColor;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: bgColor}]}
      {...rest}>
      <View style={style.iconWrapper}>
        <FontAwesome
          name={btnType}
          style={style.icon}
          size={22}
          color={color}
        />
      </View>
      <View style={style.buttonTxtWrapper}>
        <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#35AAFF',
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },

  icon: {
    fontWeight: 'bold',
  },
  buttonTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
