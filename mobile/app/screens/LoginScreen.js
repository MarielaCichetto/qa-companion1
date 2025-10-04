import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Main');
  };

  return (
    <LinearGradient colors={['#0b1120', '#1e1b4b']} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text variant="headlineMedium" style={styles.heroTitle}>
            QA Companion
          </Text>
          <Text variant="bodyMedium" style={styles.heroSubtitle}>
            Controla tus suites de pruebas, reportes y métricas desde un solo lugar con una interfaz moderna.
          </Text>
          <View style={styles.decorative}>
            <View style={styles.pill} />
            <View style={[styles.pill, styles.pillAlt]} />
          </View>
        </View>
        <View style={styles.card}>
          <Text variant="titleLarge" style={styles.title}>
            Bienvenido de nuevo
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            Ingresa tus credenciales corporativas para acceder al hub de QA.
          </Text>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            autoCapitalize="none"
            outlineStyle={styles.inputOutline}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />
          <PrimaryButton onPress={handleLogin} style={styles.button}>
            Ingresar al dashboard
          </PrimaryButton>
          <Text variant="bodySmall" style={styles.helper}>
            Próximo paso: habilitar biometría y Single Sign-On para acceso corporativo.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 24,
    justifyContent: 'center'
  },
  hero: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    marginBottom: 24
  },
  heroTitle: {
    color: '#f8fafc',
    fontWeight: '700'
  },
  heroSubtitle: {
    marginTop: 8,
    color: 'rgba(226, 232, 240, 0.75)'
  },
  decorative: {
    marginTop: 24,
    flexDirection: 'row'
  },
  pill: {
    height: 32,
    flex: 1,
    borderRadius: 999,
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
    marginRight: 12
  },
  pillAlt: {
    backgroundColor: 'rgba(14, 165, 233, 0.25)',
    marginRight: 0
  },
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    padding: 24
  },
  title: {
    color: '#f8fafc',
    fontWeight: '700'
  },
  subtitle: {
    color: 'rgba(226, 232, 240, 0.75)',
    marginBottom: 16
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.8)'
  },
  inputOutline: {
    borderRadius: 16,
    borderColor: 'rgba(99, 102, 241, 0.35)'
  },
  button: {
    borderRadius: 18,
    backgroundColor: '#6366f1',
    marginTop: 8
  },
  helper: {
    color: 'rgba(226, 232, 240, 0.65)',
    marginTop: 16
  }
});
