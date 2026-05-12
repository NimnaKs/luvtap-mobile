import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Chip, Card, Field, PageTitle, PrimaryButton, TinyNote, WarmBackground } from '@/components/flow-elements';
import { useAppFlow, type PlatformType } from '@/lib/flow-state';

const platforms: PlatformType[] = ['WhatsApp', 'Messenger', 'Telegram', 'Instagram'];

export default function LovedOneScreen() {
  const { state, setLovedOne } = useAppFlow();
  const [name, setName] = useState(state.lovedOne.name);
  const [relationship, setRelationship] = useState(state.lovedOne.relationship);
  const [platform, setPlatform] = useState<PlatformType>(state.lovedOne.platform);
  const [phoneNumber, setPhoneNumber] = useState(state.lovedOne.phoneNumber);

  const continueNext = () => {
    setLovedOne({ name, relationship, platform, phoneNumber });
    router.push('/reminder');
  };

  return (
    <WarmBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PageTitle
          eyebrow="Step 2 of 4"
          title="Add your loved one"
          subtitle="Keep it simple. LuvTap only needs enough detail to make the reminders feel personal."
        />

        <Card>
          <View style={styles.fields}>
            <Field label="Name" value={name} onChangeText={setName} placeholder="Sarah" />
            <Field label="Relationship" value={relationship} onChangeText={setRelationship} placeholder="Partner" />
            <Field
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="+94 77 123 4567"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.platforms}>
            <Text style={styles.platformLabel}>Platform</Text>
            <View style={styles.platformGrid}>
              {platforms.map((item) => (
                <Chip key={item} label={item} selected={platform === item} onPress={() => setPlatform(item)} />
              ))}
            </View>
          </View>
        </Card>

        <TinyNote>
          The platform is used later to jump into the right app in one tap.
        </TinyNote>

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
  fields: {
    gap: 12,
  },
  platforms: {
    marginTop: 16,
    gap: 10,
  },
  platformLabel: {
    color: '#f0d7d1',
    fontSize: 13,
    fontWeight: '700',
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
