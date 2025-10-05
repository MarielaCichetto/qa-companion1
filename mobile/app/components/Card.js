import { Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function Card({ children, style }) {
  return (
    <Surface style={[styles.card, style]} elevation={2}>
      {children}
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)'
  }
});
