import React, {Component} from 'react';
import {
    Dimensions
} from 'react-native';
import {
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import NumberDetectorScreen from './screens/NumberDetectorScreen';
import StatisticalScreen from './screens/StatisticalScreen';
import ByDayScreen from './screens/ByDayScreen';
import CommunityScreen from './screens/CommunityScreen';
import RegionsScreen from './screens/RegionsScreen';
import SlideMenu from './screens/SlideMenu';
import ResultLottery from './screens/ResultLottery';
import ResultLottery2 from './screens/ResultLottery2';
import ResultLotteryByDay from './screens/ResultLotteryByDay';
import ResultStatistic from './screens/ResultStatistic';
import ResultStatistic1 from './screens/ResultStatistic1';
import ResultStatistic2 from './screens/ResultStatistic2';
import ResultStatistic3 from './screens/ResultStatistic3';
import Splash from './screens/Splash';
import TestData from './screens/TestData';

var widthScreen;
export const HomeStack = StackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null
        }
    },
    Home_Screen:{
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Number_Detector_Screen: {
        screen: NumberDetectorScreen,
        navigationOptions: {
            header: null
        }
    },
    Statistical_Screen: {
        screen: StatisticalScreen,
        navigationOptions: {
            header: null
        }
    },
    By_Day_Screen: {
        screen: ByDayScreen,
        navigationOptions: {
            header: null
        }
    },
    Comunity_Screen: {
        screen: CommunityScreen,
        navigationOptions: {
            header: null
        }
    },
    Regions_Screen: {
        screen: RegionsScreen,
        navigationOptions: {
            header: null
        }
    },
    ResultLottery: {
        screen: ResultLottery,
        navigationOptions: {
            header: null
        }
    },
    ResultLottery2: {
        screen: ResultLottery2,
        navigationOptions: {
            header: null
        }
    },
    ResultLotteryByDay: {
        screen: ResultLotteryByDay,
        navigationOptions: {
            header: null
        }
    },
    ResultStatistic: {
        screen: ResultStatistic,
        navigationOptions: {
            header: null
        }
    },
    ResultStatistic1: {
        screen: ResultStatistic1,
        navigationOptions: {
            header: null
        }
    },
    ResultStatistic2: {
        screen: ResultStatistic2,
        navigationOptions: {
            header: null
        }
    },
    ResultStatistic3: {
        screen: ResultStatistic3,
        navigationOptions: {
            header: null
        }
    },

})

export const SlideMenuStack = DrawerNavigator({
    Home: {
      screen: HomeStack,
    },
  },
  {
    drawerWidth: Dimensions.get('window').width*70/100,
    drawerPosition: 'left',
    contentComponent: props => <SlideMenu {...props}/>
  });
