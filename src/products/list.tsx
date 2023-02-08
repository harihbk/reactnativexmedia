import React, { useState, useEffect } from 'react'
import { Image, Text, View, StyleSheet, FlatList, Dimensions } from 'react-native'
import { data } from "../mackdata/data"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { gql, useQuery } from '@apollo/client'


const width = Dimensions.get('screen').width / 2 - 8
const screenfn = Dimensions.get('screen')

const styles = StyleSheet.create({

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
    marginHorizontal: 3,
    borderRadius: 10,
    marginBottom: 15,
    padding: 1,
    //alignItems : 'center'
    width : '47%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardlist: {
    height: 225,
    backgroundColor: 'white',
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 5,
    padding: 1,
    alignItems: 'center'

  },
  topsection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginTop: 10,
  }

});


export default function List({ navigation, route }: { navigation: any, route: any }) {

  const [product, setProduct] = useState(data);
  const [numcol, setNumcol] = useState(2)

  const { id } = route.params


  const CHAPTERS_QUERY = gql`
    query product {
      product_template(where: {categ_id: {_eq: ${id}}}) {
        categ_id
        color
        description
        id
        name
      }
  } 
  `

  const { data, loading, error } = useQuery(CHAPTERS_QUERY)
  const product_template = data?.product_template || []

  const listview = () => {
    setNumcol(1)
  }

  // const imageurl = ;

  return (
    <SafeAreaView>

      <View style={styles.viewstyle}>
        <View style={styles.topsection}>
          <View style={{ marginRight: 10 }}><TouchableOpacity onPress={listview}><Icon name="list" size={18} /></TouchableOpacity></View>
          <View style={{ marginRight: 10 }}><TouchableOpacity onPress={() => setNumcol(2)}><Icon name="th-large" size={18} /></TouchableOpacity></View>
        </View>
        <FlatList
          style={{padding : 15}}
          data={product_template}
          columnWrapperStyle={{justifyContent: 'space-between'}}

          numColumns={numcol}
          key={numcol}
          renderItem={({ item }) => (
            <View style={numcol == 2 ? styles.cardgrid : styles.cardlist}>
              <TouchableOpacity style={{ flexDirection : 'column', alignItems : 'center', padding :2 }} onPress={() =>
                navigation.navigate('productdetail', { name: item })
              }>
                <Image resizeMode='contain' source={{ uri: `http://gmtnew.mo.vc/web/image?model=product.template&id=215&field=image_128` }} style={numcol == 2 ? styles.tinyLogogrid : styles.tinyLogolist}></Image>
                <Text numberOfLines={1} >{item.name}</Text>
                {/* <Text numberOfLines={1}>{item.id} </Text> */}
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>



  )
}
