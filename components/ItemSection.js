import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import Color from '../src/color';

export default class ItemSection extends Component {

    render(){
        return(
                <View style = {style.container}>
                    <View style = {style.container_1}>
                        <Icon style={{fontSize: 18, color: this.props.section.status == false? Color.black : Color.blue}} 
                            name = {this.props.section.status == false ? 'ios-arrow-down' : 'ios-arrow-up'}
                        />
                        <Text style={[style.text_section,{color: this.props.section.status == false? Color.black : Color.blue}]}>{this.props.section.title}</Text>
                    </View>
                    <View style = {{height : 1, backgroundColor: 'grey'}}></View>
                </View>
           
        );
    }

    componentDidMount(){
        
    }
}

var style = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_1:{
        flexDirection: 'row',
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 7,
    },
    text_section: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        marginLeft:10,
    }
})