import React, {Component} from 'react';
import {

} from 'react-native';

const apiGetDataFromServer = 'http://api.xoso98.com/logicandroid.php?id=lotteryresultlist&from_date=2018-01-01%2000:00:00';
async function getDataFromServer() {
    try {
        let response = await fetch(apiGetDataFromServer);
        let responseJson = await response.json();
        return responseJson.bodyitems;
    } catch (error) {
        console.log(error);
    }
}

async function getDataFromServerTrucTiep(dataCurrent) {
    var apiGetDataFromServerTrucTiep = 'http://api.xoso98.com/logicandroid.php?id=lotteryresultlist&from_date=' + dateCurrent + '%2000:00:00';
    console.log("API====: " + apiGetDataFromServerTrucTiep);
    try {
        let response = await fetch(apiGetDataFromServerTrucTiep);
        let responseJson = await response.json();
        return responseJson.bodyitems;
    } catch (error) {
        console.log(error);
    }
}
export {getDataFromServer, getDataFromServerTrucTiep};