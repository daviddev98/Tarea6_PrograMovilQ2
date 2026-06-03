import { Text, View } from 'react-native';
import { commonStyles } from '../styles/common';

export default function LoginScreen() {
  return (
    <View style={commonStyles.screen}>
      <Text style={commonStyles.title}>Login</Text>
      <Text style={commonStyles.subtitle}>
        Pantalla de autenticación.
      </Text>
    </View>
  );
}
