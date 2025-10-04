import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';

const methods = ['GET', 'POST', 'PUT', 'PATCH'];

export default function ApiTesterScreen() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.qa-companion.dev/v1/test-cases');
  const [body, setBody] = useState('{\n  "status": "passed"\n}');
  const [response, setResponse] = useState('Aún no se envió una request.');

  const handleSend = () => {
    setResponse(`Simulación ${method} → ${url}\n${body}`);
  };

  return (
    <ScreenLayout>
      <Header title="API Tester" subtitle="Requests ligeras estilo Postman" />
      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Configuración
        </Text>
        <View style={styles.methodRow}>
          {methods.map((option) => (
            <Chip
              key={option}
              selected={method === option}
              onPress={() => setMethod(option)}
              style={[styles.methodChip, styles.methodChipSpacing, method === option && styles.methodChipActive]}
              textStyle={[styles.methodChipText, method === option && styles.methodChipTextActive]}
            >
              {option}
            </Chip>
          ))}
        </View>
        <TextInput
          label="URL"
          mode="outlined"
          value={url}
          onChangeText={setUrl}
          style={styles.input}
          outlineStyle={styles.outline}
        />
        {method !== 'GET' && (
          <TextInput
            label="Body"
            mode="outlined"
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={5}
            style={styles.input}
            outlineStyle={styles.outline}
          />
        )}
        <Button mode="contained" onPress={handleSend} style={styles.button} icon="cloud-upload">
          Ejecutar request
        </Button>
      </Card>

      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Respuesta simulada
        </Text>
        <View style={styles.responseBox}>
          <Text style={styles.responseText}>{response}</Text>
        </View>
        <Text style={styles.helper}>
          Roadmap: soporte para headers personalizados, historial y autenticación JWT.
        </Text>
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#f8fafc',
    marginBottom: 12,
    fontWeight: '600'
  },
  methodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  methodChip: {
    borderRadius: 16,
    backgroundColor: 'rgba(148, 163, 184, 0.16)'
  },
  methodChipSpacing: {
    marginRight: 12,
    marginBottom: 12
  },
  methodChipActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.35)'
  },
  methodChipText: {
    color: 'rgba(226, 232, 240, 0.8)',
    fontWeight: '600'
  },
  methodChipTextActive: {
    color: '#f8fafc'
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.6)'
  },
  outline: {
    borderRadius: 18,
    borderColor: 'rgba(99, 102, 241, 0.35)'
  },
  button: {
    borderRadius: 16,
    marginTop: 4,
    backgroundColor: '#38bdf8'
  },
  responseBox: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    padding: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.7)'
  },
  responseText: {
    color: 'rgba(226, 232, 240, 0.85)',
    fontFamily: 'Courier'
  },
  helper: {
    marginTop: 12,
    color: 'rgba(226, 232, 240, 0.7)',
    fontSize: 12
  }
});
