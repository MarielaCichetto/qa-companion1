import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';
import { testCasesSeed } from '../data/testCases';

export default function ReportsScreen() {
  const handleExport = () => {
    console.log('Export placeholder', testCasesSeed.length);
  };

  return (
    <ScreenLayout>
      <Header title="Reportes" subtitle="Comunica avances con estilo" />
      <View>
        <Card style={[styles.primaryCard, styles.cardSpacing]}>
          <Text style={styles.cardTitle}>Resumen ejecutivo</Text>
          <Text style={styles.cardText}>
            {testCasesSeed.length} casos ejecutados · Exporta métricas listas para stakeholders en PDF con branding.
          </Text>
          <Button mode="contained" icon="file-pdf-box" onPress={handleExport} style={styles.primaryButton}>
            Exportar PDF
          </Button>
        </Card>
        <Card style={[styles.secondaryCard, styles.cardSpacing]}>
          <Text style={styles.cardTitle}>Detalle CSV</Text>
          <Text style={styles.cardText}>
            Genera CSV con resultados, responsables y timestamps para cargar en BI.
          </Text>
          <Button mode="contained" icon="file-table-box" onPress={handleExport} style={styles.secondaryButton}>
            Exportar CSV
          </Button>
        </Card>
      </View>
      <Card>
        <Text style={styles.sectionTitle}>Roadmap</Text>
        <Text style={styles.cardText}>
          Próximamente: programar envíos automáticos, dashboards interactivos y firma digital de reportes.
        </Text>
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  primaryCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.16)'
  },
  secondaryCard: {
    backgroundColor: 'rgba(14, 165, 233, 0.16)'
  },
  cardSpacing: {
    marginBottom: 16
  },
  cardTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    marginBottom: 12
  },
  cardText: {
    color: 'rgba(226, 232, 240, 0.75)',
    marginBottom: 16
  },
  primaryButton: {
    borderRadius: 16,
    backgroundColor: '#6366f1'
  },
  secondaryButton: {
    borderRadius: 16,
    backgroundColor: '#38bdf8'
  },
  sectionTitle: {
    color: '#f8fafc',
    fontWeight: '600',
    marginBottom: 12
  }
});
