import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import Color from '../src/color';

export default class ItemStatistic extends Component{

    //set color cho bieu do
    setBackgroundForChart(item, type){
        if(type == 'DB'){
            if(item.minDB == true){
                return Color.green;
            }else if(item.maxDB == true){
                return Color.red;
            }else {
                return Color.bluee;
            }
        }else {
            if(item.minLoTo == true){
                return Color.green;
            }else if(item.maxLoTo == true){
                return Color.red;
            }else {
                return Color.bluee;
            }
        } 
    }

    render(){
        return(
            <View style = {{flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, justifyContent:'center', alignItems:'center', borderLeftColor: 'grey', borderLeftWidth: 1}}>
                <Text style = {{flex: 1, textAlign: 'center', color: 'black'}}>{this.props.item.name}</Text>
                <View style = {{flex: 3, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, paddingHorizontal: 2, paddingVertical: 2}}>
                    <View style = {{width: this.parseIntString(this.props.item.phanTramDB)*this.props.rate1, height: 20, backgroundColor: this.setBackgroundForChart(this.props.item,'DB'), marginRight: 5}}></View>
                    <Text>{this.props.item.phanTramDB}% ({this.props.item.countDB})</Text>
                </View>
                <View style = {{flex: 3, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, 
                        borderRightColor: 'grey', borderRightWidth: 1,paddingHorizontal: 2, paddingVertical: 2}}>
                    <View style = {{width: this.parseIntString(this.props.item.phanTramLoTo)*this.props.rate2, backgroundColor: this.setBackgroundForChart(this.props.item,'LoTo'), marginRight: 5}}></View>
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