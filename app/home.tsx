import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, GhostButton, PageTitle, TinyNote, WarmBackground } from '@/components/flow-elements';
import { useAppFlow } from '@/lib/flow-state';
import { router } from 'expo-router';

function stripPhoneNumber(value: string) {
  return value.replace(/[^\d]/g, '');
}

function buildWhatsAppUrl(phoneNumber: string, message: string) {
  const normalized = stripPhoneNumber(phoneNumber);
  const fallbackNumber = normalized.length > 0 ? normalized : '94771234567';
  const encodedMessage = encodeURIComponent(message);
  return {
    native: `whatsapp://send?phone=${fallbackNumber}&text=${encodedMessage}`,
    web: `https://wa.me/${fallbackNumber}?text=${encodedMessage}`,
  };
}

export default function HomeScreen() {
  const { state } = useAppFlow();
  const name = state.lovedOne.name || 'Sarah';
  const reminderLabel = state.reminderType ?? 'Did they eat?';
  const platform = state.lovedOne.platform;
  const firstMessage = `Hey ${name}, ${reminderLabel.toLowerCase().replace('?', '')} ❤️`;
  const secondMessage = `Just checking in on you, ${name}.`;

  const openWhatsApp = async (message: string) => {
    const { native, web } = buildWhatsAppUrl(state.lovedOne.phoneNumber, message);
    const supported = await Linking.canOpenURL(native);
    await Linking.openURL(supported ? native : web);
  };

  const todayReminders = [
    { time: '1:00 PM', text: `Ask ${name} if they ate`, message: firstMessage },
    { time: '6:00 PM', text: `Ask if ${name} reached home`, message: secondMessage },
  ];

  return (
    <WarmBackground>
      <PageTitle
        eyebrow="Home"
        title={`Good evening, ${name} ❤️`}
        subtitle="Your reminders are ready. Tap one and it opens the conversation instantly."
      />

      <Card>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Language style</Text>
            <Text style={styles.summaryValue}>{state.languageStyle ?? 'English'}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Platform</Text>
            <Text style={styles.summaryValue}>{platform}</Text>
          </View>
        </View>
        <Text style={styles.smallHeading}>Today reminders</Text>
        <View style={styles.reminderList}>
          {todayReminders.map((reminder) => (
            <Pressable
              key={reminder.time}
              onPress={() => openWhatsApp(reminder.message)}
              style={({ pressed }) => [
                styles.reminderRow,
                pressed && styles.pressed,
              ]}
            >
              <View>
                <Text style={styles.reminderTime}>{reminder.time}</Text>
                <Text style={styles.reminderText}>{reminder.text}</Text>
              </View>
              <Text style={styles.tapHint}>Open</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.smallHeading}>Current focus</Text>
        <Text style={styles.focusText}>
          {name} - {reminderLabel}
        </Text>
        <TinyNote>
          LuvTap is designed to feel warm, calm, and emotionally intelligent.
        </TinyNote>
      </Card>

      <GhostButton label="Edit flow" icon="pencil" onPress={() => router.replace('/language')} />
    </WarmBackground>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 231, 224, 0.10)',
  },
  summaryLabel: {
    color: '#cfb8b1',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  summaryValue: {
    color: '#fff7f2',
    fontSize: 15,
    fontWeight: '800',
  },
  smallHeading: {
    color: '#f4ddd6',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
    marginBottom: 10,
  },
  reminderList: {
    gap: 10,
  },
  reminderRow: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 231, 224, 0.10)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reminderTime: {
    color: '#ffcabd',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  reminderText: {
    color: '#fff7f2',
    fontSize: 15,
    fontWeight: '700',
  },
  tapHint: {
    color: '#f6d6c9',
    fontSize: 13,
    fontWeight: '800',
  },
  focusText: {
    color: '#fff7f2',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
});
