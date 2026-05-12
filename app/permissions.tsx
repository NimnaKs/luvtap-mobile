import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Card, GhostButton, PageTitle, PrimaryButton, WarmBackground } from '@/components/flow-elements';
import { useAppFlow } from '@/lib/flow-state';

export default function PermissionsScreen() {
  const { setNotificationsEnabled } = useAppFlow();

  const allowNotifications = () => {
    setNotificationsEnabled(true);
    router.replace('/home');
  };

  return (
    <WarmBackground>
      <PageTitle
        eyebrow="Step 4 of 4"
        title="Gentle reminders need permission"
        subtitle="LuvTap uses notifications to help you stay connected without making the app feel loud."
      />

      <Card>
        <View style={styles.permissionArt}>
          <Text style={styles.bell}>🔔</Text>
          <Text style={styles.permissionText}>
            We only send the reminders you create. Nothing noisy. Nothing random.
          </Text>
        </View>
      </Card>

      <PrimaryButton label="Allow Notifications" onPress={allowNotifications} icon="notifications" />
      <GhostButton label="Maybe later" onPress={() => router.replace('/home')} />
    </WarmBackground>
  );
}

const styles = StyleSheet.create({
  permissionArt: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  bell: {
    fontSize: 44,
  },
  permissionText: {
    color: '#d6c2bc',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
