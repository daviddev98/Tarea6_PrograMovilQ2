import { Text, View } from 'react-native';
import { commonStyles } from '../styles/common';

export default function SettingsScreen() {
  return (
    <View style={commonStyles.screen}>
      <Text style={commonStyles.title}>Settings</Text>
      <Text style={commonStyles.subtitle}>Pestaña de ajustes.</Text>
    </View>
  );
}
