import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ItemNumDetector from '../components/ItemNumDetector';
import Color from '../src/color';

export default class ItemFlatListDoSo extends Component {

     //set title ket qua tra cuu
     setTitleResultTraCuu(soTraCuu){
        var titlte = '';
        if(soTraCuu != ''){
            titlte =  'Số ' + soTraCuu + ' xuất hiện ' + this.props.data.length + ' lần';
        }else {
            titlte =  'Kết quả tra cứu';
        }
        return titlte;
    }

    render() {
        return (
            <View>
                <View style={{paddingHorizontal:5}}>
                <Text style ={{color: Color.blue}}>{this.setTitleResultTraCuu(this.props.soTraCuu, this.props.data.length)}</Text> 
                <View style = {{backgroundColor: 'red', flexDirection: 'row'}}>
                    <Text style= {{flex: 2, textAlign: 'center', padding: 5, fontWeight: 'bold', color: 'white'}}>Số</Text>
                    <Text style= {{flex: 2, textAlign: 'center', padding: 5, fontWeight: 'bold', color: 'white'}}>Giải</Text>
                    <Text style= {{flex: 3, textAlign: 'center', padding: 5, fontWeight: 'bold', color: 'white'}}>Ngày</Text>
                </View>
                </View>
                <FlatList   style={{paddingHorizontal:5}}
                            data = {this.props.data}
                            renderItem = {({item, index})=>{
                                return(
                                    <ItemNumDetector
                                        item = {item} index = {index}
                                    />
                                );
                            }}
                            keyExtractor={ (item, index) => index.toString() }> 
                </FlatList>
            </View>
        );
    }
}