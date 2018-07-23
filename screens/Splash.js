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
        // NetInfo.addEventListener(
        //     'change',(conectionInfo)=>{
        //         alert('First, is ' + (conectionInfo ? 'online' : 'offline'));
        //     }
        //   );
        // NetInfo.addEventListener(
        //     'change',
        //     handleFirstConnectivityChange
        //   );
        
        this.refreshFromServer();
    }

    render(){
        return(
            //  ghi de style
            <View style ={[style.container,{ backgroundColor: 'green' }]}>
                <Image
                    source = {require('../images/ic_launcher.png')}
                />
                <Text>Đang tải ...</Text>
            </View>
        );
    }

    refreshFromServer = ()=>{
        getDataFromServer().then((data_)=>{
            dataLotteProvinces = data_;
            dataLottery_detector_statistic.data = createArrPushInItem(data_);
            console.log("API TRA VE KET QUA dataLottery_detector_statistic: " + JSON.stringify(dataLottery_detector_statistic));
            this.props.navigation.replace('Home_Screen', {data_lottery: dataLotteProvinces, net: true});
            
        }).catch((error) =>{
            // Nếu không có mạng thì lấy dữ liệu cache
            this.getKey();
        });
    }

    //save cache
    async getKey() {
        try {
          const value = await AsyncStorage.getItem('key_data');
          console.log('GIA TRI CACHEiiii MAN PLASH: ' + value)
          if(value != null){ //Có dữ liệu cache
            dataLotteProvinces = value;
            dataLottery_detector_statistic.data = createArrPushInItem(value);
            this.props.navigation.replace('Home_Screen', {data_lottery: dataLotteProvinces, net: false});
          }else { //Không có dữ liệu cache
              alert('Vui lòng kiểm tra kết nối mạng!')
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