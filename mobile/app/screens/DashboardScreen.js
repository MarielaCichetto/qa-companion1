import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';
import { testCasesSeed } from '../data/testCases';
import { bugsSeed } from '../data/bugs';

const actions = [
  { label: 'Test Cases', screen: 'TestCases' },
  { label: 'Bugs', screen: 'Bugs' },
  { label: 'Checklists', screen: 'Checklists' },
  { label: 'API Tester', screen: 'ApiTester' },
  { label: 'SQL', screen: 'SqlQueries' },
  { label: 'Reportes', screen: 'Reports' }
];

export default function DashboardScreen({ navigation }) {
  return (
    <ScreenLayout>
      <Header title="Dashboard" />
      <Text style={styles.subtitle}>
        Usa la navegación rápida para saltar a cada módulo. Conecta métricas en vivo en el backend.
      </Text>
      <View style={styles.metricsRow}>
        <Card>
          <Text style={styles.metricLabel}>Casos ejecutados</Text>
          <Text style={styles.metricValue}>{testCasesSeed.length}</Text>
        </Card>
        <Card>
          <Text style={styles.metricLabel}>Bugs abiertos</Text>
          <Text style={styles.metricValue}>{bugsSeed.length}</Text>
        </Card>
      </View>
      <View>
        {actions.map((action) => (
          <TouchableOpacity key={action.screen} onPress={() => navigation.navigate(action.screen)}>
            <Card>
              <Text style={styles.actionText}>{action.label}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: '#475569',
    marginBottom: 16
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  metricLabel: {
    color: '#64748b',
    fontSize: 12
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a'
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a'
  }
});
