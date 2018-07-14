import React, {Component} from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { getDataFromServer } from '../networking/Server';

var dataLotteProvinces;
export default class Splash extends Component {


    componentWillMount(){
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
            var jsonString = JSON.stringify(dataLotteProvinces);
            console.log("API TRA VE KET QUA: " + JSON.stringify(dataLotteProvinces));
            this.props.navigation.replace('Home_Screen', {data_lottery: dataLotteProvinces});
        }).catch((error) =>{

        });
    }

}

var style = ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})