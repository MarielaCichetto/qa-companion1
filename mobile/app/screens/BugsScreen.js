import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';
import { bugsSeed } from '../data/bugs';

export default function BugsScreen() {
  const [bugs, setBugs] = useState(bugsSeed);
  const [draft, setDraft] = useState({ title: '', severity: 'Medium', priority: 'P3', description: '' });

  const handleCreate = () => {
    if (!draft.title.trim()) return;
    setBugs((prev) => [
      {
        id: `BUG-${Math.floor(Math.random() * 10000)}`,
        ...draft
      },
      ...prev
    ]);
    setDraft({ title: '', severity: 'Medium', priority: 'P3', description: '' });
  };

  return (
    <ScreenLayout>
      <Header title="Bugs" subtitle="Captura incidencias con estilo" />
      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Nuevo bug
        </Text>
        <TextInput
          label="Título"
          mode="outlined"
          value={draft.title}
          onChangeText={(value) => setDraft((prev) => ({ ...prev, title: value }))}
          style={styles.input}
          outlineStyle={styles.outline}
        />
        <View style={styles.row}>
          <TextInput
            label="Severidad"
            mode="outlined"
            value={draft.severity}
            onChangeText={(value) => setDraft((prev) => ({ ...prev, severity: value }))}
            style={[styles.input, styles.half]}
            outlineStyle={styles.outline}
          />
          <TextInput
            label="Prioridad"
            mode="outlined"
            value={draft.priority}
            onChangeText={(value) => setDraft((prev) => ({ ...prev, priority: value }))}
            style={[styles.input, styles.half, styles.halfLast]}
            outlineStyle={styles.outline}
          />
        </View>
        <TextInput
          label="Descripción"
          mode="outlined"
          value={draft.description}
          onChangeText={(value) => setDraft((prev) => ({ ...prev, description: value }))}
          multiline
          numberOfLines={4}
          style={styles.input}
          outlineStyle={styles.outline}
        />
        <Button mode="contained" onPress={handleCreate} style={styles.button} contentStyle={{ paddingVertical: 6 }}>
          Registrar bug
        </Button>
        <HelperText type="info" style={styles.helper}>
          Próximamente: adjuntar evidencias, asignar responsables y sincronizar con Jira.
        </HelperText>
      </Card>

      {bugs.map((bug) => (
        <Card key={bug.id}>
          <View style={styles.bugHeader}>
            <Text style={styles.bugTitle}>{bug.title}</Text>
            <View style={[styles.badge, { backgroundColor: 'rgba(99, 102, 241, 0.18)' }]}> 
              <Text style={styles.badgeText}>{bug.priority}</Text>
            </View>
          </View>
          <Text style={styles.bugMeta}>{bug.id}</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, styles.badgeSpacing, { backgroundColor: 'rgba(148, 163, 184, 0.18)' }]}> 
              <Text style={styles.badgeText}>Severidad {bug.severity}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: 'rgba(34, 211, 238, 0.18)' }]}> 
              <Text style={styles.badgeText}>{bug.status || 'Open'}</Text>
            </View>
          </View>
          <Text style={styles.bugDescription}>{bug.description}</Text>
        </Card>
      ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#f8fafc',
    marginBottom: 12,
    fontWeight: '600'
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.6)'
  },
  outline: {
    borderRadius: 18,
    borderColor: 'rgba(99, 102, 241, 0.35)'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12
  },
  half: {
    flex: 1,
    marginRight: 12
  },
  halfLast: {
    marginRight: 0
  },
  button: {
    borderRadius: 16,
    backgroundColor: '#a855f7'
  },
  helper: {
    color: 'rgba(226, 232, 240, 0.7)'
  },
  bugHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  bugTitle: {
    color: '#f8fafc',
    fontWeight: '700'
  },
  bugMeta: {
    color: 'rgba(148, 163, 184, 0.7)',
    marginBottom: 12
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 12
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  badgeSpacing: {
    marginRight: 8
  },
  badgeText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '600'
  },
  bugDescription: {
    color: 'rgba(226, 232, 240, 0.85)'
  }
});
