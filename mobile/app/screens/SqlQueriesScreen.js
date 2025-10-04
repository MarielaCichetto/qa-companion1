import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';

const sampleResults = [
  { id: 1, testCase: 'TC-001', status: 'Passed' },
  { id: 2, testCase: 'TC-002', status: 'Failed' }
];

export default function SqlQueriesScreen({ navigation }) {
  const [query, setQuery] = useState('SELECT * FROM test_cases LIMIT 10;');
  const [results, setResults] = useState(sampleResults);

  const runQuery = () => {
    // TODO: Integrate with backend-safe SQL proxy.
    setResults(sampleResults);
  };

  return (
    <ScreenLayout>
      <Header title="SQL Queries" onBack={() => navigation.goBack()} />
      <Card>
        <Text style={styles.label}>Consulta</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          style={[styles.input, styles.bodyInput]}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={runQuery}>
          <Text style={styles.buttonText}>Ejecutar</Text>
        </TouchableOpacity>
      </Card>
      <Card>
        <Text style={styles.label}>Resultados</Text>
        {results.map((row) => (
          <Text key={row.id} style={styles.row}>{`${row.id} · ${row.testCase} · ${row.status}`}</Text>
        ))}
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4
  },
  input: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  bodyInput: {
    minHeight: 120,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#f8fafc',
    fontWeight: '600'
  },
  row: {
    color: '#0f172a',
    marginTop: 8
  }
});
