import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/AuthContext';

const LoginScreen = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = () => {
    login(form.username, form.password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>QA Companion</Text>
        <TextInput
          placeholder="Usuario"
          value={form.username}
          onChangeText={(value) => setForm((prev) => ({ ...prev, username: value }))}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => setForm((prev) => ({ ...prev, password: value }))}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa'
  },
  card: {
    width: '90%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  }
});

export default LoginScreen;
