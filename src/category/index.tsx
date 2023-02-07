import React, { useState } from 'react'
import { Text, FlatList, Pressable , View , Dimensions, TouchableOpacity, Image} from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { data as customimage } from "../mackdata/data"
import Carousel from 'react-native-snap-carousel';
import VideoPlayer from "./video"

const width = Dimensions.get('screen').width / 2 - 8 


const datacarousal = [
    { 
      type: 'video',
      url : "../assets/ezgif.com-resize-1-2.mp4"
    //  url: 'https://gmtengineers.com/wp-content/uploads/2019/11/ezgif.com-resize-1-2.mp4'
    },
    {
      type: 'image',
      url: 'https://gmtengineers.com/wp-content/uploads/2019/10/machine-13-1-768x384.jpg'
    }
  ];


const CHAPTERS_QUERY = gql`
  query category {
    product_category {
        complete_name
        id
        name
    }  
} 
`

 
 const PINK = '#ff5dc8'

 const screenOptions = {
  headerStyle: {
    backgroundColor: PINK,
  },
  headerTintColor: '#fff',
}

const styles =  StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  header: {
    fontWeight: 'bold',
  },
  subheader: {
    paddingTop: 10,
  },
  tinyLogogrid: { 
    width: 180,
    height: 180,
   
    
  },
  tinyLogolist: { 
    width: 300,
    height: 150
  },
  viewstyle : {
    padding : 5 ,
  
  },
  innerview:{
    borderRadius : 12, 
   // alignItems : 'center', 
    borderWidth : 0.25 ,
    padding : 5,

  },
  cardgrid : { 
      height : 225,
      backgroundColor : 'white',
      marginHorizontal : 2,
      borderRadius : 10,
      marginBottom :10,
      padding : 1,
      //alignItems : 'center'
      width,
      alignItems : 'center',
      justifyContent : 'center'
  },
  cardlist : { 
    height : 225,
    backgroundColor : 'white',
    marginHorizontal : 2,
    borderRadius : 10,
    marginBottom :10,
    padding : 1,

    alignItems : 'center'
    
},
  topsection : {
    flexDirection : 'row',
    justifyContent : 'flex-end' ,
    marginBottom: 10,
    marginTop: 10,
  },
  videoContainer: {
    backgroundColor: 'red',
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: 'white',
    height: 300,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    
  }
}) 

const ChapterItem = ({ chapter, onPress , navigation} : { chapter:any , onPress : any ,navigation: any }) => {
    const { complete_name, id , name } = chapter
    let header, subheader
  
    // if (number) {
    //   header = `Chapter ${number}`
    //   subheader = title
    // } else {
    //   header = title
    // }
  
    return (
      <Pressable style={styles.item} onPress={onPress}>
        <Text style={styles.header}>{complete_name}</Text>
      </Pressable>
    )
  }


export default function index({navigation}:{navigation : any}) {
    const [ numcol , setNumcol ] = useState(2)

        /**
         * Carousal
         * **/
    const [activeIndex, setActiveIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;
        /**
         * Carousal
         * **/

    const _renderItem = ({ item, index } : { item :any , index : number }) => {
    if (item.type === 'video') {
        return (
           <View style={styles.imageContainer}>
              <VideoPlayer source={require("../assets/ezgif.com-resize-1-2.mp4")} />
           </View>
        ); 
    }
    return (  
         <View style={styles.imageContainer}>
        <Image source={{ uri: item.url }} style={{ width: windowWidth, height: 300 , alignItems : 'center' , justifyContent :'center'}} />
         </View>
    );
    };

    
    const { data, loading , error } = useQuery(CHAPTERS_QUERY)
     console.log(loading);  
      
  return ( 
    //  <Text>sf</Text>
    <View style={styles.viewstyle}> 

<Carousel

      data={datacarousal}
      renderItem={_renderItem}
      sliderWidth={windowWidth}
      itemWidth={windowWidth}
      onSnapToItem={(index: React.SetStateAction<number>) => setActiveIndex(index)}
    />

    <View style={styles.topsection}>
    <View style={{ marginRight: 10 }}><TouchableOpacity onPress={()=>setNumcol(1)}><Icon name="list" size={18}  /></TouchableOpacity></View> 
    <View style={{ marginRight: 10 }}><TouchableOpacity onPress={()=>setNumcol(2)}><Icon name="th-large" size={18}  /></TouchableOpacity></View> 
    </View> 
    <FlatList
    data={data?.product_category}
    numColumns={numcol} 
    key={numcol}
    renderItem={({ item }) => (
       
        <View style={ numcol == 2 ? styles.cardgrid : styles.cardlist}>
          <TouchableOpacity onPress={() =>
            navigation.navigate('product', {id: item?.id})
            }>

     <Image source={{ uri :`https://gmtnew.mo.vc/web/image?model=product.category&id=${item.id}&field=image_1920`}} style={ numcol == 2 ? styles.tinyLogogrid : styles.tinyLogolist }></Image>

            {/* <Image source={customimage[0].image} style={ numcol == 2 ? styles.tinyLogogrid : styles.tinyLogolist }></Image> */}
            <Text numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        </View> 
      
   
    )}
    keyExtractor={(chapter) => chapter.id.toString()}
  />
    </View>
  )
}
