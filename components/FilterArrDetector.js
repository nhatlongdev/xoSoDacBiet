import React, {Component} from 'react';
import {

} from 'react-native';
import moment from 'moment';

function filterArrDetector(data, numberFilter, soLanQuay){
    var mangData = [];
    console.log('CHAY DYYYY: ' + data.length)
    for(var i=0; i<data.length ; i++){
        for(j =0; j<data[i].length;j++){
            console.log('CHAY FOR: ')
            var sub = data[i][j].number.substr(data[i][j].number.length -2,2);
            console.log('GIA TRI SUB: '+ sub)
            if(sub == numberFilter){
                mangData.push(data[i][j]);
            }
        }
    }
    return mangData;
};

export {filterArrDetector};