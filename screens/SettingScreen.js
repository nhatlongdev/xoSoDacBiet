import React, { Component } from 'react';
import { 
    View,
    Text,
    Platform,
    StyleSheet,
    BackHandler,
    Switch
 } from 'react-native';
 import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';

 export default class SettingScreen extends Component {

    constructor(props){
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={
            toggled_sound:false,
            toggled_vibrate:false,
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
         return (
            <View style = {{flex: 1, marginTop: Platform.OS==='ios'?30:0}}>
                <View style = {style.header_style}>
                    <Text style = {style.text_style}>Cài đặt</Text>
                </View>

                <View style={{flexDirection:'row', width:'100%', padding:10}}>
                    <Text style={{fontSize:18}}>Âm thanh khi có giải mới</Text>
                    <Switch 
                        style={{flex:1}}
                        onValueChange={ (value) => this.setState({ toggled_sound: value })} 
                        value={ this.state.toggled_sound }
                    />
                </View>

                <View style={{flexDirection:'row', width:'100%', padding:10}}>
                    <Text style={{fontSize:18}}>Rung khi có giải mới</Text>
                    <Switch 
                        style={{flex:1}}
                        onValueChange={ (value) => this.setState({ toggled_vibrate: value })} 
                        value={ this.state.toggled_vibrate }
                    />
                </View>

                <FloatButtonCompomentExit
                    onButtonFloatPress={this.clickExit.bind(this)}
                />
            </View>
         );
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