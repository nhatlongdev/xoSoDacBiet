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
    ActivityIndicator
} from 'react-native';
import OptionsHome from '../components/OptionsHome';
import listOptionHome from '../components/ListOptionHome';
import dataListDay from '../components/DataListDay';
import ItemSection from '../components/ItemSection';
import ItemRow from '../components/ItemRow';
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
import dataLottery_global from '../components/DataLottery';
import Thongke from '../components/Thongke';



//import color, string
import Color from '../src/color';
import _string from '../src/string';

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
export default class HomeScreen extends Component {

    // Contructor
    constructor(props){
        super(props);
        // lấy ds kết quả chuyển từ màn splash sang
        dataLoadingToServer = this.props.navigation.state.params.data_lottery;
        console.log("pppppppppppppppppCHECK KET QUA TU PLAST SANG"+ JSON.stringify(dataLoadingToServer));
        this.state = {
            dataTam: [],
            load: false,
            showProgress_: true,
            showSetting: false,
        }

        // Tao mảng danh sách ngày cho listView
       
        // Tao mảng phuc vu viec thong ke, tra cuu
        dataWithProvinces = createArrPushInItem(dataLoadingToServer);
        
    // Chuyển đổi kết quả về dạng key - value (key moi item la--> mã tỉnh_ngày)
    // goi ham chuyen doi key
      dataSwitchKey =  createKeyItem(dataLoadingToServer);

        //set ngày hiện tại theo giờ
        dateTimeBatDauQuay = moment(moment().format('YYYY-MM-DD') + ' 16:15'); //.format('YYYY/MM/DD HH:mm:ss')
        dateTimeDungQuay = moment(moment().format('YYYY-MM-DD' + ' 18:40'));
       
        setInterval(()=>{
            console.log("INTERVAL HOME");
            var timeCurrent = moment();
            if(timeCurrent>= dateTimeBatDauQuay && timeCurrent< dateTimeDungQuay){
                // đến khung giờ quay trực tiếp thì 10s request server một lần lấy kết quả
                this.refreshFromServer10s();
            }  
        },10000)

    }

