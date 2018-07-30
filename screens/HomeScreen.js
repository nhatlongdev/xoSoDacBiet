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
import moment from 'moment';
// import {getDataFromServer} from '../networking/Server';
import {createArrPushInItem} from '../components/CreateArrPushInItem';
import TreeView from '@zaguini/react-native-tree-view';
// ham goi api lay ket qua tu server
import {getDataFromServer} from '../networking/Server';
import {getDataFromServerTrucTiep} from '../networking/Server';
import dataSwitchKey_global from '../components/DataLotterySwitchKey_Global';
import dataLoadingServer_global from '../components/DataLottery_loading_server';
import Thongke from '../components/Thongke';

//import data lottery
import GloblaValue from '../components/GlobalValue';

//import color, string
import Color from '../src/color';
import _string from '../src/string';

//PushNotification
import PushNotification from 'react-native-push-notification';

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

//thoi gian bat dau quay, thoi gian dung quay
var dateTimeBatDauQuay;
var dateTimeDungQuay;

var kq_mb_hom_nay = {};
const key = 0;

//data list ngay theo mien
var dataListDayTheoMien;
//msg notification
var contentNotifi='aloalo';

//Gia tri vung mien duoc chon luu tam de so sanh xem co thay doi ko
var region_save_tam = 0;
export default class HomeScreen extends Component {

    // Contructor
    constructor(props){
        super(props);
        //Gia tri vung mien duoc chon luu tam de so sanh xem co thay doi ko
        region_save_tam = GloblaValue.region_value;

        // lấy ds kết quả chuyển từ màn splash sang
        dataLoadingToServer = GloblaValue.data_lottery;
        
        //save cache
        if(GloblaValue.status_net == true){
            this.saveKey(JSON.stringify(dataLoadingToServer));
        }

        // lay ds ngay theo mien
        dataListDayTheoMien = this.getListDay_VungMien(GloblaValue.region_value);

        // Chuyển đổi kết quả về dạng key - value (key moi item la--> mã tỉnh_ngày)
        // goi ham chuyen doi key
        dataSwitchKey =  createKeyItem(dataLoadingToServer);
        dataSwitchKey_global.data = createKeyItem(dataLoadingToServer);

        // console.log("pppppppppppppppppCHECK KET QUA TU PLAST SANG"+ JSON.stringify(dataLoadingToServer));
        this.state = {
            dataTam: this.getListDay_(false),
            load: false,
            showProgress_: true,
            showSetting: false,
            changeRegions:0,
            appState: AppState.currentState
        };
        // Tao mảng danh sách ngày cho listView
       
        // Tao mảng phuc vu viec thong ke, tra cuu
        dataWithProvinces = createArrPushInItem(dataLoadingToServer);
        console.log('BBBBB===>>>' + JSON.stringify(dataWithProvinces))
        
        //set ngày hiện tại theo giờ
        dateTimeBatDauQuay = moment(moment().format('YYYY-MM-DD') + ' 06:19'); //.format('YYYY/MM/DD HH:mm:ss')
        dateTimeDungQuay = moment(moment().format('YYYY-MM-DD' + ' 18:40'));

        setInterval(()=>{
            console.log("INTERVAL HOME=====>>>");
            this.alarmNotifi();
            var timeCurrent = moment();
            if(timeCurrent>= dateTimeBatDauQuay && timeCurrent< dateTimeDungQuay){
                // đến khung giờ quay trực tiếp thì 10s request server một lần lấy kết quả
                this.refreshFromServer10s();
            }  
        },10000)

        // tam thoi chua nghi ra giai phap nen dung interval
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
                this.setState({
                    changeRegions:GloblaValue.region_value,
                 })
                 
             }
        },1000)
    }

    //save cache
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

    componentWillMount() {
        this.getKey();
        AppState.removeEventListener('change', this._handleAppStateChange);
        // this.alarmNotifi();
    }

    componentDidMount(){
        handleAndroidBackButton(exitAlert);
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground!')
        }else {
            console.log('App has come to the Background!')
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
        return(
            <View style = {{flex: 1, backgroundColor: 'white'}}>
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

                        <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('By_Day_Screen',{data: dataLoadingToServer, data_lottery: dataSwitchKey})}}>
                            <View style = {{width: 50, height: 50, borderRadius:  50/2, backgroundColor: 'green',justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'md-calendar'} style = {{fontSize: 40, color: 'white'}}/>
                            </View>
                            <Text style= {{color: 'black'}}>Theo ngày</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('Comunity_Screen')}}>
                            <View style = {{width: 50, height: 50, borderRadius:  50/2, backgroundColor: 'green',justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'md-star'} style = {{fontSize: 40, color: 'white'}}/>
                            </View>
                            <Text style= {{color: 'black'}}>Cộng đồng</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('Regions_Screen', {listenRegions:this.listenChangeRegions.bind(this)})}}>
                            <View style = {{width: 50, height: 50, borderRadius:  50/2, backgroundColor: 'green',justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'md-compass'} style = {{fontSize: 40, color: 'white'}}/>
                            </View>
                            <Text style= {{color: 'black'}}>Vùng miền</Text>
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
                if(GloblaValue.region_value === 0){
                    that.getListDay_(true);
                }else{
                    dataListDayTheoMien = that.getListDay_VungMien(GloblaValue.region_value)
                    that.setState({
                        load: false,
                    })
                }
        }, 2000);
    }

    //Tạo ds ngày theo vùng miền riêng
    getListDay_VungMien(value){
        var listDayTAM = [];
        if(value != 0){
            var date_vung_mien = new Date()
        var tmp_lottery_provinces = JSON.parse(JSON.stringify(lottery_provinces));
        console.log('NGAY DAU TIEN: ' + moment(date_vung_mien).format('YYYY-MM-DD'))
        console.log('Gia TRỊ tmp_lottery_provinces: ' + JSON.stringify(tmp_lottery_provinces))
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
        for(var i=0; i< data.length; i++){
            var date_quay = moment(data[i].rd).format('YYYYMMDD');
            var key = data[i].pc + '_' + date_quay;
            dataSwitchKey[key] = data[i];
        } 
        this.setState({
            load: true,
        })
        let that = this;
        setTimeout(
            function(){
                if(GloblaValue.region_value === 0){
                    that.getListDay_(true);
                }else{
                    dataListDayTheoMien = that.getListDay_VungMien(GloblaValue.region_value)
                    that.setState({
                        load: false,
                    })
                }
        }, 2000);
    }

    //click setting
    alarmNotifi(){
       5
        PushNotification.localNotification({
            foreground: true,
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            message: "My Notification Message", // (required)
            bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
            subText: contentNotifi, // (optional) default: none
        })
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
        width: widthScreen/5,
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