import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ScrollView
} from 'react-native';
import FloatButtonCompomentScreenResult from '../components/FloatButtonCompomentScreenResult';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import moment from 'moment';
import {getDayOfWeek} from '../components/GetDayOfWeek';

import {
    UIActivityIndicator,
  } from 'react-native-indicators';
import GloblaValue from '../components/GlobalValue';

import {
    GoogleAnalyticsTracker,
    GoogleAnalyticsSettings,
    GoogleTagManager
  } from "react-native-google-analytics-bridge";


var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
var rowItem;
var mang_kq_tong = {};
var rowItem;
var dataLottery;
var date_row;
var checkRowItemIsCurrent = false;
var checkDataNotNull = false;

//bien luu trang thai refresh khi app ->foreground
var isRefresh = false;
export default class ResultLotteryByDay extends Component {

    // hàm định đạng lại kết quả trả về ==> phục vụ cho việc hiển thị ra view  
    formatLottery(rowItem, dataLottery){
        var date_quay = moment(rowItem.rd).format('YYYYMMDD');
        var keyItem = rowItem.code + '_'+date_quay;
        console.log('rowItem: '+ JSON.stringify(rowItem))
        console.log('keyITem: '+ keyItem)
        console.log('dataLottery: ' + JSON.stringify(dataLottery))
        if(dataLottery[keyItem] != null){
            var lotteryItem = dataLottery[keyItem];
            console.log('lotteryItem: ' + JSON.stringify(lotteryItem))
            var obj_cli={};    
            var key_push = (rowItem.code);
            var title_kq = lotteryItem.pc + lotteryItem.rd;
            var obdb = {}, ob1 = {}, ob2 = {}, ob3 = {}, ob4 = {}, ob5 = {}, ob6 = {}, ob7 = {}, ob8 = {};
            obdb.title = 'ĐB'; ob1.title = 'G.1'; ob2.title = 'G.2'; ob3.title = 'G.3'; 
            ob4.title = 'G.4'; ob5.title = 'G.5'; ob6.title = 'G.6'; ob7.title = 'G.7';ob8.title = 'G.8'; 
            var arr_kqdb;
            if(rowItem.area_id === 1){
                arr_kqdb = lotteryItem.s1.split(' - ');
            }else {
                arr_kqdb = lotteryItem.s2.split(' - ');
            }
            obdb.arr_kqdb = arr_kqdb;
            obj_cli.db = obdb;

            var kq1_string = lotteryItem.p1;
            var arr_kq1 = kq1_string.split(' - ');
            ob1.arr_kq1 = arr_kq1;
            var mang_loto1 = arr_kqdb.concat(arr_kq1);
            obj_cli.g1 = ob1;

            var kq2_string = lotteryItem.p2;
            var arr_kq2 = kq2_string.split(' - ');
            ob2.arr_kq2 = arr_kq2;
            var mang_loto2 = mang_loto1.concat(arr_kq2);
            obj_cli.g2 = ob2;

            var kq3_string = lotteryItem.p3;
            var arr_kq3 = kq3_string.split(' - ');
            ob3.arr_kq3 = arr_kq3;
            var mang_loto3 = mang_loto2.concat(arr_kq3);
            obj_cli.g3 = ob3;

            var kq4_string = lotteryItem.p4;
            var arr_kq4 = kq4_string.split(' - ');
            ob4.arr_kq4 = arr_kq4;
            var mang_loto4 = mang_loto3.concat(arr_kq4);
            obj_cli.g4 = ob4;

            var kq5_string = lotteryItem.p5;
            var arr_kq5 = kq5_string.split(' - ');
            ob5.arr_kq5 = arr_kq5;
            var mang_loto5 = mang_loto4.concat(arr_kq5);
            obj_cli.g5 = ob5;

            var kq6_string = lotteryItem.p6;
            var arr_kq6 = kq6_string.split(' - ');
            ob6.arr_kq6 = arr_kq6;
            var mang_loto6 = mang_loto5.concat(arr_kq6);
            obj_cli.g6 = ob6;

            var kq7_string = lotteryItem.p7;
            var arr_kq7 = kq7_string.split(' - ');
            ob7.arr_kq7 = arr_kq7;
            var mang_loto_7 = mang_loto6.concat(arr_kq7);
            obj_cli.g7 = ob7;
            
            if(rowItem.area_id !== 1){
                var kq8_string = lotteryItem.p8;
                var arr_kq8 = kq8_string.split(' - ');
                ob8.arr_kq8 = arr_kq8;
                var mang_loto7 = mang_loto_7.concat(arr_kq8);
                obj_cli.g8 = ob8;
                obj_cli.mang_loto7 = mang_loto7;
            }else{
                obj_cli.mang_loto7 = mang_loto_7;
            }
            
            mang_kq_tong[key_push] = obj_cli;
            console.log('MANG KQ TONG: ' + JSON.stringify(mang_kq_tong))
        }        
    }

