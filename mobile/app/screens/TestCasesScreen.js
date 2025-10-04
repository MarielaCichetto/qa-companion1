import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Header from '../components/Header';
import Card from '../components/Card';
import { testCasesSeed } from '../data/testCases';

const statuses = ['Passed', 'Failed', 'Blocked'];

export default function TestCasesScreen({ navigation }) {
  const [testCases, setTestCases] = useState(testCasesSeed);

  const updateStatus = (id, status) => {
    setTestCases((prev) => prev.map((tc) => (tc.id === id ? { ...tc, status } : tc)));
  };

  return (
    <ScreenLayout>
      <Header title="Test Cases" onBack={() => navigation.goBack()} />
      {testCases.map((testCase) => (
        <Card key={testCase.id}>
          <Text style={styles.title}>{testCase.title}</Text>
          <Text style={styles.meta}>{testCase.id}</Text>
          <View style={styles.statusRow}>
            {statuses.map((status, index) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusChip,
                  testCase.status === status && styles.statusChipActive,
                  index !== 0 && styles.statusChipSpacing
                ]}
                onPress={() => updateStatus(testCase.id, status)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    testCase.status === status && styles.statusChipTextActive
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  meta: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8
  },
  statusRow: {
    flexDirection: 'row',
    marginTop: 12
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e2e8f0'
  },
  statusChipActive: {
    backgroundColor: '#6366f1'
  },
  statusChipSpacing: {
    marginLeft: 8
  },
  statusChipText: {
    color: '#0f172a',
    fontSize: 12
  },
  statusChipTextActive: {
    color: '#f8fafc'
  }
});
