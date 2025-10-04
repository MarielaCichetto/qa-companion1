import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/AuthContext';
import { testCases } from '../data/testCases';
import { bugs } from '../data/bugs';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const metrics = useMemo(() => {
    const total = testCases.length;
    const passed = testCases.filter((tc) => tc.status === 'Passed').length;
    const failed = testCases.filter((tc) => tc.status === 'Failed').length;

    return {
      total,
      passed,
      failed,
      successRate: total ? Math.round((passed / total) * 100) : 0
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QA Companion</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumen</Text>
        <Text>Total casos: {metrics.total}</Text>
        <Text>Pasados: {metrics.passed}</Text>
        <Text>Fallidos: {metrics.failed}</Text>
        <Text>Tasa de éxito: {metrics.successRate}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Últimos bugs</Text>
        {bugs.map((bug) => (
          <Text key={bug.id} style={styles.listItem}>
            {bug.title} • {bug.severity}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {[
          { label: 'Casos de Prueba', screen: 'TestCases' },
          { label: 'Bugs', screen: 'Bugs' },
          { label: 'Checklists', screen: 'Checklists' },
          { label: 'API Tester', screen: 'ApiTester' },
          { label: 'SQL Client', screen: 'SqlQueries' },
          { label: 'Reportes', screen: 'Reports' }
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.gridItem} onPress={() => navigation.navigate(item.screen)}>
            <Text style={styles.gridText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 22,
    fontWeight: '700'
  },
  logout: {
    color: '#ef4444',
    fontWeight: '600'
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  listItem: {
    marginBottom: 4
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  gridText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  }
});

export default DashboardScreen;
