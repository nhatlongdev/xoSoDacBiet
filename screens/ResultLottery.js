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

//thoi gian bat dau quay, thoi gian dung quay
var dateTimeBatDauQuay;
var dateTimeDungQuay;

// Biến kiểm tra hiển thị hay ẩn kết quả
var showResult = false;

export default class ResultLottery extends Component {

    // hàm định đạng lại kết quả trả về ==> phục vụ cho việc hiển thị ra view  
    formatLottery(rowItem, dataLottery){
        checkDataNotNull = false;
        var date_quay = moment(rowItem.rd).format('YYYYMMDD');
        var keyItem = rowItem.code[0] + '_'+date_quay;
        if(dataLottery[keyItem] != null){
            checkDataNotNull = true;
            var lotteryItem = dataLottery[keyItem];

            var obj_cli={};    
            var key_push = (rowItem.code[0]);
            var title_kq = lotteryItem.pc + lotteryItem.rd;
            var obdb = {}, ob1 = {}, ob2 = {}, ob3 = {}, ob4 = {}, ob5 = {}, ob6 = {}, ob7 = {};
            obdb.title = 'ĐB'; ob1.title = 'G.1'; ob2.title = 'G.2'; ob3.title = 'G.3'; ob4.title = 'G.4'; ob5.title = 'G.5'; ob6.title = 'G.6'; ob7.title = 'G.7'; 
            var s1s2 = (lotteryItem.s1? lotteryItem.s1 :lotteryItem.s2);
            var arr_kqdb = s1s2.split(' - ');
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
            var mang_loto7 = mang_loto6.concat(arr_kq7);
            obj_cli.g7 = ob7;
            obj_cli.mang_loto7 = mang_loto7;


            mang_kq_tong[key_push] = obj_cli;
        }
        if(checkDataNotNull == false){
            date_row.setDate(date_row.getDate()-1);
            rowItem.rd = moment(date_row).format('YYYY-MM-DD');
            checkRowItemIsCurrent = true;
        }          
    }

    // Hàm gộp mảng thành text
    margeArrToString(arr){
        var str = '';
        for(var i=0; i< arr.length; i++){
            str == '' ? (str = str + arr[i]) : (str = str + " - " + arr[i]);
        }
        return str;
    }

    // hàm for mảng kết quả tìm đầu đuôi lô tô
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
        var keyItem = rowItem.code[0] + '_'+date_quay;
        if(dataLottery[keyItem] != null){
            return true;
        }else {
            return false;
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
        if(value == 1){
            str = 'Miền Bắc - Hôm nay, ';
        }
        str = str + getDayOfWeek(indexDay) +  ", " + moment(date_current).format('DD/MM/YYYY') + "(quay lúc 18h 15')";
        return str;
    }

    constructor(props) {
        super(props);
        this.state = {
          drag_left: true,
          value_test: 0,
        };
        dataLottery = this.props.navigation.state.params.data_lottery;
        var rowItem_source = this.props.navigation.state.params.row;
        rowItem = JSON.parse(JSON.stringify(rowItem_source));
        if(rowItem.rd == moment().format('YYYY-MM-DD')){
            checkRowItemIsCurrent = true;
        }else{
            checkRowItemIsCurrent = false;
        }
        date_row = new Date(rowItem.rd);
        console.log("DATA: ===>>>" + JSON.stringify(dataLottery));
        
        //set ngày hiện tại theo giờ
        dateTimeBatDauQuay = moment(moment().format('YYYY-MM-DD') + ' 18:10'); //.format('YYYY/MM/DD HH:mm:ss')
        dateTimeDungQuay = moment(moment().format('YYYY-MM-DD' + ' 18:40'));
      }

