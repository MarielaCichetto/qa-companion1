import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TestCasesScreen from '../screens/TestCasesScreen';
import BugsScreen from '../screens/BugsScreen';
import ChecklistsScreen from '../screens/ChecklistsScreen';
import ApiTesterScreen from '../screens/ApiTesterScreen';
import SqlQueriesScreen from '../screens/SqlQueriesScreen';
import ReportsScreen from '../screens/ReportsScreen';
import { useAuth } from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="TestCases" component={TestCasesScreen} options={{ title: 'Casos de Prueba' }} />
            <Stack.Screen name="Bugs" component={BugsScreen} />
            <Stack.Screen name="Checklists" component={ChecklistsScreen} />
            <Stack.Screen name="ApiTester" component={ApiTesterScreen} options={{ title: 'API Tester' }} />
            <Stack.Screen name="SqlQueries" component={SqlQueriesScreen} options={{ title: 'SQL Client' }} />
            <Stack.Screen name="Reports" component={ReportsScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
