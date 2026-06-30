import { ReactNode } from 'react';
import {
  ColorValue,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Tone = 'default' | 'accent' | 'hero' | 'soft' | 'blue' | 'outline';
type GlyphName = 'home' | 'search' | 'explore' | 'profile' | 'add';

type Palette = {
  background: string;
  card: string;
  cardSoft: string;
  cardBlue: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accentDeep: string;
  accentSoft: string;
  accentGlow: string;
  hero: string;
  heroMuted: string;
  live: string;
};

const lightPalette: Palette = {
  background: '#EAF6FF',
  card: '#FFFFFF',
  cardSoft: '#F4F9FF',
  cardBlue: '#D7EEFF',
  text: '#11263E',
  textMuted: '#68819C',
  border: '#C8DFF2',
  accent: '#29A5F6',
  accentDeep: '#117FCC',
  accentSoft: '#D8F0FF',
  accentGlow: '#B8E5FF',
  hero: '#0D8ED8',
  heroMuted: '#D9F3FF',
  live: '#FF4D6D',
};

const darkPalette: Palette = {
  background: '#071826',
  card: '#102232',
  cardSoft: '#142C41',
  cardBlue: '#17344C',
  text: '#F5FBFF',
  textMuted: '#8CA6BC',
  border: '#1F415D',
  accent: '#48BBFF',
  accentDeep: '#2A95D4',
  accentSoft: '#123A54',
  accentGlow: '#19547A',
  hero: '#0E6DA8',
  heroMuted: '#CBEAFF',
  live: '#FF5A76',
};

export function useSocialPalette() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkPalette : lightPalette;
}

export function SocialScreen({ children }: { children: ReactNode }) {
  const palette = useSocialPalette();

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <View style={[styles.bannerTop, { backgroundColor: palette.accentGlow }]} />
      <View style={[styles.bannerMid, { backgroundColor: palette.accent }]} />
      <View style={[styles.bannerCardLeft, { backgroundColor: palette.cardBlue }]} />
      <View style={[styles.bannerCardRight, { backgroundColor: palette.cardBlue }]} />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export function SocialScreenFrame({ children }: { children: ReactNode }) {
  const palette = useSocialPalette();

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <View style={[styles.bannerTop, { backgroundColor: palette.accentGlow }]} />
      <View style={[styles.bannerMid, { backgroundColor: palette.accent }]} />
      <View style={[styles.bannerCardLeft, { backgroundColor: palette.cardBlue }]} />
      <View style={[styles.bannerCardRight, { backgroundColor: palette.cardBlue }]} />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {children}
      </SafeAreaView>
    </View>
  );
}

export function TopHeader({
  eyebrow,
  title,
  subtitle,
  rightSlot,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  rightSlot?: ReactNode;
}) {
  const palette = useSocialPalette();

  return (
    <View style={styles.headerRow}>
      <View style={styles.headerCopy}>
        <Text style={[styles.eyebrow, { color: palette.accentDeep }]}>{eyebrow}</Text>
        <Text style={[styles.headerTitle, { color: palette.text }]}>{title}</Text>
        <Text style={[styles.headerSubtitle, { color: palette.textMuted }]}>{subtitle}</Text>
      </View>
      {rightSlot ? <View style={styles.headerSide}>{rightSlot}</View> : null}
    </View>
  );
}

export function NewsBrand({
  subtitle,
  rightSlot,
}: {
  subtitle?: string;
  rightSlot?: ReactNode;
}) {
  const palette = useSocialPalette();

  return (
    <View style={styles.brandRow}>
      <View style={styles.brandLeft}>
        <View style={[styles.brandMark, { backgroundColor: palette.accent }]}>
          <Text style={styles.brandMarkText}>NW</Text>
        </View>
        <View style={styles.brandCopy}>
          <Text style={[styles.brandTitle, { color: palette.text }]}>NewsWatch</Text>
          {subtitle ? <Text style={[styles.brandSubtitle, { color: palette.textMuted }]}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightSlot ? <View>{rightSlot}</View> : null}
    </View>
  );
}

export function SurfaceCard({
  children,
  tone = 'default',
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  style?: ViewStyle;
}) {
  const palette = useSocialPalette();

  const backgrounds: Record<Tone, string> = {
    default: palette.card,
    accent: palette.accentSoft,
    hero: palette.hero,
    soft: palette.cardSoft,
    blue: palette.cardBlue,
    outline: palette.card,
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: backgrounds[tone],
          borderColor: tone === 'hero' ? 'transparent' : palette.border,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: string }) {
  const palette = useSocialPalette();

  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: palette.text }]}>{title}</Text>
      {action ? <Text style={[styles.sectionAction, { color: palette.accentDeep }]}>{action}</Text> : null}
    </View>
  );
}

