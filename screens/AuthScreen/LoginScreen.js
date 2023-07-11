import { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { login } from '../../util/auth';
import { useSelector, dispatch , useDispatch} from 'react-redux';
import { authenticateAuthTokens, logoutAuthTokens } from '../../store/redux/authTokens';
import { addUser } from '../../store/redux/users';



function LoginScreen() {


  const authToken = useSelector( (state) => state.authTokens.data[0]); 

  const dispatch = useDispatch();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const data = await login(email, password);
      
      console.log(data.idToken);

      dispatch(addUser(
        {
          username: data.email,
        }
      ));
       
      
      dispatch(authenticateAuthTokens(
        {
          token: data.idToken,
          email: data.email
        }
      ));





    } catch (error) {
      console.log(error);
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;