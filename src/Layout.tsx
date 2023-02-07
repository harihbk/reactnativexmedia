import * as React from 'react';
import { Text, View ,Image , StyleSheet, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import List from './products/list';
import { Provider as PaperProvider } from 'react-native-paper';
import ProductDetailScreen from './products/ProductDetailScreen';

import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import index from './category';
import { createStackNavigator } from '@react-navigation/stack';





  // Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://gmtgraphql.mo.vc/v1/graphql',
  cache: new InMemoryCache()
});
  
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();





  export default function Layout() {


    return (
      <ApolloProvider client={client}>
          <SafeAreaView style={{ flex: 1 }}>
  
            {/* <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Category"
                  component={index}
                  options={{title: 'Welcome'}}
                />
              </Stack.Navigator>
            </NavigationContainer> */}
 
          <NavigationContainer>
            <Drawer.Navigator  drawerContent = {props => <CustomDrawer {...props}/>} screenOptions={{ headerShown : true }}>
                <Drawer.Screen name="Category" component={index} />
                {/* <Stack.Screen   name="Category" component={index} /> */}

                <Drawer.Screen name="product" component={List} options={{
            drawerLabel: 'Hidden Page One option',
            title: 'Products',
            drawerItemStyle: {
              display: 'none',
            },
          }} />

                <Drawer.Screen name="productdetail" component={ProductDetailScreen} options={{
            drawerLabel: 'Hidden Page One option',
            title: 'Product Deatil',
            drawerItemStyle: {
              display: 'none',
            },
          }}/>

            </Drawer.Navigator>
          </NavigationContainer>
          </SafeAreaView>
      </ApolloProvider>

    );
  }