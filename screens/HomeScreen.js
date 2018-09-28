import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    FlatList,
    StyleSheet,
    Json,
    stringify,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    AsyncStorage,
    BackHandler,
    ToastAndroid,
    AppState,
    Platform,
    Vibration
} from 'react-native';
// modules
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
  } from '../components/BackHandlerXoSo';
import {exitAlert} from '../components/AlertXoSo';
import OptionsHome from '../components/OptionsHome';
import listOptionHome from '../components/ListOptionHome';
import dataListDay from '../components/DataListDay';
import ItemSection from '../components/ItemSection';
import ItemRow from '../components/ItemRow';
import ItemRowTheoMien from '../components/ItemRowTheoMien';
import ExpanableList from 'react-native-expandable-section-flatlist';
import {Icon} from 'native-base';
import CircleOption from '../components/CircleOption';
import FloatButtonCompoment from '../components/FloatButtonCompoment';
import TextSetting from '../components/TextSetting';
import ProgressReact from '../components/ProgressReact';
import moment, { duration } from 'moment';
// import {getDataFromServer} from '../networking/Server';
import {createArrPushInItem} from '../components/CreateArrPushInItem';
import TreeView from '@zaguini/react-native-tree-view';
// ham goi api lay ket qua tu server
import {getDataFromServer} from '../networking/Server';
import {getDataFromServerTrucTiep} from '../networking/Server';
import {pushTokenToServer} from '../networking/Server';
import dataSwitchKey_global from '../components/DataLotterySwitchKey_Global';
import dataLoadingServer_global from '../components/DataLottery_loading_server';
import Thongke from '../components/Thongke';

//import data lottery
import GloblaValue from '../components/GlobalValue';

//import color, string
import Color from '../src/color';
import _string from '../src/string';

import RNExitApp from 'react-native-exit-app';

import {
    GoogleAnalyticsTracker,
    GoogleAnalyticsSettings,
    GoogleTagManager
  } from "react-native-google-analytics-bridge";

//biến lưu ngày push notifi gần nhất
var datePushNotifiLatest;

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;

var listDay = [], listDayTam = [];
var date_ = new Date(), dateTam = new Date();
var lottery_provinces = require('../assets/lottery_provinces_.json');
var dataLoadingToServer;
var dataSwitchKey = {};
var dataWithProvinces = {};
//bien tang i khi load more
var countLoadmore = 0;

// Import the react-native-sound module
var SoundPlayer = require('react-native-sound');
var song;

//thoi gian bat dau quay, thoi gian dung quay
var dateTimeBatDauQuayMienNam, dateTimeDungQuayMienNam, dateTimeBatDauQuayMienTrung, dateTimeDungQuayMienTrung, dateTimeBatDauQuayMienBac, dateTimeDungQuayMienBac;

var kq_mb_hom_nay = {};
const key = 0;

//Gia tri vung mien duoc chon luu tam de so sanh xem co thay doi ko
var region_save_tam = 0;

//data list ngay theo mien
var dataListDayTheoMien;
//msg notification
var contentNotifi='aloalo';

//rowitem lấy từ NOTIFILE
var rowItemGetNotifi ={};

import BackgroundJob from 'react-native-background-job';
const foregroundJobKey = "foregroundJobKey";

//KHAI BAO BACKGROUNDJOB=======================================//
var checkIsNotifi = false;
BackgroundJob.register({
    jobKey: foregroundJobKey,
    job: () => console.log(`Exact Job fired!. Key = ${foregroundJobKey}`)
  });

var token_os = ''; 
var params ={
    method:'REGISTER',
    area:0,
    device_type:Platform.OS === 'ios'?2:1,
}; 
import FCM, { NotificationActionType } from "react-native-fcm";

import { registerKilledListener, registerAppListener } from "./Listeners";

registerKilledListener();

export default class HomeScreen extends Component {

