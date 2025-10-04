import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';
import { testCasesSeed } from '../data/testCases';

export default function ReportsScreen({ navigation }) {
  const handleExport = () => {
    // TODO: Implement file generation with expo-file-system and share sheet.
    console.log('Export placeholder', testCasesSeed.length);
  };

  return (
    <ScreenLayout>
      <Header title="Reportes" onBack={() => navigation.goBack()} />
      <Card>
        <Text style={styles.text}>Exporta métricas de ejecución en CSV o PDF.</Text>
        <TouchableOpacity style={styles.button} onPress={handleExport}>
          <Text style={styles.buttonText}>Exportar CSV (placeholder)</Text>
        </TouchableOpacity>
        <Text style={styles.helper}>* Integra generador PDF en próximas releases.</Text>
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#475569',
    marginBottom: 12
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
  helper: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 12
  }
});
