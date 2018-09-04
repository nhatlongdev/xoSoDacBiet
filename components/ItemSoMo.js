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
                 <Text style={{flex:2}}>{this.props.item.title}</Text>
                 <Text style={{flex:1, borderLeftWidth:1, borderLeftColor:'grey'}}>{this.props.item.value}</Text>
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
         flex:1, 
         flexDirection: 'row',
         justifyContent: 'center',
         padding:5,
         alignSelf: 'stretch',
     },
     text_mo:{
        flex:2,
        alignSelf: 'stretch',
        padding: 5,
     },
     text_so:{
         flex:1,
         alignSelf: 'stretch',
         padding: 2,
     }
 })