import { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Fonts } from '@/constants/theme';

export default function LaunchScreen() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2200);

    return () => clearTimeout(timer);
  }, [opacity, pulse, router, scale]);

  const glowScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 0.9],
  });

  return (
    <View style={styles.container}>
      <View style={styles.backdrop} />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.pinkGlow,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.purpleGlow,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.brandRow,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}>
        <Text style={styles.heart}>{'\u2665'}</Text>
        <Text style={styles.wordmark}>
          <Text style={styles.wordmarkPink}>Luv</Text>
          <Text style={styles.wordmarkPurple}>Tap</Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9f9f9f',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  pinkGlow: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 320,
    backgroundColor: 'rgba(255, 79, 156, 0.22)',
    shadowColor: '#ff4f9c',
    shadowOpacity: 0.75,
    shadowRadius: 80,
    shadowOffset: { width: 0, height: 0 },
  },
  purpleGlow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 280,
    backgroundColor: 'rgba(168, 92, 255, 0.18)',
    shadowColor: '#a85cff',
    shadowOpacity: 0.7,
    shadowRadius: 90,
    shadowOffset: { width: 0, height: 0 },
    right: '20%',
    top: '44%',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  heart: {
    color: '#ff4fa3',
    fontSize: 84,
    marginRight: 12,
    textShadowColor: 'rgba(255, 79, 156, 0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 28,
    includeFontPadding: false,
    lineHeight: Platform.select({ ios: 84, android: 92, default: 84 }),
  },
  wordmark: {
    fontFamily: Fonts.rounded,
    fontSize: 88,
    fontStyle: 'italic',
    letterSpacing: -2,
    includeFontPadding: false,
    lineHeight: Platform.select({ ios: 88, android: 96, default: 88 }),
    textShadowColor: 'rgba(255, 92, 186, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  wordmarkPink: {
    color: '#ff4fa3',
  },
  wordmarkPurple: {
    color: '#b05cff',
  },
});
