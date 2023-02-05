import React from 'react'
import { View , Text ,ImageBackground, Image } from "react-native"
import { DrawerContentScrollView ,DrawerItem,DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props:any) {
  return (
    <DrawerContentScrollView {...props}>
         
        <Image source={require('./assets/gmt-logo.jpeg')} style={{ display : "flex" , alignItems : 'center' , justifyContent : 'space-around' }}></Image> 

       
        <DrawerItemList {...props}>
        </DrawerItemList>
    </DrawerContentScrollView>
  );
}