export function Tag({
  label,
  tone = 'soft',
}: {
  label: string;
  tone?: 'soft' | 'accent' | 'dark' | 'live' | 'outline';
}) {
  const palette = useSocialPalette();
  let backgroundColor = palette.cardSoft;
  let color = palette.textMuted;
  let borderWidth = 0;

  if (tone === 'accent') {
    backgroundColor = palette.accent;
    color = '#FFFFFF';
  } else if (tone === 'dark') {
    backgroundColor = palette.accentDeep;
    color = '#FFFFFF';
  } else if (tone === 'live') {
    backgroundColor = palette.live;
    color = '#FFFFFF';
  } else if (tone === 'outline') {
    backgroundColor = palette.card;
    color = palette.text;
    borderWidth = 1;
  }

  return (
    <View style={[styles.tag, { backgroundColor, borderColor: palette.border, borderWidth }]}>
      <Text style={[styles.tagLabel, { color }]}>{label}</Text>
    </View>
  );
}

export function MetricChip({ value, label }: { value: string; label: string }) {
  const palette = useSocialPalette();

  return (
    <View style={[styles.metricChip, { backgroundColor: palette.card, borderColor: palette.border }]}>
      <Text style={[styles.metricValue, { color: palette.text }]}>{value}</Text>
      <Text style={[styles.metricLabel, { color: palette.textMuted }]}>{label}</Text>
    </View>
  );
}

