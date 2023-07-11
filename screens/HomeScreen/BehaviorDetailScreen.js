import {View, Text, Button, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector, dispatch , useDispatch} from 'react-redux';
import { incrementBehavior, decrementBehavior } from '../../store/redux/users';


function BehaviorDetailScreen( {route, navigation} )
{

    const dispatch = useDispatch();

    const authToken = useSelector( (state) => state.authTokens.data[0]); 

    //const behaviorList = useSelector( (state) => state.users.users[0].behaviors);
    
    const userList = useSelector( (state) => state.users.users);
    const currUser = userList.filter(user => user.username == authToken.email);
    const behaviorList = currUser[0].behaviors;

    var behaviorIndex = 0;

    for (var i = 0; i < behaviorList.length ; i++)
    {                
        if (behaviorList[i].name == route.params.name) {
            behaviorIndex = i;
        }
    }



    const name = route.params.name;


    function decrementGoalCount() {
        dispatch(decrementBehavior(
            {
                username: authToken.email,
                behaviorName: name
            }
          ));
     }

     function incrementGoalCount() {
        dispatch(incrementBehavior(
            {
                username: authToken.email,
                behaviorName: name
            }
          ));
    }

    return (
        <View> 
        <Text>{behaviorList[behaviorIndex].name}</Text>
        <Text>{behaviorList[behaviorIndex].date}</Text>

        <View style={styles.buttonContainer}>
             <View style={styles.button} >
                <Button title="+" onPress={incrementGoalCount} color="black"/>
            </View>
            <Text>{behaviorList[behaviorIndex].count} / {behaviorList[behaviorIndex].goalCount}</Text>
            <View style={styles.button} >
                <Button title="-" onPress={decrementGoalCount} color="black"/>
            </View>
            </View>
        
        </View>
    )
}

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
        backgroundColor: '#FFFFFF',
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
  

export default BehaviorDetailScreen;