import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

export default function Header({ title, onBack, subtitle }) {
  return (
    <View style={styles.container}>
      {onBack && (
        <IconButton
          icon="chevron-left"
          size={24}
          onPress={onBack}
          iconColor="#e2e8f0"
          style={styles.backButton}
        />
      )}
      <View style={styles.textContainer}>
        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="bodySmall" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButton: {
    marginRight: 4,
    backgroundColor: 'rgba(99, 102, 241, 0.12)'
  },
  textContainer: {
    flex: 1
  },
  title: {
    color: '#f8fafc',
    fontWeight: '700'
  },
  subtitle: {
    color: 'rgba(226, 232, 240, 0.75)',
    marginTop: 4
  }
});