      componentWillMount(){
            if(this.checkObjData(rowItem, dataLottery) == false){ // nếu kết quả ngày hiện tại chưa có
                var timeCurrent = moment();
                // nếu trong khung giờ quay
                if(timeCurrent>= dateTimeBatDauQuay && timeCurrent< dateTimeDungQuay){
                    checkRowItemIsCurrent = true;
                    showResult = false;
                }else {
                    date_row.setDate(date_row.getDate() - 1);
                    rowItem.rd = moment(date_row).format('YYYY-MM-DD');
                    if(this.checkObjData(rowItem, dataLottery) == true){
                        this.formatLottery(rowItem, dataLottery);
                        console.log("CHay vao 1");
                        showResult = true;
                    }else {
                        showResult = false;
                    }
                    checkRowItemIsCurrent = true;
                }
            }else{ // kết quả ngày hiện tại đã có
                console.log("CHay vao 3");
                this.formatLottery(rowItem, dataLottery);
                showResult = true;
            } 

            setInterval(()=>{
                // console.log("INTEVAL BEN RESUL CHAY");
                if(moment() >= dateTimeBatDauQuay && moment() < dateTimeDungQuay){
                    //kiểm tra nếu đang ở ngày hiện tại mà trong khung giờ quay mà đang hiện kq ngày hôm trước thì set lại rowItem
                    if(rowItem.rd == moment().format('YYYY-MM-DD')){
                        //nếu kq ngày hiện tại đã có (trực tiếp)
                        if(this.checkObjData(rowItem, dataLottery) == true){
                            console.log("CO ket quả trực tiếp ngày hôm nay");
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
            date_row = new Date(rowItem.rd); 
            date_row.setDate(date_row.getDate()+1);
            rowItem.rd = moment(date_row).format('YYYY-MM-DD');
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
                        date_row.setDate(date_row.getDate()-1);
                        rowItem.rd = moment(date_row).format('YYYY-MM-DD');
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
        checkRowItemIsCurrent = false; 
        date_row = new Date(rowItem.rd); 
        date_row.setDate(date_row.getDate()-1);
        rowItem.rd = moment(date_row).format('YYYY-MM-DD');
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
 
        var objResult = mang_kq_tong[rowItem.code[0]];  
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
                    <Text style = {{textAlign: 'center', width: widthScreen, color: '#0000FF', padding: checkRowItemIsCurrent == true? 10 : 0, fontSize: 16}}>
                        {checkRowItemIsCurrent == true? this.setTitleToday(1) : ''}
                    </Text>

                    {/* if else neu chua co ket qua va chuan bi den gio quay truc tiep */}
                    {showResult ? 
                    <View style = {{flex: 1}}>
                    <Text style = {{textAlign: 'center', width: widthScreen, color: 'black', padding: 10, fontSize: 16}}>{this.setTitle(rowItem, date_row)}</Text>
                    <View style = {{flex: 1, backgroundColor: 'grey', marginHorizontal: 2}}>
                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.db.title}</Text>
                           <Text style = {{flex: 2, textAlign: 'center', color: 'red', 
                                fontWeight: 'bold', fontSize: 18, borderLeftWidth: 1, borderLeftColor: 'grey'}}>{objResult.db.arr_kqdb}</Text>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g1.title}</Text>
                           <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g1.arr_kq1)}</Text>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g2.title}</Text>
                           <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g2.arr_kq2)}</Text>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g3.title}</Text>
                           <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g3.arr_kq3)}</Text>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g4.title}</Text>
                           <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g4.arr_kq4)}</Text>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g5.title}</Text>
                           <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g5.arr_kq5)}</Text>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g6.title}</Text>
                           <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g6.arr_kq6)}</Text>
                        </View>

                        <View style = {style.row_result}>
                           <Text style = {style.row_text_title_result}>{objResult.g7.title}</Text>
                           <Text style = {style.row_text_content_result}>{this.margeArrToString(objResult.g7.arr_kq7)}</Text>
                        </View>

                        <View style = {{flexDirection: 'row', height: 20, backgroundColor: 'yellow', alignItems: 'center', marginBottom: 2}}>
                           
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>Đầu</Text>
                           <Text style = {style.row_text_content_loto}>Đuôi</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>0</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,0)}</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>1</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,1)}</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>2</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,2)}</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>3</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,3)}</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>4</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,4)}</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>5</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,5)}</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>6</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,6)}</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>7</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,7)}</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>8</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,8)}</Text>
                        </View>

                        <View style = {style.row_loto}>
                           <Text style = {style.row_text_title_loto}>9</Text>
                           <Text style = {style.row_text_content_loto}>{this.filterNumber(objResult.mang_loto7,9)}</Text>
                        </View>
                    </View>
                    </View>
                    :null}
                    
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
    row_loto: {
        flexDirection: 'row', 
        paddingVertical: 5, 
        paddingLeft: 5,
        backgroundColor: '#F6CECE', 
        alignItems: 'center', 
        marginBottom: 2
    },
    row_text_title_result: {
        flex: 0.15,
        textAlign: 'center', 
        color: 'white', 
        fontWeight: 'bold',
        marginRight: 10,
        paddingHorizontal: 5,
    },
    row_text_content_result: {
        flex: 2, 
        fontSize: 16,
        textAlign: 'center', 
        color: 'black', 
        fontWeight: 'bold',
        borderLeftWidth: 1, 
        borderLeftColor: 'grey'
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