import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

function WebLinkTemplate() {
//   getLinkPreview('https://www.youtube.com/watch?v=MejbOFk7H6c').then(data =>
//     console.debug(data),
//   );

  return (
    <View>
      {/* <Text style={styles.test}>Web link test</Text> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  test: {color: '#000000', fontSize: 20},
});

export default WebLinkTemplate;
