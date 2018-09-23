import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView
 } from 'react-native';
 import ItemFlatListDoSo from '../components/ItemFLatListDoSo';
 import GlobalValue from '../components/GlobalValue';
 export default class ResultDoSoComponent extends Component {
    constructor(props){
        super(props);
        console.log('HHH: ' + JSON.stringify(GlobalValue.objResultDoSo))
    }

    shouldComponentUpdate(){
        return true;
    }

    componentWillUpdate(){
        
    }

     render() {
         return (
             <ScrollView>
             <View styles={styles.container}> 
                    {
                        GlobalValue.arrSoDo.length>0?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[0]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[0]]}/>:null
                    } 

                    {
                        GlobalValue.arrSoDo.length>1?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[1]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[1]]}/>:null
                    }                         
                   
                    {
                        GlobalValue.arrSoDo.length>2?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[2]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[2]]}/>:null
                    }  

                    {
                        GlobalValue.arrSoDo.length>3?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[3]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[3]]}/>:null
                    }  

                    {
                        GlobalValue.arrSoDo.length>4?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[4]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[4]]}/>:null
                    }  

                    {
                        GlobalValue.arrSoDo.length>5?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[5]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[5]]}/>:null
                    }  

                    {
                        GlobalValue.arrSoDo.length>6?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[6]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[6]]}/>:null
                    }  

                    {
                        GlobalValue.arrSoDo.length>7?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[7]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[7]]}/>:null
                    } 
                    {
                        GlobalValue.arrSoDo.length>8?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[8]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[8]]}/>:null
                    } 
                    {
                        GlobalValue.arrSoDo.length>9?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[9]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[9]]}/>:null
                    } 

                    {
                        GlobalValue.arrSoDo.length>10?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[10]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[10]]}/>:null
                    }                         
                   
                    {
                        GlobalValue.arrSoDo.length>11?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[11]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[11]]}/>:null
                    }  

                    {
                        GlobalValue.arrSoDo.length>12?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[12]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[12]]}/>:null
                    }  

                    {
                        GlobalValue.arrSoDo.length>13?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[13]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[13]]}/>:null
                    }  

                    {
                        GlobalValue.arrSoDo.length>14?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[14]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[14]]}/>:null
                    }  

                    {
                        GlobalValue.arrSoDo.length>15?
                        <ItemFlatListDoSo soTraCuu={GlobalValue.arrSoDo[15]} data={GlobalValue.objResultDoSo[GlobalValue.arrSoDo[15]]}/>:null
                    }  
             </View>
             </ScrollView>
         );
     }
 }

 const styles = StyleSheet.create({
     container:{
         flex:1,
     }
 })