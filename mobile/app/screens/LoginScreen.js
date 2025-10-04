import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Integrate secure auth flow (biometric, OAuth) in future iterations.
    navigation.replace('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>QA Companion</Text>
        <Text style={styles.subtitle}>Gestiona tus pruebas en un solo lugar.</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <Text style={styles.helper}>* Implementar recuperación de contraseña en futuras versiones.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    padding: 24
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc'
  },
  subtitle: {
    fontSize: 14,
    color: '#cbd5f5',
    marginBottom: 16
  },
  input: {
    backgroundColor: '#334155',
    color: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
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
  helper: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 12
  }
});
