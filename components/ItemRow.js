import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';



export default class ItemRow extends Component {

    showText(){
        var arr = this.props.rowItem.name;
        var arr_kq = this.props.rowItem.mang_kq;
    
        var text = '';
        for (var i = 0; i< arr.length; i++){
            if(this.props.rowItem.area_id == 1){
                if(this.props.rowItem.status_kq != ''){
                    text != '' ? text = text + " - " + arr[i] : text = text + arr[i] + "(" + arr_kq[i] + ")" ;
                } else {
                    text != '' ? text = text + " - " + arr[i] : text = text + arr[i] + "(quay lúc 18h 15')";
                }
            } else if( this.props.rowItem.area_id == 2){
                if(this.props.rowItem.status_kq != ''){
                    text != '' ? text = text + " - " + arr[i] + "(" + arr_kq[i] + ")" : text = text + 'Miền Trung: ' + arr[i] + "(" + arr_kq[i] + ")";
                } else {
                    text != '' ? text = text + " - " + arr[i] : text = text + 'Miền Trung: ' + arr[i] ;
                    if(i == arr.length -1){
                        text = text + "(quay lúc 17h 15')";
                    }
                }
            } else{
                if(this.props.rowItem.status_kq != ''){
                    text != '' ? text = text + " - " + arr[i] + "(" + arr_kq[i] + ")" : text = text + 'Miền Nam: ' + arr[i] + "(" + arr_kq[i] + ")" ;
                } else {
                    text != '' ? text = text + " - " + arr[i] : text = text + 'Miền Nam: ' + arr[i];
                    if(i == arr.length -1){
                        text = text + "(quay lúc 16h 15')";
                    }
                } 
            }
            
        }
        return text;
    }

    render(){
        return(
            <View style ={style.container}>
                <Text style = {style.text_style}>{this.showText()}</Text>
                <View style={{height: 1, backgroundColor: 'grey'}}></View>
            </View>
        );
    }

}

var style = ({
    container: {
        flex:1,
    },
    text_style: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 30,
        paddingVertical: 5,
        paddingVertical: 5,
    }
})