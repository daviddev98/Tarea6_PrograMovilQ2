import { Text, View } from 'react-native';
import { commonStyles } from '../styles/common';

export default function HomeScreen() {
  return (
    <View style={commonStyles.screen}>
      <Text style={commonStyles.title}>Home</Text>
      <Text style={commonStyles.subtitle}>Pestaña de inicio.</Text>
    </View>
  );
}
