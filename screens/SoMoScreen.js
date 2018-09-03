import React, { Component } from 'react';
import { 
    View,
    Text,
    Dimensions,
    StyleSheet,
    Picker,
    Item,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    BackHandler,
    Platform
 } from 'react-native';
var data = require('../assets/somo.json');
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
import ItemSoMo from '../components/ItemSoMo';
var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
var dataSearch = [];

 export default class SoMoScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            content_search:'',
            dataSearch: dataSearch,
        }
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

     render() {
         return (
            <View style = {{flex: 1, marginTop: Platform.OS==='ios'?30:0}}>
            <View style = {style.header_style}>
                <Text style = {style.text_style}>Xổ số đặc biệt - Sổ mơ</Text>
            </View>
            <ScrollView style={{flex:1}}>
                <View style = {{padding: 10, marginBottom: 5}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Nhập gợi ý tìm kiếm:</Text>
                <TextInput
                    maxLength = {50}   
                    placeholder={'Ví dụ: Rắn hai đầu'}
                    placeholderTextColor = {'grey'}
                    onChangeText = {(text)=>this.setState({content_search: text})}
                    value={this.state.content_search}    
                />
        
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',borderRadius: 2, backgroundColor: '#CCCCCC', height: 50,padding: 5}}
                                onPress = {()=>this.checkStringInputLegal(this.state.content_search) === 'ok'? 
                                this.searchData(this.state.content_search):
                                alert('Bạn chưa nhập nội dung giấc mơ')}
                >
                    <Text style={{flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>TÌM KIẾM</Text>   
                    <Image
                    source={require('../images/right_arrow31.png')}
                    />
                </TouchableOpacity>
                </View>

                <FlatList
                    data={this.state.dataSearch}
                    renderItem = {({item, index})=>{
                        return(
                           <ItemSoMo
                                item={item} index={index}
                           />         
                        );
                    }}
                    keyExtractor={(item, index)=> item.toString()}
                >
                </FlatList>
                  
            </ScrollView>
            <FloatButtonCompomentExit
                 onButtonFloatPress={this.clickExit.bind(this)}
            />

        </View>
         );
     }

      //Sử dụng reg để kiểm tra chuỗi ký tự nhập vào có hợp lệ ko
    checkStringInputLegal(chuoi){
        var str ='ok';
        if(chuoi.length === 0){
            str = 'Bạn chưa nhập nội dung giấc mơ';
        }
        return str;
    }
   
    //Hàm tìm kiếm dữ liệu
    searchData(str){
        dataSearch = [];
        for(let i = 0; i< data.length; i++){
            if(data[i].title.toLowerCase().indexOf(str.toLowerCase()) !== -1 || data[i].khongDau.toLowerCase().indexOf(str.toLowerCase()) !== -1){
                dataSearch.push(data[i]);
            }
        }
        this.setState({
            dataSearch: dataSearch,
        })
    }

    clickExit(){
        this.props.navigation.goBack();
    }
 }

 var style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'yellow'
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
    }
})