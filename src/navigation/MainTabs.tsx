import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import type { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  const { isAdmin, role } = useAuth();

  // Aquí elijo la pestaña inicial según el rol guardado en AuthContext.
  const initialTab = isAdmin ? 'Settings' : 'Home';

  return (
    <Tab.Navigator
      key={role ?? 'guest'}
      initialRouteName={initialTab}
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTitleStyle: { fontWeight: '600', color: '#1f2937' },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarLabel: 'Home',
          // Aquí agrego el ícono de Home en la barra inferior.
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* Aquí solo muestro Settings si el rol en contexto es admin. */}
      {isAdmin ? (
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Ajustes',
            tabBarLabel: 'Settings',
            // Aquí agrego el ícono de Settings solo para el rol admin.
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}
