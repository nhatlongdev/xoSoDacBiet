import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage,
    NetInfo
} from 'react-native';
import { getDataFromServer } from '../networking/Server';
import dataLottery_detector_statistic from '../components/DataLottery';
import {createArrPushInItem} from '../components/CreateArrPushInItem';
import GloblaValue from '../components/GlobalValue'
var dataLotteProvinces;

export default class Splash extends Component {

    constructor(props){
        super(props);
        this.state = {
            status_net: true,
        }
        GloblaValue.isLogin = true;
    }

    componentWillMount(){
        console.log('CHAY VAO WILLMOUNT')
        NetInfo.addEventListener('connectionChange', this.handler.bind(this));
        console.log('CHAY VAO WILLMOUNT_1')
    }

    //check status networking
    handler(isConnected) {
        console.log('CHAY VAO WILLMOUNT_3')
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