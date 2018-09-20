import DeviceInfo from 'react-native-device-info';

const apiGetDataFromServer = 'http://api.xoso98.com/logicandroid.php?id=lotteryresultlist&from_date=2018-01-01%2000:00:00';
// const apiGetDataFromServerTrucTiep = 'http://api.xoso98.com/logicandroid.php?id=lotteryresultlist&from_date=2018-07-13%2000:00:00';
const apiPushTokenToServer = 'https://dacbiet.vn/firebase/api.php';
async function getDataFromServer() {
    try {
        let response = await fetch(apiGetDataFromServer);
        let responseJson = await response.json();
        return responseJson.bodyitems;
    } catch (error) {
        console.log(error);
    }
}

async function getDataFromServerTrucTiep(ngay) {
    var apiGetDataFromServerTrucTiep = 'http://api.xoso98.com/logicandroid.php?id=lotteryresultlist&from_date=' + ngay + '%2000:00:00';
    console.log("API====: " + apiGetDataFromServerTrucTiep);
    try {
        let response = await fetch(apiGetDataFromServerTrucTiep);
        let responseJson = await response.json();
        return responseJson.bodyitems;
    } catch (error) {
        console.log(error);
    }
}

//push token to server
async function pushTokenToServer(params) {
    var _body = 'method='+ params.method + '&area=' + params.area + '&device_type='+ params.device_type+'&token='+params.token;
    
    try {
        let response = await fetch(apiPushTokenToServer, {
            method:'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: _body // <-- Post parameters
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    }
}

//get remain day
async function getRemainDay() {
    var _body = 'method='+ 'REMAIN_DAY' + '&device_id=' + DeviceInfo.getDeviceId();
    console.log('CO gia tri: ' + _body)
    try {
        let response = await fetch(apiPushTokenToServer, {
            method:'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: _body // <-- Post parameters
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    }
}

//Buy goi san pham
async function updatePurcharse(package_id) {

    var _body = 'method='+ 'PURCHASE' + '&device_id=' + DeviceInfo.getDeviceId() + '&package_id=' + package_id;
    console.log('CO gia tri: ' + _body)
    try {
        let response = await fetch(apiPushTokenToServer, {
            method:'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: _body // <-- Post parameters
        });
        let responseJson = await response.json();
        console.log('GIA TRI : ' + JSON.stringify(responseJson));
        return responseJson;
    } catch (error) {
        console.log(error);
    }
}

//lay ds goi dv
async function apiGetListProducts() {
    var apiGetListProducts_ = 'https://dacbiet.vn/package_list_android.json';
    try {
        let response = await fetch(apiGetListProducts_);
        let responseJson = await response.json();
        return responseJson.bodyitems;
    } catch (error) {
        console.log(error);
    }
}

export {getDataFromServer, getDataFromServerTrucTiep, pushTokenToServer, getRemainDay, updatePurcharse, apiGetListProducts};