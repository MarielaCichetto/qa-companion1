import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ApiTesterScreen = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('http://localhost:4000/api/test-cases');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    try {
      const options = { method };
      if (method !== 'GET' && body) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = body;
      }
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>API Tester</Text>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Método (GET/POST)</Text>
          <TextInput value={method} onChangeText={setMethod} style={styles.input} />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>URL</Text>
          <TextInput value={url} onChangeText={setUrl} style={styles.input} />
        </View>
        {method !== 'GET' && (
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Body (JSON)</Text>
            <TextInput value={body} onChangeText={setBody} style={[styles.input, styles.textArea]} multiline numberOfLines={6} />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <View style={styles.response}>
          <Text style={styles.label}>Respuesta</Text>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  fieldGroup: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff'
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  response: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12
  },
  responseText: { fontFamily: 'Courier', marginTop: 8 }
});

export default ApiTesterScreen;
