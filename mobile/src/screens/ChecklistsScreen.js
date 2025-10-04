import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const defaultChecklists = [
  {
    id: 'CHK-001',
    name: 'Smoke Suite',
    items: [
      { id: '1', text: 'Login básico', done: true },
      { id: '2', text: 'Crear test case', done: false }
    ]
  }
];

const ChecklistsScreen = () => {
  const [checklists, setChecklists] = useState(defaultChecklists);
  const [form, setForm] = useState({ name: '', item: '' });

  const handleAdd = () => {
    if (!form.name || !form.item) return;
    setChecklists((prev) => [
      ...prev,
      { id: `CHK-${prev.length + 1}`, name: form.name, items: [{ id: '1', text: form.item, done: false }] }
    ]);
    setForm({ name: '', item: '' });
  };

  const toggleItem = (checklistId, itemId) => {
    setChecklists((prev) =>
      prev.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              )
            }
          : checklist
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Nueva Checklist</Text>
        <TextInput placeholder="Nombre" value={form.name} onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))} style={styles.input} />
        <TextInput placeholder="Primer ítem" value={form.item} onChangeText={(value) => setForm((prev) => ({ ...prev, item: value }))} style={styles.input} />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={checklists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            {item.items.map((subItem) => (
              <TouchableOpacity key={subItem.id} onPress={() => toggleItem(item.id, subItem.id)}>
                <Text style={[styles.checkItem, subItem.done && styles.checkItemDone]}>
                  {subItem.done ? '✓ ' : '○ '}
                  {subItem.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16
  },
  formTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  itemTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  checkItem: { fontSize: 14, marginBottom: 4 },
  checkItemDone: { textDecorationLine: 'line-through', color: '#22c55e' }
});

export default ChecklistsScreen;
