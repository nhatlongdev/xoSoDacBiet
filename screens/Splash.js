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

    refreshFromServer = ()=>{
        getDataFromServer().then((data_)=>{
            dataLotteProvinces = data_;
            var jsonString = JSON.stringify(dataLotteProvinces);
            this.props.navigation.navigate('Home_Screen', {data_lottery: dataLotteProvinces});

        }).catch((error) =>{

        });
    }

    render(){
        return(
            <View style ={style.container}>
                <Image
                    source = {require('../images/ic_launcher.png')}
                />
                <Text>Đang tải ...</Text>
            </View>
        );
    }
}

var style = ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})