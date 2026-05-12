import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function WarmBackground({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.blobA} />
      <View style={styles.blobB} />
      <View style={styles.blobC} />
      <View style={styles.noise} />
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

export function PageTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <View style={[styles.titleBlock, align === 'center' && styles.center]}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={[styles.title, align === 'center' && styles.centerText]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, align === 'center' && styles.centerText]}>{subtitle}</Text> : null}
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
    >
      {icon ? <Ionicons name={icon} size={18} color="#1f140f" /> : null}
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function GhostButton({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.ghostButton, pressed && styles.pressed]}
    >
      {icon ? <Ionicons name={icon} size={18} color="#f7e8df" /> : null}
      <Text style={styles.ghostButtonText}>{label}</Text>
    </Pressable>
  );
}

export function OptionCard({
  label,
  description,
  selected,
  onPress,
}: {
  label: string;
  description?: string;
  selected?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.optionCard,
        selected && styles.optionCardSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.optionCardTopRow}>
        <Text style={styles.optionLabel}>{label}</Text>
        {selected ? <Ionicons name="heart" size={16} color="#ff8d8f" /> : null}
      </View>
      {description ? <Text style={styles.optionDescription}>{description}</Text> : null}
    </Pressable>
  );
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function Field({
  label,
  ...props
}: TextInputProps & {
  label: string;
}) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor="#9c8f8a"
        style={styles.field}
        {...props}
      />
    </View>
  );
}

export function TinyNote({ children }: { children: ReactNode }) {
  return <Text style={styles.tinyNote}>{children}</Text>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#130f12',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  blobA: {
    position: 'absolute',
    top: -30,
    left: -40,
    width: 180,
    height: 180,
    borderRadius: 180,
    backgroundColor: 'rgba(255, 138, 120, 0.18)',
  },
  blobB: {
    position: 'absolute',
    top: 160,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: 'rgba(255, 208, 171, 0.10)',
  },
  blobC: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    width: 160,
    height: 160,
    borderRadius: 160,
    backgroundColor: 'rgba(255, 143, 194, 0.10)',
  },
  noise: {
    position: 'absolute',
    inset: 0,
    borderColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    opacity: 0.25,
  },
  titleBlock: {
    gap: 6,
  },
  center: {
    alignItems: 'center',
  },
  eyebrow: {
    color: '#f2bfb8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fff8f3',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: '#d6c2bc',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  centerText: {
    textAlign: 'center',
  },
  card: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255, 231, 224, 0.12)',
    backgroundColor: 'rgba(30, 22, 25, 0.88)',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: '#f6d6c9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    color: '#241916',
    fontSize: 16,
    fontWeight: '800',
  },
  ghostButton: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 231, 224, 0.14)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  ghostButtonText: {
    color: '#fff2eb',
    fontSize: 16,
    fontWeight: '700',
  },
  optionCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 231, 224, 0.10)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 14,
    gap: 6,
  },
  optionCardSelected: {
    borderColor: 'rgba(255, 179, 164, 0.42)',
    backgroundColor: 'rgba(255, 179, 164, 0.12)',
  },
  optionCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionLabel: {
    color: '#fff7f2',
    fontSize: 16,
    fontWeight: '700',
  },
  optionDescription: {
    color: '#d6c2bc',
    fontSize: 13,
    lineHeight: 19,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  chip: {
    minHeight: 42,
    borderRadius: 999,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 231, 224, 0.10)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  chipSelected: {
    backgroundColor: 'rgba(255, 179, 164, 0.18)',
    borderColor: 'rgba(255, 179, 164, 0.45)',
  },
  chipText: {
    color: '#f5dfd8',
    fontSize: 14,
    fontWeight: '700',
  },
  chipTextSelected: {
    color: '#fff8f3',
  },
  fieldBlock: {
    gap: 8,
  },
  fieldLabel: {
    color: '#f0d7d1',
    fontSize: 13,
    fontWeight: '700',
  },
  field: {
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 231, 224, 0.12)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: '#fff7f2',
    paddingHorizontal: 14,
    fontSize: 15,
  },
  tinyNote: {
    color: '#c9b4ae',
    fontSize: 12,
    lineHeight: 18,
  },
});
