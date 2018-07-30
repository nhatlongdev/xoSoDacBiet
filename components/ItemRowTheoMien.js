import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import moment from 'moment';

export default class ItemRowTheoMien extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={[styles.style_text,{fontWeight:'bold'}]}>{this.props.item.title}</Text>
                <Text style={styles.style_text}>{this.showText()}</Text>
            </View>
        );
    }

    showText(){
        var arr = this.props.item.name;
        var arr_kq = this.props.item.mang_kq;
    
        var text = '';
        for (var i = 0; i< arr.length; i++){
        
            if(this.props.item.area_id == 1){
                if(this.props.item.status_kq != ''){
                    if(arr_kq[i] != ''){
                        text != '' ? text = text + " - " + arr[i] : text = text + arr[i] + " (" + arr_kq[i] + ")" ;
                    }else {
                        text != '' ? text = text + " - " + arr[i] : text = text + arr[i] + " (Đang quay)" ;
                    }
                } else {
                    text != '' ? text = text + " - " + arr[i] : text = text + arr[i] + " (quay lúc 18h 15')";
                }
            } else if( this.props.item.area_id == 2){
                if(this.props.item.status_kq != ''){
                    if(arr_kq[i] != ''){
                        text != '' ? text = text + " - " + arr[i] + " (" + arr_kq[i] + ")" : text = text + arr[i] + " (" + arr_kq[i] + ")";
                    }else {
                        text != '' ? text = text + " - " + arr[i] + " (Đang quay)" : text = text + arr[i] + " (Đang quay)";
                    }
                } else {
                    text != '' ? text = text + " - " + arr[i] : text = text + arr[i] ;
                    if(i == arr.length -1){
                        text = text + " (quay lúc 17h 15')";
                    }
                }
            } else{
                if(this.props.item.status_kq != ''){
                    if(arr_kq[i] != ''){
                        text != '' ? text = text + " - " + arr[i] + " (" + arr_kq[i] + ")" : text = text + arr[i] + " (" + arr_kq[i] + ")" ;
                    }else{
                        text != '' ? text = text + " - " + arr[i] + " (Đang quay)" : text = text + arr[i] + " (Đang quay)" ;    
                    }    
                } else {
                    text != '' ? text = text + " - " + arr[i] : text = text + arr[i];
                    if(i == arr.length -1){
                        text = text + " (quay lúc 16h 15')";
                    }
                } 
            }
            
        }
        return text;
    }
}

var styles = StyleSheet.create({
    container:{
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        justifyContent: 'center',
    },
    style_text:{
        fontSize: 16,
        textAlign:'left',
        color:'black'
    }
})