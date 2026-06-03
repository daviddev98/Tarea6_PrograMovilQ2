import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, commonStyles } from '../styles/common';
import type { MainTabParamList } from '../types/navigation';

type SettingsNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Settings'
>;

export default function SettingsScreen() {
  const { isAdmin, logout } = useAuth();
  const navigation = useNavigation<SettingsNavigationProp>();

  // Aquí protejo Settings: si no soy admin según el contexto, regreso a Home.
  useEffect(() => {
    if (!isAdmin) {
      navigation.navigate('Home');
    }
  }, [isAdmin, navigation]);

  if (!isAdmin) {
    return null;
  }

  return (
    <View style={commonStyles.screen}>
      <Text style={commonStyles.title}>Settings</Text>
      <Text style={styles.settingsMessage}>estas en Settings</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsMessage: {
    marginTop: 16,
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  logoutText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});
