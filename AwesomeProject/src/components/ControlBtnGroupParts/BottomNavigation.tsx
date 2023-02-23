import * as React from 'react';
import {StyleSheet} from 'react-native';
import {BottomNavigation, Text} from 'react-native-paper';
import AddGoal from '../../screens/AddGoal';
import Daily from '../../screens/DailyRoute';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import FolderTemplate from '../FolderTemplate/FolderTemplate';

const Stack = createStackNavigator();
const HomeRoute = () => <Home />;

const DailyRoute = () => <Daily />;

const GoalsRoute = () => <AddGoal />;

const ProfileRoute = () => <Profile />;

const BottomNavigation123 = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home'},
    {key: 'daily', title: 'Daily', focusedIcon: 'star', unfocusedIcon: 'star'},
    {
      key: 'goals',
      title: 'Goals',
      focusedIcon: 'trophy',
      unfocusedIcon: 'trophy',
    },

    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    daily: DailyRoute,
    goals: GoalsRoute,
    profile: ProfileRoute,
  });

  return (
    <>
      {/* <Stack.Navigator>
        <Stack.Screen name="Folder" component={FolderTemplate} />
        <Stack.Screen name="Test" component={AddGoal} />
      </Stack.Navigator> */}
      {/* <BottomNavigation
        inactiveColor="#FFFBEB"
        activeColor="#FFFBEB"
        barStyle={styles.bottomNavigationBar}
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
 */}
      
    </>
  );
};

const styles = StyleSheet.create({
  bottomNavigationBar: {backgroundColor: '#263159'},
});

export default BottomNavigation123;
