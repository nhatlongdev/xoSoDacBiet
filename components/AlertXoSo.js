// packages
// packages
import {BackHandler} from 'react-native';
import {Alert} from 'react-native';
const exitAlert = () => {
  Alert.alert(
    'Thoát Khỏi Ứng Dụng',
    'Bạn có muốn thoát không?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
    }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
    }, ], {
        cancelable: false
    }
 )
 return true;
};
export {exitAlert};