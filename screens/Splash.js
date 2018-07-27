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

var dataLotteProvinces;
export default class Splash extends Component {

    constructor(props){
        super(props);
        this.state = {
            status_net: true,
        }
    }

    componentWillMount(){
        
        NetInfo.addEventListener('connectionChange', this.handler.bind(this));
    }

    //check status networking
    handler(isConnected) {
        if(isConnected.type === 'wifi' || isConnected.type === 'WIFI'){
            //lay du lieu tu server
            this.refreshFromServer();
        }else {
            // Nếu không có mạng thì lấy dữ liệu cache
            this.getKey(false);
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
                <Text>Đang tải ...</Text>
            </View>
        );
    }

    refreshFromServer = ()=>{
        getDataFromServer().then((data_)=>{
            dataLotteProvinces = data_;
            console.log("FORMAT DATA: " + JSON.stringify(data_));
            dataLottery_detector_statistic.data = createArrPushInItem(data_);
            console.log("API TRA VE KET QUA dataLottery_detector_statistic: " + JSON.stringify(dataLottery_detector_statistic));
            this.getKey(true);
            
        }).catch((error) =>{
            
        });
    }

    //save cache
    async getKey(net) {
        try {
          const value = await AsyncStorage.getItem('key_data');
          if(value != null){ //Có dữ liệu cache
            if(net == false){
                alert('Vui lòng kiểm tra kết nối mạng!\nỨng dụng vẫn hoạt động bình thường nhưng để xem kết quả mới nhất vui lòng kết nối mạng')
                dataLotteProvinces = value;
                console.log("FORMAT DATA1: " + JSON.stringify(value));
                dataLottery_detector_statistic.data = createArrPushInItem(JSON.parse(value));
            }
            this.props.navigation.replace('Home_Screen', {data_lottery: dataLotteProvinces, net: false});
          }else{
              if(net == false){
                alert('Vui lòng kiểm tra kết nối mạng!')  
              }else {
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

// function handleFirstConnectivityChange(isConnected) {
//     alert('Then, is ' + (isConnected ? 'online' : 'offline'));
//     NetInfo.isConnected.removeEventListener(
//       'change',
//       handleFirstConnectivityChange
//     );
//   }
 
var style = ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})