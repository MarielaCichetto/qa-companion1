import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, DataTable, Text } from 'react-native-paper';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';
import { testCasesSeed } from '../data/testCases';

const statuses = ['Passed', 'Failed', 'Blocked'];

const statusStyles = {
  Passed: { backgroundColor: 'rgba(34, 197, 94, 0.18)', color: '#bbf7d0' },
  Failed: { backgroundColor: 'rgba(248, 113, 113, 0.2)', color: '#fecaca' },
  Blocked: { backgroundColor: 'rgba(251, 191, 36, 0.18)', color: '#fef08a' }
};

export default function TestCasesScreen({ navigation }) {
  const [testCases, setTestCases] = useState(testCasesSeed);
  const [filter, setFilter] = useState('Todos');

  const filteredCases = testCases.filter((testCase) => filter === 'Todos' || testCase.status === filter);

  const updateStatus = (id, status) => {
    setTestCases((prev) => prev.map((tc) => (tc.id === id ? { ...tc, status } : tc)));
  };

  return (
    <ScreenLayout>
      <Header title="Test Cases" subtitle="Gestiona estados y prepara suites modernas" />
      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Filtros rápidos
        </Text>
          <View style={styles.filterRow}>
            {['Todos', ...statuses].map((status) => (
              <Chip
                key={status}
                selected={filter === status}
                onPress={() => setFilter(status)}
                style={[styles.chip, styles.chipSpacing, filter === status && styles.chipActive]}
                textStyle={[styles.chipText, filter === status && styles.chipTextActive]}
              >
                {status}
              </Chip>
            ))}
        </View>
      </Card>

      <Card>
        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title textStyle={styles.tableHeaderText}>Caso</DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderText}>Historia</DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderText}>Estado</DataTable.Title>
            <DataTable.Title textStyle={[styles.tableHeaderText, { textAlign: 'right' }]} numeric>
              Acciones
            </DataTable.Title>
          </DataTable.Header>
          {filteredCases.map((testCase) => (
            <DataTable.Row key={testCase.id} style={styles.tableRow}>
              <DataTable.Cell textStyle={styles.rowText}>
                <Text style={styles.rowTitle}>{testCase.title}</Text>
                <Text style={styles.rowSubtitle}>{testCase.id}</Text>
              </DataTable.Cell>
              <DataTable.Cell textStyle={styles.rowText}>{testCase.userStory}</DataTable.Cell>
              <DataTable.Cell>
                <View style={[styles.statusBadge, statusStyles[testCase.status]]}>
                  <Text style={[styles.statusText, { color: statusStyles[testCase.status]?.color }]}>
                    {testCase.status}
                  </Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                  <View style={styles.actionRow}>
                    {statuses.map((status) => (
                      <Button
                        key={status}
                        mode={testCase.status === status ? 'contained' : 'text'}
                        compact
                        onPress={() => updateStatus(testCase.id, status)}
                        style={[styles.statusButton, styles.statusButtonSpacing, testCase.status === status && styles.statusButtonActive]}
                        labelStyle={styles.statusButtonLabel}
                      >
                        {status}
                      </Button>
                    ))}
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#f8fafc',
    marginBottom: 12,
    fontWeight: '600'
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8
  },
  chip: {
    backgroundColor: 'rgba(148, 163, 184, 0.12)',
    borderRadius: 18
  },
  chipSpacing: {
    marginRight: 12,
    marginBottom: 12
  },
  chipActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.4)'
  },
  chipText: {
    color: 'rgba(226, 232, 240, 0.8)',
    fontWeight: '600'
  },
  chipTextActive: {
    color: '#f8fafc'
  },
  tableHeader: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)'
  },
  tableHeaderText: {
    color: 'rgba(148, 163, 184, 0.9)',
    fontWeight: '600'
  },
  tableRow: {
    backgroundColor: 'rgba(15, 23, 42, 0.45)'
  },
  rowText: {
    color: '#e2e8f0'
  },
  rowTitle: {
    color: '#f8fafc',
    fontWeight: '600'
  },
  rowSubtitle: {
    color: 'rgba(148, 163, 184, 0.7)',
    fontSize: 12
  },
  statusBadge: {
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600'
  },
  actionRow: {
    flexDirection: 'row'
  },
  statusButton: {
    borderRadius: 14
  },
  statusButtonSpacing: {
    marginRight: 4
  },
  statusButtonActive: {
    backgroundColor: '#6366f1'
  },
  statusButtonLabel: {
    fontSize: 10,
    letterSpacing: 0.5
  }
});
