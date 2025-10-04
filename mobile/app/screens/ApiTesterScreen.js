import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';

export default function ApiTesterScreen({ navigation }) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://example.com/api');
  const [body, setBody] = useState('{}');
  const [response, setResponse] = useState('Aún no se envió una request.');

  const handleSend = () => {
    // TODO: Integrate fetch with configurable headers y guardar historial.
    setResponse(`Simulación ${method} → ${url}\n${body}`);
  };

  return (
    <ScreenLayout>
      <Header title="API Tester" onBack={() => navigation.goBack()} />
      <Card>
        <Text style={styles.label}>Método</Text>
        <TextInput value={method} onChangeText={setMethod} style={styles.input} />
        <Text style={styles.label}>URL</Text>
        <TextInput value={url} onChangeText={setUrl} style={styles.input} />
        {method !== 'GET' && (
          <>
            <Text style={styles.label}>Body</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              style={[styles.input, styles.bodyInput]}
              multiline
            />
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </Card>
      <Card>
        <Text style={styles.label}>Respuesta</Text>
        <Text style={styles.response}>{response}</Text>
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4
  },
  input: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  bodyInput: {
    height: 120,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#f8fafc',
    fontWeight: '600'
  },
  response: {
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    fontFamily: 'Courier'
  }
});
