import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, commonStyles } from '../styles/common';

export default function SettingsScreen() {
  const { role, logout } = useAuth();

  return (
    <View style={commonStyles.screen}>
      <Text style={commonStyles.title}>Settings</Text>
      <Text style={commonStyles.subtitle}>Pestaña de ajustes.</Text>

      {/* Aquí también leo el rol desde el contexto para reutilizar el mismo estado global. */}
      {role ? (
        <Text style={styles.roleInfo}>Rol en contexto: {role}</Text>
      ) : null}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  roleInfo: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
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
