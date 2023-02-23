import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert,} from 'react-native';
import Sound from 'react-native-sound';

const resultIcons = {
    '': '',
    pending: '?',
    playing: '\u25B6',
    win: '\u2713',
    fail: '\u274C',
  };
  const audioTests = [
  //   {
  //     title: 'mp3 in bundle',
  //     url: 'advertising.mp3',
  //     basePath: Sound.MAIN_BUNDLE,
  //   },
  //   {
  //     title: 'mp3 in bundle (looped)',
  //     url: 'advertising.mp3',
  //       basePath: Sound.MAIN_BUNDLE,
  //     //@ts-ignore
  //     onPrepared: (sound, component) => {
  //       sound.setNumberOfLoops(-1);
  //       component.setState({loopingSound: sound});
  //     },
  //   },
    {
      title: 'test attachment 1',
      isRequire: true,
      url: require('./voice_1.mp3'),
    },
    //   {
    //     title: 'mp3 via require()',
    //     isRequire: true,
    //     url: require('./advertising.mp3'),
    //   },
    //   {
    //     title: 'mp3 remote download',
    //     url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
    //   },
    //   {
    //     title: 'mp3 remote - file doesn\'t exist',
    //     url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/file-not-here.mp3',
    //   },
    //   {
    //     title: 'aac remote download',
    //     url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac',
    //   },
    //   {
    //     title: 'wav remote download',
    //     url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/frog.wav',
    //   },
  
    //   {
    //     title: 'wav via require()',
    //     isRequire: true,
    //     url: require('./frog.wav'),
    //   },
  ];

const Button = ({title, onPress}: any) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);
const Header = ({children, style}: any) => (
  <Text style={[styles.header, style]}>{children}</Text>
);
const Feature = ({title, onPress, buttonLabel = 'PLAY', status}: any) => (
  <View style={styles.feature}>
    <Header style={{flex: 1}}>{title}</Header>
    {
      //@ts-ignore
      status ? (<Text style={{padding: 5}}>{resultIcons[status] || ''}</Text>
      ) : null
    }
    <Button title={buttonLabel} onPress={onPress} />
  </View>
);

function setTestState(title: any, component: any, status: any) {
  component.setState({tests: {...component.state.tests, [title]: status}});
}

/**
 * Generic play function for majority of tests
 */
function playSound(title: any, component: any) {
    let sound: any;
    sound = new Sound(title.url, error => callback(error, sound));
  // If the audio is a 'require' then the second parameter must be the callback.
  //     if (testInfo.isRequire) {
  //       //@ts-ignore
  //     const sound = new Sound(testInfo.url, error => callback(error, sound));
  //     } else {
  //         //@ts-ignore
  //     const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
  //   }
  setTestState(title, component, 'pending');

  // const [test, setTest] = useState(...)
  // setTest({...test,  [testInfo.title]: 'pending'})
  //@ts-ignore
  const callback = (error, sound) => {
    if (error) {
      Alert.alert('error', error.message);
      setTestState(title, component, 'fail');
      return;
    }
    setTestState(title, component, 'playing');
    // Run optional pre-play callback
    // testInfo.onPrepared && testInfo.onPrepared(sound, component);
    sound.play(() => {
      // Success counts as getting to the end
      setTestState(title, component, 'win');
      // Release when it's done so we're not using up resources
      sound.release();
    });
  };
}

class MainView extends Component<{ key: string; title: string; url:string }, any> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      loopingSound: undefined,
      tests: {},
    };
    Sound.setCategory('Playback', true); // true = mixWithOthers

    // Special case for stopping
    //@ts-ignore
    this.stopSoundLooped = () => {
      //@ts-ignore
      if (!this.state.loopingSound) {
        return;
      }
      //@ts-ignore
      this.state.loopingSound.stop().release();
      //@ts-ignore
      this.setState({
        loopingSound: null,
        tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'},
      });
    };
  }

  render() {
    //   this.props.key
    return (
      <View style={styles.container}>
        {/* <Header style={styles.title}>react-native-sound-demo</Header> */}
        <Feature
          status={this.state.tests[this.props.title]}
        //   key={this.props.title} 
                title={this.props.title}
                url={this.props.url}
          onPress={() => {
            return playSound(this.props.title, this);
          }}/>
            {//@ts-ignore
                    <Feature title={this.props.title} buttonLabel={'STOP'} onPress={this.stopSoundLooped} />
                }
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
          {audioTests.map(testInfo => {
            return (
                //@ts-ignore
              <Feature status={this.state.tests[testInfo.title]} key={testInfo.title} title={testInfo.title} onPress={() => { return playSound(testInfo, this); }} /> );})}
              
                {//@ts-ignore
                    <Feature title="mp3 in bundle (looped)" buttonLabel={'STOP'} onPress={this.stopSoundLooped} />
                }
        </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
          flex: 1,
        backgroundColor:"#000000"
    },
    scrollContainer: {
      backgroundColor: '#000000',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 30,
      padding: 20,
      textAlign: 'center',
      backgroundColor: 'rgba(111,111,111,1)',
    },
    button: {
      fontSize: 20,
      backgroundColor: 'rgba(000,000,000,1)',
      // backgroundColor: 'rgba(220,220,220,1)',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'rgba(80,80,80,0.5)',
      overflow: 'hidden',
      padding: 7,
    },
    header: {
      textAlign: 'left',
    },
    feature: {
      flexDirection: 'row',
      padding: 10,
      alignSelf: 'stretch',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: 'rgb(180,180,180)',
      borderBottomWidth: 1,
      borderBottomColor: 'rgb(230,230,230)',
    },
  });

export default MainView;
