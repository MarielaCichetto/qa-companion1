import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function ScreenLayout({ children }) {
  return (
    <LinearGradient colors={['#0b1120', '#1e1b4b']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  content: {
    padding: 24,
    paddingBottom: 40
  },
  inner: {
    flex: 1
  }
});