export function AvatarPill({
  initials,
  label,
  active = false,
}: {
  initials: string;
  label: string;
  active?: boolean;
}) {
  const palette = useSocialPalette();

  return (
    <View style={styles.avatarPill}>
      <View
        style={[
          styles.avatarCircle,
          { backgroundColor: active ? palette.accent : palette.accentDeep },
        ]}>
        <Text style={styles.avatarInitials}>{initials}</Text>
      </View>
      <Text style={[styles.avatarLabel, { color: palette.text }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export function SearchBarMock({ placeholder }: { placeholder: string }) {
  const palette = useSocialPalette();

  return (
    <View style={[styles.searchBar, { backgroundColor: palette.card, borderColor: palette.border }]}>
      <TabGlyph name="search" color={palette.textMuted} size={16} />
      <Text style={[styles.searchText, { color: palette.textMuted }]}>{placeholder}</Text>
    </View>
  );
}

export function SettingRow({
  title,
  subtitle,
  accent,
  last = false,
}: {
  title: string;
  subtitle?: string;
  accent?: string;
  last?: boolean;
}) {
  const palette = useSocialPalette();

  return (
    <View
      style={[
        styles.settingRow,
        { borderBottomColor: palette.border },
        last ? styles.settingRowLast : null,
      ]}>
      <View style={[styles.settingDot, { backgroundColor: accent ?? palette.accent }]} />
      <View style={styles.settingCopy}>
        <Text style={[styles.settingTitle, { color: palette.text }]}>{title}</Text>
        {subtitle ? <Text style={[styles.settingSubtitle, { color: palette.textMuted }]}>{subtitle}</Text> : null}
      </View>
      <Text style={[styles.settingArrow, { color: palette.textMuted }]}>›</Text>
    </View>
  );
}

export function ArticleListRow({
  title,
  meta,
  tone = 'blue',
}: {
  title: string;
  meta: string;
  tone?: 'blue' | 'soft';
}) {
  const palette = useSocialPalette();

  return (
    <View style={styles.articleRow}>
      <View
        style={[
          styles.articleThumb,
          { backgroundColor: tone === 'blue' ? palette.cardBlue : palette.cardSoft },
        ]}
      />
      <View style={styles.articleCopy}>
        <Text style={[styles.articleTitle, { color: palette.text }]}>{title}</Text>
        <Text style={[styles.articleMeta, { color: palette.textMuted }]}>{meta}</Text>
      </View>
    </View>
  );
}

export function TabGlyph({
  name,
  color,
  active = false,
  size = 22,
}: {
  name: GlyphName;
  color: ColorValue;
  active?: boolean;
  size?: number;
}) {
  const iconSize = size;
  const stroke = Math.max(1.8, size / 10);

  if (name === 'home') {
    return (
      <View style={{ width: iconSize, height: iconSize }}>
        <View
          style={[
            styles.houseRoof,
            {
              borderLeftWidth: iconSize * 0.28,
              borderRightWidth: iconSize * 0.28,
              borderBottomWidth: iconSize * 0.3,
              borderBottomColor: color,
              left: iconSize * 0.22,
              top: iconSize * 0.04,
            },
          ]}
        />
        <View
          style={[
            styles.houseBody,
            {
              borderColor: color,
              borderWidth: stroke,
              width: iconSize * 0.56,
              height: iconSize * 0.48,
              left: iconSize * 0.22,
              top: iconSize * 0.36,
            },
          ]}
        />
      </View>
    );
  }

  if (name === 'search') {
    return (
      <View style={{ width: iconSize, height: iconSize }}>
        <View
          style={[
            styles.searchRing,
            {
              width: iconSize * 0.56,
              height: iconSize * 0.56,
              borderRadius: iconSize,
              borderColor: color,
              borderWidth: stroke,
              top: iconSize * 0.06,
              left: iconSize * 0.06,
            },
          ]}
        />
        <View
          style={[
            styles.searchHandle,
            {
              width: iconSize * 0.34,
              height: stroke,
              backgroundColor: color,
              top: iconSize * 0.66,
              left: iconSize * 0.56,
            },
          ]}
        />
      </View>
    );
  }

  if (name === 'explore') {
    return (
      <View style={{ width: iconSize, height: iconSize }}>
        <View
          style={[
            styles.compassRing,
            {
              width: iconSize * 0.74,
              height: iconSize * 0.74,
              borderRadius: iconSize,
              borderColor: color,
              borderWidth: stroke,
              left: iconSize * 0.13,
              top: iconSize * 0.13,
            },
          ]}
        />
        <View
          style={[
            styles.compassNeedle,
            {
              width: iconSize * 0.16,
              height: iconSize * 0.46,
              backgroundColor: color,
              left: iconSize * 0.42,
              top: iconSize * 0.18,
            },
          ]}
        />
        <View
          style={[
            styles.compassDot,
            {
              width: iconSize * 0.16,
              height: iconSize * 0.16,
              borderRadius: iconSize,
              backgroundColor: active ? color : '#FFFFFF',
              borderColor: color,
              borderWidth: stroke * 0.8,
              left: iconSize * 0.42,
              top: iconSize * 0.42,
            },
          ]}
        />
      </View>
    );
  }

  if (name === 'add') {
    return (
      <View style={{ width: iconSize, height: iconSize }}>
        <View
          style={[
            styles.plusVertical,
            {
              width: stroke,
              height: iconSize * 0.72,
              backgroundColor: color,
              left: iconSize * 0.5 - stroke / 2,
              top: iconSize * 0.14,
            },
          ]}
        />
        <View
          style={[
            styles.plusHorizontal,
            {
              width: iconSize * 0.72,
              height: stroke,
              backgroundColor: color,
              left: iconSize * 0.14,
              top: iconSize * 0.5 - stroke / 2,
            },
          ]}
        />
      </View>
    );
  }

  return (
    <View style={{ width: iconSize, height: iconSize }}>
      <View
        style={[
          styles.profileHead,
          {
            width: iconSize * 0.34,
            height: iconSize * 0.34,
            borderRadius: iconSize,
            borderColor: color,
            borderWidth: stroke,
            left: iconSize * 0.33,
            top: iconSize * 0.08,
          },
        ]}
      />
      <View
        style={[
          styles.profileBody,
          {
            width: iconSize * 0.7,
            height: iconSize * 0.34,
            borderColor: color,
            borderWidth: stroke,
            borderTopWidth: stroke,
            borderTopLeftRadius: iconSize * 0.3,
            borderTopRightRadius: iconSize * 0.3,
            left: iconSize * 0.15,
            top: iconSize * 0.54,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 128,
    gap: 18,
  },
  bannerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 128,
    opacity: 0.38,
  },
  bannerMid: {
    position: 'absolute',
    top: 92,
    left: 0,
    right: 0,
    height: 164,
    opacity: 0.16,
  },
  bannerCardLeft: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 34,
    top: 32,
    left: -42,
    opacity: 0.5,
  },
  bannerCardRight: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 34,
    top: 98,
    right: -56,
    opacity: 0.46,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  headerSide: {
    paddingTop: 10,
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  brandMark: {
    width: 46,
    height: 46,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '800',
  },
  brandCopy: {
    gap: 1,
  },
  brandTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '800',
  },
  brandSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  card: {
    borderRadius: 26,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
  },
  sectionAction: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '700',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  tagLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  metricChip: {
    minWidth: 92,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 2,
  },
  metricValue: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
  },
  metricLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  avatarPill: {
    alignItems: 'center',
    gap: 8,
    width: 70,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
  },
  avatarLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  settingDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },
  settingCopy: {
    flex: 1,
    gap: 2,
  },
  settingTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
  settingSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
  },
  articleRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  articleThumb: {
    width: 72,
    height: 72,
    borderRadius: 20,
  },
  articleCopy: {
    flex: 1,
    gap: 4,
  },
  articleTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  articleMeta: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  houseRoof: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  houseBody: {
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  searchRing: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  searchHandle: {
    position: 'absolute',
    borderRadius: 999,
    transform: [{ rotate: '45deg' }],
  },
  plusVertical: {
    position: 'absolute',
    borderRadius: 999,
  },
  plusHorizontal: {
    position: 'absolute',
    borderRadius: 999,
  },
  compassRing: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  compassNeedle: {
    position: 'absolute',
    borderRadius: 999,
    transform: [{ rotate: '34deg' }],
  },
  compassDot: {
    position: 'absolute',
  },
  profileHead: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  profileBody: {
    position: 'absolute',
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    backgroundColor: 'transparent',
  },
});
