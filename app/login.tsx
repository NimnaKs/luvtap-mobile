import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAppFlow } from '@/lib/flow-state';
import { Card, GhostButton, PrimaryButton, WarmBackground } from '@/components/flow-elements';

function LoginOption({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return <PrimaryButton label={label} onPress={onPress} />;
}

export default function LoginScreen() {
  const { setLoginMethod } = useAppFlow();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [scale]);

  const continueFrom = (method: 'Google' | 'Apple' | 'Phone') => {
    setLoginMethod(method);
    router.push('/language');
  };

  return (
    <WarmBackground>
      <View style={styles.top}>
        <Animated.View style={[styles.heartWrap, { transform: [{ scale }] }]}>
          <Text style={styles.heart}>❤️</Text>
        </Animated.View>
        <Text style={styles.logo}>LuvTap</Text>
        <Text style={styles.subtitle}>Small reminders for people you love.</Text>
      </View>

      <Card>
        <View style={styles.illustration}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>Hey love, remember to eat first 💛</Text>
          </View>
          <View style={styles.person} />
          <View style={styles.heartsRow}>
            <Text style={styles.smallHeart}>💗</Text>
            <Text style={styles.smallHeart}>💌</Text>
            <Text style={styles.smallHeart}>✨</Text>
          </View>
        </View>
      </Card>

      <View style={styles.actions}>
        <LoginOption label="Continue with Google" onPress={() => continueFrom('Google')} />
        <LoginOption label="Continue with Apple" onPress={() => continueFrom('Apple')} />
        <LoginOption label="Continue with Phone Number" onPress={() => continueFrom('Phone')} />
      </View>

      <GhostButton label="No password. No setup." icon="heart" onPress={() => router.push('/language')} />
      <Text style={styles.note}>By continuing, you agree to our Privacy Policy.</Text>
    </WarmBackground>
  );
}

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
    paddingTop: 10,
    gap: 8,
  },
  heartWrap: {
    width: 72,
    height: 72,
    borderRadius: 72,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    fontSize: 30,
  },
  logo: {
    color: '#fff7f3',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: '#d6c2bc',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  illustration: {
    minHeight: 182,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  bubble: {
    alignSelf: 'stretch',
    borderRadius: 18,
    backgroundColor: 'rgba(255, 225, 208, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255, 225, 208, 0.16)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleText: {
    color: '#fff7f2',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  person: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255, 179, 164, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 179, 164, 0.25)',
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  smallHeart: {
    fontSize: 18,
  },
  actions: {
    gap: 10,
  },
  note: {
    color: '#c9b4ae',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
});
