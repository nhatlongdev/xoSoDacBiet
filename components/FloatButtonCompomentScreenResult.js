import React, { Component } from 'react';
import { 
        View, 
        Text, 
        StyleSheet, 
        TouchableOpacity,
        Image 
       } from 'react-native';
import { Icon } from 'native-base';

export default class FloatButtonCompomentExit extends Component {
    render() {
        const { container, container_, textStyle } = styles;
        return (
                <View style = {{flex: 1,}}>
                <TouchableOpacity onPress={this.props.onButtonFloatPressExit}
                    style={container_}>
                    <Image
                        style ={{width: 15, height: 15}}
                        source = {require('../images/exit.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={this.props.onButtonFloatPressRefresh}
                    style={container}>
                    <Icon
                        name = {'md-refresh'} style ={{color: 'white'}}
                    />
                </TouchableOpacity>
                </View>
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
    container_: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom : 70,
        right: 10,
        borderRadius: 50,
        backgroundColor: 'red',
        width: 50,
        height: 50
    },
})