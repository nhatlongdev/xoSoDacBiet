import React, {Component} from 'react';
import {
     View,
     Text, 
     StyleSheet
} from 'react-native';
import { Icon } from 'native-base';
 
export default class CircleOption extends Component{
    render(){
        return(
            <View style = {style.container}>
                
            </View>
        );
    }
}

var style = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'red',
    }
});