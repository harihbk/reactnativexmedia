import React, { useState } from 'react'
import { Text, FlatList, Pressable , View , Dimensions, TouchableOpacity, Image , ScrollView, Animated , useWindowDimensions} from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
//import { data as customimage } from "../mackdata/data"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import VideoPlayer from "./video"
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

const width = Dimensions.get('screen').width / 2 - 10





const CHAPTERS_QUERY = gql`
  query category {
    product_category {
        complete_name
        id
        name
    }  
} 
`

const CHAPTERS_BANNER = gql`
query banner { 
  brand_banner {
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

const styles = StyleSheet.create({
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
    width: '100%',
    height: 180,


  },
  tinyLogolist: {
    width: 300,
    height: 150
  },
  viewstyle: {
    padding: 5,
    paddingHorizontal: 10,
  },
  innerview: {
    borderRadius: 12,
    // alignItems : 'center', 
    borderWidth: 0.25,
    padding: 5,

  },
  cardgrid: {
    height: 225,
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 20,
    padding: 1,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  cardlist: {
    height: 225,
    backgroundColor: 'white',
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 10,
    padding: 4,
    alignItems: 'center'

  },
  topsection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginTop: 10,
  },
  videoContainer: {
    backgroundColor: 'white',
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },


  imageContainer: {
    backgroundColor: 'white',
    height: 300,
    width: '95%',
    paddingBottom: 10
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

  }
})

const ChapterItem = ({ chapter, onPress, navigation }: { chapter: any, onPress: any, navigation: any }) => {
  const { complete_name, id, name } = chapter
  let header, subheader



  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.header}>{complete_name}</Text>
    </Pressable>
  )
}


export default function index({ navigation }: { navigation: any }) {
  const [numcol, setNumcol] = useState(2)
  const navigationpush = useNavigation();
  const [scrollY, setScrollY] = useState(new Animated.Value(0));


  /**
   * Carousal
   * **/
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  /**
   * Carousal
   * **/

  const _renderItem = ({ item, index }: { item: any, index: number }) => {
    if (item.type === 'video') {
      return (
        <View style={styles.imageContainer}>
         
          <VideoPlayer source={require("../assets/ezgif.com-resize-1-2.mp4")} />  
        </View>
      );
    }
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.url }} style={{ width: windowWidth, height: 300, alignItems: 'center', justifyContent: 'center' }} />
      </View>
    );
  };


  const { data, loading, error } = useQuery(CHAPTERS_QUERY)
  const { data: bannerdata, loading: bannerloading, error: bannererror } = useQuery(CHAPTERS_BANNER)

  const datacarousal = [
    {
      type: 'video',
      url: "../assets/ezgif.com-resize-1-2.mp4"
    }
  ];

  bannerdata?.brand_banner?.map((res: any) => {
    let obj = { type: "image", url: `https://gmtnew.mo.vc/web/image?model=brand.banner&id=${res.id}&field=brand_image&unique=02072023161311` }
    datacarousal.push(obj)

  })

  console.log(datacarousal);


  return (
    //  <Text>sf</Text>
    <View style={styles.viewstyle}>
 <ScrollView >
      <Carousel

        data={datacarousal}
        renderItem={_renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        onSnapToItem={(index: any) => setActiveIndex(index)}
      />

      <View style={{ height: 4, position: 'relative', backgroundColor: 'red' }}>
        <Pagination
          style={{ position: "relative", padding: 0, margin: 0, }}
          dotsLength={3}
          activeDotIndex={activeIndex}
          containerStyle={{ position: "absolute" }}
          dotStyle={{ color: 'red' }}
          // inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>


      <View style={styles.topsection}>
        <View style={{ marginRight: 10 }}><TouchableOpacity onPress={() => setNumcol(1)}><Icon name="list" size={18} /></TouchableOpacity></View>
        <View style={{ marginRight: 10 }}><TouchableOpacity onPress={() => setNumcol(2)}><Icon name="th-large" size={18} /></TouchableOpacity></View>
      </View>
      <FlatList
      style={{ padding : 5 }}
        data={data?.product_category}
        numColumns={numcol}
        key={numcol}
        renderItem={({ item }) => (

          <TouchableOpacity style={numcol == 2 ? styles.cardgrid : styles.cardlist}  onPress={() =>
            // StackActions.push('product', {id: item?.id})
            navigation.navigate('product', { id: item?.id })
          }>
            <View style={{ flexDirection: 'column', alignItems: 'center', width : '100%' }}>

              <Image  resizeMode='contain'source={{ uri: `https://gmtnew.mo.vc/web/image?model=product.category&id=${item.id}&field=image_1920` }} style={numcol == 2 ? styles.tinyLogogrid : styles.tinyLogolist}></Image>

              {/* <Image source={customimage[0].image} style={ numcol == 2 ? styles.tinyLogogrid : styles.tinyLogolist }></Image> */}
              <Text numberOfLines={1} style={{ padding: 10 }}>{item.name}</Text>

            </View>
          </TouchableOpacity>


        )}
        keyExtractor={(chapter) => chapter.id.toString()}
      />
      </ScrollView>
    </View>
  )
}
