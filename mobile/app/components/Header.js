import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header({ title, onBack }) {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>{'<'} Volver</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12
  },
  backButton: {
    marginBottom: 8
  },
  backText: {
    fontSize: 14,
    color: '#6366f1'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a'
  }
});
