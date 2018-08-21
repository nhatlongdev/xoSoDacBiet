import React, {Component} from 'react';
import {

} from 'react-native';
import moment from 'moment';

function thongKeDau_(data,item, soLanQuay){
    var tongGiai = 0;
    var tongLanQuay = 0;
    var mangData = [], mangCountDbTheoDau = [], mangCountLoToTheoDau =[];
    var countDau0DacBiet = 0, countDau0LoTo = 0, countDau1DacBiet = 0, countDau1LoTo = 0, countDau2DacBiet = 0, countDau2LoTo = 0
    , countDau3DacBiet = 0, countDau3LoTo = 0, countDau4DacBiet = 0, countDau4LoTo = 0, countDau5DacBiet = 0, countDau5LoTo = 0
    , countDau6DacBiet = 0, countDau6LoTo = 0, countDau7DacBiet = 0, countDau7LoTo = 0, countDau8DacBiet = 0, countDau8LoTo = 0
    , countDau9DacBiet = 0, countDau9LoTo = 0; 

    for(var i=0; i< parseInt(soLanQuay); i++){
        if(data[i] == null) break;
        tongLanQuay = tongLanQuay + 1;
        for(var j=0; j< data[i].length; j++){
            tongGiai = tongGiai + 1;
            var sub = data[i][j].number.substr(data[i][j].number.length -2,1);
            if(sub == '0'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau0DacBiet = countDau0DacBiet + 1;
                }
                countDau0LoTo = countDau0LoTo + 1;
            }else if(sub == '1'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau1DacBiet = countDau1DacBiet + 1;
                }
                countDau1LoTo = countDau1LoTo + 1;
            }else if(sub == '2'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau2DacBiet = countDau2DacBiet + 1;
                }
                countDau2LoTo = countDau2LoTo + 1;
            }else if(sub == '3'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau3DacBiet = countDau3DacBiet + 1;
                }
                countDau3LoTo = countDau3LoTo + 1;
            }else if(sub == '4'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau4DacBiet = countDau4DacBiet + 1;
                }
                countDau4LoTo = countDau4LoTo + 1;
            }else if(sub == '5'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau5DacBiet = countDau5DacBiet + 1;
                }
                countDau5LoTo = countDau5LoTo + 1;
            }else if(sub == '6'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau6DacBiet = countDau6DacBiet + 1;
                }
                countDau6LoTo = countDau6LoTo + 1;
            }else if(sub == '7'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau7DacBiet = countDau7DacBiet + 1;
                }
                countDau7LoTo = countDau7LoTo + 1;
            }else if(sub == '8'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau8DacBiet = countDau8DacBiet + 1;
                }
                countDau8LoTo = countDau8LoTo + 1;
            }else if(sub == '9'){
                if(data[i][j].giai == 'Giải đặc biệt'){
                    countDau9DacBiet = countDau9DacBiet + 1;
                }
                countDau9LoTo = countDau9LoTo + 1;
            }
        }
    }

    mangCountDbTheoDau.push(countDau0DacBiet);mangCountDbTheoDau.push(countDau1DacBiet);mangCountDbTheoDau.push(countDau2DacBiet);mangCountDbTheoDau.push(countDau3DacBiet);
    mangCountDbTheoDau.push(countDau4DacBiet);mangCountDbTheoDau.push(countDau5DacBiet);mangCountDbTheoDau.push(countDau6DacBiet);mangCountDbTheoDau.push(countDau7DacBiet);
    mangCountDbTheoDau.push(countDau8DacBiet);mangCountDbTheoDau.push(countDau9DacBiet);
    
    mangCountLoToTheoDau.push(countDau0LoTo);mangCountLoToTheoDau.push(countDau1LoTo);mangCountLoToTheoDau.push(countDau2LoTo);mangCountLoToTheoDau.push(countDau3LoTo);
    mangCountLoToTheoDau.push(countDau4LoTo);mangCountLoToTheoDau.push(countDau5LoTo);mangCountLoToTheoDau.push(countDau6LoTo);mangCountLoToTheoDau.push(countDau7LoTo);
    mangCountLoToTheoDau.push(countDau8LoTo);mangCountLoToTheoDau.push(countDau9LoTo);

    var max_dac_biet = Math.max.apply(Math, mangCountDbTheoDau);
    var max_lo_to = Math.max.apply(Math, mangCountLoToTheoDau);



    var obj_0 = {}, obj_1 = {}, obj_2 = {}, obj_3 = {}, obj_4 = {}, obj_5 = {}, obj_6 = {}, obj_7 = {}, obj_8 = {}, obj_9 = {};
    var phanTramDBDau_0 = (countDau0DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_0 = (countDau0LoTo / tongGiai * 100).toFixed(2);
    obj_0.name = '0';
    obj_0.countDB = countDau0DacBiet;
    obj_0.countLoTo = countDau0LoTo;
    obj_0.phanTramDB = phanTramDBDau_0;
    obj_0.phanTramLoTo = phanTramLoToDau_0;
    obj_0.lengthDB = (countDau0DacBiet / max_dac_biet).toFixed(2);
    obj_0.lengthLoTo = (countDau0LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_0);

    var phanTramDBDau_1 = (countDau1DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_1 = (countDau1LoTo / tongGiai * 100).toFixed(2);
    obj_1.name = '1';
    obj_1.countDB = countDau1DacBiet;
    obj_1.countLoTo = countDau1LoTo;
    obj_1.phanTramDB = phanTramDBDau_1;
    obj_1.phanTramLoTo = phanTramLoToDau_1;
    obj_1.lengthDB = (countDau1DacBiet / max_dac_biet).toFixed(2);
    obj_1.lengthLoTo = (countDau1LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_1);

    var phanTramDBDau_2 = (countDau2DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_2 = (countDau2LoTo / tongGiai * 100).toFixed(2);
    obj_2.name = '2';
    obj_2.countDB = countDau2DacBiet;
    obj_2.countLoTo = countDau2LoTo;
    obj_2.phanTramDB = phanTramDBDau_2;
    obj_2.phanTramLoTo = phanTramLoToDau_2;
    obj_2.lengthDB = (countDau2DacBiet / max_dac_biet).toFixed(2);
    obj_2.lengthLoTo = (countDau2LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_2);

    var phanTramDBDau_3 = (countDau3DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_3 = (countDau3LoTo / tongGiai * 100).toFixed(2);
    obj_3.name = '3';
    obj_3.countDB = countDau3DacBiet;
    obj_3.countLoTo = countDau3LoTo;
    obj_3.phanTramDB = phanTramDBDau_3;
    obj_3.phanTramLoTo = phanTramLoToDau_3;
    obj_3.lengthDB = (countDau3DacBiet / max_dac_biet).toFixed(2);
    obj_3.lengthLoTo = (countDau3LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_3);

    var phanTramDBDau_4 = (countDau4DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_4 = (countDau4LoTo / tongGiai * 100).toFixed(2);
    obj_4.name = '4';
    obj_4.countDB = countDau4DacBiet;
    obj_4.countLoTo = countDau4LoTo;
    obj_4.phanTramDB = phanTramDBDau_4;
    obj_4.phanTramLoTo = phanTramLoToDau_4;
    obj_4.lengthDB = (countDau4DacBiet / max_dac_biet).toFixed(2);
    obj_4.lengthLoTo = (countDau4LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_4);

    var phanTramDBDau_5 = (countDau5DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_5 = (countDau5LoTo / tongGiai * 100).toFixed(2);
    obj_5.name = '5';
    obj_5.countDB = countDau5DacBiet;
    obj_5.countLoTo = countDau5LoTo;
    obj_5.phanTramDB = phanTramDBDau_5;
    obj_5.phanTramLoTo = phanTramLoToDau_5;
    obj_5.lengthDB = (countDau5DacBiet / max_dac_biet).toFixed(2);
    obj_5.lengthLoTo = (countDau5LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_5);

    var phanTramDBDau_6 = (countDau6DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_6 = (countDau6LoTo / tongGiai * 100).toFixed(2);
    obj_6.name = '6';
    obj_6.countDB = countDau6DacBiet;
    obj_6.countLoTo = countDau6LoTo;
    obj_6.phanTramDB = phanTramDBDau_6;
    obj_6.phanTramLoTo = phanTramLoToDau_6;
    obj_6.lengthDB = (countDau6DacBiet / max_dac_biet).toFixed(2);
    obj_6.lengthLoTo = (countDau6LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_6);

    var phanTramDBDau_7 = (countDau7DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_7 = (countDau7LoTo / tongGiai * 100).toFixed(2);
    obj_7.name = '7';
    obj_7.countDB = countDau7DacBiet;
    obj_7.countLoTo = countDau7LoTo;
    obj_7.phanTramDB = phanTramDBDau_7;
    obj_7.phanTramLoTo = phanTramLoToDau_7;
    obj_7.lengthDB = (countDau7DacBiet / max_dac_biet).toFixed(2);
    obj_7.lengthLoTo = (countDau7LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_7);

    var phanTramDBDau_8 = (countDau8DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_8 = (countDau8LoTo / tongGiai * 100).toFixed(2);
    obj_8.name = '8';
    obj_8.countDB = countDau8DacBiet;
    obj_8.countLoTo = countDau8LoTo;
    obj_8.phanTramDB = phanTramDBDau_8;
    obj_8.phanTramLoTo = phanTramLoToDau_8;
    obj_8.lengthDB = (countDau8DacBiet / max_dac_biet).toFixed(2);
    obj_8.lengthLoTo = (countDau8LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_8);

    var phanTramDBDau_9 = (countDau9DacBiet / tongLanQuay * 100).toFixed(2);
    var phanTramLoToDau_9 = (countDau9LoTo / tongGiai * 100).toFixed(2);
    obj_9.name = '9';
    obj_9.countDB = countDau9DacBiet;
    obj_9.countLoTo = countDau9LoTo;
    obj_9.phanTramDB = phanTramDBDau_9;
    console.log(typeof obj_9.phanTramDB)
    obj_9.phanTramLoTo = phanTramLoToDau_9;
    obj_9.lengthDB = (countDau9DacBiet / max_dac_biet).toFixed(2);
    obj_9.lengthLoTo = (countDau9LoTo / max_lo_to).toFixed(2);
    mangData.push(obj_9);

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

export {thongKeDau_};