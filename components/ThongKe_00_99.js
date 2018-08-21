import React, {Component} from 'react';
import {

} from 'react-native';
import moment from 'moment';

function thongKe_00_99(data, soLanQuay){

    var mangData = [], mangCountDbTheoDau = [], mangCountLoToTheoDau =[];
    for(var k =0; k < 100; k++){
        var countDB = 0;
        var countLoTo = 0;
        var tongGiai = 0;
        var tongLanQuay = 0;
        var num_k = '';
        for(var i=0; i< soLanQuay; i++){
            if(data[i] == null) break;
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
        mangCountDbTheoDau.push(countDB);
        mangCountLoToTheoDau.push(countLoTo);
    }

    var max_dac_biet = Math.max.apply(Math, mangCountDbTheoDau);
    var max_lo_to = Math.max.apply(Math, mangCountLoToTheoDau);

    for(let i=0; i<mangData.length; i++){
        mangData[i].lengthDB = (mangData[i].countDB / max_dac_biet).toFixed(2);
        mangData[i].lengthLoTo = (mangData[i].countLoTo / max_lo_to).toFixed(2);
    }

    // set min count db, loto
    var _ = require('underscore');
    var mangDataAZDB = _.sortBy(mangData, 'countDB');
    console.log('DB' + JSON.stringify(mangDataAZDB));
    for(var i=0; i<mangDataAZDB.length; i++){
        if(i == 0){
            mangDataAZDB[i].minDB = true;
            mangDataAZDB[i].maxDB = false;
        }else if(i === mangDataAZDB.length -1){
            mangDataAZDB[i].minDB = false;
            mangDataAZDB[i].maxDB = true;
        }else {
            mangDataAZDB[i].minDB = false;
            mangDataAZDB[i].maxDB = false; 
        }
    }

    var mangDataAZLoTo = _.sortBy(mangData, 'countLoTo');
    console.log('LOTO' + JSON.stringify(mangDataAZLoTo));
    for(var i=0; i<mangDataAZLoTo.length; i++){
        if(i == 0){
            mangDataAZLoTo[i].minLoTo = true;
            mangDataAZLoTo[i].maxLoTo = false;
        }else if(i === mangDataAZDB.length -1){
            mangDataAZLoTo[i].minLoTo = false;
            mangDataAZLoTo[i].maxLoTo = true;
        }else {
            mangDataAZLoTo[i].minLoTo = false;
            mangDataAZLoTo[i].maxLoTo = false; 
        }
    }
    
    var mangDataExport = _.sortBy(mangDataAZLoTo, 'name');

    return mangDataExport;
};

export {thongKe_00_99};