import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardScreen from './app/screens/DashboardScreen';
import TestCasesScreen from './app/screens/TestCasesScreen';
import BugsScreen from './app/screens/BugsScreen';
import ChecklistsScreen from './app/screens/ChecklistsScreen';
import ApiTesterScreen from './app/screens/ApiTesterScreen';
import SqlQueriesScreen from './app/screens/SqlQueriesScreen';
import ReportsScreen from './app/screens/ReportsScreen';
import LoginScreen from './app/screens/LoginScreen';
import { ensureTables, seedTestCases } from './app/services/storage';
import { testCasesSeed } from './app/data/testCases';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const paperTheme = {
  ...MD3LightTheme,
  roundness: 16,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366f1',
    secondary: '#a855f7',
    tertiary: '#38bdf8',
    surface: '#0f172a',
    background: '#0b1120',
    surfaceVariant: '#1e293b',
    outline: '#475569',
    onSurface: '#e2e8f0'
  }
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0b1120',
    card: '#0f172a',
    border: 'transparent',
    primary: '#6366f1',
    text: '#e2e8f0'
  }
};

const tabIconMap = {
  Dashboard: 'view-dashboard-outline',
  TestCases: 'clipboard-check-outline',
  Bugs: 'ladybug',
  Checklists: 'check-circle-outline',
  ApiTester: 'cloud-braces',
  SqlQueries: 'database-outline',
  Reports: 'chart-box-outline'
};

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: paperTheme.colors.primary,
        tabBarInactiveTintColor: 'rgba(226,232,240,0.7)',
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: 'transparent',
          height: 74,
          paddingHorizontal: 12,
          paddingBottom: 14,
          paddingTop: 12
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.5
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = tabIconMap[route.name] ?? 'circle-medium';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        }
      })}
      sceneContainerStyle={{ backgroundColor: '#0b1120' }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="TestCases" component={TestCasesScreen} options={{ title: 'Casos' }} />
      <Tab.Screen name="Bugs" component={BugsScreen} options={{ title: 'Bugs' }} />
      <Tab.Screen name="Checklists" component={ChecklistsScreen} options={{ title: 'Checklists' }} />
      <Tab.Screen name="ApiTester" component={ApiTesterScreen} options={{ title: 'API' }} />
      <Tab.Screen name="SqlQueries" component={SqlQueriesScreen} options={{ title: 'SQL' }} />
      <Tab.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reportes' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    ensureTables();
    seedTestCases(testCasesSeed);
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
