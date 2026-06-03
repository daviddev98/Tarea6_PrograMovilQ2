import { StyleSheet } from 'react-native';

export const colors = {
  background: '#f5f5f5',
  surface: '#ffffff',
  primary: '#2563eb',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
};

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
