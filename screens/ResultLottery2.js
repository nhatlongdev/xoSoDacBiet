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
import {
    UIActivityIndicator,
  } from 'react-native-indicators';

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
var dataLottery;
var rowItem;
var mang_kq_tong = {};
var rowItem;
var dataLottery;
var date_row;
//biến kiểm tra xem ngày đang xem có phải ngày hiện tại hay ko, true = ngày hiện tại, false = ngày khác
var checkRowItemIsCurrent = false;
var checkDataNotNull = false;

//thoi gian bat dau quay, thoi gian dung quay
var dateTimeBatDauQuay;
var dateTimeDungQuay;

// bien kiem tra truong hop hien ket qua hay an
var showResult = false;

export default class ResultLottery2 extends Component {

    // ham format result lottery  
    formatLottery(rowItem, dataLottery){
        checkDataNotNull = false;
        for (var i = 0; i< rowItem.code.length; i++){
            var date_quay = moment(rowItem.rd).format('YYYYMMDD');
            var keyItem = rowItem.code[i] + '_'+date_quay;
            if(dataLottery[keyItem] != null){
                checkDataNotNull = true;
                    var obj_cli={};

                    var key_push = (rowItem.code[i]);
                    var title_kq = dataLottery[keyItem].pc + dataLottery[keyItem].rd;
                    var obdb = {}, ob1 = {}, ob2 = {}, ob3 = {}, ob4 = {}, ob5 = {}, ob6 = {}, ob7 = {}; ob8 = {};
                    obdb.title = 'ĐB'; ob1.title = 'G.1'; ob2.title = 'G.2'; ob3.title = 'G.3'; ob4.title = 'G.4'; 
                    ob5.title = 'G.5'; ob6.title = 'G.6'; ob7.title = 'G.7'; ob8.title = 'G.8';
                    var s1s2 = (dataLottery[keyItem].s1? dataLottery[keyItem].s1 :dataLottery[keyItem].s2);
                    var arr_kqdb = s1s2.split(' - ');
                    obdb.arr_kqdb = arr_kqdb;
                    obj_cli.db = obdb;
        
                    var kq1_string = dataLottery[keyItem].p1;
                    var arr_kq1 = kq1_string.split(' - ');
                    ob1.arr_kq1 = arr_kq1;
                    var mang_loto1 = arr_kqdb.concat(arr_kq1);
                    obj_cli.g1 = ob1;
        
                    var kq2_string = dataLottery[keyItem].p2;
                    var arr_kq2 = kq2_string.split(' - ');
                    ob2.arr_kq2 = arr_kq2;
                    var mang_loto2 = mang_loto1.concat(arr_kq2);
                    obj_cli.g2 = ob2;
        
                    var kq3_string = dataLottery[keyItem].p3;
                    var arr_kq3 = kq3_string.split(' - ');
                    ob3.arr_kq3 = arr_kq3;
                    var mang_loto3 = mang_loto2.concat(arr_kq3);
                    obj_cli.g3 = ob3;
        
                    var kq4_string = dataLottery[keyItem].p4;
                    var arr_kq4 = kq4_string.split(' - ');
                    ob4.arr_kq4 = arr_kq4;
                    var mang_loto4 = mang_loto3.concat(arr_kq4);
                    obj_cli.g4 = ob4;
        
                    var kq5_string = dataLottery[keyItem].p5;
                    var arr_kq5 = kq5_string.split(' - ');
                    ob5.arr_kq5 = arr_kq5;
                    var mang_loto5 = mang_loto4.concat(arr_kq5);
                    obj_cli.g5 = ob5;
        
                    var kq6_string = dataLottery[keyItem].p6;
                    var arr_kq6 = kq6_string.split(' - ');
                    ob6.arr_kq6 = arr_kq6;
                    var mang_loto6 = mang_loto5.concat(arr_kq6);
                    obj_cli.g6 = ob6;
        
                    var kq7_string = dataLottery[keyItem].p7;
                    var arr_kq7 = kq7_string.split(' - ');
                    ob7.arr_kq7 = arr_kq7;
                    var mang_loto_7 = mang_loto6.concat(arr_kq7);
                    obj_cli.g7 = ob7;

                    var kq8_string = dataLottery[keyItem].p8;
                    var arr_kq8 = kq8_string.split(' - ');
                    ob8.arr_kq8 = arr_kq8;
                    var mang_loto7 = mang_loto_7.concat(arr_kq8);
                    obj_cli.g8 = ob8;
                    obj_cli.mang_loto7 = mang_loto7;

                    mang_kq_tong[key_push] = obj_cli;
            }
        }
        console.log('MANG KE: ' + JSON.stringify(mang_kq_tong));
        if(checkDataNotNull == false){
            rowItem = setItemRowDrag(rowItem, date_row, 0);
            checkRowItemIsCurrent = true;
        }

    }

