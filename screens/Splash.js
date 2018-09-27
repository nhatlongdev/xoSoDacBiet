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
import {getRemainDay, apiGetListProducts} from '../networking/Server';
var DeviceInfo = require('react-native-device-info');
var data_lottery_json = require('../assets/lottery_results_2018.json');
var checkOnNetInfo;
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
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }

    //ham lay ds cac goi dich vu
    getListProductServer(){
        apiGetListProducts().then((data_)=>{
                GloblaValue.dataProduct = data_;
                var arr = GloblaValue.dataProduct;
                var arrJson = {};
                var numeral = require('numeral');
                for(let i=0; i<arr.length; i++){
                    arr[i].isBuy=false;
                    arr[i].consumed= false;
                    arr[i].error= null;
                    arrJson[arr[i].id] = arr[i];
                }
                GloblaValue.dataProductSave = arrJson;
                this.saveListProduct(JSON.stringify(arrJson));
                this.remainDay();
            }).catch((error) =>{
                this.getKey(false); 
            });
    }

     //ham chek so ngay con lai
     remainDay(){
        getRemainDay().then((data_)=>{
        //    alert("KET QUA REMAIN DAY: " + JSON.stringify(data_));
           GloblaValue.remainDay = data_.num_day;
           console.log('CO WIFI')
           //lay du lieu tu server
           this.refreshFromServer();
           GloblaValue.status_net = true;
        }).catch((error) =>{
            this.getKey(false); 
        });
    }


    componentWillMount(){
        console.log('CHAY VAO WILLMOUNT')
        NetInfo.addEventListener('connectionChange', this.handler.bind(this));
        console.log('CHAY VAO WILLMOUNT_1')

        //Truong hop co may ko nhan ham on net infor
        checkOnNetInfo = setInterval(()=>{
            //TH KO CO MANG kiem tra cake(neu co lay cake ra su dung)
            this.getKey(false);
        },15000)
    }

    //check status networking
    handler(isConnected) {
        if(isConnected.type === 'wifi' || isConnected.type === 'WIFI'){
            //TH CO MANG goi api lay ds goi dv va api lay data lottery
            this.getListProductServer();
            //kill interval
            clearInterval(checkOnNetInfo);
        }else {
            //TH KO CO MANG kiem tra cake(neu co lay cake ra su dung)
            this.getKey(false);
            //kill interval
            clearInterval(checkOnNetInfo);
        }   
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
            this.getKey(false); 
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

    //save cache DATA LOTTERY
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
          }else{ //TH KO CO DU LIEU CAKE ==> CHUA DANG NHAP LAN NAO
              if(net == false){
                alert('Vui lòng kiểm tra kết nối mạng!\nỨng dụng vẫn hoạt động bình thường nhưng để xem kết quả mới nhất vui lòng kết nối mạng')
                GloblaValue.data_lottery = data_lottery_json.bodyitems;
                dataLottery_detector_statistic.data = createArrPushInItem(data_lottery_json.bodyitems);  
                this.saveKey(JSON.stringify(data_lottery_json.bodyitems));
              }
              GloblaValue.first_login = true;  
              this.props.navigation.replace('Regions_Screen');
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