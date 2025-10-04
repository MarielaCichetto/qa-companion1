import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, DataTable, Text, TextInput } from 'react-native-paper';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';

const sampleResults = [
  { id: 1, testCase: 'TC-001', status: 'Passed' },
  { id: 2, testCase: 'TC-002', status: 'Failed' }
];

export default function SqlQueriesScreen() {
  const [query, setQuery] = useState('SELECT * FROM test_cases LIMIT 10;');
  const [results, setResults] = useState(sampleResults);

  const runQuery = () => {
    setResults(sampleResults);
  };

  return (
    <ScreenLayout>
      <Header title="SQL Queries" subtitle="Explora datos de forma segura" />
      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Consulta
        </Text>
        <TextInput
          label="Query"
          mode="outlined"
          value={query}
          onChangeText={setQuery}
          multiline
          numberOfLines={5}
          style={styles.input}
          outlineStyle={styles.outline}
        />
        <Button mode="contained" onPress={runQuery} style={styles.button} icon="database-search">
          Ejecutar
        </Button>
        <Text style={styles.helper}>
          Solo consultas SELECT. En futuras versiones conectaremos un proxy seguro.
        </Text>
      </Card>

      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Resultados
        </Text>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title textStyle={styles.headerText}>ID</DataTable.Title>
            <DataTable.Title textStyle={styles.headerText}>Test Case</DataTable.Title>
            <DataTable.Title textStyle={styles.headerText}>Estado</DataTable.Title>
          </DataTable.Header>
          {results.map((row) => (
            <DataTable.Row key={row.id} style={styles.row}>
              <DataTable.Cell textStyle={styles.rowText}>{row.id}</DataTable.Cell>
              <DataTable.Cell textStyle={styles.rowText}>{row.testCase}</DataTable.Cell>
              <DataTable.Cell textStyle={styles.rowText}>{row.status}</DataTable.Cell>
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
  input: {
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.6)'
  },
  outline: {
    borderRadius: 18,
    borderColor: 'rgba(99, 102, 241, 0.35)'
  },
  button: {
    borderRadius: 16,
    backgroundColor: '#34d399'
  },
  helper: {
    marginTop: 12,
    color: 'rgba(226, 232, 240, 0.7)',
    fontSize: 12
  },
  header: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)'
  },
  headerText: {
    color: 'rgba(226, 232, 240, 0.75)',
    fontWeight: '600'
  },
  row: {
    backgroundColor: 'rgba(15, 23, 42, 0.45)'
  },
  rowText: {
    color: '#e2e8f0'
  }
});
