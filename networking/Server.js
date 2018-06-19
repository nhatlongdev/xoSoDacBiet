import React, {Component} from 'react';
import {

} from 'react-native';
const apiGetDataFromServer = 'http://api.xoso98.com/logicandroid.php?id=lotteryresultlist&from_date=2018-04-16%2000:00:00';
async function getDataFromServer() {
    try {
        let response = await fetch(apiGetDataFromServer);
        let responseJson = await response.json();
        return responseJson.bodyitems;
    } catch (error) {
        console.log(error);
    }
}
export {getDataFromServer};