    // ham gop mang thanh text
    margeArrToString(arr){
        var str = '';
        for(var i=0; i< arr.length; i++){
            if(arr[i] != ''){
                str == '' ? (str = str + arr[i]) : (str = str + " - " + arr[i]);
            } 
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

    // ham kiem tra xem obj da co trong mang ket qua chua
    checkObjData(rowItem, dataLottery){
        var date_quay = moment(rowItem.rd).format('YYYYMMDD');
        var check = false;
        console.log("ROW ITEMjjj: ===>>>" + JSON.stringify(rowItem));
        for(var i=0; i< rowItem.code.length; i++){
            var keyItem = rowItem.code[i] + '_'+date_quay;
            console.log("KEY: ===>>>" + keyItem);
            console.log("OBJ: ===>>>" + JSON.stringify(dataLottery[keyItem]));
            console.log("data: ===>>>" + JSON.stringify(dataLottery));
            if(dataLottery[keyItem] != null){
                check = true;
            }
        }
        if(check == false){
            return false;
        }else {
            return true;
        }
    }

     // ham kiem tra xem tat car cac giai da duoc quay xong chua
     checkObjDataComplete(rowItem, dataLottery){
        var date_quay = moment(rowItem.rd).format('YYYYMMDD');
        var check = false;
        console.log("ROW ITEMjjj: ===>>>" + JSON.stringify(rowItem));
        for(var i=0; i< rowItem.code.length; i++){
            var keyItem = rowItem.code[i] + '_'+date_quay;
            console.log("KEY: ===>>>" + keyItem);
            console.log("OBJ: ===>>>" + JSON.stringify(dataLottery[keyItem]));
            console.log("data: ===>>>" + JSON.stringify(dataLottery));
            if(dataLottery[keyItem] != null && dataLottery[keyItem].s != '0'){
                check = true;
            }
        }
        if(check == false){
            return false;
        }else {
            return true;
        }
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
            time = " (quay lúc 17h 15')";
        }else if(value == 3){
            str = 'Miền Nam - Hôm nay, ';
            time = " (quay lúc 16h 15')";
        }
        
        str = str + getDayOfWeek(indexDay) +  ", " + moment(date_current).format('DD/MM/YYYY') + time;
        return str;
    }

    constructor(props) {
        super(props);
        this.state = {
            drag_left: true,
            value_test: 0,
            // result: false
          };
          dataLottery = this.props.navigation.state.params.data_lottery;
          var rowItem_source = this.props.navigation.state.params.row;
          rowItem = JSON.parse(JSON.stringify(rowItem_source));
          console.log("GIa tri ROW ITEM LAY RA: " + JSON.stringify(rowItem));
          date_row = new Date(rowItem.rd);
          console.log("DATA2: ===>>>" + JSON.stringify(dataLottery));

          //set ngày hiện tại theo giờ
            dateTimeBatDauQuay = moment(moment().format('YYYY-MM-DD') + ' 16:10'); //.format('YYYY/MM/DD HH:mm:ss')
            dateTimeDungQuay = moment(moment().format('YYYY-MM-DD' + ' 18:40'));
      }

      componentWillMount(){
        if(this.checkObjData(rowItem, dataLottery) == false){ // nếu kết quả ngày hiện tại chưa có
            var timeCurrent = moment();
            // nếu trong khung giờ quay
            if(timeCurrent>= dateTimeBatDauQuay && timeCurrent< dateTimeDungQuay){
                console.log("CHay vao 1");
                showResult = false;
                if(rowItem.rd == moment().format('YYYY-MM-DD')){
                    checkRowItemIsCurrent = true;
                }else{
                    checkRowItemIsCurrent = false;
                }
            }else {
                if(rowItem.rd == moment().format('YYYY-MM-DD')){
                    checkRowItemIsCurrent = true;
                }else{
                    checkRowItemIsCurrent = false;
                }
                rowItem = setItemRowDrag(rowItem, date_row,0);
                if(this.checkObjData(rowItem, dataLottery) == true){
                    this.formatLottery(rowItem, dataLottery);
                    console.log("CHay vao 1");
                    showResult = true;
                }else {
                    showResult = false;
                }
            }
        }else{ // kết quả ngày hiện tại đã có
            console.log("CHay vao 3"+ JSON.stringify(rowItem));
            this.formatLottery(rowItem, dataLottery);
            showResult = true;
            checkRowItemIsCurrent = false;
        } 

        setInterval(()=>{
            console.log("INTEVAL BEN RESUL CHAY");
            if(moment() >= dateTimeBatDauQuay && moment() < dateTimeDungQuay){
                //kiểm tra nếu đang ở ngày hiện tại mà trong khung giờ quay mà đang hiện kq ngày hôm trước thì set lại rowItem
                console.log("INTEVAL BEN RESUL CHAY: TMDK KHUNG GIO QUAY" + checkRowItemIsCurrent + '   và  '+ showResult);
                console.log("HHHHHHHHHHHHHHHHHHH---->>>>>" + JSON.stringify(rowItem) + '   và  '+ moment().format('YYYY-MM-DD'));
                if(checkRowItemIsCurrent == true ||   rowItem.rd == moment().format('YYYY-MM-DD')){
                    console.log("INTEVAL BEN RESUL CHAY: TMDK NGAY HIEN TAI VA : " + showResult );
                    rowItem.rd = moment().format('YYYY-MM-DD');
                    date_row = new Date(rowItem.rd);
                    rowItem = setItemRowDrag(rowItem, date_row,2);
                    //nếu kq ngày hiện tại đã có (trực tiếp)
                    if(this.checkObjData(rowItem, dataLottery) == true){
                        checkRowItemIsCurrent = false;
                        this.formatLottery(rowItem, dataLottery);
                        showResult = true;
                    }else {
                        showResult = false;
                    }
                }
                this.setState({
                    value_test: 1,
                })
                } 
            },10000)
    }


    shouldComponentUpdate(){
        return true;
    }

    componentWillUpdate(){
      
      console.log("TIMER componentWillUpdate: " + JSON.stringify(rowItem));
    }

    componentDidUpdate(){
      console.log("TIMER componentDidUpdate: " + JSON.stringify(rowItem));
    }

      onSwipeUp(gestureState) {
        // this.setState({myText: 'You swiped up!'});
      }
    
      onSwipeDown(gestureState) {
        // this.setState({myText: 'You swiped down!'});
      }
    
      onSwipeLeft(gestureState) {
        if(rowItem.rd != moment().format('YYYY-MM-DD')){
            rowItem = setItemRowDrag(rowItem, date_row, 1);
            date_row = new Date(rowItem.rd); 
            if(this.checkObjData(rowItem, dataLottery) == true){
                this.formatLottery(rowItem, dataLottery);
                showResult = true;
            }else {
                var timeCurrent = moment();
                if(timeCurrent>= dateTimeBatDauQuay && timeCurrent< dateTimeDungQuay){
                    console.log('KEO TRAI TH DANG TRONG KG QUAY: ===>' + JSON.stringify(rowItem));
                    checkRowItemIsCurrent = true;
                    showResult = false;
                }else {
                    console.log('KEO TRAI TH DANG Ngoai khung gio quay: ===>' + JSON.stringify(rowItem));
                    if(rowItem.rd === moment().format('YYYY-MM-DD')){
                        console.log('KEO TRAI TH DANG TRONG KG QUAY: TMDK===>' + JSON.stringify(rowItem));
                        rowItem = setItemRowDrag(rowItem, date_row, 0);
                        checkRowItemIsCurrent = false; 
                        date_row = new Date(rowItem.rd); 
                        if(this.checkObjData(rowItem, dataLottery) == true){
                            this.formatLottery(rowItem, dataLottery);
                            showResult = true;
                        }else {
                            showResult = false;
                        }
                        checkRowItemIsCurrent = true;
                    }
                }
                
            }
        }  
      }
    
      onSwipeRight(gestureState) {
        rowItem = setItemRowDrag(rowItem, date_row, 0);
        checkRowItemIsCurrent = false; 
        date_row = new Date(rowItem.rd); 
        rowItem.status_kq = '0';
        if(this.checkObjData(rowItem, dataLottery) == true){
            console.log("CHAY VAO KEO PHAI");
            this.formatLottery(rowItem, dataLottery);
            showResult = true;
        }else {
            console.log("CHAY VAO KEO PHAI 0");
            showResult = false;
        }
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
            console.log('KIEM TRA DAU VAO:' + JSON.stringify(objResult_3))
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
                    <Text style = {{textAlign: 'center', width: '100%', color: '#0000FF', padding: checkRowItemIsCurrent == true? 10 : 0, fontSize: 16}}>
                        {checkRowItemIsCurrent == true? this.setTitleToday(rowItem.area_id == 2?2:3) : ''}
                    </Text>

                    {
                        showResult?
                        <View style={{flex:1}}>
                        <Text style = {{textAlign: 'center', width: '100%', color: 'black', paddingHorizontal: 10, paddingTop:10, fontSize: 16}}>{this.setTitle(rowItem, date_row)}</Text>
                        {
                            this.checkObjDataComplete(rowItem, dataLottery)==true?
                            <View style={{alignContent:'center'}}>
                                <Text style={{flex: 1, color:'red', textAlign:'center', marginBottom:10}}>Đang quay</Text>
                                <UIActivityIndicator style={{flex:1, paddingBottom: 1,}} size={15} color='blue' />
                            </View>
                            :null
                        }
                        <View style = {{flex: 1, backgroundColor: 'grey', marginHorizontal: 2}}>
    
                            <View style = {style.row_result_title}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5 ,
                                    textAlign: 'center', color: 'white', fontWeight: 'bold',fontSize: 16, backgroundColor: 'red', marginRight: 1,}}>Giải</Text>
                                {/*{
                                //     this.checkObjDataComplete(rowItem, dataLottery)==true?
                                //     <View style={{flex: 1, alignItems:'center'}}>
                                //         <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red', marginRight: 1,}}>
                                //             {rowItem.name[0]}
                                //         </Text>
                                //         <UIActivityIndicator style={{flex:1, paddingBottom: 1,}} size={15} color='blue' />
                                //     </View>:
                                //     <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red', marginRight: 1,}}>
                                //             {rowItem.name[0]}
                                //     </Text>
                                // }    
                                
                                // {
                                //     this.checkObjDataComplete(rowItem, dataLottery)==true?
                                //     <View style={{flex: 1, alignItems:'center'}}>
                                //         <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red', marginRight: 1,}}>
                                //             {rowItem.name[1]}
                                //         </Text>
                                //         <UIActivityIndicator style={{flex:1, paddingBottom: 1,}} size={15} color='blue' />
                                //     </View>:
                                //     <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red', marginRight: 1,}}>
                                //             {rowItem.name[1]}
                                //     </Text>
                                // } 

                                // {
                                //     rowItem.code.length >= 3?
                                //     this.checkObjDataComplete(rowItem, dataLottery)==true?
                                //     <View style={{flex: 1, alignItems:'center'}}>
                                //         <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                //             color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red', marginRight: rowItem.code.length == 4? 1 : 0,}}>
                                //             {rowItem.code.length >= 3? rowItem.name[2] : ''}
                                //         </Text>
                                //         <UIActivityIndicator style={{flex:1, paddingBottom: 1,}} size={15} color='blue' />
                                //     </View>:
                                //     <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                //             color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red', marginRight: rowItem.code.length == 4? 1 : 0,}}>
                                //             {rowItem.code.length >= 3? rowItem.name[2] : ''}
                                //     </Text>
                                //     :null
                                // }
                                
                                // {
                                //     rowItem.code.length >= 4?
                                //     this.checkObjDataComplete(rowItem, dataLottery)==true?
                                //     <View style={{flex: 1, alignItems:'center'}}>
                                //         <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                //             color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red'}}>
                                //             {rowItem.code.length == 4? rowItem.name[3] : ''}
                                //         </Text>
                                //         <UIActivityIndicator style={{flex:1, paddingBottom: 1,}} size={15} color='blue' />
                                //     </View>:
                                //     <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                //         color: 'white', fontWeight: 'bold', fontSize: 16, backgroundColor: 'red'}}>
                                //         {rowItem.code.length == 4? rowItem.name[3] : ''}
                                //     </Text>
                                //     :null
                                // }*/}

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
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>G.8</Text>
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey', alignItems:'center', justifyContent:'space-between'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_1?this.margeArrToString(objResult_1.g8.arr_kq8)+" ":" "}
                                    </Text>
                                </View>    
                                
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_2?this.margeArrToString(objResult_2.g8.arr_kq8)+" ":" "}
                                    </Text>
                                </View>
                                
