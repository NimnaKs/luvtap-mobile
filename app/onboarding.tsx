import { useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Card, GhostButton, PrimaryButton, WarmBackground } from '@/components/flow-elements';

const { width } = Dimensions.get('window');

const slides = [
  {
    emoji: '💌',
    title: 'Gentle reminders that feel human',
    text: 'Keep care visible without turning it into another productivity app.',
  },
  {
    emoji: '💬',
    title: 'Send love straight into WhatsApp',
    text: 'One tap opens the conversation so action stays effortless.',
  },
  {
    emoji: '🫶',
    title: 'Made for small acts of caring',
    text: 'The app stays calm, minimal, and emotionally intelligent.',
  },
];

export default function OnboardingScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(nextIndex);
  };

  return (
    <WarmBackground>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Welcome to LuvTap</Text>
        <Text style={styles.title}>Warm reminders, not noisy tasks.</Text>
        <Text style={styles.subtitle}>Swipe through the idea in three quick screens.</Text>
      </View>

      <Card>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          contentContainerStyle={styles.carousel}
          snapToInterval={width - 72}
          decelerationRate="fast"
        >
          {slides.map((slide) => (
            <View key={slide.title} style={styles.slide}>
              <Text style={styles.emoji}>{slide.emoji}</Text>
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.slideText}>{slide.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.dots}>
          {slides.map((slide, slideIndex) => (
            <View
              key={slide.title}
              style={[styles.dot, index === slideIndex && styles.dotActive]}
            />
          ))}
        </View>
      </Card>

      <PrimaryButton label="Continue" onPress={() => router.push('/login')} />
      <GhostButton label="Skip" icon="chevron-forward" onPress={() => router.push('/login')} />
    </WarmBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    paddingTop: 10,
  },
  eyebrow: {
    color: '#f2b8af',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fff8f4',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: '#d6c2bc',
    fontSize: 15,
    lineHeight: 22,
  },
  carousel: {
    alignItems: 'center',
  },
  slide: {
    width: width - 72,
    paddingVertical: 8,
    gap: 12,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  slideTitle: {
    color: '#fff7f2',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  slideText: {
    color: '#d7c2bc',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 260,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#f6d6c9',
  },
});
