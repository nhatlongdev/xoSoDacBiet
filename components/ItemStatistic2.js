import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

export default class ItemStatistic2 extends Component{
    render(){
        return(
            <View style = {{flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1}}>
                <Text style = {{flex: 1, textAlign: 'center', borderLeftColor: 'grey', borderLeftWidth: 1}}>{this.props.item.name}</Text>
                <View style = {{flex: 6, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, 
                        borderRightColor: 'grey', borderRightWidth: 1,paddingHorizontal: 2, paddingVertical: 2}}>
                    <View style = {{width: this.parseIntString(this.props.item.phanTramLoTo), backgroundColor: '#000055', marginRight: 5}}></View>
                    <Text>{this.props.item.phanTramLoTo}% ({this.props.item.countLoTo})</Text>
                </View>
            </View>
        );
    }
    parseIntString(string_){
        var int_ = parseFloat(string_)*100;
        return int_;
    }
}