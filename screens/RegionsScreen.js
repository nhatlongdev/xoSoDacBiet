import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
export default class RegionsScreen extends Component {
    render(){
        return(
            <View style = {style.container}>
                <View style = {style.header_style}>
                    <Text style = {style.text_style}>Xổ số 98 - Trực tiếp</Text>
                </View>
                <Text style = {{fontSize: 18, marginHorizontal: 10, marginTop: 15, marginBottom: 20}}>
                    Để trải nghiệm tốt hơn, quý khách vui lòng lựa chọn khu vực muốn xem kết quả xổ số
                </Text>
                <View style = {{flex:1, marginHorizontal: 5}}>
                    <View style = {{flexDirection: 'row', marginBottom: 20}}>
                        <Image
                            style = {{flex:1, height: 200}}
                            source = {require('../images/mien_bac.png')}
                        />
                        <Image
                            style = {{flex:1, height: 200}}
                            source = {require('../images/mien_trung.png')}
                        />
                    </View>
                    <View style = {{flexDirection: 'row'}}>
                        <Image
                            style = {{flex:1, height: 200}}
                            source = {require('../images/mien_nam.png')}
                        />
                        <Image
                            style = {{flex:1, height: 200}}
                            source = {require('../images/toan_quoc.png')}
                        />
                    </View>
                </View>

                <FloatButtonCompomentExit
                     onButtonFloatPress={this.clickExit.bind(this)}
                />

            </View>
        );
    }

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
