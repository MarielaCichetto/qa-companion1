import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

export default function App() {
  useEffect(() => {
    ensureTables();
    seedTestCases(testCasesSeed);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="TestCases" component={TestCasesScreen} />
          <Stack.Screen name="Bugs" component={BugsScreen} />
          <Stack.Screen name="Checklists" component={ChecklistsScreen} />
          <Stack.Screen name="ApiTester" component={ApiTesterScreen} />
          <Stack.Screen name="SqlQueries" component={SqlQueriesScreen} />
          <Stack.Screen name="Reports" component={ReportsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
