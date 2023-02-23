
// import {FlatList} from 'react-native'
// import DailyFolder from './DailyFolders';

// function renderFolder(itemData: { item: { id: number, name: string, image: string }}) {
//     return <DailyFolder id={itemData.item.id} name={itemData.item.name} image={itemData.item.image} />
// }

// async function FolderList() {
//     const res = await fetch("/core/getFolder");
//     const { data } = await res.json();
//   return (
//       <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderFolder} />
//   )
// }

// export default FolderList