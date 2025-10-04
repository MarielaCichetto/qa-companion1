import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { testCases } from '../data/testCases';

const ReportsScreen = () => {
  const [status, setStatus] = useState('');

  const handleExportCsv = async () => {
    try {
      const header = 'id,title,status\n';
      const rows = testCases.map((tc) => `${tc.id},${tc.title},${tc.status}`).join('\n');
      const csv = `${header}${rows}`;
      const fileUri = `${FileSystem.documentDirectory}test-cases.csv`;
      await FileSystem.writeAsStringAsync(fileUri, csv);
      setStatus(`Archivo generado: ${fileUri}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Reportes</Text>
        <TouchableOpacity style={styles.button} onPress={handleExportCsv}>
          <Text style={styles.buttonText}>Exportar CSV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => setStatus('Integrar generación PDF con expo-print en futuras versiones.')}
        >
          <Text style={[styles.buttonText, { color: '#2563eb' }]}>Exportar PDF (placeholder)</Text>
        </TouchableOpacity>
        {status ? <Text style={styles.status}>{status}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: 400
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonOutline: {
    backgroundColor: '#e0e7ff'
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  status: { marginTop: 12, color: '#475569' }
});

export default ReportsScreen;
