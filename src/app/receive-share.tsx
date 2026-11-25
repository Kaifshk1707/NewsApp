import { Image } from 'expo-image';
import { useShareIntentContext } from 'expo-share-intent';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SocialScreenFrame, useSocialPalette } from '@/components/social-ui';
import { useReceivedShare } from '@/contexts/received-share';

const YOUTUBE_URL_PATTERN =
  /https?:\/\/(?:www\.)?(?:youtu\.be\/[\w-]+|youtube\.com\/(?:watch\?v=[\w-]+|shorts\/[\w-]+))[^\s]*/i;

function extractYoutubeUrl(text?: string | null, webUrl?: string | null) {
  if (webUrl && YOUTUBE_URL_PATTERN.test(webUrl)) {
    return webUrl;
  }

  return text?.match(YOUTUBE_URL_PATTERN)?.[0] ?? null;
}

function ValueRow({ label, value }: { label: string; value?: string | number | null }) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text selectable style={styles.value}>
        {String(value)}
      </Text>
    </View>
  );
}

export default function ReceiveShareScreen() {
  const palette = useSocialPalette();
  const { resetShareIntent } = useShareIntentContext();
  const { receivedShare, clearReceivedShare } = useReceivedShare();
  const firstFile = receivedShare?.files?.[0] ?? null;
  const youtubeUrl = extractYoutubeUrl(receivedShare?.text, receivedShare?.webUrl);
  const contentType = firstFile?.mimeType ?? receivedShare?.type ?? 'empty';
  const imagePreviewUri =
    firstFile?.mimeType?.startsWith('image/') && firstFile.path ? firstFile.path : null;

  function handleClear() {
    clearReceivedShare();
    resetShareIntent();
    router.replace('/');
  }

  return (
    <SocialScreenFrame>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: palette.text }]}>Received Share</Text>

        <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
          <ValueRow label="Detected content type" value={contentType} />
          <ValueRow label="Text" value={receivedShare?.text} />
          <ValueRow label="URL" value={receivedShare?.webUrl ?? youtubeUrl} />
          <ValueRow label="MIME type" value={firstFile?.mimeType} />
          <ValueRow label="File name" value={firstFile?.fileName} />
          <ValueRow label="Local file URI" value={firstFile?.path} />
          <ValueRow label="Files received" value={receivedShare?.files?.length} />

          {imagePreviewUri ? (
            <Image source={{ uri: imagePreviewUri }} style={styles.preview} contentFit="cover" />
          ) : null}

          {!receivedShare ? (
            <Text style={[styles.emptyText, { color: palette.textMuted }]}>
              No shared content is currently stored.
            </Text>
          ) : null}
        </View>

        <Pressable
          onPress={handleClear}
          style={[styles.clearButton, { backgroundColor: palette.accent }]}>
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      </ScrollView>
    </SocialScreenFrame>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
    padding: 20,
    paddingBottom: 128,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    padding: 16,
  },
  row: {
    gap: 6,
  },
  label: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  value: {
    color: '#171717',
    fontSize: 15,
    lineHeight: 21,
  },
  preview: {
    aspectRatio: 1,
    borderRadius: 8,
    marginTop: 4,
    width: '100%',
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 21,
  },
  clearButton: {
    alignItems: 'center',
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  clearText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