    // Contructor
    constructor(props){
        super(props);

        song = null;
        //Gia tri vung mien duoc chon luu tam de so sanh xem co thay doi ko
        region_save_tam = GloblaValue.region_value;

        // lấy ds kết quả chuyển từ màn splash sang
        dataLoadingToServer = GloblaValue.data_lottery;
        console.log('CHECK O DAY===>>>' + JSON.stringify(dataLoadingToServer))
        
        //save cache
        if(GloblaValue.status_net == true){
            this.saveKey(JSON.stringify(dataLoadingToServer));
        }

        // Chuyển đổi kết quả về dạng key - value (key moi item la--> mã tỉnh_ngày)
        dataSwitchKey =  createKeyItem(dataLoadingToServer);
        console.log('CHECK O dataSwitchKey===>>>' + JSON.stringify(dataSwitchKey))
        dataSwitchKey_global.data = dataSwitchKey;

         // lay ds ngay theo mien
         dataListDayTheoMien = this.getListDay_VungMien(GloblaValue.region_value);
         console.log('CHECK O DAY1111===>>>' + JSON.stringify(dataListDayTheoMien))


        this.state = {
            dataTam: this.getListDay_(false),
            load: false,
            showProgress_: true,
            showSetting: false,
            changeRegions:0,
            appState: AppState.currentState,
        };

        // Tao mảng danh sách ngày cho listView
        // Tao mảng phuc vu viec thong ke, tra cuu
        dataWithProvinces = createArrPushInItem(dataLoadingToServer);
        console.log('BBBBB===>>>' + JSON.stringify(dataWithProvinces))
        
        //set thời điểm bắt đầu và kết thúc quay xổ số ba miền
        dateTimeBatDauQuayMienNam = moment(moment().format('YYYY-MM-DD') + ' 16:15'); //.format('YYYY/MM/DD HH:mm:ss')
        dateTimeDungQuayMienNam = moment(moment().format('YYYY-MM-DD' + ' 16:40'));
        dateTimeBatDauQuayMienTrung = moment(moment().format('YYYY-MM-DD') + ' 17:15'); //.format('YYYY/MM/DD HH:mm:ss')
        dateTimeDungQuayMienTrung = moment(moment().format('YYYY-MM-DD' + ' 17:40'));
        dateTimeBatDauQuayMienBac = moment(moment().format('YYYY-MM-DD') + ' 18:15'); //.format('YYYY/MM/DD HH:mm:ss')
        dateTimeDungQuayMienBac = moment(moment().format('YYYY-MM-DD' + ' 18:40'));

        //khởi tạo biến lưu ngày push notifi gần nhất
        datePushNotifiLatest = moment().format('YYYY/MM/DD');
    }

