import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Chip, Text } from 'react-native-paper';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';
import { testCasesSeed } from '../data/testCases';
import { bugsSeed } from '../data/bugs';

const quickActions = [
  { label: 'Casos de Prueba', screen: 'TestCases', icon: 'clipboard-text-outline' },
  { label: 'Registrar Bug', screen: 'Bugs', icon: 'ladybug' },
  { label: 'Checklists', screen: 'Checklists', icon: 'check-circle-outline' },
  { label: 'API Tester', screen: 'ApiTester', icon: 'cloud-braces' },
  { label: 'SQL Client', screen: 'SqlQueries', icon: 'database-outline' },
  { label: 'Reportes', screen: 'Reports', icon: 'chart-box-outline' }
];

export default function DashboardScreen({ navigation }) {
  return (
    <ScreenLayout>
      <Header title="Dashboard" subtitle="Visión general del sprint en curso" />
      <Card style={styles.heroCard}>
        <View style={styles.heroRow}>
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge" style={styles.heroTitle}>
              Sprint 12 · Equipo QA Web
            </Text>
            <Text variant="bodySmall" style={styles.heroSubtitle}>
              Seguimiento en vivo de ejecución, bloqueos y avances clave. Integra métricas reales conectando el backend en la próxima fase.
            </Text>
            <View style={styles.heroMeta}>
              <Chip mode="outlined" style={[styles.heroChip, styles.heroChipSpacing]} textStyle={styles.heroChipText}>
                86% casos completados
              </Chip>
              <Chip mode="outlined" style={[styles.heroChip, styles.heroChipSpacing]} textStyle={styles.heroChipText}>
                {bugsSeed.filter((bug) => bug.severity === 'High').length} bugs críticos
              </Chip>
            </View>
          </View>
          <Avatar.Icon size={72} icon="rocket-launch-outline" style={styles.heroAvatar} color="#f8fafc" />
        </View>
      </Card>

      <View style={styles.metricsRow}>
        <Card style={styles.metricCard}>
          <Text style={styles.metricLabel}>Casos ejecutados</Text>
          <Text variant="displaySmall" style={styles.metricValue}>
            {testCasesSeed.length}
          </Text>
          <Text style={styles.metricTrend}>+12% vs sprint anterior</Text>
        </Card>
        <Card style={[styles.metricCard, styles.metricCardLast]}>
          <Text style={styles.metricLabel}>Bugs activos</Text>
          <Text variant="displaySmall" style={styles.metricValue}>
            {bugsSeed.length}
          </Text>
          <Text style={styles.metricTrend}>5 pendientes de validación</Text>
        </Card>
      </View>

      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Acciones rápidas
        </Text>
        <View style={styles.actionGrid}>
          {quickActions.map((action) => (
            <View key={action.label} style={styles.actionWrapper}>
              <Button
                mode="contained-tonal"
                icon={action.icon}
                style={styles.actionButton}
                contentStyle={styles.actionContent}
                onPress={() => navigation.navigate(action.screen)}
              >
                {action.label}
              </Button>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Siguiente pasos del squad
        </Text>
        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Validar rollback en staging</Text>
              <Text style={styles.timelineSubtitle}>BUG-2458 · Checkout regresión</Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.timelineDotAlt]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Checklist Smoke listo para revisión</Text>
              <Text style={styles.timelineSubtitle}>10/12 tareas completadas</Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.timelineDotDanger]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Coordinar pairing QA/Dev</Text>
              <Text style={styles.timelineSubtitle}>Reproducir bug en iOS 17</Text>
            </View>
          </View>
        </View>
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: 'rgba(79, 70, 229, 0.15)'
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heroTitle: {
    color: '#f8fafc',
    fontWeight: '700'
  },
  heroSubtitle: {
    color: 'rgba(226, 232, 240, 0.75)',
    marginTop: 8,
    lineHeight: 20
  },
  heroMeta: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  heroChip: {
    borderRadius: 16,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    backgroundColor: 'rgba(148, 163, 184, 0.08)'
  },
  heroChipSpacing: {
    marginRight: 8,
    marginBottom: 8
  },
  heroChipText: {
    color: 'rgba(226, 232, 240, 0.85)',
    fontWeight: '600'
  },
  heroAvatar: {
    backgroundColor: 'rgba(88, 28, 135, 0.35)',
    marginLeft: 16
  },
  metricsRow: {
    flexDirection: 'row'
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    marginRight: 16
  },
  metricCardLast: {
    marginRight: 0
  },
  metricLabel: {
    color: 'rgba(226, 232, 240, 0.7)',
    fontSize: 12,
    letterSpacing: 0.4
  },
  metricValue: {
    color: '#f8fafc',
    marginTop: 4,
    fontWeight: '700'
  },
  metricTrend: {
    color: 'rgba(226, 232, 240, 0.6)',
    marginTop: 8
  },
  sectionTitle: {
    color: '#f8fafc',
    marginBottom: 16,
    fontWeight: '600'
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  actionWrapper: {
    marginRight: 12,
    marginBottom: 12
  },
  actionButton: {
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.16)'
  },
  actionContent: {
    paddingVertical: 6
  },
  timeline: {
    marginTop: 4
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22d3ee'
  },
  timelineDotAlt: {
    backgroundColor: '#34d399'
  },
  timelineDotDanger: {
    backgroundColor: '#f87171'
  },
  timelineContent: {
    flex: 1,
    marginLeft: 12
  },
  timelineTitle: {
    color: '#f8fafc',
    fontWeight: '600'
  },
  timelineSubtitle: {
    color: 'rgba(226, 232, 240, 0.7)',
    marginTop: 4
  }
});
