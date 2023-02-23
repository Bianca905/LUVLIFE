import React, {useState} from 'react';
import {Image, StyleSheet, Text, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getSelectedImage } from '../../../../redux/GoalItem/Slice';
import { useRootDispatch } from '../../../../redux/store';


function MemoTemplate() {
  const [URI, setURI] = useState('');
  const dispatch = useRootDispatch();
  const ImagePickerHandler = async () => {
    // console.log("hi")
    const result: any = await launchImageLibrary({mediaType: 'photo'});
    console.log(
      'check selected image',
      result.assets[0].fileName,
      result.assets[0].uri,
    );
    setURI(result.assets[0].uri);
    dispatch(getSelectedImage({image_uri: result.assets[0].uri }));
  };
  return (
    <View>
      <Text style={styles.test}>Memo test with image</Text>
      {URI ? <Image style={styles.image} source={{ uri: URI }} /> : <></>}
      <TouchableOpacity style={styles.image} onPress={ImagePickerHandler}>
        <Text>Select Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {color: '#000000', fontSize: 20},
  image: {
    width: 100,
    borderWidth: 1,
    height: 50,
  },
});

export default MemoTemplate;
