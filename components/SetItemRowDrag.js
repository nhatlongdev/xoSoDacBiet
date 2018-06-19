import React, {Component} from 'react';
import {

} from 'react-native';
import moment from 'moment';
var lottery_provinces_schedule = require('../assets/lottery_provinces_.json');

function setItemRowDrag(rowItem, date_lottery, direction_drag){
        if(direction_drag == 0){
            date_lottery.setDate(date_lottery.getDate()-1);
        }else {
            date_lottery.setDate(date_lottery.getDate()+1);
        }
        
        var day_ = date_lottery.getDay() + 1;
        var value_date = moment(date_lottery).format('YYYY-MM-DD');
        rowItem.rd = value_date;
        rowItem.weekdays = ","+day_+",";
        for(var i =0;i < lottery_provinces_schedule.length; i++){
            if(rowItem.area_id == lottery_provinces_schedule[i].area_id && lottery_provinces_schedule[i].weekdays == rowItem.weekdays){

                var check = JSON.stringify(lottery_provinces_schedule[i].name);
                console.log('i '+i+' GIa tri moi list Name: =====>: ' + check);
                console.log('i '+i+' GIa tri moi Day: =====>: ' + day_);
                rowItem.name = lottery_provinces_schedule[i].name;
                rowItem.code = lottery_provinces_schedule[i].code;
                break;
            }
        } 
        return rowItem;
};

export {setItemRowDrag};
