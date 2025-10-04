import { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';

const initialChecklists = [
  {
    id: 'CHK-001',
    name: 'Smoke',
    items: [
      { id: '1', label: 'Login', checked: true },
      { id: '2', label: 'Dashboard', checked: false }
    ]
  },
  {
    id: 'CHK-002',
    name: 'Regresión',
    items: [
      { id: '1', label: 'API /reports', checked: false },
      { id: '2', label: 'Exportar CSV', checked: false }
    ]
  }
];

export default function ChecklistsScreen({ navigation }) {
  const [checklists, setChecklists] = useState(initialChecklists);

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

  return (
    <ScreenLayout>
      <Header title="Checklists" onBack={() => navigation.goBack()} />
      {checklists.map((checklist) => (
        <Card key={checklist.id}>
          <Text style={styles.title}>{checklist.name}</Text>
          {checklist.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => toggleItem(checklist.id, item.id)}
            >
              <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                {item.checked && <Text style={styles.checkboxText}>✓</Text>}
              </View>
              <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Card>
      ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#0f172a'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  checkboxChecked: {
    backgroundColor: '#6366f1'
  },
  checkboxText: {
    color: '#f8fafc',
    fontWeight: '700'
  },
  itemText: {
    color: '#0f172a'
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: '#94a3b8'
  }
});
