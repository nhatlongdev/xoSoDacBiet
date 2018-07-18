import React, { PureComponent } from 'react';
import { 
    View,
    Text
 } from 'react-native';

 function ThongKeLoKhan(data, soLanQuay){
    console.log('DATA DAU VAO: ' + JSON.stringify(data))
    var mangData = [];
    for(var k =0; k < 100; k++){
        var countDayKhan = 0;
        var num_k = '';
        var stop = false;
        for(var i=0; i< soLanQuay; i++){
            if(data[i] == null) break;
            for(var j=0; j< data[i].length; j++){
                    var sub = data[i][j].number.substr(data[i][j].number.length -2,2);
                    num_k = k + "";
                    if(k < 10){
                        num_k = "0"+ num_k; 
                    }
                    if(sub == num_k){
                        stop = true;
                    }
            }
            if(stop == false){
                countDayKhan = countDayKhan + 1;
            }
        }
        var _obj = {};
        _obj.name = num_k;
        _obj.soNgayLoKhan = countDayKhan;
        mangData.push(_obj);
    }
    return mangData;
 }

 export {ThongKeLoKhan};