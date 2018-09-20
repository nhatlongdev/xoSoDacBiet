import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage,
    NetInfo,
    Platform
} from 'react-native';
import { getDataFromServer } from '../networking/Server';
import dataLottery_detector_statistic from '../components/DataLottery';
import {createArrPushInItem} from '../components/CreateArrPushInItem';
import GloblaValue from '../components/GlobalValue'
import data from '../components/ListProductsSave';
import {getRemainDay, apiGetListProducts} from '../networking/Server';
var DeviceInfo = require('react-native-device-info');
export default class Splash extends Component {

    constructor(props){
        super(props);
        this.state = {
            status_net: true,
        }
        GloblaValue.isLogin = true;
    }

     //save and get list product in app purscharse
    async saveListProduct(value) {
        try {
          await AsyncStorage.setItem('key_list_product',value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
    }

    async getListProduct(isConnected) {
        try {
          const value = await AsyncStorage.getItem('key_list_product');
            if(value === null){
                this.getListProductServer();
            }else{
                console.log("ARR TO====>>>>" + JSON.stringify(value));
            }
            this.remainDay(isConnected);
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }

    //ham lay ds cac goi dich vu
    getListProductServer(){
        apiGetListProducts().then((data_)=>{
                GloblaValue.dataProduct = data_;
                
                var arr = JSON.parse(data_);
                for(let i=0; i<arr.le)
                for(var x in data_){
                    data_[x].isBuy=false,
                    data_[x].consumed= false,
                    data_[x].error= null
                    let key = data_[x].id;
                    arr[key] = data_[x];
                }
               alert("ARR TO====>>>>" + JSON.stringify(arr));
                this.saveListProduct(JSON.stringify(arr));
            }).catch((error) =>{
                console.log("ERROR KET QUA PUSH TOKEN" + JSON.stringify(error));
            });
    }

     //ham chek so ngay con lai
     remainDay(isConnected){
        getRemainDay().then((data_)=>{
        //    alert("KET QUA REMAIN DAY: " + JSON.stringify(data_));
           GloblaValue.remainDay = data_.num_day;
            if(isConnected.type === 'wifi' || isConnected.type === 'WIFI'){
                console.log('CO WIFI')
                //lay du lieu tu server
                this.refreshFromServer();
                GloblaValue.status_net = true;
            }else {
                // Nếu không có mạng thì lấy dữ liệu cache
                this.getKey(false); 
                GloblaValue.status_net = false;
            }
        }).catch((error) =>{
            console.log("ERROR KET QUA PUSH TOKEN" + JSON.stringify(error));
        });
    }


    componentWillMount(){
        console.log('CHAY VAO WILLMOUNT')
        NetInfo.addEventListener('connectionChange', this.handler.bind(this));
        console.log('CHAY VAO WILLMOUNT_1')
    }

    //check status networking
    handler(isConnected) {
       //kiem tra cake list product in appp da co chua, neu chua co thi lu cake
       this.getListProduct(isConnected);
    }

    render(){
        
        return(
            //  ghi de style
            <View style ={[style.container,{ backgroundColor: 'green' }]}>
                <Image
                    style={{width: 80, height: 80}}
                    source = {require('../images/ic_launcher.png')}
                />
                <Text style={{fontSize:20, color:'white', marginTop: 20}}>Đang tải ...</Text>
            </View>
        );
    }

    refreshFromServer = ()=>{
        getDataFromServer().then((data_)=>{
            GloblaValue.data_lottery = data_;
            dataLottery_detector_statistic.data = createArrPushInItem(data_);
            status_net = true;
            this.getKey(true); 
            console.log('CHAY TOI DAY: ' + JSON.stringify(GloblaValue.data_lottery))        
        }).catch((error) =>{
            
        });
    }

    //LAY CACHE VALUE REGION
    async getRegion() {
        try {
          var value = await AsyncStorage.getItem('key_region');
          if(value != null){
            GloblaValue.region_value = parseInt(value);
            this.props.navigation.replace('Home_Screen', {data_lottery: GloblaValue.data_lottery, net: GloblaValue.status_net});
          }
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }

    //save cache
    async getKey(net) {
        try {
          const value = await AsyncStorage.getItem('key_data');
          if(value != null){ //Có dữ liệu cache
            if(net == false){
                alert('Vui lòng kiểm tra kết nối mạng!\nỨng dụng vẫn hoạt động bình thường nhưng để xem kết quả mới nhất vui lòng kết nối mạng')
                GloblaValue.data_lottery = JSON.parse(value);
                dataLottery_detector_statistic.data = createArrPushInItem(JSON.parse(value));
            }
            this.getRegion();
          }else{
              if(net == false){
                alert('Vui lòng kiểm tra kết nối mạng!')  
              }else {
                GloblaValue.first_login = true;  
                this.props.navigation.replace('Regions_Screen');
              }
          }
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }
    
    async saveKey(value) {
        try {
          await AsyncStorage.setItem('key_data', value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
    }

}

var style = ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})