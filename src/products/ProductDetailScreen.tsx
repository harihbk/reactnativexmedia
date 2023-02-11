import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet , Dimensions , Modal, TouchableOpacity } from 'react-native';
import { data } from "../mackdata/data"
import Table from './table';
import { gql, useQuery } from '@apollo/client'
import { Button } from 'react-native-paper';
import { Alert } from 'native-base';
import Share from 'react-native-share';
// import ContextMenu from "react-native-context-menu-view";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';



export default function  ProductDetailScreen({ route, navigation } :  { route:any, navigation :any} ){
  const [showMenu, setShowMenu] = React.useState(false);
  const [ items , setItems ] = React.useState([])

   const { params : { name } } = route
   console.log("haris",name.id);
   const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

   const onClose = () => {
    setShowMenu(false);
  };


    const CHAPTERS_QUERY = gql`
    query MyQuery { 
      product_template(where: {id: {_eq: 182}}) 
      { 
        id 
        name 
        website_meta_title 
        ir_attachment_product_template_rels 
        { ir_attachment_id } 
      }  
    }
   `;

   
  
    const { data, loading , error } = useQuery(CHAPTERS_QUERY)
    const ff = data?.product_template?.[0]?.['ir_attachment_product_template_rels']; 
    var hh = ff ?? [];
     hh = JSON.parse(JSON.stringify((hh)))
    let gh = hh.map((res:any)=>(res['title'] = `https://gmtnew.mo.vc/web/image?model=ir.attachment&id=${res.ir_attachment_id}&field=datas`) )
    
    console.log(hh);
  

 

const sharepdf = (pdf:any) => {
  const shareOptions = {
    title: 'Share via',
    message: "Copy Url",
    url: pdf,
    social: Share.Social.WHATSAPP,
  };
  
  Share.open(shareOptions)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
}
 
  return (
    <View style={styles.container}>

<View style={{  backgroundColor : 'white' }}>
    <Menu style={{ justifyContent : 'flex-end' , alignItems : 'flex-end' }}>
      <MenuTrigger text='Clik to share PDF' 
      style={{
        backgroundColor : '#FFD580',
        padding: 10,
        borderRadius : 10
      }}
      
      />
      <MenuOptions>
      {  
        hh.length > 0 && hh.map((res:any)=>(
          <>
        <MenuOption >
            <Text style={{color: 'blue'}} onPress={() => sharepdf(res.title)} onLongPress={()=>console.log('Long Press')}>{res.title}</Text>
        </MenuOption>
       </>
        ))    
      }
      </MenuOptions>
    </Menu>
  </View>

      <View style={{ alignItems : 'center', display : 'flex' }}>
      <Image source={{ uri :`https://gmtnew.mo.vc/web/image?model=product.template&id=${name?.id}&field=image_1920`}} style={styles.image}></Image>

          {/* <Image source={ data?.product_template?.image } style={styles.image} /> */}
          <Text style={styles.name}>{name?.name} {name?.id}</Text>
          {/* <Text style={styles.description}>{name?.description} -- {name?.id}</Text> */}
      </View>
      
      <View >
        <Text style={styles.specification}>Specifications</Text>
        <Table />



{/* 
        <ContextMenu
      actions={[{ title: "Title 1" }, { title: "Title 2" }]}
      onPress={(e) => {
        sharepdf(e.nativeEvent.name)
        // console.warn(
        //   `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
        // );
      }}
    >
    
      <Button >Share</Button>
    </ContextMenu> */}

       
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
    backgroundColor : '#fff',
    
  },
  pdfdesign:{
    backgroundColor  : '#ADD8E6',
   
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50, 
    backgroundColor: '#ecf0f1',
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
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
   
  },
  menuContainer: {
    backgroundColor: 'red',
    borderRadius: 4,
    padding: 8,
    position: 'absolute',
    top: 40,
    right: 20,
    elevation: 4,
  },
  menuItem: {
    padding: 8,
    fontSize: 18,
  },
});

