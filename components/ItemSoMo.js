import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
 } from 'react-native';

 export default class ItemSoMo extends Component {
     render() {
         return (
             <View style={styles.container}>
                <Text style={{flex:2, alignSelf:'stretch', borderRightWidth:1, borderRightColor:'grey', padding:5, textAlign: 'justify'}}>{this.props.item.title}</Text>
                <Text style={{flex:1, alignSelf:'stretch', padding:5}}>{this.props.item.value}</Text>
             </View>
         );
     }
 };

 const styles = StyleSheet.create({
     container:{
         borderLeftWidth: 1,
         borderLeftColor: 'grey',
         borderRightWidth: 1,
         borderRightColor: 'grey',
         borderBottomWidth: 1,
         borderBottomColor: 'grey',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
     },
     text_mo:{
        flex:2,
        alignSelf:'stretch',
        
     },
     text_so:{
         flex:1,
         alignSelf:'stretch'
     }
 })