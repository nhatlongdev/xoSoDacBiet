import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

export default class ItemStatistic extends Component{
    render(){
        return(
            <View style = {{flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, justifyContent:'center', alignItems:'center', borderLeftColor: 'grey', borderLeftWidth: 1}}>
                <Text style = {{flex: 1, textAlign: 'center', color: 'black'}}>{this.props.item.name}</Text>
                <View style = {{flex: 3, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, paddingHorizontal: 2, paddingVertical: 2}}>
                    <View style = {{width: this.parseIntString(this.props.item.phanTramDB), height: 20, backgroundColor: '#000055', marginRight: 5}}></View>
                    <Text>{this.props.item.phanTramDB}% ({this.props.item.countDB})</Text>
                </View>
                <View style = {{flex: 3, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, 
                        borderRightColor: 'grey', borderRightWidth: 1,paddingHorizontal: 2, paddingVertical: 2}}>
                    <View style = {{width: this.parseIntString(this.props.item.phanTramLoTo), backgroundColor: '#000055', marginRight: 5}}></View>
                    <Text>{this.props.item.phanTramLoTo}% ({this.props.item.countLoTo})</Text>
                </View>
            </View>
        );
    }
    parseIntString(string_){
        var int_ = parseFloat(string_)*2;
        return int_;
    }
}