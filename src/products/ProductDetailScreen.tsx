import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet , Dimensions , Modal, TouchableOpacity, ScrollView } from 'react-native';
import { data } from "../mackdata/data"
import Table from './table';
import { gql, useQuery } from '@apollo/client'
import { Button } from 'react-native-paper';
import { Alert } from 'native-base';
 import Share from 'react-native-share';
// import ContextMenu from "react-native-context-menu-view";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import YoutubePlayer from "react-native-youtube-iframe";
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';
import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import { Linking } from 'react-native';


const windowWidth = Dimensions.get('window').width;

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';



export default function  ProductDetailScreen({ route, navigation } :  { route:any, navigation :any} ){
  const [showMenu, setShowMenu] = React.useState(false);
  const [ items , setItems ] = React.useState([])
  const [playing, setPlaying] = useState(false);


   const { params : { name } } = route
   console.log("haris",name.id);
   const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

   const onClose = () => {
    setShowMenu(false);
  };
  
  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
     
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


    const CHAPTERS_QUERY322 = gql`
    query MyQuery { 
      product_template(where: {id: {_eq: ${name.id}}}) 
      { 
        id 
        name 
        website_meta_title 
        ir_attachment_product_template_rels 
        { ir_attachment_id } 
      }  
    }
   `;

   const CHAPTERS_QUERY= gql`
   { 
    product_template(where: {id: {_eq: ${name.id}}}) 
    { 
      id 
      name 
      ir_attachment_product_template_rels 
      { ir_attachment_id product_template_id 
        ir_attachment_name { name } } } }
  `;

   



   const CHAPTERS_QUERY3 =  gql`
   query MyQuery3 {
    product_image(where: {product_tmpl_id: {_eq: ${name.id}}}) {
      id
      name
      product_tmpl_id
      video_url
      types
    }
  }
  `;
 
   
  
    const { data, loading , error } = useQuery(CHAPTERS_QUERY)

    const { data : productdata, loading : productloading , error : producterror } = useQuery(CHAPTERS_QUERY3)
    console.log(productdata);
    
    const datacarousal = productdata?.product_image?.map((res:any)=>({id:res.id,type:res.types,url:res.video_url?.split("=")[1]}))
    console.log(datacarousal);


    const ff = data?.product_template?.[0]?.['ir_attachment_product_template_rels']; 
    var hh = ff ?? [];
     hh = JSON.parse(JSON.stringify((hh)))
   // let gh = hh.map((res:any)=>(res['title'] = `https://gmtnew.mo.vc/web/image?model=ir.attachment&id=${res.ir_attachment_id}&field=datas`) )
    
     hh = hh.map((res:any)=>({title : `https://gmtnew.mo.vc/web/image?model=ir.attachment&id=${res.ir_attachment_id}&field=datas` , name : res?.ir_attachment_name?.name }) )

     console.log("hari");
     
  console.log(hh);
  console.log("hari");






  
  const sharepdf = async (pdf:any) => {

    let imagePath: string  = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', pdf)
      .then((resp) => {
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async (base64Str) => {
        const content = `Sharing Link ${pdf}`;
        const base64Data = `data:application/pdf;base64,${base64Str}`;
   
        const shareOption = {
          message:content,
          url: base64Data,
          title: 'This is title',
          type: 'application/pdf',
        };
        await Share.open(shareOption);
        return RNFetchBlob.fs.unlink(imagePath);
      });
 
  };
 

const sharepdfsd = (pdf:any) => {



//   RNFetchBlob.config({
//     fileCache: true,
//     addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: `${RNFetchBlob?.fs?.dirs?.DownloadDir}/file.pdf`,
//         description: 'PDF file',
//     },
// })
// .fetch('GET', pdf)
// .then((res:any) => {

//   RNFetchBlob.fs
//   .readFile(res, 'base64')
//   .then((data) => {
    
//     const shareOptions = {
//       title: 'Share via',
//       message: "Copy Url",
//       url: data,
//       social: Share.Social.WHATSAPP,
//     };
    
//     Share.open(shareOptions)
//       .then((res) => { console.log(res) })
//       .catch((err) => { err && console.log(err); });
//   })
//   .catch((err) => {
//     console.log(err);
    
//   });
  
  
//   console.log('File downloaded to: ', res.path());
// })
// .catch((error) => {
//     console.log('Error downloading file: ', error);
// });






}




// const downloadPDF = async (res:any) => {
//   console.log("harinila");
//   console.log(res);
  
   
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       {
//         title: 'Storage Permission Required',
//         message: 'This app needs access to your device storage to download the PDF.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       const response = await fetch(res.title);
//       const fileUri = `${RNFS.DocumentDirectoryPath}/${res.name}`;
//       await RNFS.writeFile(fileUri, await (response as any).blob(), 'base64');
//       return fileUri;
//     } else {
//       console.log('Storage permission denied');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };



const downloadPDF = async (res:any) => {
  console.log(res);
  
  try {
    const supported = await Linking.canOpenURL(res.title);
    console.log(supported);
    
    if (supported) {
      await Linking.openURL(res.title);
    } else {
      console.log('Cannot open the PDF file.');
    }
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }


//   RNFetchBlob.config({
//     fileCache: true,
//     addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: `${RNFetchBlob?.fs?.dirs?.DownloadDir}/${res.name}`,
//         description: 'PDF file',
//     },
// })
// .fetch('GET', res.title)
// .then((res) => {
  

//     console.log('File downloaded to: ', res.path());
// })
// .catch((error) => {
//     console.log('Error downloading file: ', error);
// });
}

// const downloadPDF = (url:any) => {
//   const dirs = RNFetchBlob.fs.dirs;
//   RNFetchBlob
//     .config({
//       fileCache: true,
//       addAndroidDownloads : {
//         useDownloadManager : true,
//         notification : true,
//         path: dirs.DownloadDir + '/file.pdf',
//         description : 'Downloading PDF'
//       }
//     })
//     .fetch('GET', url, {})
//     .then((res:any) => {
//       console.log('The file saved to ', res.path());
//     });
// };

const _renderItem = ({ item, index }: { item: any, index: number }) => {
  if (item.type === 'video') {
    return (
      <View style={styles.imageContainer}>
        <YoutubePlayer
        height={300}
        play={playing}
        videoId={item.url}
        onChangeState={onStateChange}
      /> 
      </View>
    );
  }
  return (
    <View style={styles.imageContainer}>
            <Image source={{ uri :`https://gmtnew.mo.vc/web/image?model=product.image&id=${item?.id}&field=image_1920`}} style={styles.image}></Image>

      {/* <Image source={{ uri: `` }} style={{ width: windowWidth, height: 300, alignItems: 'center', justifyContent: 'center' }} /> */}
    </View>
  );
};


 
  return (
    <ScrollView >
    <View style={styles.container}>

{/* <View style={{  backgroundColor : 'white' }}> */}




      <Carousel

        data={datacarousal}
        renderItem={_renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        //onSnapToItem={(index: any) => setActiveIndex(index)}
      />




<View style={{  flexDirection  : 'row' , justifyContent : 'space-between'  }}>
    
    <View  >
      <Menu style={{ justifyContent : 'flex-end' , alignItems : 'flex-end' }}>
        <MenuTrigger text='Clik to share PDF' 
        style={{
          marginTop : -50,
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
              <Text style={{color: 'blue'}} onPress={() => sharepdf(res.title)} onLongPress={()=>console.log('Long Press')}>{res.name}</Text>
          </MenuOption>
        </>
          ))    
        }
        </MenuOptions>
      </Menu>
    </View>


    <View >
      <Menu style={{ justifyContent : 'flex-end' , alignItems : 'flex-end' }}>
        <MenuTrigger text='Clik to Download' 
        style={{
          marginTop : -50,
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
              <Text style={{color: 'blue'}} onPress={() => downloadPDF(res)} >{res.name}</Text>
          </MenuOption>
        </>
          ))    
        }
        </MenuOptions>
      </Menu>
    </View>  
  </View>   


    {/* </View> */}




      <View style={{ alignItems : 'center', display : 'flex' }}>
      {/* <Image source={{ uri :`https://gmtnew.mo.vc/web/image?model=product.template&id=${name?.id}&field=image_1920`}} style={styles.image}></Image> */}

          <Text style={styles.name}>{name?.name} {name?.id}</Text>
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
    </ScrollView>
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
  imageContainer: {
    backgroundColor: 'white',
    height: 300,
    width: '90%',
    paddingBottom: 10
  },
});

