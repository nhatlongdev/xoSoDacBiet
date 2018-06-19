import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

export default class FloatButtonCompomentExit extends Component {
    render() {
        const { container, textStyle } = styles;
        return (
            <TouchableOpacity 
                onPress={this.props.onButtonFloatPress}
                style={container}>
                   <Text style = {{fontSize: 20, fontWeight: 'bold', color: 'white'}}>X</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom : 10,
        right: 10,
        borderRadius: 50,
        backgroundColor: 'red',
        width: 50,
        height: 50
    },
})