    //SAVE CACHE =======================================
    async getKey() {
        try {
          const value = await AsyncStorage.getItem('key_data');
          console.log('GIA TRI CACHEiiii: ' + value)
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }
    
    async saveKey(value) {
        try {
          await AsyncStorage.setItem('key_data',value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
    }
    
    async resetKey() {
        try {
          await AsyncStorage.removeItem('key_data');
          const value = await AsyncStorage.getItem('key_data');
        //   this.setState({myKey: value});
          
        } catch (error) {
          console.log("Error resetting data" + error);
        }
    }
    // =======================================

    //GET VALUE REGION SELECTED IN CAKE
    async saveRegion(value) {
        try {
          await AsyncStorage.setItem('key_region',value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
    }
    
    async getRegion() {
        try {
          var value = await AsyncStorage.getItem('key_region');   
          if(value != null){
            GloblaValue.region_value = parseInt(value);
            params.area = parseInt(value);
            console.log('XXXX: ' + JSON.stringify(params))
            this.getObjParams();
          }
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }

    //SAVE OBJ PARAMS SENT TO SERVER PUSH
    async saveObjParams(value) {
        try {
          await AsyncStorage.setItem('key_push_notifi',value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
    }
    
    async getObjParams() {
        try {
          var value = await AsyncStorage.getItem('key_push_notifi');   
          if(value == null){
            this.sendTokenToServer(params);
          }
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }

    //ham gui token to serser
    sendTokenToServer(params){
        pushTokenToServer(params).then((data_)=>{
          pushTokenToServer  
          console.log("KET QUA PUSH TOKEN" + JSON.stringify(data_));
            this.saveObjParams(JSON.stringify(params))
        }).catch((error) =>{
            console.log("ERROR KET QUA PUSH TOKEN" + JSON.stringify(error));
        });
    }


    componentWillMount() {

        song = new SoundPlayer('tin_nhan_moi.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
            if (error) {
              alert('failed to load the sound')
            return;
            }
            // loaded successfully
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        });

        console.log('TYPEOF=======>>>>>>>>>>>>>>>: ' + typeof GloblaValue.region_value + ' gia tri ' + GloblaValue.region_value)
        setInterval(()=>{
            console.log("INTERVAL HOME=====>>>222");
            var timeCurrent = moment();
            if(timeCurrent>= dateTimeBatDauQuayMienNam && timeCurrent< dateTimeDungQuayMienNam){
                // đến khung giờ quay trực tiếp thì 10s request server một lần lấy kết quả
                this.refreshFromServer10s();
            }else if(timeCurrent>= dateTimeBatDauQuayMienTrung && timeCurrent< dateTimeDungQuayMienTrung){
                this.refreshFromServer10s();
            }else if(timeCurrent>= dateTimeBatDauQuayMienBac && timeCurrent< dateTimeDungQuayMienBac){
                this.refreshFromServer10s();
            }
        },10000)

        // CHƯA LÀM ĐƯỢC REDUX NÊN DÙNG TẠM INTERVAL ĐỂ LẮNG NGHE SỰ THAY ĐỔI MIỀN ĐƯỢC CHỌN KHI CLICK TỪ MENULEFT TỚI COMPONENT VÙNG MIỀN
        setInterval(()=>{
             if(region_save_tam != GloblaValue.region_value && GloblaValue.click_menuLeft == true){
                 GloblaValue.click_menuLeft = false;
                 region_save_tam = GloblaValue.region_value;
                 if(GloblaValue.region_value == 0){
                    let that = this;
                    setTimeout(
                        function(){
                            that.getListDay_(true);
                    }, 2000);
                }else {
                    dataListDayTheoMien = this.getListDay_VungMien(GloblaValue.region_value);
                }

                //dang ky lai thong tin push notifi voi server
                params.area = GloblaValue.region_value;
                this.sendTokenToServer(params);

                this.setState({
                    changeRegions:GloblaValue.region_value,
                 })
                 
             }
        },1000)
        this.getKey();
        // AppState.removeEventListener('change', this._handleAppStateChange);
    }

    //ham play 
    onNewLotteryToPlaySoundVibrate(){
        if(GloblaValue.sound === 'true'){
            this.onPlaySound();
        }
        if(GloblaValue.vibrate === 'true'){
            this.onPlayVibrate();
        }
    }

    // HAM PLAY MUSIC
    onPlaySound(){
        if(song != null){
            song.play((success)=>{
                if(!success) alert('play error');
            })
        }
    }

    onPlayVibrate(){
        const DURATION = 1000
        const PATTERN = [1000, 2000, 3000]
        Vibration.vibrate(DURATION);
    }

    componentWillUnmount() {
       
    }

    async componentDidMount(){
       
         FCM.createNotificationChannel({
            id: 'default',
            name: 'Default',
            description: 'used for example',
            priority: 'high'
          })
          registerAppListener(this.props.navigation);

          FCM.getInitialNotification().then(notif => {
            //   alert('co chay vao day' + JSON.stringify(notif));
              console.log('INITIALNOTIFI', notif)
            this.setState({
              initNotif: notif
            });
            if (notif && notif.targetScreen === "detail") {
              setTimeout(() => {
                this.props.navigation.navigate("Detail");
              }, 500);
            }
          });
      
          try {
            let result = await FCM.requestPermissions({
              badge: false,
              sound: true,
              alert: true
            });
          } catch (e) {
            console.error(e);
          }
      
          // Đăng ký token với fcm
          FCM.getFCMToken().then(token => {
            console.log("TOKEN (getFCMToken)", token);
            this.setState({ token: token || "" });
            params.token = token;
            this.getRegion();
          });
      
          if (Platform.OS === "ios") {
            FCM.getAPNSToken().then(token => {
              console.log("APNS TOKEN (getFCMToken)", token);
            });
          }

        handleAndroidBackButton(exitAlert);
        AppState.addEventListener('change', this._handleAppStateChange);

        /*XỬ LÝ TRƯỜNG HỢP NẾU MỚI LOGIN VÀO MÀ ĐANG TRONG KHUNG GIỜ QUAY CỦA MIỀN ĐƯỢC CHỌN THÌ VÀO 
        THẲNG MÀN ĐÓ LUÔN */
        if(GloblaValue.isLogin === true){
            GloblaValue.isLogin = false;
            var timeCurrent = moment();
            let paramRow = {};
            if(GloblaValue.region_value === 3 && timeCurrent>= dateTimeBatDauQuayMienNam && timeCurrent< dateTimeDungQuayMienNam){
                // đến khung giờ quay trực tiếp thì 10s request server một lần lấy kết quả
                this.props.navigation.navigate('ResultLottery2', {title: "", 
                data_lottery: dataSwitchKey, row: dataListDayTheoMien[0]})
            }else if(GloblaValue.region_value === 2 && timeCurrent>= dateTimeBatDauQuayMienTrung && timeCurrent< dateTimeDungQuayMienTrung){
                // đến khung giờ quay trực tiếp thì 10s request server một lần lấy kết quả
                this.props.navigation.navigate('ResultLottery2', {title: "", 
                data_lottery: dataSwitchKey, row: dataListDayTheoMien[0]})
            }else if(GloblaValue.region_value === 1 && timeCurrent>= dateTimeBatDauQuayMienBac && timeCurrent< dateTimeDungQuayMienBac){
                // đến khung giờ quay trực tiếp thì 10s request server một lần lấy kết quả
                this.props.navigation.navigate('ResultLottery', {title: "", 
                data_lottery: dataSwitchKey, row: dataListDayTheoMien[0]})
            }else if(GloblaValue.region_value === 0){
                if(timeCurrent>= dateTimeBatDauQuayMienNam && timeCurrent< dateTimeDungQuayMienNam){
                    this.props.navigation.navigate('ResultLottery2', {title: "", 
                    data_lottery: dataSwitchKey, row: this.state.dataTam[0].member[2]});
                }else if(timeCurrent>= dateTimeBatDauQuayMienTrung && timeCurrent< dateTimeDungQuayMienTrung){
                    this.props.navigation.navigate('ResultLottery2', {title: "", 
                    data_lottery: dataSwitchKey, row: this.state.dataTam[0].member[1]});
                }else if(timeCurrent>= dateTimeBatDauQuayMienBac && timeCurrent< dateTimeDungQuayMienBac){
                    this.props.navigation.navigate('ResultLottery', {title: "", 
                    data_lottery: dataSwitchKey, row: this.state.dataTam[0].member[0]});
                }
            }
        }
    }

    _handleAppStateChange = (nextAppState) => {
       
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            // AppState.removeEventListener('change', nextAppState);  
        //   alert('App has come to the foreground!')
          if(checkIsNotifi == true){
            this.clickItemTheoMien(rowItemGetNotifi);
            checkIsNotifi = false;
          }
          // Bật app lên thì refresh lại dự liệu
          this.clickRefreshDsDay();
        }else {
            console.log('App has come to the Background!')
            BackgroundJob.schedule({
                jobKey: foregroundJobKey,
                period: 1000,
                exact: true
              });
        }
        this.setState({appState: nextAppState});
    }

    


    shouldComponentUpdate(){
        return true;
    }

    componentWillUpdate(){
        console.log('GIA TRI DATATAM MOI: ' + JSON.stringify(dataListDayTheoMien))
        console.log('GIA TRI DATATAM GLoBal.region_value: ' + GloblaValue.region_value)
    }

    componentDidUpdate(){

    }

    // hàm lay rowItem đưa vào push notifi
    getRowItemPushNotification(value){
        let row={};
        if(GloblaValue.region_value == 0){
                row = this.state.dataTam[0].member[value];
                row.title = this.state.dataTam[0].header.title;
                row.title_screen_result=this.state.dataTam[0].header.title_screen_result;
                row.state = this.state.dataTam[0].header.status;
        }else {
            row = dataListDayTheoMien[0];
        }
        let rowString = JSON.stringify(row);
        return rowString;
    }

    //hàm set state changeRegions
    listenChangeRegions(){
        if(GloblaValue.region_value == 0){
            let that = this;
            setTimeout(
                function(){
                    that.getListDay_(true);
            }, 2000);
        }else {
            dataListDayTheoMien = this.getListDay_VungMien(GloblaValue.region_value);
        }
        region_save_tam = GloblaValue.region_value;
        
        //dang ky lai thong tin push notifi voi server
        params.area = GloblaValue.region_value;
        this.sendTokenToServer(params);

        this.setState({
            changeRegions:GloblaValue.region_value,
        })
    }

    // hàm set title cho danh sach ket qua mới nhât
    setTitleDsKetquaMoiNhat(value){
        console.log('KO KIEU:' + value)
        var title='';
        if(value === 0){
            title = 'Danh sách kết quả xổ số mới nhất';
        }else if(value === 1){
            title = 'Danh sách kết quả xổ số Miền Bắc mới nhất';
        }else if(value === 2){
            title = 'Danh sách kết quả xổ số Miền Trung mới nhất';
        }else if(value === 3){
            title = 'Danh sách kết quả xổ số Miền Nam mới nhất';
        }
        return title;
    }

    render(){
    // Recommend you set this much higher in real app! 30 seconds+
    // GoogleAnalyticsSettings has static methods and is applied
    // for all trackers
    GoogleAnalyticsSettings.setDispatchInterval(2);
    //GoogleAnalyticsSettings.setDryRun(true);
    //GoogleAnalyticsSettings.setOptOut(true);

    // The tracker is constructed
    let tracker = new GoogleAnalyticsTracker("UA-124642701-1");
    // You can have multiple trackers
    //let tracker2 = new GoogleAnalyticsTracker("UA-12345-3", { demo: 1 });
    tracker.trackScreenView("Home_Screen");

        return(
            <View style = {{flex: 1, backgroundColor: 'white', marginTop: Platform.OS==='ios'?30:0}}>
                <View style = {style.header_style}>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.openDrawer()}}>
                        <Image
                            source = {require('../images/menu.png')}
                        />
                    </TouchableOpacity>
                    <Text style = {style.text_title}>Xổ số đặc biệt - Trực tiếp</Text>
                   {/*<TouchableOpacity onPress = {()=>{this.clickBaChamGocPhai()}}>
                        <Image
                            source = {require('../images/dots_vertical.png')}
                        />
                     </TouchableOpacity>*/}
                </View>

                <View style = {style.container_option}>
                   <ScrollView horizontal = {true}>
                        <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('Number_Detector_Screen'
                                    , {data: dataWithProvinces})}}>
                                <View style = {{width: 50, height: 50, borderRadius:  50/2, backgroundColor: 'green',justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'md-eye'} style = {{fontSize: 40, color: 'white'}}/>
                                </View>
                                <Text style= {{color: 'black', textAlign:'center'}}>Dò số</Text>
                        </TouchableOpacity>

                       {/* Goi component format ==> THongKe */}
                        <Thongke 
                            title={'Thống kê'}
                            nameIcon={'home'}
                            style={style.item_option}
                            onPress={()=>{this.props.navigation.navigate('Statistical_Screen'
                            , {data: dataWithProvinces})}}/>

                        <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('By_Day_Screen',{data_lottery: dataSwitchKey})}}>
                            <View style = {{width: 50, height: 50, borderRadius:  50/2, backgroundColor: 'green',justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'md-calendar'} style = {{fontSize: 40, color: 'white'}}/>
                            </View>
                            <Text style= {{color: 'black'}}>Theo ngày</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {style.item_option} onPress = {()=>{
                            this.props.navigation.navigate('SoMoScreen')
                        }}>
                            <Image
                                    style = {{height: 50, width: 50}}
                                    source = {require('../images/somo.png')}
                                />
                            <Text style= {{color: 'black'}}>Sổ mơ</Text>
                        </TouchableOpacity>

                   </ScrollView>
                </View>

            
                <Text style = {style.text_title_1}>{this.setTitleDsKetquaMoiNhat(GloblaValue.region_value)}</Text>

                <View style = {style.content}>
                    {
                        GloblaValue.region_value === 0?
                        <ExpanableList
                            refreshing = {false}
                            onRefresh = {()=>{this.refresh()}}

                            onEndReachedThreshold = {0}
                            onEndReached = {()=>{
                                alert('Cham day roi')
                            }}
                            dataSource={this.state.dataTam}
                            headerKey="header"
                            memberKey="member"
                            renderRow={this._renderRow}
                            headerOnPress = {this._headerOnClick}
                            renderSectionHeaderX={this._renderSection}
                            isOpen = {false}
                            keyExtractor={ (item, index) => index.toString() }
                        />:
                        <FlatList   
                                style={{paddingHorizontal:5}}
                                data = {dataListDayTheoMien}
                                renderItem = {({item, index})=>{
                                    return(
                                        <TouchableOpacity onPress={()=>{
                                            this.clickItemTheoMien(item);
                                        }}>
                                            <ItemRowTheoMien
                                                item = {item} index = {index}
                                            />
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={ (item, index) => index.toString() }> 
                        </FlatList>
                    } 
                </View>

                {/* {this.state.load && this.loading_view(style.load_more)} */}
                {this.state.load && this.loading_view(style.load_more)}

                <FloatButtonCompoment
                    onButtonFloatPress={this.clickRefreshDsDay.bind(this)}
                />
                {
                    this.state.showSetting?
                    <TextSetting
                        onButtonSetting={this.onClickSetting.bind(this)}
                    /> : null
                }
                
            </View>

        );
    }

    _renderRow = (rowItem, rowId, sectionId) => 
        <TouchableOpacity onPress = {()=>this.clickItem(rowItem, sectionId)}>
            <ItemRow rowItem = {rowItem}/>
        </TouchableOpacity>
    ;

    _renderSection = (section, sectionId)  => 
         <ItemSection section = {section}/>
    ;

    _headerOnClick = (sectionId)=> {
        this.state.dataTam[sectionId].header.status = !this.state.dataTam[sectionId].header.status;

    }

    //show indicator refresh ds 
    loading_view(style) {
        return  <View style={style}>
                <ActivityIndicator size="small" color="#00ff00" />
            </View>
    }

    // click refresh bottom right
    clickRefreshDsDay(){
        this.setState({
            load: true,
        })
        let that = this;
        setTimeout(
            function(){
                console.log('TOI Day')
                that.clickRefreshData();
        }, 2000);
    }

    //Tạo ds ngày theo vùng miền riêng
    getListDay_VungMien(value){
        var listDayTAM = [];
        if(value != 0){
            var date_vung_mien = new Date()
        var tmp_lottery_provinces = JSON.parse(JSON.stringify(lottery_provinces));
        console.log('NGAY DAU TIEN: ' + moment(date_vung_mien).format('YYYY-MM-DD'))
        console.log('Gia TRỊ dataSwitchKey: ' + JSON.stringify(dataSwitchKey))
        for (var i = 0 ; i < 20; i++){
            var test_date= moment(date_vung_mien).format('YYYY-MM-DD');
            var title = '';
            var title_screen_result = '';
            if(i == 0){
                title = 'Hôm nay';
            } else if (i == 1){
                title = 'Hôm qua';
            }
            var indexDay = date_vung_mien.getDay();
            title = title != '' ? title + ", " + getDayOfWeek(indexDay) + ", " + moment(date_vung_mien).format('DD/MM')
                : getDayOfWeek(indexDay) + ", " + moment(date_vung_mien).format('DD/MM');
            title_screen_result =  getDayOfWeek(indexDay) + ", " + moment(date_vung_mien).format('DD/MM/YYYY');
            var test_date= moment(date_vung_mien).format('YYYY-MM-DD');
            var check = false;
            for(var j=0;j< tmp_lottery_provinces.length;j++){
                if(indexDay == 0 && tmp_lottery_provinces[j].weekdays.indexOf(',1,') != -1 && tmp_lottery_provinces[j].area_id === value){
                    check = true;
                }else if(indexDay == 1 && tmp_lottery_provinces[j].weekdays.indexOf(',2,') != -1 && tmp_lottery_provinces[j].area_id === value){
                    check = true;
                }else if(indexDay == 2 && tmp_lottery_provinces[j].weekdays.indexOf(',3,') != -1 && tmp_lottery_provinces[j].area_id === value){
                    check = true;
                }else if(indexDay == 3 && tmp_lottery_provinces[j].weekdays.indexOf(',4,') != -1 && tmp_lottery_provinces[j].area_id === value){
                    check = true;
                }else if(indexDay == 4 && tmp_lottery_provinces[j].weekdays.indexOf(',5,') != -1 && tmp_lottery_provinces[j].area_id === value){
                    check = true;
                }else if(indexDay == 5 && tmp_lottery_provinces[j].weekdays.indexOf(',6,') != -1 && tmp_lottery_provinces[j].area_id === value){
                    check = true;
                }else if(indexDay == 6 && tmp_lottery_provinces[j].weekdays.indexOf(',7,') != -1 && tmp_lottery_provinces[j].area_id === value){
                    check = true;
                } 
                if(check == true){
                    check = false;
                    var obj = JSON.parse(JSON.stringify(tmp_lottery_provinces[j]));
                    obj.rd = test_date;
                    obj.title = title;
                    obj.title_screen_result = title_screen_result;
                    obj.status = false;
                    obj = pushPropsInItemOneRegion(obj);

                    listDayTAM.push(obj);
                }        
            }
            
            // set date trừ một ngày
            date_vung_mien.setDate(date_vung_mien.getDate() - 1);
        }
        }
        console.log('DS NGAY THEO MIEN: ' + JSON.stringify(listDayTAM) + "   ==== " + listDayTAM.length)
    
        return listDayTAM;
    }

    
    // Tạo ds ngày
    getListDay_(value){
        date_ = new Date()
        listDay = [];
        for (var i = 0 ; i < 20; i++){
            var title = '';
            var title_screen_result = '';
            if(i == 0){
                title = 'Hôm nay';
            } else if (i == 1){
                title = 'Hôm qua';
            }
           
            var item = {};
            var to_day = {};
            var indexDay = date_.getDay();
            title = title != '' ? title + ", " + getDayOfWeek(indexDay) + ", " + moment(date_).format('DD/MM')
                : getDayOfWeek(indexDay) + ", " + moment(date_).format('DD/MM');
            title_screen_result =  getDayOfWeek(indexDay) + ", " + moment(date_).format('DD/MM/YYYY');
            var test_date= moment(date_).format('YYYY-MM-DD');
            to_day.title = title;
            to_day.title_screen_result = title_screen_result;
            to_day.status = false;
            item.header = to_day;
            var member_= [];
            var tmp_lottery_provinces = JSON.parse(JSON.stringify(lottery_provinces));
            for(var j=0;j< tmp_lottery_provinces.length;j++){
                if(indexDay == 0 && tmp_lottery_provinces[j].weekdays.indexOf(',1,') != -1){
                    tmp_lottery_provinces[j].rd = test_date;
                    member_.push(tmp_lottery_provinces[j]);
                }else if(indexDay == 1 && tmp_lottery_provinces[j].weekdays.indexOf(',2,') != -1){
                    tmp_lottery_provinces[j].rd = test_date;
                    member_.push(tmp_lottery_provinces[j]);
                }else if(indexDay == 2 && tmp_lottery_provinces[j].weekdays.indexOf(',3,') != -1){
                    tmp_lottery_provinces[j].rd = test_date;
                    member_.push(tmp_lottery_provinces[j]);
                }else if(indexDay == 3 && tmp_lottery_provinces[j].weekdays.indexOf(',4,') != -1){
                    tmp_lottery_provinces[j].rd = test_date;
                    member_.push(tmp_lottery_provinces[j]);
                }else if(indexDay == 4 && tmp_lottery_provinces[j].weekdays.indexOf(',5,') != -1){
                    tmp_lottery_provinces[j].rd = test_date;
                    member_.push(tmp_lottery_provinces[j]);
                }else if(indexDay == 5 && tmp_lottery_provinces[j].weekdays.indexOf(',6,') != -1){
                    tmp_lottery_provinces[j].rd = test_date;
                    member_.push(tmp_lottery_provinces[j]);
                }else if(indexDay == 6 && tmp_lottery_provinces[j].weekdays.indexOf(',7,') != -1){
                    tmp_lottery_provinces[j].rd = test_date;
                    member_.push(tmp_lottery_provinces[j]);
                }         
            }
    
        
            // add ket qua dac biet
            member_ = pushPropsInItem(member_);
    
            var _ = require('underscore');
            var member = _.sortBy(member_, 'area_id');
            item.member = member;  
    
            listDay.push(item);
            // set date
            date_.setDate(date_.getDate() - 1);
        }
        if(value == true){
            this.setState({
                dataTam: listDay,
                load:false,
            })
        }
        console.log('DS NGAY: ' + JSON.stringify(listDay))
        console.log('DS NGAY1111: ' + JSON.stringify(tmp_lottery_provinces))
        return listDay;
    }  

    //hàm refresh
    refresh(){

    }

    //ham 10s goi api lay ket qua tu server
    refreshFromServer10s = ()=>{
        var dateCurrent = new Date();
        var paramsDateCurrent = moment(dateCurrent).format('YYYY-MM-DD');
        getDataFromServerTrucTiep(paramsDateCurrent).then((data_)=>{
            var dataLotteProvinces_ = data_;
            var jsonString = JSON.stringify(dataLotteProvinces_);
            console.log("API TRA VE KET QUA TU REQUEST SERVER 10s: " + JSON.stringify(dataLotteProvinces_));
            if(dataLotteProvinces_.length > 0){ // có kết quả thì xử lý
                this.progressDataQuayTrucTiep(dataLotteProvinces_);
            }
        }).catch((error) =>{

        });
    }

    //ham xu ly data khi quay truc tiep
    progressDataQuayTrucTiep(data){
        let checkDataFull = true;
        for(var i=0; i< data.length; i++){
            var date_quay = moment(data[i].rd).format('YYYYMMDD');
            var key = data[i].pc + '_' + date_quay;
            if(dataSwitchKey[key] === undefined || dataSwitchKey[key] === null){
                this.onNewLotteryToPlaySoundVibrate();
            }else {
                if(JSON.stringify(dataSwitchKey[key]) !== JSON.stringify(data[i])){
                    this.onNewLotteryToPlaySoundVibrate();
                }
            }
            dataSwitchKey[key] = data[i];
            if(data[i].s != '0'){
                checkDataFull = false;
            }
        } 
        dataSwitchKey_global.data = dataSwitchKey;
    
        if(GloblaValue.region_value === 0){
            this.getListDay_(true);
        }else{
            dataListDayTheoMien = this.getListDay_VungMien(GloblaValue.region_value)
            console.log('CO CHAY VAO LOAD LAI DU LIEU')
            this.setState({
                load: false,
            })
        }

    }

    //ham load lai data click refresh
    clickRefreshData = ()=>{
        var dateCurrent = new Date();
        dateCurrent.setDate(dateCurrent.getDate()-20);
        var paramsDateCurrent = moment(dateCurrent).format('YYYY-MM-DD');
        getDataFromServerTrucTiep(paramsDateCurrent).then((data_)=>{
            var dataLotteProvinces_ = data_;
            var jsonString = JSON.stringify(dataLotteProvinces_);
            console.log("API TRA VE KET QUA TU REQUEST SERVER 10s: " + JSON.stringify(dataLotteProvinces_));
            if(dataLotteProvinces_.length > 0){ // có kết quả thì xử lý
                this.progressDataClickRefresh(dataLotteProvinces_);
            }
        }).catch((error) =>{
            this.setState({
                load: false,
            })
            ToastAndroid.show('Tải dữ liệu bị lỗi, vui lòng kiểm tra kết nối mạng!', ToastAndroid.SHORT);
        });
    }

    //ham xu ly data khi click refresh
    progressDataClickRefresh(data){
        for(var i=0; i< data.length; i++){
            var date_quay = moment(data[i].rd).format('YYYYMMDD');
            var key = data[i].pc + '_' + date_quay;
            dataSwitchKey[key] = data[i];
        } 

        if(GloblaValue.region_value === 0){
            this.getListDay_(true);
        }else{
            dataListDayTheoMien = this.getListDay_VungMien(GloblaValue.region_value)
            this.setState({
                load: false,
            })
        }

        //thay doi global isRefresh de update màn kết quả
        GloblaValue.isRefresh = !GloblaValue.isRefresh;
    }

    //click ba cham goc phai
    clickBaChamGocPhai(){
        this.setState({
            showSetting: true,
        })
    }
    
    // hàm click item khi la ba mien
    clickItem(rowItem, sectionId){
        if(rowItem.code.length == 1){
            this.props.navigation.navigate('ResultLottery', {title: rowItem.name + " " + this.state.dataTam[sectionId].header.title_screen_result , 
            data_lottery: dataSwitchKey, row: rowItem})
        }else {
            this.props.navigation.navigate('ResultLottery2', {title: rowItem.name + " " + this.state.dataTam[sectionId].header.title_screen_result , 
            data_lottery: dataSwitchKey, row: rowItem})
        }
    }

    // hàm click item khi dang chon mot mien nao do
    clickItemTheoMien(item){
        if(item.code.length == 1){
            this.props.navigation.navigate('ResultLottery', {title: item.name + " " + item.title_screen_result , 
            data_lottery: dataSwitchKey, row: item})
        }else {
            this.props.navigation.navigate('ResultLottery2', {title: item.name + " " + item.title_screen_result , 
            data_lottery: dataSwitchKey, row: item})
        }
    }
}

// ham create key for item = code_ngay cho ds ket qua
function createKeyItem(data){
    var dataNew = {};
    for(var i=0; i< data.length; i++){
        var date_quay = moment(data[i].rd).format('YYYYMMDD');
        var key = data[i].pc + '_' + date_quay;
        dataNew[key] = data[i];
    } 
    return dataNew;
}

//hàm push giải đặc biệt vào item trong trường hợp một miền nào đó được chọn
function pushPropsInItemOneRegion(obj){
        var mang_kq = [];
        var status_kq = '';
        for(var k=0; k< obj.code.length; k++){
            var key = obj.code[k] + "_" + moment(obj.rd).format('YYYYMMDD');
            if(dataSwitchKey[key]!=null){
                var kq_ = (dataSwitchKey[key].s1?dataSwitchKey[key].s1: "");
                    kq_ = kq_ + (dataSwitchKey[key].s2?dataSwitchKey[key].s2: "");
                    status_kq = dataSwitchKey[key].s;
                    if(kq_ != ''){
                        mang_kq.push(kq_);    
                    }else {
                        mang_kq.push('');
                    }

            }else{
                mang_kq.push('');
            }
        }
        obj.status_kq = status_kq;
        obj.mang_kq = mang_kq;
    return obj;
}

// ham push giai dac biet vao item
function pushPropsInItem(member_){
    for (var i = 0; i< member_.length; i++){
        var mang_kq = [];
        var status_kq = '';
        for(var k=0; k< member_[i].code.length; k++){
            var key = member_[i].code[k] + "_" + moment(member_[i].rd).format('YYYYMMDD');
            if(dataSwitchKey[key]!=null){
                var kq_ = (dataSwitchKey[key].s1?dataSwitchKey[key].s1: "");
                    kq_ = kq_ + (dataSwitchKey[key].s2?dataSwitchKey[key].s2: "");
                    status_kq = dataSwitchKey[key].s;
                    if(kq_ != ''){
                        mang_kq.push(kq_);    
                    }else {
                        mang_kq.push('');   
                    }

            }else{
                mang_kq.push('');
            }
        }
        member_[i].status_kq = status_kq;
        member_[i].mang_kq = mang_kq;
    }
    return member_;
}

// tra ve ngay
function getDayOfWeek(value){
    switch (value){
        case 0:
        return 'Chủ Nhật';
        case 1:
        return 'Thứ Hai';
        case 2:
        return 'Thứ Ba';
        case 3:
        return 'Thứ Tư';
        case 4:
        return 'Thứ Năm';
        case 5:
        return 'Thứ Sáu';
        case 6:
        return 'Thứ Bảy';
        default:
        return '';
    }
}


var style = StyleSheet.create({
    header_style: {
        width: '100%',
        height: 50,
        backgroundColor: '#3F51B5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    container_option:{
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    text_title:{
        flex:1,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    text_title_1:{
        paddingHorizontal: 10,
        width: '100%', 
        textAlign: 'center', 
        color: '#0174DF',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    item_option:{
        width: widthScreen/4.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    load_more: {
        width: '100%',
        height: 30,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
      }
});