                                <View style={{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0,borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length >= 3?  objResult_3?this.margeArrToString(objResult_3.g8.arr_kq8)+" ":" " : ''}
                                    </Text>
                                </View>                

                                <View style={{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0,borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{ flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length == 4?  objResult_4?this.margeArrToString(objResult_4.g8.arr_kq8)+" ":" " : ''}
                                    </Text>                             
                                </View>  
                                
                            </View> 
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>G.7</Text>
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_1?this.margeArrToString(objResult_1.g7.arr_kq7)+" ": " "}
                                    </Text>                                
                                </View>    
                                
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_2?this.margeArrToString(objResult_2.g7.arr_kq7)+" ":" "}
                                    </Text>
                                </View>
                                
                                <View style={{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0,borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length >= 3? objResult_3? this.margeArrToString(objResult_3.g7.arr_kq7)+" ":" " : ''}
                                    </Text>
                                </View>                

                                <View style={{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0,borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length == 4? objResult_4? this.margeArrToString(objResult_4.g7.arr_kq7)+" ":" " : ''}
                                    </Text>
                                </View>  
                                
                            </View> 
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>G.6</Text>
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_1?this.margeArrToString(objResult_1.g6.arr_kq6)+" ":" "}
                                    </Text>
                                </View>    
                                
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_2?this.margeArrToString(objResult_2.g6.arr_kq6)+" ":" "}
                                    </Text>
                                </View>
                                
                                <View style={{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0,borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length >= 3? objResult_3? this.margeArrToString(objResult_3.g6.arr_kq6)+" ":" " : ''}
                                    </Text>
                                </View>                

                                <View style={{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0,borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{ flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length == 4? objResult_4? this.margeArrToString(objResult_4.g6.arr_kq6)+" ":" " : ''}
                                    </Text>
                                </View>     
                            </View> 
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>G.5</Text>
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_1?this.margeArrToString(objResult_1.g5.arr_kq5)+" ":" "}
                                    </Text>
                                </View>    
                                
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_2?this.margeArrToString(objResult_2.g5.arr_kq5)+" ":" "}
                                    </Text>
                                </View>
                                
                                <View style={{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0,borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length >= 3? objResult_3? this.margeArrToString(objResult_3.g5.arr_kq5)+" ":" ": ''}
                                    </Text>
                                </View>                

                                <View style={{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0,borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length == 4? objResult_4? this.margeArrToString(objResult_4.g5.arr_kq5)+" ":" " : ''}
                                    </Text>
                                </View>     
                            </View> 
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>G.4</Text>
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_1?this.margeArrToString(objResult_1.g4.arr_kq4)+" ":" "}
                                    </Text>
                                </View>    
                                
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_2?this.margeArrToString(objResult_2.g4.arr_kq4)+" ":" "}
                                    </Text>
                                </View>
                                
                                <View style={{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0,borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length >= 3? objResult_3? this.margeArrToString(objResult_3.g4.arr_kq4)+" ":" " : ''}
                                    </Text>
                                </View>                

                                <View style={{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0,borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length == 4? objResult_4? this.margeArrToString(objResult_4.g4.arr_kq4)+" ":" " : ''}
                                    </Text>
                                </View>     
                            </View> 
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>G.3</Text>
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_1?this.margeArrToString(objResult_1.g3.arr_kq3)+" ":" "}
                                    </Text>
                                </View>    
                                
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_2?this.margeArrToString(objResult_2.g3.arr_kq3)+" ":" "}
                                    </Text>
                                </View>
                                
                                <View style={{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0,borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{ flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length >= 3? objResult_3? this.margeArrToString(objResult_3.g3.arr_kq3)+" ":" " : ''}
                                    </Text>
                                </View>                

                                <View style={{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0,borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length == 4? objResult_4? this.margeArrToString(objResult_4.g3.arr_kq3)+" ":" " : ''}
                                    </Text>
                                </View>     
                            </View> 
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>G.2</Text>
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_1?this.margeArrToString(objResult_1.g2.arr_kq2)+" ":" "}
                                    </Text>
                                </View>    
                                
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_2?this.margeArrToString(objResult_2.g2.arr_kq2)+" ":" "}
                                    </Text>
                                </View>
                                
                                <View style={{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0,borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length >= 3? objResult_3? this.margeArrToString(objResult_3.g2.arr_kq2)+" ":" " : ''}
                                    </Text>
                                </View>                

                                <View style={{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0,borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length == 4? objResult_4? this.margeArrToString(objResult_4.g2.arr_kq2)+" ":" " : ''}
                                    </Text>
                                </View>     
                            </View> 
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>G.1</Text>
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_1?this.margeArrToString(objResult_1.g1.arr_kq1)+" ":" "}
                                    </Text>
                                </View>    
                                
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_2?this.margeArrToString(objResult_2.g1.arr_kq1)+" ":" "}
                                    </Text>
                                </View>
                                
                                <View style={{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0,borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length >= 3? objResult_3? this.margeArrToString(objResult_3.g1.arr_kq1)+" ":" " : ''}
                                    </Text>
                                </View>                

                                <View style={{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0,borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{ flex :1,textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length == 4? objResult_4? this.margeArrToString(objResult_4.g1.arr_kq1)+" ":" " : ''}
                                    </Text>
                                </View>     
                            </View> 
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5, textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>ĐB</Text>
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'red', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_1?this.margeArrToString(objResult_1.db.arr_kqdb)+" ":" "}
                                    </Text>
                                </View>    
                                
                                <View style={{padding: 5, flex: 1,borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1,textAlign: 'center', color: 'red', fontWeight: 'bold', fontSize: 16}}>
                                        {objResult_2?this.margeArrToString(objResult_2.db.arr_kqdb)+" ":" "}
                                    </Text>
                                </View>
                                
                                <View style={{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0,borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'red', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length >= 3? objResult_3? this.margeArrToString(objResult_3.db.arr_kqdb)+" ":" " : ''}
                                    </Text>
                                </View>                

                                <View style={{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0,borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    <Text style = {{flex :1, textAlign: 'center', color: 'red', fontWeight: 'bold', fontSize: 16}}>
                                        {rowItem.code.length == 4? objResult_4? this.margeArrToString(objResult_4.db.arr_kqdb)+" ":" " : ''}
                                    </Text>
                                </View>     
                            </View> 
                            
                            <View style = {{flexDirection: 'row', height: 20, backgroundColor: 'yellow', alignItems: 'center', marginBottom: 2}}>
                               
                            </View>
    
                            <View style = {style.row_loto}>
                               <Text style = {style.row_text_title_loto}>Đầu</Text>
                               <Text style = {style.row_text_content_loto}>Đuôi</Text>
                            </View>
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>0</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,0) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,0) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,0) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,0) + " ":" " : ''}
                                </Text>
                            </View>
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>1</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,1) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,1) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,1) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,1) + " ":" " : ''}
                                </Text>
                            </View>
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>2</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,2) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,2) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,2) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,2) + " ":" " : ''}
                                </Text>
                            </View>
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>3</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,3) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,3) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,3) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,3) + " ":" " : ''}
                                </Text>
                            </View>
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>4</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,4) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,4) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,4) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,4) + " ":" " : ''}
                                </Text>
                            </View>
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>5</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,5) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,5) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,5) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,5) + " ":" " : ''}
                                </Text>
                            </View>
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>6</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,6) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,6) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,6) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,6) + " ":" " : ''}
                                </Text>
                            </View>
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>7</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,7) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,7) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,7) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,7) + " ":" " : ''}
                                </Text>
                            </View>
    
                            <View style = {style.row_result}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>8</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,8) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,8) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,8) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,8) + " ":" " : ''}
                                </Text>
                            </View>
    
                            <View style = {[style.row_result,{marginBottom:10}]}>
                                <Text style = {{flex: rowItem.code.length >= 3? 0.4 : 0.3, paddingHorizontal: 2, paddingVertical: 5,textAlign: 'center', color: 'black', 
                                    fontSize: 16, marginRight: 1}}>9</Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_1?this.filterNumber(objResult_1.mang_loto7,9) + " ":" "}   
                                </Text>
                                <Text style = {{padding: 5, flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: 1, borderLeftWidth: 1, borderLeftColor: 'grey'}}>
                                    {objResult_2?this.filterNumber(objResult_2.mang_loto7,9) + " ":" "} 
                                </Text>
                                <Text style = {{padding: rowItem.code.length >= 3? 5 : 0, flex: rowItem.code.length >= 3? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, marginRight: rowItem.code.length == 4? 1 : 0
                                    , borderLeftWidth: rowItem.code.length >= 3? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length >= 3? objResult_3?this.filterNumber(objResult_3.mang_loto7,9) + " ":" " : ''}
                                </Text>
                                <Text style = {{padding: rowItem.code.length == 4? 5 : 0, flex: rowItem.code.length == 4? 1 : 0, textAlign: 'center', 
                                    color: 'black', fontWeight: 'bold', fontSize: 16, borderLeftWidth: rowItem.code.length == 4? 1 : 0, borderLeftColor: 'grey'}}>
                                    {rowItem.code.length == 4? objResult_4? this.filterNumber(objResult_4.mang_loto7,9) + " ":" " : ''}
                                </Text>
                            </View>
    
                        </View>
                        </View>:null
                    }

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
        this.setState({
            value_test: 1,
        })
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
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderWidth: 0.5,
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