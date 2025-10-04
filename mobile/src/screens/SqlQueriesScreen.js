import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const mockResults = [
  { id: 1, name: 'Smoke Suite', owner: 'QA Team' },
  { id: 2, name: 'Regresión API', owner: 'Backend QA' }
];

const SqlQueriesScreen = () => {
  const [query, setQuery] = useState('SELECT * FROM checklists;');
  const [results, setResults] = useState(mockResults);

  const handleExecute = () => {
    if (query.toLowerCase().includes('select')) {
      setResults(mockResults);
    } else {
      setResults([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Mini SQL Client</Text>
        <TextInput value={query} onChangeText={setQuery} style={[styles.input, styles.textArea]} multiline numberOfLines={6} />
        <TouchableOpacity style={styles.button} onPress={handleExecute}>
          <Text style={styles.buttonText}>Ejecutar</Text>
        </TouchableOpacity>
        <View style={styles.table}>
          <Text style={styles.subtitle}>Resultados</Text>
          {results.length === 0 ? (
            <Text style={styles.muted}>Sin resultados. Solo SELECT soportado en el MVP.</Text>
          ) : (
            results.map((row) => (
              <View key={row.id} style={styles.tableRow}>
                {Object.entries(row).map(([key, value]) => (
                  <View key={key} style={styles.cell}>
                    <Text style={styles.cellLabel}>{key}</Text>
                    <Text>{value}</Text>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff'
  },
  textArea: { height: 140, textAlignVertical: 'top' },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  table: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  subtitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  muted: { color: '#94a3b8' },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cell: { width: '48%', backgroundColor: '#f1f5f9', padding: 8, borderRadius: 8 },
  cellLabel: { fontSize: 12, color: '#475569' }
});

export default SqlQueriesScreen;
