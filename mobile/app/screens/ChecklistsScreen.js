import { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Checkbox, ProgressBar, Text } from 'react-native-paper';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';

const initialChecklists = [
  {
    id: 'CHK-001',
    name: 'Smoke Release',
    description: 'Validación esencial post-deploy',
    items: [
      { id: '1', label: 'Login básico', checked: true },
      { id: '2', label: 'Dashboard métricas', checked: false },
      { id: '3', label: 'Reportes CSV', checked: false }
    ]
  },
  {
    id: 'CHK-002',
    name: 'Regresión API',
    description: 'Endpoints críticos de facturación',
    items: [
      { id: '1', label: 'GET /reports', checked: true },
      { id: '2', label: 'POST /reports/export', checked: false },
      { id: '3', label: 'Auth tokens', checked: false }
    ]
  },
  {
    id: 'CHK-003',
    name: 'UX Exploratorio',
    description: 'Recorrido libre en mobile',
    items: [
      { id: '1', label: 'Accesibilidad', checked: false },
      { id: '2', label: 'Animaciones', checked: false },
      { id: '3', label: 'Modo oscuro', checked: true }
    ]
  }
];

export default function ChecklistsScreen() {
  const [checklists, setChecklists] = useState(initialChecklists);
  const [selected, setSelected] = useState(initialChecklists[0].id);

  const activeChecklist = useMemo(
    () => checklists.find((checklist) => checklist.id === selected) ?? checklists[0],
    [checklists, selected]
  );

  const toggleItem = (checklistId, itemId) => {
    setChecklists((prev) =>
      prev.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              )
            }
          : checklist
      )
    );
  };

  const completion = activeChecklist
    ? activeChecklist.items.filter((item) => item.checked).length / activeChecklist.items.length
    : 0;

  return (
    <ScreenLayout>
      <Header title="Checklists" subtitle="Supervisa suites smoke y regresión" />
      <View style={styles.container}>
        <Card style={styles.listCard}>
          <Text style={styles.sectionTitle}>Mis checklists</Text>
          <View style={styles.listWrapper}>
            {checklists.map((checklist) => {
              const percentage = checklist.items.filter((item) => item.checked).length / checklist.items.length;
              return (
                <TouchableOpacity
                  key={checklist.id}
                  onPress={() => setSelected(checklist.id)}
                  style={[styles.listItem, selected === checklist.id && styles.listItemActive]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.listItemTitle}>{checklist.name}</Text>
                  <Text style={styles.listItemSubtitle}>{Math.round(percentage * 100)}% completado</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.placeholder}>Próximamente: crear y compartir nuevas listas.</Text>
        </Card>

        <Card style={styles.detailCard}>
          <Text style={styles.sectionTitle}>{activeChecklist.name}</Text>
          <Text style={styles.subtitle}>{activeChecklist.description}</Text>
          <ProgressBar progress={completion} style={styles.progress} color="#6366f1" />
          <View style={styles.itemsWrapper}>
            {activeChecklist.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Checkbox
                  status={item.checked ? 'checked' : 'unchecked'}
                  onPress={() => toggleItem(activeChecklist.id, item.id)}
                  color="#6366f1"
                />
                <Text style={[styles.itemLabel, item.checked && styles.itemLabelChecked]}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  listCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.14)'
  },
  detailCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)'
  },
  sectionTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    marginBottom: 12
  },
  subtitle: {
    color: 'rgba(226, 232, 240, 0.75)',
    marginBottom: 16
  },
  listWrapper: {
    marginTop: 4
  },
  listItem: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    marginBottom: 12
  },
  listItemActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
    borderColor: 'rgba(99, 102, 241, 0.45)'
  },
  listItemTitle: {
    color: '#f8fafc',
    fontWeight: '600'
  },
  listItemSubtitle: {
    color: 'rgba(226, 232, 240, 0.7)',
    marginTop: 4
  },
  placeholder: {
    marginTop: 16,
    color: 'rgba(226, 232, 240, 0.6)',
    fontSize: 12
  },
  progress: {
    marginBottom: 16,
    borderRadius: 10,
    height: 10
  },
  itemsWrapper: {
    marginTop: 12
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  itemLabel: {
    color: '#f8fafc',
    fontSize: 15
  },
  itemLabelChecked: {
    color: 'rgba(226, 232, 240, 0.6)',
    textDecorationLine: 'line-through'
  }
});