    // ham gop mang thanh text
    margeArrToString(arr){
        var str = '';
        for(var i=0; i< arr.length; i++){
            str == '' ? (str = str + arr[i]) : (str = str + " - " + arr[i]);
        }
        return str;
    }

    // ham for mangr lo to tim cac so theo dau duoi
    filterNumber(arr, number){
        var textShow = '';
        for(var i= 0; i< arr.length ; i++){
            var sub = arr[i].substr(arr[i].length -2,1);
            var sub_final = arr[i].substring(arr[i].length -1);
            if(sub == number){
                textShow == ''? (textShow = textShow + sub_final) : (textShow = textShow + ","+ sub_final);
            }
        }
        return textShow;
    }

    // hàm for mảng kết quả tìm đầu đuôi lô tô 1
    filterNumber1(arr, number){
        var textShow = '';
        for(var i= 0; i< arr.length ; i++){
            var sub = arr[i].substring(arr[i].length -1);
            var sub_final = arr[i].substr(arr[i].length -2,1);
            if(sub == number){
                textShow == ''? (textShow = textShow + sub_final) : (textShow = textShow + ","+ sub_final);
            }
        }
        return textShow;
    }

    // ham kiem tra xem obj da co trong mang ket qua chua
    checkObjData(rowItem, dataLottery){
        var date_quay = moment(rowItem.rd).format('YYYYMMDD');
        var keyItem = rowItem.code + '_'+date_quay;
        if(dataLottery[keyItem] !== null){
            return true;
        }else {
            return false;
        }
    }

    // ham kiem tra xem tat car cac giai da duoc quay xong chua
    checkObjDataComplete(rowItem, dataLottery){
        var date_quay = moment(rowItem.rd).format('YYYYMMDD');
        var keyItem = rowItem.code + '_'+ date_quay;
        if(dataLottery[keyItem] !== null && dataLottery[keyItem].s !== '0'){
            return true;
        }
        return false;
    }
    
    //set title
    setTitle(rowItem){
        // alert(JSON.stringify(rowItem) + " ------" + _date)
        let d = new Date(rowItem.rd);
        var indexDay = d.getDay();
        var title_result =  '';
        title_result = rowItem.name;
        title_result = title_result + " - " +  getDayOfWeek(indexDay) +  ", " + moment(d).format('DD/MM/YYYY');
        return title_result;
    }

    //set title hom nay
    setTitleToday(value){
        var date_current = new Date();
        var str = '';
        var indexDay = date_current.getDay();
        if(value == 1){
            str = 'Miền Bắc - Hôm nay, ';
        }
        str = str + getDayOfWeek(indexDay) +  ", " + moment(date_current).format('DD/MM/YYYY') + "(quay lúc 18h 10')";
        return str;
    }

    constructor(props) {
        super(props);
        this.state = {
          drag_left: true,
        };
        isRefresh = GloblaValue.isRefresh;
        dataLottery = this.props.navigation.state.params.data_lottery;
        var rowItem_source = this.props.navigation.state.params.row;
        rowItem = JSON.parse(JSON.stringify(rowItem_source));
        var convert = moment(rowItem.rd).format('YYYY/MM/DD');
        date_row = new Date(convert);
        this.formatLottery(rowItem, dataLottery);
      }
    
