import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, commonStyles } from '../styles/common';
import type { UserRole } from '../types/auth';

type RoleOptionData = {
  value: UserRole;
  label: string;
};

const ROLES: RoleOptionData[] = [
  { value: 'admin', label: 'admin' },
  { value: 'common', label: 'common' },
];

type RoleOptionProps = {
  role: RoleOptionData;
  selected: UserRole | null;
  onSelect: (role: UserRole) => void;
};

// Aquí simulo radio buttons con Views para que el usuario elija entre admin y common.
function RoleOption({ role, selected, onSelect }: RoleOptionProps) {
  const isSelected = selected === role.value;

  return (
    <TouchableOpacity
      style={[styles.roleOption, isSelected && styles.roleOptionSelected]}
      onPress={() => onSelect(role.value)}
      activeOpacity={0.7}
    >
      <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
        {isSelected ? <View style={styles.radioInner} /> : null}
      </View>
      <Text style={[styles.roleLabel, isSelected && styles.roleLabelSelected]}>
        {role.label}
      </Text>
    </TouchableOpacity>
  );
}

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { login } = useAuth();

  const handleIngresar = () => {
    if (!selectedRole) {
      Alert.alert(
        'Rol requerido',
        'Selecciona admin o common antes de ingresar.'
      );
      return;
    }

    // Aquí solo actualizo el AuthContext; el navegador reacciona cuando isAuthenticated cambia.
    login(selectedRole);
  };

  return (
    <View style={[commonStyles.screen, styles.container]}>
      <Text style={commonStyles.title}>Iniciar sesión</Text>
      <Text style={styles.hint}>Selecciona tu rol</Text>

      <View style={styles.rolesList}>
        {ROLES.map((role) => (
          <RoleOption
            key={role.value}
            role={role}
            selected={selectedRole}
            onSelect={setSelectedRole}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.ingresarButton,
          !selectedRole && styles.ingresarButtonDisabled,
        ]}
        onPress={handleIngresar}
        activeOpacity={0.8}
      >
        <Text style={styles.ingresarText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 48,
  },
  hint: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  rolesList: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  roleOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#eff6ff',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  roleLabel: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '500',
  },
  roleLabelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  ingresarButton: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ingresarButtonDisabled: {
    opacity: 0.5,
  },
  ingresarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
