import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width - 40;
const CARD_SIZE = Math.min(width - 56, 340);
const HERO_HEIGHT = CARD_SIZE + 26;
const TITLE_HEIGHT = 88;
const TEXT_HEIGHT = 76;

type Slide = {
  id: string;
  title: string;
  text: string;
  accent: string;
  shadow: string;
  image?: number;
};

const slides: Slide[] = [
  {
    id: 'care',
    title: 'Gentle, emotional reminders',
    text: 'Stay connected with the people who matter most through small, meaningful check-ins.',
    accent: '#c43a3f',
    shadow: 'rgba(196, 58, 63, 0.18)',
    image: require('@/assets/images/image-1.png'),
  },
  {
    id: 'whatsapp',
    title: 'One tap to message',
    text: 'Open WhatsApp instantly so caring stays effortless, not complicated.',
    accent: '#d55f79',
    shadow: 'rgba(213, 95, 121, 0.18)',
    image: require('@/assets/images/image-2.png'),
  },
  {
    id: 'warm',
    title: 'Warm technology',
    text: 'Minimal, calm, and emotionally intelligent from the first screen onward.',
    accent: '#b96fb1',
    shadow: 'rgba(185, 111, 177, 0.18)',
    image: require('@/assets/images/image-3.png'),
  },
];

export default function OnboardingScreen() {
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / SLIDE_WIDTH);
    setIndex(nextIndex);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={styles.slide}>
      <View style={styles.slideContent}>
        <View style={[styles.heroFrame, { height: HERO_HEIGHT }]}>
          <View style={[styles.illustrationCard, { shadowColor: item.shadow }]}>
            <View style={[styles.lightWash, { backgroundColor: `${item.accent}20` }]} />
            {item.image ? (
              <Image source={item.image} style={styles.cardImage} contentFit="cover" />
            ) : (
              <>
                <View style={[styles.heartLeft, { backgroundColor: item.accent }]} />
                <View style={[styles.heartRight, { backgroundColor: item.accent }]} />
                <View style={[styles.heartShadow, { backgroundColor: item.shadow }]} />
                <View style={styles.squiggleOne} />
                <View style={styles.squiggleTwo} />
              </>
            )}
          </View>
        </View>

        <View style={styles.copyBlock}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.brandLogo}
            contentFit="contain"
          />
        </View>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      <Animated.View style={[styles.body, { opacity: fade }]}>
        <FlatList
          ref={listRef}
          data={slides}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.carouselList}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          decelerationRate="fast"
          snapToAlignment="start"
          disableIntervalMomentum
          contentContainerStyle={styles.carousel}
        />

        <View style={styles.dots}>
          {slides.map((slide, slideIndex) => (
            <View
              key={slide.id}
              style={[styles.dot, index === slideIndex && styles.dotActive]}
            />
          ))}
        </View>

        <Pressable
          onPress={() => router.push('/login')}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 10,
    minHeight: 52,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 120,
    height: 50,
    marginTop: 0,
    marginLeft: 4,
  },
  skip: {
    color: '#6e6e6e',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginTop: -8,
    marginRight: 10,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 22,
  },
  carouselList: {
    flex: 1,
  },
  carousel: {
    alignItems: 'stretch',
    flexGrow: 1,
  },
  slide: {
    width: SLIDE_WIDTH,
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 16,
  },
  heroFrame: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 34,
    backgroundColor: '#fff3e3',
    marginBottom: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 2,
    overflow: 'hidden',
  },
  lightWash: {
    position: 'absolute',
    inset: 0,
  },
  heartLeft: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    left: 86,
    top: 90,
    transform: [{ rotate: '-20deg' }],
    shadowColor: '#b61d22',
    shadowOpacity: 0.36,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  heartRight: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    right: 74,
    top: 78,
    transform: [{ rotate: '14deg' }],
    shadowColor: '#b61d22',
    shadowOpacity: 0.36,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  heartShadow: {
    position: 'absolute',
    width: 184,
    height: 18,
    borderRadius: 999,
    bottom: 20,
    opacity: 0.55,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  copyBlock: {
    alignItems: 'center',
    width: '100%',
    marginTop: 18,
    minHeight: TITLE_HEIGHT + TEXT_HEIGHT,
    justifyContent: 'flex-start',
  },
  squiggleOne: {
    position: 'absolute',
    top: 86,
    left: 76,
    width: 60,
    height: 34,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(125, 125, 125, 0.25)',
    transform: [{ rotate: '18deg' }],
  },
  squiggleTwo: {
    position: 'absolute',
    bottom: 70,
    right: 76,
    width: 48,
    height: 28,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(125, 125, 125, 0.18)',
    transform: [{ rotate: '-18deg' }],
  },
  title: {
    color: '#202020',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.4,
    maxWidth: 260,
    minHeight: TITLE_HEIGHT,
  },
  text: {
    marginTop: 12,
    color: '#8c8c8c',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 300,
    minHeight: TEXT_HEIGHT,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 28,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#e0d8d8',
  },
  dotActive: {
    width: 11,
    height: 11,
    borderRadius: 11,
    backgroundColor: '#c43a3f',
  },
  button: {
    marginTop: 22,
    minHeight: 56,
    borderRadius: 28,
    backgroundColor: '#c43a3f',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#c43a3f',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  buttonArrow: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: -1,
  },
});
