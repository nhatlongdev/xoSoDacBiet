import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,

 } from 'react-native';

 export default class ItemSoMo extends Component {
     render() {
         return (
             <View style={{flex:1, flexDirection: 'row'}}>
                 <Text style={{flex:2}}>{this.props.item.title}</Text>
                 <Text style={{flex:1}}>{this.props.item.value}</Text>
             </View>
         );
     }
 }