    componentWillMount() {
        this.getListDay_tam(dateTam, countLoadmore, 40);
        this.setTimeShowProgress();
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
                    <Text style = {style.text_title}>Xổ số 98 - Trực tiếp</Text>
                    <TouchableOpacity onPress = {()=>{this.clickBaChamGocPhai()}}>
                        <Image
                            source = {require('../images/dots_vertical.png')}
                        />
                    </TouchableOpacity>
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

                        <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('By_Day_Screen',{data: dataLoadingToServer})}}>
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

                        <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('Regions_Screen')}}>
                            <View style = {{width: 50, height: 50, borderRadius:  50/2, backgroundColor: 'green',justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'md-compass'} style = {{fontSize: 40, color: 'white'}}/>
                            </View>
                            <Text style= {{color: 'black'}}>Vùng miền</Text>
                        </TouchableOpacity>

                   </ScrollView>
                </View>

                <Text style = {style.text_title_1}>{_string.msg_danh_sach_ket_qua_moi_nhat}</Text>

                <View style = {style.content}>
                    <FlatList
                        data = {this.state.dataTam}
                        renderItem = {this.renderItem}
                        onEndReachedThreshold = {0.2}
                        onEndReached = {this.loadMoreData.bind(this)}
                        keyExtractor={item => JSON.stringify(++key)}
                    />

                    <ProgressReact show={this.state.showProgress_}/>
                </View>

                {this.state.load && this.loading_view(style.load_more)}

                <FloatButtonCompoment
                    onButtonFloatPress={this.onButtonFloatPress.bind(this)}
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

    // set time out cho  progress
    setTimeShowProgress(){
        setTimeout(() => {
           this.setState({
            showProgress_: false,
           })
        }, 10000);
    }
    
    // hiện load more khi kéo lên
    loading_view(style) {
        return  <View style={style}>
                <ActivityIndicator size="small" color="#00ff00" />
            </View>
    }

    // item flatlist ==== treeView
    renderItem = ({ item }) => (
        <TreeView
            collapsedItemHeight = {30}
            data={item.array}
            renderItem={(item) => (
            <View style = {{justifyContent: 'center'}}> 
                {
                    item.collapsed !== null ?
                    <View style = {{flexDirection: 'row', alignItems: 'center', marginLeft: 5}}>
                         <Icon style = {{color:item.collapsed ? Color.black: Color.blue}} name = {item.collapsed ? 'ios-arrow-down' : 'ios-arrow-up'}/>
                         <Text style = {{marginLeft: 5, color:item.collapsed ?Color.black : Color.blue, fontSize: 20}}>{`${item.title}`}</Text>
                    </View>
                     :
                    <TouchableOpacity onPress = {()=>this.clickItem(item)}>            
                        <Text style = {{marginLeft: 30, color: '#000044', fontSize: 20, marginVertical: 5}}>{item.text_show}</Text>
                    </TouchableOpacity>
                }
                <View style = {{backgroundColor: '#000044', height: 1}}></View>
            </View>
            )}
        />
      )

    // hàm tạo danh sách dữ liệu ngày
    getListDay_tam(date, countLoadmore, size){
        for (var i = countLoadmore ; i < countLoadmore + 40; i++){
            var title = '';
            var title_screen_result = '';
            if(i == 0){
                title = 'Hôm nay';
            } else if (i == 1){
                title = 'Hôm qua';
            }
            var item = {};
            item.id = i;
            var array = [];
            var to_day = {};
            var indexDay = dateTam.getDay();
            title = title != '' ? title + ", " + getDayOfWeek(indexDay) + ", " + moment(dateTam).format('DD/MM')
                : getDayOfWeek(indexDay) + ", " + moment(dateTam).format('DD/MM');
            title_screen_result =  getDayOfWeek(indexDay) + ", " + moment(dateTam).format('DD/MM/YYYY');
            var test_date= moment(dateTam).format('YYYY-MM-DD');
            to_day.id = i;
            to_day.title = title;
            to_day.title_screen_result = title_screen_result;
            to_day.status = false;
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
            to_day.children = member;  
            array.push(to_day);
            item.array = array;
            listDayTam.push(item);
            // set date
            dateTam.setDate(dateTam.getDate() - 1);
        }
        this.setState({
            load: false,
            dataTam: listDayTam
        });
    }  

    // ham load dữ liệu  
    loadMoreData(){
        this.setState({ load: true });
        countLoadmore = countLoadmore + 40;
        setTimeout(() => {
            this.getListDay_tam(dateTam, countLoadmore, 40);
        }, 1000);
    }  

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

    }

    onButtonFloatPress() {
        listDayTam = [];
        this.setState({ load: true });
        dateTam = new Date();
        countLoadmore = 0;
        setTimeout(() => {
            this.getListDay_tam(dateTam, countLoadmore, 40);
        }, 2000);
    }

    //click setting
    onClickSetting(){
        alert(123)
    }

    //click ba cham goc phai
    clickBaChamGocPhai(){
        this.setState({
            showSetting: true,
        })
    }
    
    clickItem(item){
        if(item.code.length == 1){
            this.props.navigation.navigate('ResultLottery', {title: item.text_show , 
            data_lottery: dataSwitchKey, row: item})
        }else {
            this.props.navigation.navigate('ResultLottery2', {title: item.text_show , 
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

// Tao danh sach ngay


// ham push giai dac biet vao item
function pushPropsInItem(member_){
    for (var i = 0; i< member_.length; i++){
        var mang_kq = [];
        var status_kq = '';
        var text_show = '';
        if(member_[i].area_id == 1){
            text_show = 'Miền Bắc';
        }else if(member_[i].area_id == 2){
            text_show = 'Miền Trung:';
        }else{
            text_show = 'Miền Nam:';
        }
        for(var k=0; k< member_[i].code.length; k++){
            var check = false;
            var checkStatus = 2;
            for(var j=0;j< dataLoadingToServer.length; j++){
                if(member_[i].code[k] == dataLoadingToServer[j].pc && member_[i].rd == dataLoadingToServer[j].rd){
                    check = true;
                    checkStatus = dataLoadingToServer[j].s;
                    var kq_ = (dataLoadingToServer[j].s1?dataLoadingToServer[j].s1: "");
                    kq_ = kq_ + (dataLoadingToServer[j].s2?dataLoadingToServer[j].s2: "");
                    status_kq = dataLoadingToServer[j].s;
                    mang_kq.push(kq_);
                    if(member_[i].area_id == 1){
                        if(checkStatus == 0){
                            text_show = text_show + '(' + kq_ + ')'; 
                        }else {
                            text_show = text_show + '(Đang quay)';
                        }
                    }else{
                        if(checkStatus == 0){
                            text_show = text_show + ' ' + member_[i].name[k] + '(' + kq_ + ')';  
                        }else {
                            text_show = text_show + ' ' + member_[i].name[k] + '(Đang quay)'; 
                        }
                    }
                }
            }

            if(check == false){
                if(member_[i].area_id == 1){
                    text_show = "Miền Bắc (quay lúc 18h15')";
                }else {
                    if(k == 0){
                        text_show = text_show + ' ' + member_[i].name[k];          
                    }else if(k == member_[i].code.length - 1){
                        if(member_[i].area_id == 2){
                            text_show = text_show + ' - ' + member_[i].name[k] + " (quay lúc 17h15')";
                        }else {
                            text_show = text_show + ' - ' + member_[i].name[k] + " (quay lúc 16h15')";
                        }  
                    }else {
                        text_show = text_show + ' - ' + member_[i].name[k];
                    }
                }
            }
            
        }
        member_[i].text_show = text_show;
        member_[i].status_kq = status_kq;
        member_[i].mang_kq = mang_kq;
    }
    return member_;
}

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
        width: widthScreen,
        flex: heightScreen*0.7/100,
        backgroundColor: '#3F51B5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    container_option:{
        flex: heightScreen*1.5/100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: heightScreen*7/100,
    },
    text_title:{
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    text_title_1:{
        width: widthScreen, 
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