import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { bugs as defaultBugs } from '../data/bugs';

const BugsScreen = () => {
  const [bugs, setBugs] = useState(defaultBugs);
  const [form, setForm] = useState({ id: '', title: '', severity: 'Media', priority: 'Media' });

  const handleSubmit = () => {
    setBugs((prev) => {
      const exists = prev.some((bug) => bug.id === form.id);
      if (exists) {
        return prev.map((bug) => (bug.id === form.id ? form : bug));
      }
      return [...prev, form];
    });
    setForm({ id: '', title: '', severity: 'Media', priority: 'Media' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Registrar Bug</Text>
        <TextInput placeholder="ID" value={form.id} onChangeText={(value) => setForm((prev) => ({ ...prev, id: value }))} style={styles.input} />
        <TextInput
          placeholder="Título"
          value={form.title}
          onChangeText={(value) => setForm((prev) => ({ ...prev, title: value }))}
          style={styles.input}
        />
        <TextInput
          placeholder="Severidad"
          value={form.severity}
          onChangeText={(value) => setForm((prev) => ({ ...prev, severity: value }))}
          style={styles.input}
        />
        <TextInput
          placeholder="Prioridad"
          value={form.priority}
          onChangeText={(value) => setForm((prev) => ({ ...prev, priority: value }))}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={bugs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>
              {item.id} • {item.severity} • {item.priority}
            </Text>
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
  itemTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  itemSubtitle: { color: '#64748b' }
});

export default BugsScreen;
