import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import moment from 'moment';

export default class ItemNumDetector extends Component {
    render(){
        return(
            <View style = {{flexDirection: 'row', backgroundColor: 'white'}}>
                <Text style= {{flex: 3, textAlign: 'center', padding: 5, fontWeight: 'bold', color: 'black'}}>{this.props.item.number}</Text>
                <Text style= {{flex: 2, textAlign: 'center', padding: 5, fontWeight: 'bold', color: 'black'}}>{this.props.item.giai}</Text>
                <Text style= {{flex: 2, textAlign: 'center', padding: 5, fontWeight: 'bold', color: 'black'}}>{this.convertDate(this.props.item.date)}</Text>
            </View>
        );
    }

    convertDate(date_){
        var dateNew = moment(date_).format('DD/MM/YYYY');
        return dateNew;
    }
}