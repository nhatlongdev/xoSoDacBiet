import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    BackHandler
} from 'react-native';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
import GlobalValue from '../components/GlobalValue';

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
export default class RegionsScreen extends Component {

    constructor(props){
        super(props);
        // alert(region_global_selected)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

    render(){
        return(
            <View style = {style.container}>
                <View style = {style.header_style}>
                    <Text style = {style.text_style}>Xổ số đặc biệt - Trực tiếp</Text>
                </View>
                <Text style = {{fontSize: 18, marginHorizontal: 10, marginTop: 15, marginBottom: 20, textAlign:'center'}}>
                    Để trải nghiệm tốt hơn, quý khách vui lòng lựa chọn khu vực muốn xem kết quả xổ số
                </Text>

                <ScrollView style={{flex:1}}>
                    <View style = {{flex:1, marginHorizontal: 5}}>
                        <View style = {{flexDirection: 'row', marginBottom: 20, width:'100%'}}>
                            <TouchableOpacity style={{flex:1,height: 200, width: 180, alignItems:'center'}}
                                onPress={()=>{this.clickExit(true,1)}}
                            >
                                <Image
                                    style = {{flex:1, height: 200, width: 180}}
                                    source = {require('../images/mien_bac.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, height: 200, width: 180, alignItems:'center'}}
                                    onPress={()=>{this.clickExit(true,2)}}
                            >
                                <Image
                                    style = {{flex:1, height: 200, width: 180}}
                                    source = {require('../images/mien_trung.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style = {{flexDirection: 'row', marginBottom: 20, width:'100%'}}>
                            <TouchableOpacity style={{flex:1, height: 200, width: 180, alignItems:'center'}}
                                    onPress={()=>{this.clickExit(true,3)}}
                            >
                                <Image
                                    style = {{flex:1, height: 200, width: 180}}
                                    source = {require('../images/mien_nam.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, height: 200, width: 180, alignItems:'center'}}
                                    onPress={()=>{this.clickExit(true,0)}}
                            >    
                                <Image
                                    style = {{flex:1, height: 200, width: 180}}
                                    source = {require('../images/toan_quoc.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <FloatButtonCompomentExit
                     onButtonFloatPress={this.clickExit.bind(this)}
                />

            </View>
        );
    }

    clickExit(check, value){
        if(value != null){
            GlobalValue.region_value = value;
            this.saveRegion(GlobalValue.region_value + '');
        }else {
            if(GlobalValue.region_value == 0){
                this.saveRegion('0');
            }
        }
        
        if(GlobalValue.first_login == true){

            GlobalValue.first_login = false;
            this.props.navigation.replace('Home_Screen');
        }else {
            if(check == true && GlobalValue.click_menuLeft == false){
                this.props.navigation.state.params.listenRegions();
            }
            this.props.navigation.goBack();
        }
    }

     //SAVE VALUE REGION SELECTED
     async saveRegion(value) {
        try {
          await AsyncStorage.setItem('key_region',value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
    }
}

var style = StyleSheet.create({
    container:{
        flex:1
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
    },
})
