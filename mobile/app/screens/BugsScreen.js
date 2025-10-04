import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';
import { bugsSeed } from '../data/bugs';

export default function BugsScreen({ navigation }) {
  const [bugs, setBugs] = useState(bugsSeed);
  const [draft, setDraft] = useState({ title: '', severity: 'Medium', priority: 'P3' });

  const handleCreate = () => {
    if (!draft.title) return;
    setBugs((prev) => [
      {
        id: `BUG-${Math.floor(Math.random() * 10000)}`,
        ...draft
      },
      ...prev
    ]);
    setDraft({ title: '', severity: 'Medium', priority: 'P3' });
  };

  return (
    <ScreenLayout>
      <Header title="Bugs" onBack={() => navigation.goBack()} />
      <Card>
        <Text style={styles.sectionTitle}>Nuevo bug</Text>
        <TextInput
          value={draft.title}
          onChangeText={(value) => setDraft((prev) => ({ ...prev, title: value }))}
          placeholder="Título"
          style={styles.input}
        />
        <TextInput
          value={draft.severity}
          onChangeText={(value) => setDraft((prev) => ({ ...prev, severity: value }))}
          placeholder="Severidad (High, Medium, Low)"
          style={styles.input}
        />
        <TextInput
          value={draft.priority}
          onChangeText={(value) => setDraft((prev) => ({ ...prev, priority: value }))}
          placeholder="Prioridad (P1-P4)"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Crear bug</Text>
        </TouchableOpacity>
      </Card>
      {bugs.map((bug) => (
        <Card key={bug.id}>
          <Text style={styles.bugTitle}>{bug.title}</Text>
          <Text style={styles.meta}>{bug.id}</Text>
          <Text style={styles.meta}>Severidad: {bug.severity} · Prioridad: {bug.priority}</Text>
        </Card>
      ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#0f172a'
  },
  input: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#f8fafc',
    fontWeight: '600'
  },
  bugTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  meta: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4
  }
});
