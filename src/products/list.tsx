import React , { useState , useEffect } from 'react'
import { Image, Text, View  , StyleSheet  , FlatList, Dimensions} from 'react-native'
import { data } from "../mackdata/data"
import { TouchableOpacity } from 'react-native-gesture-handler';
const width = Dimensions.get('screen').width / 2 
const styles = StyleSheet.create({
    
    tinyLogo: {
      width: 200,
      height: 150
    },
    card : {
        height : 225,
        backgroundColor : 'white',
        marginHorizontal : 2,
        borderRadius : 10,
        marginBottom :20,
        padding : 10,
        width
    }
    
  });

  function Card(props:any){
    const { image , product } = props
    return (
        <View style={styles.card}>
            <View>
                <Text>dddsfds {width}</Text>
            </View>
        </View>
    );

  }

export default function List() {

    const [ product , setProduct ] = useState(data);

    useEffect(()=>{
        console.log(product);
        
    },[product])

  return (
      <TouchableOpacity >
          <View style={{ width : '100%', height : '100%' , backgroundColor : 'red'}}>
        {/* <Text style={{ fontSize : 26 , color : "black" , fontWeight : 500}}>Hi-Fi shop &amp; Service</Text> */}
       <FlatList numColumns={2} data={product}  renderItem={({item})=> <Card itm={item}/>}></FlatList>
      </View>
      </TouchableOpacity>
    
  )
}
