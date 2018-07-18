import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

export default class ItemStatistic3 extends Component{
    render(){
        return(
                this.props.item.soNgayLoKhan===0? null:
                <View style = {{flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1}}>
                <Text style = {{flex: 1, textAlign: 'center', borderLeftColor: 'grey', borderLeftWidth: 1, color: 'black'}}>{this.props.item.name}</Text>
                <View style = {{flex: 6, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, justifyContent:'center', alignItems: 'center',
                        borderRightColor: 'grey', borderRightWidth: 1,paddingHorizontal: 2, paddingVertical: 2}}>
                    <Text style={{textAlign:'center'}}>{this.props.item.soNgayLoKhan} ngày chưa xuất hiện</Text>
                </View>
                </View>
        );
    }
}