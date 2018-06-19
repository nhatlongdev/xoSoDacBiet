import React, {Component} from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { Icon } from 'native-base';

export default class OptionsHome extends Component {
    render(){
        return(
            <View style ={{margin: 8, alignItems: 'center'}}>
                <Icon 
                    name={"ios-alarm-outline"}
                />
                <Text style= {{textAlign: 'center',}}>{this.props.item.title}</Text>
                
            </View>
        );
    }
}