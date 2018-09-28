import React, { Component } from 'react';
import { 
    View,
    Text,
    Platform,
    StyleSheet,
    BackHandler,
    Switch,
    AsyncStorage
 } from 'react-native';
 import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
 import GlobalValue from '../components/GlobalValue';

 export default class SettingScreen extends Component {

    constructor(props){
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={
            toggled_sound:GlobalValue.sound,
            toggled_vibrate:GlobalValue.vibrate,
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

     render() {
         //set gia tri cho global
         
         GlobalValue.vibrate = this.state.toggled_vibrate;
         return (
            <View style = {{flex: 1, marginTop: Platform.OS==='ios'?30:0}}>
                <View style = {style.header_style}>
                    <Text style = {style.text_style}>Cài đặt</Text>
                </View>

                <View style={{flexDirection:'row', width:'100%', padding:10}}>
                    <Text style={{fontSize:18}}>Âm thanh khi có giải mới</Text>
                    <Switch 
                        style={{flex:1}}
                        onValueChange={ (value) => this.clickSetting(value, 'sound')} 
                        value={ this.convertStringToTrueFalse(this.state.toggled_sound) }
                    />
                </View>

                <View style={{flexDirection:'row', width:'100%', padding:10}}>
                    <Text style={{fontSize:18}}>Rung khi có giải mới</Text>
                    <Switch 
                        style={{flex:1}}
                        onValueChange={ (value) => this.clickSetting(value, 'vibrate')} 
                        value={ this.convertStringToTrueFalse(this.state.toggled_vibrate)}
                    />
                </View>

                <FloatButtonCompomentExit
                    onButtonFloatPress={this.clickExit.bind(this)}
                />
            </View>
         );
     }

     //convert string to true, fale
     convertStringToTrueFalse(value){
        if(value === 'true')return true;
        if(value === 'false') return false;
     }

     //ham xu ly khi co su thay doi setting sound va vibrate
     clickSetting(value, type){
        if(type === 'sound'){
            GlobalValue.sound = value+'';
            this.saveSound(value +'')
            this.setState({ toggled_sound: value+'' })
        }else {
            GlobalValue.vibrate = value+'';
            this.saveVibrate(value + '');
            this.setState({ toggled_vibrate: value +''})
        }
        
     }

    //save and get value config sound, vibrate
    async saveSound(value) {
        try {
          await AsyncStorage.setItem('key_sound',value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
    }

    async saveVibrate(value) {
        try {
          await AsyncStorage.setItem('key_vibrate',value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
    }

     //exit
     clickExit(){
        this.props.navigation.goBack();
    }
 }

 const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'yellow'
    },
    header_style:{
        width: '100%',
        height: 50,
        backgroundColor: '#3F51B5',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    text_style:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
})