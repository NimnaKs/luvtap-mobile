import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Card, OptionCard, PageTitle, PrimaryButton, WarmBackground } from '@/components/flow-elements';
import { useAppFlow, type ReminderType } from '@/lib/flow-state';

const reminderOptions: ReminderType[] = [
  'Did they eat?',
  'Reached home?',
  'Goodnight text',
  'University check-in',
  'Work reminder',
  'Custom',
];

export default function ReminderScreen() {
  const { state, setReminderType } = useAppFlow();
  const [selected, setSelected] = useState<ReminderType>(state.reminderType ?? 'Did they eat?');

  const continueNext = () => {
    setReminderType(selected);
    router.push('/permissions');
  };

  return (
    <WarmBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PageTitle
          eyebrow="Step 3 of 4"
          title="Create the first reminder"
          subtitle="Start with one small habit. You can add more after the app is live."
        />

        <Card>
          <View style={styles.list}>
            {reminderOptions.map((item) => (
              <OptionCard
                key={item}
                label={item}
                selected={selected === item}
                onPress={() => setSelected(item)}
              />
            ))}
          </View>
        </Card>

        <PrimaryButton label="Continue" onPress={continueNext} icon="arrow-forward" />
      </ScrollView>
    </WarmBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 14,
    paddingBottom: 10,
  },
  list: {
    gap: 10,
  },
});
