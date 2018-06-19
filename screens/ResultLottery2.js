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
import {setItemRowDrag} from '../components/SetItemRowDrag';


var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
var dataLottery;
var rowItem;
var mang_kq_tong = {};
var rowItem;
var dataLottery;
var date_row;
var checkRowItemIsCurrent = false;
var checkDataNotNull = false;
export default class ResultLottery2 extends Component {

    // ham format result lottery  
    formatLottery(rowItem, dataLottery){
        checkDataNotNull = false;
        for (var i = 0; i< rowItem.code.length; i++){
           for(var j=0;j<dataLottery.length; j++){
               if(rowItem.code[i] == dataLottery[j].pc && rowItem.rd == dataLottery[j].rd){
                    checkDataNotNull = true;
                    var obj_cli={};

                    var key_push = (rowItem.code[i]);
                    var title_kq = dataLottery[j].pc + dataLottery[j].rd;
                    var obdb = {}, ob1 = {}, ob2 = {}, ob3 = {}, ob4 = {}, ob5 = {}, ob6 = {}, ob7 = {};
                    obdb.title = 'ĐB'; ob1.title = 'G.1'; ob2.title = 'G.2'; ob3.title = 'G.3'; ob4.title = 'G.4'; ob5.title = 'G.5'; ob6.title = 'G.6'; ob7.title = 'G.7'; 
                    var s1s2 = (dataLottery[j].s1? dataLottery[j].s1 :dataLottery[j].s2);
                    var arr_kqdb = s1s2.split(' - ');
                    obdb.arr_kqdb = arr_kqdb;
                    obj_cli.db = obdb;
        
                    var kq1_string = dataLottery[j].p1;
                    var arr_kq1 = kq1_string.split(' - ');
                    ob1.arr_kq1 = arr_kq1;
                    var mang_loto1 = arr_kqdb.concat(arr_kq1);
                    obj_cli.g1 = ob1;
        
                    var kq2_string = dataLottery[j].p2;
                    var arr_kq2 = kq2_string.split(' - ');
                    ob2.arr_kq2 = arr_kq2;
                    var mang_loto2 = mang_loto1.concat(arr_kq2);
                    obj_cli.g2 = ob2;
        
                    var kq3_string = dataLottery[j].p3;
                    var arr_kq3 = kq3_string.split(' - ');
                    ob3.arr_kq3 = arr_kq3;
                    var mang_loto3 = mang_loto2.concat(arr_kq3);
                    obj_cli.g3 = ob3;
        
                    var kq4_string = dataLottery[j].p4;
                    var arr_kq4 = kq4_string.split(' - ');
                    ob4.arr_kq4 = arr_kq4;
                    var mang_loto4 = mang_loto3.concat(arr_kq4);
                    obj_cli.g4 = ob4;
        
                    var kq5_string = dataLottery[j].p5;
                    var arr_kq5 = kq5_string.split(' - ');
                    ob5.arr_kq5 = arr_kq5;
                    var mang_loto5 = mang_loto4.concat(arr_kq5);
                    obj_cli.g5 = ob5;
        
                    var kq6_string = dataLottery[j].p6;
                    var arr_kq6 = kq6_string.split(' - ');
                    ob6.arr_kq6 = arr_kq6;
                    var mang_loto6 = mang_loto5.concat(arr_kq6);
                    obj_cli.g6 = ob6;
        
                    var kq7_string = dataLottery[j].p7;
                    var arr_kq7 = kq7_string.split(' - ');
                    ob7.arr_kq7 = arr_kq7;
                    var mang_loto7 = mang_loto6.concat(arr_kq7);
                    obj_cli.g7 = ob7;
                    obj_cli.mang_loto7 = mang_loto7;
                    mang_kq_tong[key_push] = obj_cli;
               }
           }
        }
        var checkobj = JSON.stringify(mang_kq_tong);
                    console.log("GIa Tri OBJ cli TOng: ===>>>" + checkobj);
        if(checkDataNotNull == false){
            rowItem = setItemRowDrag(rowItem, date_row, 0);
            checkRowItemIsCurrent = true;
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

    setTitle(rowItem, _date){
        var indexDay = _date.getDay();
        var title_result =  '';
        if(rowItem.area_id == 1){
            title_result = 'Miền Bắc - ';
        }else if(rowItem.area_id == 2){
            title_result = 'Miền Trung - ';
        }else{
            title_result = 'Miền Nam - ';
        }
        title_result = title_result + getDayOfWeek(indexDay) +  ", " + moment(_date).format('DD/MM/YYYY');
        return title_result;
    }

    //set title hom nay
    setTitleToday(value){
        var date_current = new Date();
        var str = '';
        var indexDay = date_current.getDay();
        var time = '';
        if(value == 2){
            str = 'Miền Trung - Hôm nay, ';
            time = "(quay lúc 17h 10')";
        }else if(value == 3){
            str = 'Miền Nam - Hôm nay, ';
            time = "(quay lúc 16h 10')";
        }
        
        str = str + getDayOfWeek(indexDay) +  ", " + moment(date_current).format('DD/MM/YYYY') + time;
        return str;
    }

    constructor(props) {
        super(props);
        this.state = {
            drag_left: true,
          };
          dataLottery = this.props.navigation.state.params.data_lottery;
          var rowItem_source = this.props.navigation.state.params.row;
          rowItem = JSON.parse(JSON.stringify(rowItem_source));
          date_row = new Date(rowItem.rd);
          if(rowItem.status_kq == ''){
              rowItem = setItemRowDrag(rowItem, date_row,0);
              this.formatLottery(rowItem, dataLottery);
              checkRowItemIsCurrent = true;
          }else{
              this.formatLottery(rowItem, dataLottery);
          }
      }
    
      onSwipeUp(gestureState) {
        // this.setState({myText: 'You swiped up!'});
      }
    
      onSwipeDown(gestureState) {
        // this.setState({myText: 'You swiped down!'});
      }
    
      onSwipeLeft(gestureState) {
        rowItem = setItemRowDrag(rowItem, date_row, 1);
        date_row = new Date(rowItem.rd); 
        this.formatLottery(rowItem, dataLottery);
      }
    
      onSwipeRight(gestureState) {
        rowItem = setItemRowDrag(rowItem, date_row, 0);
        checkRowItemIsCurrent = false; 
        date_row = new Date(rowItem.rd); 
        rowItem.status_kq = '0';
        this.formatLottery(rowItem, dataLottery);
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
        var objResult_1 = mang_kq_tong[rowItem.code[0]]; 
        var objResult_2 = mang_kq_tong[rowItem.code[1]]; 
        var objResult_3 = {};
        var objResult_4 = {};
        if (rowItem.code.length >= 3){
            objResult_3  = mang_kq_tong[rowItem.code[2]];
        }
        if (rowItem.code.length == 4){
            objResult_4  = mang_kq_tong[rowItem.code[3]];
        }
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
                    <Text style = {{textAlign: 'center', width: widthScreen, color: 'black', padding: checkRowItemIsCurrent == true? 10 : 0, fontSize: 16}}>
                        {checkRowItemIsCurrent == true? this.setTitleToday(rowItem.area_id == 2?2:3) : ''}
                    </Text>
                    <Text style = {{textAlign: 'center', width: widthScreen, color: 'black', padding: 10, fontSize: 16}}>{this.setTitle(rowItem, date_row)}</Text>
                    <View style = {{flex: 1, backgroundColor: 'grey', marginHorizontal: 2}}>

                        <View style = {style.row_result_title}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5 ,
                                textAlign: 'center', color: 'white', fontWeight: 'bold',fontSize: 16, backgroundColor: 'red', marginRight: 1,}}>Giải</Text>
                            
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red', marginRight: 1,}}>
                                {rowItem.name[0]}
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red', marginRight: 1,}}>
                                {rowItem.name[1]}
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red', marginRight: rowItem.code.length == 4? 1 : 0,}}>
                                {rowItem.code.length >= 3? rowItem.name[2] : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red'}}>
                                {rowItem.code.length == 4? rowItem.name[3] : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>{objResult_1.g7.title}</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_1.g7.arr_kq7)}
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_2.g7.arr_kq7)}
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3?  this.margeArrToString(objResult_3.g7.arr_kq7) : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.margeArrToString(objResult_4.g7.arr_kq7) : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>{objResult_1.g6.title}</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_1.g6.arr_kq6)}
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_2.g6.arr_kq6)}
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3?  this.margeArrToString(objResult_3.g6.arr_kq6) : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.margeArrToString(objResult_4.g6.arr_kq6) : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>{objResult_1.g5.title}</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_1.g5.arr_kq5)}
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_2.g5.arr_kq5)}
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3?  this.margeArrToString(objResult_3.g5.arr_kq5) : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.margeArrToString(objResult_4.g5.arr_kq5) : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>{objResult_1.g4.title}</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_1.g4.arr_kq4)}
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_2.g4.arr_kq4)}
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3?  this.margeArrToString(objResult_3.g4.arr_kq4) : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.margeArrToString(objResult_4.g4.arr_kq4) : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>{objResult_1.g3.title}</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_1.g3.arr_kq3)}
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_2.g3.arr_kq3)}
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3?  this.margeArrToString(objResult_3.g3.arr_kq3) : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.margeArrToString(objResult_4.g3.arr_kq3) : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>{objResult_1.g2.title}</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_1.g2.arr_kq2)}
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_2.g2.arr_kq2)}
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3?  this.margeArrToString(objResult_3.g2.arr_kq2) : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.margeArrToString(objResult_4.g2.arr_kq2) : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>{objResult_1.g1.title}</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_1.g1.arr_kq1)}
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_2.g1.arr_kq1)}
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3?  this.margeArrToString(objResult_3.g1.arr_kq1) : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.margeArrToString(objResult_4.g1.arr_kq1) : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>{objResult_1.db.title}</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_1.db.arr_kqdb)}
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.margeArrToString(objResult_2.db.arr_kqdb)}
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3?  this.margeArrToString(objResult_3.db.arr_kqdb) : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.margeArrToString(objResult_4.db.arr_kqdb) : ''}
                            </Text>
                        </View>

                        <View style = {{flexDirection: 'row', height: 20, backgroundColor: 'yellow', alignItems: 'center', marginBottom: 2}}>
                           
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>Đầu</Text>
                           <Text style = {style.row_text_content_loto}>Đuôi</Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>0</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,0) + " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,0) + " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,0) + " " : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,0) + " " : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>1</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,1)+ " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,1)+ " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,1)+ " " : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,1) + " " : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>2</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,2)+ " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,2)+ " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,2) + " ": ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,2) + " " : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>3</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,3)+ " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,3)+ " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,3) + " ": ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,3) + " " : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>4</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,4)+ " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,4)+ " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,4)+ " " : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,4) + " " : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>5</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,5)+ " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,5)+ " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,5)+ " " : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,5) + " " : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>6</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,6)+ " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,6)+ " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,6) + " ": ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,6) + " " : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>7</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,7)+ " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,7)+ " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,7) + " ": ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,7) + " " : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>8</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,8)+ " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,8)+ " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,8)+ " " : ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,8) + " " : ''}
                            </Text>
                        </View>

                        <View style = {style.row_result}>
                            <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'white', 
                                fontWeight: 'bold',fontSize: 16, marginRight: 1}}>9</Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_1.mang_loto7,9)+ " "}   
                            </Text>
                            <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                {this.filterNumber(objResult_2.mang_loto7,9)+ " "} 
                            </Text>
                            <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length >= 3? this.filterNumber(objResult_3.mang_loto7,9) + " ": ''}
                            </Text>
                            <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                color: 'white', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                {rowItem.code.length == 4?  this.filterNumber(objResult_4.mang_loto7,9) + " " : ''}
                            </Text>
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
        alert('doing....')
    }
}



var style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
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
    row_result:{
        flexDirection: 'row',
        backgroundColor: '#CC9900',
        alignItems: 'center',
        marginBottom: 1,
        borderColor: 'grey',
    },
    row_result_title:{
        flexDirection: 'row',
        backgroundColor: 'red',
        alignItems: 'center',
        marginBottom: 1,
        borderColor: 'grey',
    },
    row_loto: {
        flexDirection: 'row', 
        paddingVertical: 5, 
        paddingLeft: 5,
        backgroundColor: '#F6CECE', 
        alignItems: 'center', 
        marginBottom: 2
    },
    row_text_title_result: {
        textAlign: 'center', 
        color: 'red', 
        fontWeight: 'bold',
        marginRight: 10
    },
    row_text_content_result: {
        flex: 1, 
        fontSize: 16,
        textAlign: 'center', 
        color: 'black', 
        fontWeight: 'bold',
        

    },
    row_text_title_loto: {
        textAlign: 'center', 
        color: 'black', 
        fontWeight: 'bold'
    },
    row_text_content_loto: {
        flex: 1, 
        textAlign: 'center', 
        color: 'black', 
        fontWeight: 'bold'
    }
});