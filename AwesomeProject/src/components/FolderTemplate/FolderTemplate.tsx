import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Appbar, Button, IconButton, List, TextInput} from 'react-native-paper';
import { ScrollView } from 'react-navigation';
import GoalInput from '../AddGoal/GoalInput';
import AppsStyle from '../AppsStyle/AppsStyle';
import FolderTemplateGoalInput from './AttachmentTemplate/TemplatesComponent/FolderTemplateGoalInput';
import GenOutRemainderTemplate from './GenOutRemainderTemplate';

function FolderTemplate() {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

    const [showRemainderFirstPart, setShowRemainderFirstPart] = useState(false);
    function toggleRemainderFirstPart() {
        setShowRemainderFirstPart(!showRemainderFirstPart);
        setShowRemainderThirdPart(false);
        handlePress()
    }

  const [showRemainderThirdPart, setShowRemainderThirdPart] = useState(false);
  function toggleRemainderThirdPart() {
    setShowRemainderThirdPart(!showRemainderThirdPart);
      setShowRemainderFirstPart(false);
    handlePress()
  }

  return (
    /*This JSX tag's 'children' prop expects a single child of type 'ReactNode'*/
    <AppsStyle title={<Text></Text>}>
      <>
       
       <List.Section title="Let's Begin" titleStyle={styles.beginText}>
          <List.Accordion
            title="Please choose" /*left={props => <List.Icon {...props} icon="folder" />}*/
            expanded={expanded}
            onPress={handlePress}>
            <List.Item
              title={
                <TouchableOpacity 
                onPress={toggleRemainderThirdPart}
                >
                  <Text style={styles.targetPlan}>Set a goal</Text>
                </TouchableOpacity>
              }
            />
            <List.Item title={<Text>Add something you wish to do</Text>} />
            <List.Item
              title={
                <TouchableOpacity onPress={toggleRemainderFirstPart}>
                  <Text style={styles.targetPlan}>Build a My Remainder</Text>
                </TouchableOpacity>
              }
            />
          </List.Accordion>
        </List.Section>
        {showRemainderFirstPart && <GenOutRemainderTemplate />}
        {showRemainderThirdPart && <FolderTemplateGoalInput />}
       
    
      </>
    </AppsStyle>
  );
}

const styles = StyleSheet.create({
  beginText: {
    fontSize: 30,
  },
  targetPlan: {color: '#000000'},
});

export default FolderTemplate;
