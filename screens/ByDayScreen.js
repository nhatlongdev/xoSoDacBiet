import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Picker, 
    Item
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import data from '../components/TinhThanh';
import moment from 'moment';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
var date_quay = '';
var item_;
var day_current;
var day_click = '';
var dataFromServer;
export default class ByDayScreen extends Component {

    constructor(props){
        super(props);
        dataFromServer = this.props.navigation.state.params.data;
        this.state= {
            selected: data[0]
        }
        item_ = data[0];
        var date_current = new Date();
        day_current = moment(date_current).format('YYYY-MM-DD');
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
                            day_click = `${day.day}-${day.month}-${day.year}`;
                            if(day.dateString > day_current){
                                alert('Hiện tại ngày ' + day_click  + ' chưa quay')
                            }else {
                                item_.rd = day.dateString;
                                this.findeResultWithDate(item_, day.dateString);
                            }
                        }}
                    />

                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 10}}>Chọn tỉnh/thành phố:</Text>
                    <Picker 
                        selectedValue = {this.state.selected}
                        onValueChange={
                            (itemValue, itemIndex, item) => {this.setState({selected: itemValue})
                                alert(JSON.stringify(itemValue))
                                // alert(JSON.stringify(itemIndex))
                                // alert(JSON.stringify(data[itemIndex].name))
                                item_ = data[itemIndex];
                            }
                            }
                       mode={'dropdown'}
                       > 
                        {this.renderItem()}
                    </Picker>

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
        var _date = new Date(date_);
        var day =  _date.getDay()+1;
        var dayString = "," + day + ",";
        if(item_.weekdays.indexOf(dayString) != -1){
            this.props.navigation.navigate('ResultLotteryByDay',
            {row: item_, data: dataFromServer})
        }else {
            alert('Ngày ' + day_click + " xổ số " + item.name + ' không có lịch quay')
        }
    }
}

var style = StyleSheet.create({
    container:{
        flex:1
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
})