      componentWillMount(){
        setInterval(()=>{
            console.log("INTEVAL BEN RESUL CHAY");
            if(isRefresh != GloblaValue.isRefresh){
                isRefresh = GloblaValue.isRefresh;
                //nếu kq ngày hiện tại đã có (trực tiếp)
                if(this.checkObjData(rowItem, dataLottery) === true){
                    this.formatLottery(rowItem, dataLottery);
                    this.setState({
                        drag_left: !this.state.drag_left,
                    })
                }
            }
        },10000)
      }
    
      onSwipeUp(gestureState) {
        // this.setState({myText: 'You swiped up!'});
      }
    
      onSwipeDown(gestureState) {
        // this.setState({myText: 'You swiped down!'});
      }
    
      onSwipeLeft(gestureState) {
        
      }
    
      onSwipeRight(gestureState) {
        
      }
    
      onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
          case SWIPE_UP:
            // this.setState({backgroundColor: 'red'});
            break;
          case SWIPE_DOWN:
            // this.setState({backgroundColor: 'green'});
            break;
          case SWIPE_LEFT:
            // this.setState({backgroundColor: 'blue'});
            
            break;
          case SWIPE_RIGHT:
            // this.setState({backgroundColor: 'yellow'});
            
            break;
        }
      }

    render(){
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };
 
        var objResult = mang_kq_tong[rowItem.code];  

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
        tracker.trackScreenView("Result_Lottery");
        return(
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeDown={(state) => this.onSwipeDown(state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={{
                flex: 1,
                
                }}
                >
                
                <View style = {style.container}>
                    <View style = {style.header_style}>
                    <Text style = {style.text_style}>Kết quả xổ số</Text>
                    </View>
                    <ScrollView>
                    <View style = {{flex: 1}}>
                    <Text style = {{textAlign: 'center', width: '100%', color: 'black', padding: 10, fontSize: 16}}>{this.setTitle(rowItem)}</Text>
                    {
                        this.checkObjDataComplete(rowItem, dataLottery)==true?
                        <View style={{alignContent:'center'}}>
                            <Text style={{flex: 1, color:'red', textAlign:'center', marginBottom:10}}>Đang quay</Text>
                            <UIActivityIndicator style={{flex:1, paddingBottom: 1,}} size={15} color='blue' />
                        </View>
                        :null
                    }
                    <View style = {{flex: 1, backgroundColor: 'grey', marginHorizontal: 2, borderTopWidth:1, borderTopColor:'grey'}}>
                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.db.title}</Text>
                           <View style={{flex: 2,borderLeftWidth:1,borderLeftColor:'grey'}}>
                                <Text style = {[style.row_text_content_result,{color:'red'}]}>{objResult.db.arr_kqdb + " "}</Text>
                           </View>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g1.title}</Text>
                           <View style={{flex: 2,borderLeftWidth:1,borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g1.arr_kq1)+" "}</Text>
                           </View>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g2.title}</Text>
                           <View style={{flex: 2,borderLeftWidth:1,borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g2.arr_kq2)+" "}</Text>
                           </View>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g3.title}</Text>
                           <View style={{flex: 2,borderLeftWidth:1,borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g3.arr_kq3)+" "}</Text>
                           </View>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g4.title}</Text>
                           <View style={{flex: 2,borderLeftWidth:1,borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g4.arr_kq4)+" "}</Text>
                           </View>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g5.title}</Text>
                           <View style={{flex: 2,borderLeftWidth:1,borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g5.arr_kq5)+" "}</Text>
                           </View>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g6.title}</Text>
                           <View style={{flex: 2,borderLeftWidth:1,borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g6.arr_kq6)+" "}</Text>
                           </View>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g7.title}</Text>
                           <View style={{flex: 2,borderLeftWidth:1,borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g7.arr_kq7)+" "}</Text>
                           </View>
                        </View>

                        {
                            rowItem.area_id !== 1?
                            <View style = {style.row_result}>
                                <Text style = {style.row_text_title_result}>{objResult.g8.title}</Text>
                                <View style={{flex: 2,borderLeftWidth:1,borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g8.arr_kq8)+" "}</Text>
                                </View>
                            </View>
                            :null
                        }

                        <View style = {{flexDirection: 'row', height: 20, backgroundColor: 'yellow', alignItems: 'center', marginBottom: 2}}>
                           
                        </View>

                        <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                <Text style = {style.row_text_content_loto}>Đầu</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>Đuôi</Text>
                           </View >
                           <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>Đầu</Text>
                           </View>
                           <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>Đuôi</Text>
                           </View>                          
                        </View>

                        <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>0</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,0)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,0)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>0</Text>
                            </View>  
                        </View>

                       <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>1</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,1)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,1)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>1</Text>
                            </View>  
                        </View>

                        <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>2</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,2)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,2)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>2</Text>
                            </View>  
                        </View>

                        <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>3</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,3)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,3)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>3</Text>
                            </View>  
                        </View>

                        <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>4</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,4)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,4)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>4</Text>
                            </View>  
                        </View>

                        <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>5</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,5)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,5)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>5</Text>
                            </View>  
                        </View>

                        <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>6</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,6)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,6)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>6</Text>
                            </View>  
                        </View>

                        <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>7</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,7)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,7)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>7</Text>
                            </View>  
                        </View>

                        <View style = {style.row_loto}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>8</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,8)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,8)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>8</Text>
                            </View>  
                        </View>

                        <View style = {[style.row_loto,{marginBottom:10}]}>
                            <View style={{flex:1,paddingVertical:5}}>
                                    <Text style = {style.row_text_title_loto}>9</Text>
                            </View>
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                    <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,9)}</Text>
                            </View >
                            <View style={{flex:3,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_content_loto}>{this.filterNumber1(objResult.mang_loto7,9)}</Text>
                            </View>
                            <View style={{flex:1,paddingVertical:5, borderLeftWidth:1, borderLeftColor:'grey'}}>
                                <Text style = {style.row_text_title_loto}>9</Text>
                            </View>  
                        </View>
                    </View>
                    </View>
                    </ScrollView>
                    <FloatButtonCompomentScreenResult
                        onButtonFloatPressExit = {this.clickExit.bind(this)}
                        onButtonFloatPressRefresh = {this.clickRefresh.bind(this)}
                    />
                </View>
                
            </GestureRecognizer>
        );
    }

    clickExit(){
        this.props.navigation.goBack();
    }

    clickRefresh(){
        //nếu kq ngày hiện tại đã có (trực tiếp)
        if(this.checkObjData(rowItem, dataLottery) === true){
            this.formatLottery(rowItem, dataLottery);
            this.setState({
                drag_left: !this.state.drag_left,
            })
        }
    }


}



var style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
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
    row_result:{
        borderLeftWidth:1,
        borderLeftColor:'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        borderRightWidth: 1,
        borderRightColor: 'grey',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        marginBottom: 1,   
    },
    row_loto: {
        borderRightWidth:1,
        borderRightColor:'grey',
        borderLeftWidth:1,
        borderLeftColor:'grey',
        flexDirection: 'row',  
        backgroundColor: '#ffffff', 
        alignItems: 'center', 
        marginBottom: 2
    },
    row_text_title_result: {
        flex: 0.2,
        fontSize:16,
        textAlign: 'center', 
        color: 'black', 
        marginRight: 10,
        paddingHorizontal: 5,
    },
    row_text_content_result: { 
        flex:1,
        paddingVertical: 3 ,
        fontSize: 18,
        textAlign: 'center', 
        color: 'black', 
        fontWeight: 'bold',
    },
    row_text_title_loto: {
        flex:1,
        fontSize:16,
        textAlign: 'center', 
        color: 'black', 
    },
    row_text_content_loto: {
        flex: 3, 
        fontSize:18,
        textAlign: 'center', 
        color: 'black', 
        fontWeight: 'bold'
    }
});