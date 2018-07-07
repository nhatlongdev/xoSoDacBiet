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
import moment from 'moment';
import {getDataFromServer} from '../networking/Server';
import {createArrPushInItem} from '../components/CreateArrPushInItem';
import TreeView from '@zaguini/react-native-tree-view';

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;

var listDay = [], listDayTam = [];
var date_ = new Date(), dateTam = new Date();
var lottery_provinces = require('../assets/lottery_provinces_.json');
var data , dataTam;
var dataLoadingToServer;
var dataWithProvinces = {};
export default class HomeScreen extends Component {

    constructor(props){
        super(props);
        dataLoadingToServer = this.props.navigation.state.params.data_lottery;
        data = getListDay_();
        dataTam = getListDay_tam(); 
        dataWithProvinces = createArrPushInItem(dataLoadingToServer);
       console.log("ppppppppppppppppp"+ JSON.stringify(dataWithProvinces));
       console.log("DataTAM===>>>"+ JSON.stringify(dataTam));
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
                    <Image
                        source = {require('../images/dots_vertical.png')}
                    />
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

                        <TouchableOpacity style = {style.item_option} onPress = {()=>{this.props.navigation.navigate('Statistical_Screen'
                                    , {data: dataWithProvinces})}}>
                            <View style = {{width: 50, height: 50, borderRadius:  50/2, backgroundColor: 'green',justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'home'} style = {{fontSize: 40, color: 'white'}}/>
                            </View>
                            <Text style= {{color: 'black'}}>Thống kê</Text>
                        </TouchableOpacity>

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

                <Text style = {style.text_title_1}>Danh sách kết quả xổ số mới nhất</Text>

                <View style = {style.content}>
                    <FlatList
                        data = {dataTam}
                        renderItem = {this.renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>

                <FloatButtonCompoment
                    onButtonFloatPress={this.onButtonFloatPress.bind(this)}
                />

            </View>

        );
    }

    renderItem = ({ item }) => (
        <TreeView
            data={item.array}
            renderItem={(item, level) => (
            <View>
                <Text
                style={{
                    marginLeft: 25 * level,
                }}
                >
                
                {
                    item.collapsed !== null ?
                    // `v ${item.title}`} ghi chu
                    <View style = {{flexDirection: 'row'}}>
                        <Text>{item.collapsed ? <Icon name = 'ios-arrow-up'/> : <Icon name = 'ios-arrow-down'/>} </Text> 
                        <Text>{item.title}</Text>
                    </View>:
                    <Text>{item.name[0]}</Text>
                }
                </Text>
            </View>
            )}
        />
      )

    refresh(){

    }

    _renderRow = (rowItem, rowId, sectionId) => 
    <TouchableOpacity onPress = {()=>{
        if(rowItem.code.length == 1){
            this.props.navigation.navigate('ResultLottery', {title: rowItem.name + " " + data[sectionId].header.title_screen_result, 
            data_lottery: dataLoadingToServer, row: rowItem, })
        }else {
            this.props.navigation.navigate('ResultLottery2', {title: rowItem.name + " " + data[sectionId].header.title_screen_result, 
            data_lottery: dataLoadingToServer, row: rowItem, })
        }
      }}
    >
        <ItemRow rowItem = {rowItem}/>
    </TouchableOpacity>
    ;

    _renderSection = (section, sectionId)  => 
    // <TouchableOpacity onPress = {()=>{alert(0123)}}>
         <ItemSection section = {section}/>
    // </TouchableOpacity>
    ;

    _headerOnClick = (sectionId)=> {
        console.log('Status: ' + typeof data[sectionId].header.status);
        console.log('Status222: ' + !data[sectionId].header.status);
        data[sectionId].header.status = !data[sectionId].header.status;
    }
    onButtonFloatPress() {
        alert("floatButton")
    }
}

function getListDay_(){
    for (var i = 0 ; i <= 15; i++){
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
    // var check_list_day = JSON.stringify(listDay);
    //     console.log('GIa tri list SHow: ' + check_list_day);
    return listDay;
}

// tam test
function getListDay_tam(){
    for (var i = 0 ; i <= 15; i++){
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
    // var check_list_day = JSON.stringify(listDay);
    //     console.log('GIa tri list SHow: ' + check_list_day);
    return listDayTam;
}

// ham push giai dac biet vao item
function pushPropsInItem(member_){
    for (var i = 0; i< member_.length; i++){
        var mang_kq = [];
        var status_kq = '';
        for(var k=0; k< member_[i].code.length; k++){
            for(var j=0;j< dataLoadingToServer.length; j++){
                if(member_[i].code[k] == dataLoadingToServer[j].pc && member_[i].rd == dataLoadingToServer[j].rd){
                    var kq_ = (dataLoadingToServer[j].s1?dataLoadingToServer[j].s1: "");
                    kq_ = kq_ + (dataLoadingToServer[j].s2?dataLoadingToServer[j].s2: "");
                    status_kq = dataLoadingToServer[j].s;
                    mang_kq.push(kq_);
                }
            }
        }
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
});