import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Picker, 
    Item,
    ScrollView,
    BackHandler
} from 'react-native';
// modules
import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
  } from '../components/BackHandlerXoSo';
import {Calendar,LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['fr'] = {
  monthNames: ['Tháng Một','Tháng Hai','Tháng Ba','Tháng Tư','Tháng Năm','Tháng sáu','Tháng bẩy','Tháng Tám','Tháng Chín','Tháng Mười','Tháng 11','Tháng 12'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['CN','Hai','Ba','Tư','Năm','Sáu','Bẩy']
};
LocaleConfig.defaultLocale = 'fr';
import data from '../components/TinhThanh';
import moment from 'moment';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
import dataSwitchKey_global from '../components/DataLotterySwitchKey_Global';
import GloblaValue from '../components/GlobalValue';

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
var date_quay = '';
var item_;
var day_current;
var dataFromServerWithKey;
// ma code tinh duoc chon
var codeTinh;
export default class ByDayScreen extends Component {

    constructor(props){
        super(props);
        if(GloblaValue.clickToByDayByHome === true){
            dataFromServerWithKey = this.props.navigation.state.params.data_lottery;
        }else{
            GloblaValue.clickToByDayByHome = true;
            dataFromServerWithKey = dataSwitchKey_global.data;
        }
        console.log("JSON DATA: " + JSON.stringify(dataFromServerWithKey))
        this.state= {
            selected: data[0]
        }
        codeTinh='MB';
        item_ = data[0];
        var date_current = new Date();
        day_current = moment(date_current).format('YYYY-MM-DD');
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

    renderItem(){
        items = [];
        for(let item of data){
            items.push(<Picker.Item key = {item.code} label={item.name} value={item.code}/>)
        }
        return items;
    }
    
    render() {
        
        return(
            <View style={style.container}>
                <View style = {style.header_style}>
                    <Text style = {style.text_style}>Xem kết quả theo ngày</Text>
                </View>
                <ScrollView style={{flex:1}}>
                    <Calendar
                    // Specify style for calendar container element. Default = {}
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        height: 350
                    }}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        monthTextColor: 'blue',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textMonthFontWeight: 'bold',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                        // onDayPress={(day) => alert()}
                        onDayPress={(day) => {
                            item_.rd = day.dateString;//day.dateString ra dinh dang ngay YYYY-MM-DD
                            this.findeResultWithDate(item_);
                        }}
                    />

                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 10}}>Chọn tỉnh/thành phố:</Text>
                    <Picker 
                        selectedValue = {this.state.selected}
                        onValueChange={
                            (itemValue, itemIndex, item) => {this.setState({selected: itemValue})
                                // alert(JSON.stringify(itemValue))
                                // alert(JSON.stringify(itemIndex))
                                // alert(JSON.stringify(data[itemIndex].name))
                                item_ = data[itemIndex];
                                codeTinh = item_.code;
                            }
                            }
                    mode={'dropdown'}
                    > 
                        {this.renderItem()}
                    </Picker>
                </ScrollView>
                    <FloatButtonCompomentExit
                     onButtonFloatPress={this.clickExit.bind(this)}
                    />

            </View>
        );
    }

    clickExit(){
        this.props.navigation.goBack();
    }

    // ham kiem tra ngay click co ket qua hay ko
    findeResultWithDate(item, date_){
        var _date = new Date(item.rd);
        var day =  _date.getDay()+1;
        var dayString = "," + day + ",";
        if(item_.weekdays.indexOf(dayString) != -1){
            var key = codeTinh + "_" + moment(_date).format('YYYYMMDD')
            if(dataFromServerWithKey[key] != null){
                this.props.navigation.navigate('ResultLotteryByDay', {data_lottery: dataFromServerWithKey, 
                    row: item_});
            }else {
                var milisecondsDateCurrent = moment(moment().format('YYYY-MM-DD'));
                var milisecondsDateSelect = moment(item.rd);
                if(milisecondsDateSelect > milisecondsDateCurrent){
                    alert('Ngày ' + moment(item.rd).format('DD/MM/YYYY') + " xổ số " + item.name + ' chưa quay')
                }else if(milisecondsDateSelect < milisecondsDateCurrent){
                    alert('Ngày ' + moment(item.rd).format('DD/MM/YYYY') + " xổ số " + item.name + ' không có dữ liệu')
                }else {
                    alert('Ngày ' + moment(item.rd).format('DD/MM/YYYY') + " xổ số " + item.name + ' chưa quay')
                }
            }
        }else {
            alert('Ngày ' + moment(item.rd).format('DD/MM/YYYY') + " xổ số " + item.name + ' không có lịch quay')
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