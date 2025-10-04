import { useState } from 'react';
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { testCases as defaultTestCases } from '../data/testCases';

const TestCasesScreen = () => {
  const [testCases, setTestCases] = useState(defaultTestCases);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ id: '', title: '', status: 'Passed' });

  const handleSave = () => {
    setTestCases((prev) => {
      const exists = prev.some((tc) => tc.id === form.id);
      if (exists) {
        return prev.map((tc) => (tc.id === form.id ? form : tc));
      }
      return [...prev, form];
    });
    setVisible(false);
    setForm({ id: '', title: '', status: 'Passed' });
  };

  const handleDelete = (id) => setTestCases((prev) => prev.filter((tc) => tc.id !== id));

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)}>
        <Text style={styles.addButtonText}>Nuevo Caso</Text>
      </TouchableOpacity>
      <FlatList
        data={testCases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>
              {item.id} • {item.status}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => { setForm(item); setVisible(true); }}>
                <Text style={styles.link}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={[styles.link, { color: '#ef4444' }]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{form.id ? 'Editar' : 'Nuevo'} Caso de Prueba</Text>
            <TextInput
              placeholder="ID"
              value={form.id}
              onChangeText={(value) => setForm((prev) => ({ ...prev, id: value }))}
              style={styles.input}
            />
            <TextInput
              placeholder="Título"
              value={form.title}
              onChangeText={(value) => setForm((prev) => ({ ...prev, title: value }))}
              style={styles.input}
            />
            <TextInput
              placeholder="Estado (Passed/Failed/Blocked)"
              value={form.status}
              onChangeText={(value) => setForm((prev) => ({ ...prev, status: value }))}
              style={styles.input}
            />
            <View style={styles.modalActions}>
              <Pressable onPress={() => setVisible(false)}>
                <Text style={styles.link}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={handleSave}>
                <Text style={styles.link}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  addButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  addButtonText: { color: '#fff', fontWeight: '600' },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  itemTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  itemSubtitle: { color: '#64748b', marginBottom: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  link: { color: '#2563eb', fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default TestCasesScreen;
