import { DarkTheme, DefaultTheme, router, Tabs, ThemeProvider } from 'expo-router';
import { ShareIntentProvider, useShareIntentContext, type ShareIntent } from 'expo-share-intent';
import { ComponentProps, useEffect, useRef } from 'react';
import { ColorValue, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { TabGlyph, useSocialPalette } from '@/components/social-ui';
import { ReceivedShareProvider, useReceivedShare } from '@/contexts/received-share';
import '@/i18n/i18n.config';

function getShareSignature(shareIntent: ShareIntent) {
  const files = shareIntent.files
    ?.map((file) => `${file.mimeType}:${file.fileName}:${file.path}`)
    .join('|');

  return [shareIntent.type, shareIntent.text, shareIntent.webUrl, files].filter(Boolean).join('::');
}

function ShareIntentNavigator() {
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntentContext();
  const { setReceivedShare } = useReceivedShare();
  const lastShareSignature = useRef<string | null>(null);

  useEffect(() => {
    if (!hasShareIntent) {
      return;
    }

    const hasFiles = Boolean(shareIntent.files?.length);
    const hasContent = Boolean(shareIntent.text || shareIntent.webUrl || hasFiles);

    if (!hasContent) {
      resetShareIntent();
      return;
    }

    const shareSignature = getShareSignature(shareIntent);

    if (!shareSignature || shareSignature === lastShareSignature.current) {
      resetShareIntent();
      return;
    }

    lastShareSignature.current = shareSignature;
    setReceivedShare(shareIntent);
    router.replace('/receive-share');
    resetShareIntent();
  }, [hasShareIntent, resetShareIntent, setReceivedShare, shareIntent]);

  return null;
}

function StandardTabIcon({
  routeName,
  color,
  focused,
}: {
  routeName: 'index' | 'search' | 'explore' | 'profile';
  color: ColorValue;
  focused: boolean;
}) {
  const glyphMap = {
    index: 'home',
    search: 'search',
    explore: 'explore',
    profile: 'profile',
  } as const;

  return (
    <View style={styles.standardIconWrap}>
      <View style={[styles.activeIndicator, { opacity: focused ? 1 : 0, backgroundColor: color }]} />
      <TabGlyph name={glyphMap[routeName]} color={color} active={focused} size={20} />
    </View>
  );
}

function AddPostTabButton({
  onPress,
  accessibilityState,
}: Pick<ComponentProps<typeof Pressable>, 'onPress' | 'accessibilityState'>) {
  const palette = useSocialPalette();
  const { t } = useTranslation();
  const focused = accessibilityState?.selected ?? false;

  return (
    <Pressable onPress={onPress} style={styles.addPostButton}>
      <View style={styles.addPostInner}>
        <View
          style={[
            styles.addPostCircleOuter,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}>
          <View style={[styles.addPostCircle, { backgroundColor: palette.accent }]}>
            <TabGlyph name="add" color="#FFFFFF" active={focused} size={28} />
          </View>
        </View>
        <Text
          style={[
            styles.addPostLabel,
            { color: focused ? palette.accent : palette.textMuted },
          ]}>
          {t('tabs.addPost')}
        </Text>
      </View>
    </Pressable>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const palette = useSocialPalette();
  const { t } = useTranslation();
  const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: palette.background,
      card: palette.card,
      text: palette.text,
      border: palette.border,
      primary: palette.accent,
    },
  };

  return (
    <ShareIntentProvider options={{ scheme: 'testapp', resetOnBackground: false }}>
      <ReceivedShareProvider>
        <ThemeProvider value={theme}>
          <ShareIntentNavigator />
          <AnimatedSplashOverlay />
          <Tabs
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: palette.accent,
              tabBarInactiveTintColor: '#8D8D95',
              tabBarShowLabel: true,
              tabBarStyle: {
                position: 'absolute',
                left: 16,
                right: 16,
                bottom: 14,
                height: 88,
                borderRadius: 34,
                paddingTop: 12,
                paddingBottom: 12,
                paddingHorizontal: 8,
                backgroundColor: palette.card,
                borderTopWidth: 0,
                borderWidth: 1,
                borderColor: palette.border,
                shadowColor: '#1180CC',
                shadowOpacity: 0.14,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 10 },
                elevation: 12,
              },
              tabBarItemStyle: {
                paddingTop: 2,
              },
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '700',
                marginTop: 2,
              },
              sceneStyle: {
                backgroundColor: palette.background,
              },
              tabBarIcon: ({ color, focused }) => {
                if (
                  route.name !== 'index' &&
                  route.name !== 'search' &&
                  route.name !== 'explore' &&
                  route.name !== 'profile'
                ) {
                  return null;
                }

                return <StandardTabIcon routeName={route.name} color={color} focused={focused} />;
              },
            })}>
            <Tabs.Screen name="index" options={{ title: t('tabs.home') }} />
            <Tabs.Screen name="search" options={{ title: t('tabs.search') }} />
            <Tabs.Screen
              name="add-post"
              options={{
                title: '',
                tabBarButton: ({ onPress, accessibilityState }) => (
                  <AddPostTabButton onPress={onPress} accessibilityState={accessibilityState} />
                ),
              }}
            />
            <Tabs.Screen name="explore" options={{ title: t('tabs.explore') }} />
            <Tabs.Screen name="profile" options={{ title: t('tabs.profile') }} />
            <Tabs.Screen
              name="post/[id]"
              options={{
                href: null,
                tabBarStyle: { display: 'none' },
              }}
            />
            <Tabs.Screen
              name="receive-share"
              options={{
                href: null,
                tabBarStyle: { display: 'none' },
              }}
            />
          </Tabs>
        </ThemeProvider>
      </ReceivedShareProvider>
    </ShareIntentProvider>
  );
}

const styles = StyleSheet.create({
  standardIconWrap: {
    alignItems: 'center',
    gap: 8,
    minHeight: 34,
  },
  activeIndicator: {
    width: 62,
    height: 4,
    borderRadius: 999,
  },
  addPostButton: {
    flex: 1,
    alignItems: 'center',
  },
  addPostInner: {
    alignItems: 'center',
    marginTop: -30,
  },
  addPostCircleOuter: {
    width: 82,
    height: 82,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1180CC',
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  addPostCircle: {
    width: 70,
    height: 70,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPostLabel: {
    marginTop: 6,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
  },
});
