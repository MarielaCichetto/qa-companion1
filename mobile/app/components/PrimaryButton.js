import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function PrimaryButton({ style, labelStyle, ...props }) {
  return (
    <Button
      mode="contained"
      style={[styles.button, style]}
      contentStyle={styles.content}
      labelStyle={[styles.label, labelStyle]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#4f46e5'
  },
  content: {
    paddingVertical: 8
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.75
  }
});
