import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { AppFlowProvider } from '@/lib/flow-state';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppFlowProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#120f12' },
          }}
        />
      </AppFlowProvider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
