import React, {Component} from 'react';
import {

} from 'react-native';

function getDayOfWeek(value_){
    switch (value_){
        case 0:
        return 'Chủ Nhật';
        case 1:
        return 'Thứ Hai';
        case 2:
        return 'Thứ Ba';
        case 3:
        return 'Thứ Tư';
        case 4:
        return 'Thứ Năm';
        case 5:
        return 'Thứ Sáu';
        case 6:
        return 'Thứ Bảy';
        default:
        return '';
    }
};

export {getDayOfWeek};

