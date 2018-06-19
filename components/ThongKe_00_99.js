import React, {Component} from 'react';
import {

} from 'react-native';
import moment from 'moment';

function thongKe_00_99(data){

    var mangData = [];
    for(var k =0; k < 100; k++){
        var countDB = 0;
        var countLoTo = 0;
        var tongGiai = 0;
        var tongLanQuay = 0;
        var num_k = '';
        for(var i=0; i< data.length; i++){
            if(i>= 30) break;
            tongLanQuay = tongLanQuay + 1;
            for(var j=0; j< data[i].length; j++){
                tongGiai = tongGiai + 1;
                var sub = data[i][j].number.substr(data[i][j].number.length -2,2);
                num_k = k + "";
                if(k < 10){
                    num_k = "0"+ num_k; 
                }
                if(sub == num_k){
                    if(data[i][j].giai == 'Giải đặc biệt'){
                        countDB = countDB + 1;
                    }
                    countLoTo = countLoTo + 1;
                }
            }
        }
        var _obj = {};
        var phanTramDB = (countDB / tongLanQuay * 100).toFixed(2);
        var phanTramLoTo = (countLoTo / tongGiai * 100).toFixed(2);
        _obj.name = num_k;
        _obj.countDB = countDB;
        _obj.countLoTo = countLoTo;
        _obj.phanTramDB = phanTramDB;
        _obj.phanTramLoTo = phanTramLoTo;
        mangData.push(_obj);
    }
    return mangData;
};

export {thongKe_00_99};