import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector, dispatch , useDispatch} from 'react-redux';
import { addBehavior, removeBehavior } from '../../store/redux/behaviors';
import { addUserBehavior } from '../../store/redux/users';
import { set } from 'react-native-reanimated';


export default function BehaviorFormScreen( {route, navigation} )
{

  const [ date, setDate ] = useState(null);

  const dispatch = useDispatch();

  useEffect( () => {
    let today = new Date();
    let date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
    setDate(date);
  }, []);
        const behaviorList = useSelector((state) => state.behaviors.behaviors);

        const behaviorName = route.params.behaviorName;

        const authToken = useSelector( (state) => state.authTokens.data[0]); 


    const [enteredName, setEnteredName] = useState(behaviorName);

    const [enteredNote, setEnteredNote] = useState('');
    
    const [enteredIcon, setEnteredIcon] = useState('');
    const [enteredGoalCount, setEnteredGoalCount] = useState('');
    const [type, setType] = useState(behaviorName)

    function nameInputHandler(enteredName) {

      setEnteredName(enteredName);
    
      };

      function noteInputHandler(enteredNote) {

        setEnteredNote(enteredNote);
      
        };

    function iconInputHandler(enteredIcon) {

  
        setEnteredIcon(enteredIcon);
  
      
        };

      function goalCountInputHandler(enteredGoalCount) {

    
          setEnteredGoalCount(enteredGoalCount);
        
          };

 
      function addBehaviorHandler() {
         /*dispatch(addBehavior(
           {
             id: Math.random().toString(),
             name: enteredName,
             icon: enteredIcon,
             count: 0,
             goalCount: enteredGoalCount,
             memo: "",
             date: date,
             type: type
           }
         ));*/


         dispatch(addUserBehavior(
          {
            username: authToken.email,
            id: Math.random().toString(),
            name: enteredName,
            icon: enteredIcon,
            count: 0,
            goalCount: enteredGoalCount,
            memo: "",
            date: date,
            type: type
          }
        ));
         

         navigation.navigate("HomeScreen");

      }

      function cancelBehaviorHandler() {
        navigation.goBack();
      }

    return (
        <View style ={styles.inputContainer}>
          <Text style ={styles.textStyle}>Name</Text>
         { (behaviorName == "New") && (<TextInput 
        style={styles.textInput} 
        placeholder={behaviorName}
        defaultValue={behaviorName}

         onChangeText={nameInputHandler}
         value={enteredName}
         />)
         }
        { (behaviorName != "New") && (
          <Text>{behaviorName}</Text>
         ) }
        
        <Text style ={styles.textStyle}>Note</Text>
        <TextInput 
        style={styles.textInput} 
        placeholder={enteredNote}
        defaultValue={enteredNote}

         onChangeText={noteInputHandler}
         value={enteredNote}
         />
         <Text style ={styles.textStyle}>Icon and Color</Text>
         <TextInput 
        style={styles.textInput} 

        onChangeText={iconInputHandler}
         value={enteredIcon}
         />
         <Text style ={styles.textStyle}>Goal and Goal Period</Text>
         <TextInput 
        style={styles.textInput} 

        onChangeText={goalCountInputHandler}
         value={enteredGoalCount}
         />


         <View style={styles.buttonContainer}>
             <View style={styles.button} >
                <Button title="Submit" onPress={addBehaviorHandler} color="black"/>
            </View>

        </View>
      </View>
    )
};

const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: 'white'
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#F0F0F0',
      backgroundColor: '#F0F0F0',
      color: '#120438',
      borderRadius: 6,
      width: '100%',
      padding: 8
    },
    buttonContainer: {
        marginTop: 16,
        backgroundColor: '#F0F0F0',
        flexDirection: "row",
    },
    button: {
        width: 100,
        marginHorizontal: 8
    },
    textStyle: {
      fontWeight: 'bold',
      padding: 10
    }
  });
  