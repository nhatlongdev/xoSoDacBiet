import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit'; 

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
export default class CommunityScreen extends Component {
    render(){
        return(
            <View style = {style.container}>
                <View style = {style.header_style}>
                    <Text style = {style.text_style}>Cộng đồng dự đoán</Text>
                </View>
                <FloatButtonCompomentExit
                     onButtonFloatPress={this.clickExit.bind(this)}
                />
            </View>
        );
    }

    // back to home
    clickExit(){
        this.props.navigation.goBack();
    }
}

var style = StyleSheet.create({
    container:{
        flex:1
    },
    header_style:{
        width: widthScreen,
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
    },
})

