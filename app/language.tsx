import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Chip, Card, PageTitle, PrimaryButton, WarmBackground } from '@/components/flow-elements';
import { useAppFlow, type LanguageStyle } from '@/lib/flow-state';

const stylesList: LanguageStyle[] = ['English', 'Sinhala', 'Tamil', 'Mixed'];

export default function LanguageScreen() {
  const { state, setLanguageStyle } = useAppFlow();
  const [selected, setSelected] = useState<LanguageStyle>(state.languageStyle ?? 'English');

  const continueNext = () => {
    setLanguageStyle(selected);
    router.push('/loved-one');
  };

  return (
    <WarmBackground>
      <PageTitle
        eyebrow="Step 1 of 4"
        title="How do you usually talk?"
        subtitle="Pick the tone that feels natural. This helps LuvTap write reminders that sound like you."
      />

      <Card>
        <View style={styles.grid}>
          {stylesList.map((style) => (
            <Chip key={style} label={style} selected={selected === style} onPress={() => setSelected(style)} />
          ))}
        </View>
      </Card>

      <PrimaryButton label="Continue" onPress={continueNext} icon="arrow-forward" />
    </WarmBackground>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
