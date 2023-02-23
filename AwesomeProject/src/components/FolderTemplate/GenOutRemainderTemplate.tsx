import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Appbar, Button, IconButton, List, TextInput} from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { postReminderThunk } from '../../redux/GoalItem/thunk';
import { useRootDispatch, useRootSelector } from '../../redux/store';
import { PurposeType } from '../models';
import AttachmentTemplate from './AttachmentTemplate/AttachmentTemplate';

function GenOutRemainderTemplate() {
    const selectedImage = useRootSelector(state => state.goalItem.input_image)
    const selectedImageName = useRootSelector(state => state.goalItem.input_imageName)
    const [folderNameText, setfolderNameText] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [showRemainderSecondPart, setShowRemainderSecondPart] = useState(false);
    const [attachmentTemplateList, setAttachmentTemplateList] = useState<JSX.Element[]>([])
    const attachmentArray: JSX.Element[] = []
    function toggleRemainderSecondPart() {
        setShowRemainderSecondPart(!showRemainderSecondPart)
    }
    // function ToggleBtnd() {
    //     return <TouchableOpacity style={styles.attachmentGrp} onPress={toggleRemainderSecondPart}>
    //     <IconButton icon="plus" iconColor='#ffffff' style={styles.controlBtns} ></IconButton>
    //     <Text style={{ color: "#000000" }}>Add attachment</Text>
    // </TouchableOpacity>
    // }
    function genOutTemplate() {
        setAttachmentTemplateList(attachment => [...attachment, <AttachmentTemplate />])
       
    }
    function deleteTemplate() {
        setAttachmentTemplateList(attachment =>  attachment.filter((_, i) => i !== i))
    //    setAttachmentTemplateList(attachmentTemplateList.filter((item)=> item.indexOf !== -1)
    }
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            folderName: "",
            title: "",
            description: "",
        },
        mode: "onSubmit"
    })
    const dispatch = useRootDispatch();
    return (
        <>
            <ScrollView style={styles.inputContainer}>
                <View style={styles.genOutTemplate}>
                    {/* <TextInput underlineColor='#ffffff' style={[styles.textInput, styles.folderNameInput]} label="Folder Name" value={folderNameText} onChangeText={text => setfolderNameText(text)} /> */}
                    {/* <TextInput underlineColor='#ffffff' style={[styles.textInput]} label="Title" value={title} onChangeText={text => setTitle(text)} /> */}
                    {/* <TextInput multiline={true} underlineColor='#ffffff' style={[styles.textInput, styles.descriptionInput]} label="Description" value={description} onChangeText={text => setDescription(text)} /> */}
                    <FormBuilder 
                        control={control}
                        setFocus={setFocus}
                        formConfigArray={[
                            {
                                type:'text',
                                name: 'folderName',
                                rules: {
                                    required: {
                                        value: true,
                                        message: "Please enter the folder name",
                                    }
                                },
                                textInputProps: {
                                    label: 'Folder Name',
                                    left: <TextInput.Icon icon={'folder'} />,
                                    // mode: 'flat',
                                
                                    underlineColor: '#ffffff',
                                  },
                            },
                            {
                                type: "text",
                                name: 'title',
                                rules: {
                                    required: {
                                        value: true,
                                        message: "Please enter the title",
                                    }
                                },
                                textInputProps: {
                                  label: 'Title',
                                  // mode: 'flat',
                                  underlineColor: '#ffffff',
                                  left: <TextInput.Icon icon={'folder'} />,
                                
                                },
                            },
                            {
                                type: 'text',
                                name: 'description',
                            
                                rules: {
                                  required: {
                                    value: false,
                                    message: '',
                                  },
                                },
                                textInputProps: {
                                  label: 'Description',
                                  // mode: 'flat',
                                  multiline: true,
                                  numberOfLines: 4,
                                  underlineColor: '#ffffff',
                                //   selectionColor:'#D2DAFF',

                                  left: <TextInput.Icon icon={'pen'} />,
                                },
                              },
                        ]}
                        />
                    <AttachmentTemplate />
                    <TouchableOpacity style={styles.attachmentGrp} onPress={genOutTemplate}>
                        <IconButton icon="plus" iconColor='#ffffff' style={styles.controlBtns} ></IconButton>
                        <Text style={{ color: "#000000" }}>Add attachment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.attachmentGrp} onPress={deleteTemplate}>
                        <IconButton icon="minus" iconColor='#ffffff' style={styles.controlBtns} ></IconButton>
                        <Text style={{ color: "#000000" }}>Delete attachment</Text>
                    </TouchableOpacity>
                        {attachmentTemplateList.map(item => <>{item}</>)}
                    {/* <TouchableOpacity style={styles.attachmentGrp} onPress={toggleRemainderSecondPart}>
                        <IconButton icon="minus" iconColor='#ffffff' style={styles.controlBtns} ></IconButton>
                        <Text style={{ color: "#000000" }}>Add attachment</Text>
                    </TouchableOpacity>
                    
                        {showRemainderSecondPart && <AttachmentTemplate />} */}

                </View>
                <Button
                    mode={'contained'}
                    onPress={handleSubmit(({title, description,folderName}) => {
                      console.log('onCreate', title, description,folderName);
                      const title_input = title;
                      const description_input = description;
                      dispatch(
                        postReminderThunk({
                          folderName: folderName,
                          type: PurposeType.setRemainder,
                          title: title_input,
                          cover_image: "",
                          description: description_input,
                          is_favourite: false,
                          selected_image: selectedImage,
                          image_name: selectedImageName,
                        }),
                      );
                      // dispatch(createGoalItem(data));
                      // console.log('dispatch', data);
                    })}>Create
                </Button>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    genOutTemplate: { 
        // width: "90%",
        // justifyContent: "center", alignItems: "center", 
    },
    textInput: { width: "50%", margin: 10, borderRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: "#D2DAFF",},
    folderNameInput:{width:"70%"},
    titleInput:{},
    descriptionInput:{ width: "80%", height: 150},
    attachmentGrp:{flexDirection:'row', alignItems:"center", justifyContent:"flex-start", marginRight:"60%"},
    controlBtns: {backgroundColor: "#000000", opacity: 0.7, width: 25, height: 25,
        borderRadius: 50,  margin: 10, justifyContent: "center", alignItems: "center",
    },
    inputContainer: {
        flex: 1,
        padding: 16,
        // justifyContent: "center",
        margin: 10,
        // alignItems: "center",
        borderBottomColor: '#cccccc',
      },
})

export default GenOutRemainderTemplate;
