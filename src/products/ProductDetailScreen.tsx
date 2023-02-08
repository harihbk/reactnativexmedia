import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { data } from "../mackdata/data"
import Table from './table';
import { gql, useQuery } from '@apollo/client'

const ProductDetailScreen = ({ route, navigation } :  { route:any, navigation :any} ) => {

   const { params : { name } } = route
   console.log("hari",name);
   
//   const CHAPTERS_QUERY = gql`
//   query product {
//     product_template(where: {id: {_eq: ${name}}}) {
//       categ_id
//       color
//       description  
//       id
//       name
//     } 
// } 
// `
// const { data, loading , error } = useQuery(CHAPTERS_QUERY)
//  console.log(data); 
 
  return (
    <View style={styles.container}>
      <View style={{ alignItems : 'center', display : 'flex' }}>
      <Image source={{ uri :`http://gmtnew.mo.vc/web/image?model=product.template&id=${name?.id}&field=image_1920`}} style={styles.image}></Image>

          {/* <Image source={ data?.product_template?.image } style={styles.image} /> */}
          <Text style={styles.name}>{name?.name}</Text>
          {/* <Text style={styles.description}>{name?.description} -- {name?.id}</Text> */}
      </View>
      
      <View >
        <Text style={styles.specification}>Specifications</Text>
        <Table />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // alignItems: 'center',
    padding: 20,
    borderTopWidth : 3, 
    backgroundColor : '#fff'
  },
  image: {
    width: 400,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  specification : {
    marginTop : 10,
    fontSize : 30,
    color : 'black',
   
  }
});

export default ProductDetailScreen;
