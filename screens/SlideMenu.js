import React, {Component} from 'react';
import {
    View,
    Text, 
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    Share,
    ScrollView,
    Linking,
    ToastAndroid,
    Vibration
} from 'react-native';
import {Icon, Col} from 'native-base';
import Color from '../src/color';
import GloblaValue from '../components/GlobalValue';
var dataWithProvinces = {};
var heightScreen = Dimensions.get('window').height;
var widthScreen = Dimensions.get('window').width;

//biến lấy dữ liệu kết quả sổ xố đã qua xử lý từng miền, từng giải con thành obj riêng
var dataDetectorStatistic;
var linkDB = 'https://dacbiet.vn';
export default class SlideMenu extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
       
    }

    render(){
        return(
            <View style = {style.container}>
                <View style = {style.header_style}>
                    <Image
                       style ={{width: 50, height: 50}}
                       source = {require('../images/ic_launcher.png')}
                    />
                    <Text style={{color: 'white', marginTop: 10}}>Xổ số đặc biệt - Trực tiếp</Text>
                    <TouchableOpacity onPress={()=>{
                        this.clickOpenWeb();
                    }}>
                        <Text style={{color: 'white', marginTop: 2, color:Color.blue}}>{linkDB}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('Number_Detector_Screen')}}>
                    <Icon name = {'md-eye'} style = {{color: '#848484', marginRight: 20, marginTop: 10,fontSize: 30,}}/>
                    <Text style = {{marginTop: 10}}>Dò số</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('Statistical_Screen')}}>
                        <Icon name = {'home'} style = {{color: '#848484', marginRight: 20, fontSize: 30,}}/>
                        <Text>Thống kê</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {style.item_option} onPress = {()=>{
                        GloblaValue.clickToByDayByHome = false;
                        this.props.navigation.navigate('By_Day_Screen')
                    }}>
                        <Icon name = {'md-calendar'} style = {{color: '#848484', marginRight: 20, fontSize: 30,}}/>
                        <Text>Xem kết quả theo ngày</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {style.item_option} onPress = {()=>{this.clickMenuLeftToRegion()}}>
                        <Icon name = {'md-compass'} style = {{color: '#848484', marginRight: 20, fontSize: 30,}}/>
                        <Text>Chọn vùng miền</Text>
                    </TouchableOpacity>

                    <View style ={{height: 1, backgroundColor: '#848484', marginBottom: 10,}}></View>

                    <TouchableOpacity style = {style.item_option} onPress = {()=>{this.shareLink()}}>
                        <Icon name = {'md-share'} style = {{color: '#848484', marginRight: 20, fontSize: 30,}}/>
                        <Text>Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {style.item_option}>
                        <Icon name = {'ios-chatboxes'} style = {{color: '#848484', marginRight: 20, fontSize: 30,}}/>
                        <Text style={{marginRight:5, flex:1}}>{this.setTitleDuration(GloblaValue.remainDay)}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {style.item_option} onPress = {()=>{this.clickMenuLeftToService()}}>
                        <Icon name = {'logo-googleplus'} style = {{color: '#848484', marginRight: 20, fontSize: 30,}}/>
                        <Text>Dịch vụ - tiện ích</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {style.item_option} onPress = {()=>
                        this.props.navigation.navigate('SettingScreen')
                    }>
                        <Icon name = {'md-settings'} style = {{color: '#848484', marginRight: 20, fontSize: 30,}}/>
                        <Text>Cài đặt</Text>
                    </TouchableOpacity>

                </ScrollView>
                
            </View>
        );
    }


    //hàm set title cho mục số ngày nhận thông báo
    setTitleDuration(duration){
        var str='';
        if(duration === -1){
            str='Truy cập dịch vụ để đăng ký nhận thông báo kết quả trực tiếp';
        }else if(duration === -2){
            str='Kiểm tra kết nối mạng để nhận thông báo kết quả trực tiếp';
        }else if(duration === 0){
            str='Gói đăng ký nhận thông báo kết quả trực tiếp của bạn đã hết hạn';
        }else {
            str= 'Số ngày nhận thông báo kết quả trực tiếp: ' + duration;
        }
        return str;
    }

    //click to region
    clickMenuLeftToRegion(){
        GloblaValue.click_menuLeft = true;
        this.props.navigation.navigate('Regions_Screen');
    }

    //ham set truong hop khi click vao option dichvu-tienich
    clickMenuLeftToService(){
        if(GloblaValue.status_net === true){
            this.props.navigation.navigate('ProductsScreen')
        }else {
            ToastAndroid.show('Vui lòng kiểm tra kết nối mạng!',3000)
        }        
    }

    //click to web
    clickOpenWeb(){
        Linking.openURL(linkDB);
    }

    // share
    shareLink(){
        Share.share({
            message:'http://dacbiet.vn'
        })
    }
}

var style = ({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header_style:{
        height: heightScreen /4,
        width: '100%',
        paddingLeft: 10,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
    },
    item_option: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    }

})


// <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('Number_Detector_Screen')}}>
//                     <Icon name = {'md-eye'} style = {{color: '#848484', marginRight: 20, marginTop: 10,fontSize: 30,}}/>
//                     <Text style = {{marginTop: 10}}>Dò số</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('Statistical_Screen')}}>
//                     <Icon name = {'home'} style = {{color: '#848484', marginRight: 20, fontSize: 30,}}/>
//                     <Text>Thống kê</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('By_Day_Screen')}}>
//                     <Icon name = {'md-calendar'} style = {{color: '#848484', marginRight: 20, fontSize: 30,}}/>
//                     <Text>Xem kết quả theo ngày</Text>
//                 </TouchableOpacity>