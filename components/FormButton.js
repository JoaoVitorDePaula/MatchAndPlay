import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';

const FormButton = ({buttonTitle, ...rest }) => {
    return(
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
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
})