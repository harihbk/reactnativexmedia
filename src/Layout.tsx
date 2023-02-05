import * as React from 'react';
import { Text, View ,Image , StyleSheet, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import List from './products/list';
import { Provider as PaperProvider } from 'react-native-paper';


function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home d d!</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
  
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  export default function Layout() {


    return (
      <SafeAreaView style={{ flex: 1 }}>

      <NavigationContainer>
        <Drawer.Navigator drawerContent = {props => <CustomDrawer {...props}/>} screenOptions={{ headerShown : true }}>
            <Drawer.Screen name="Category" component={List} />
            <Drawer.Screen name="Article" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    );
  }