import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SocialScreenFrame, useSocialPalette } from "@/components/social-ui";
import { api } from "@/services/api";
import {
  PhotoItem,
  getPhotoImageUri,
  getPostAuthor,
  getPostExcerpt,
  getPostLocation,
  getPostStats,
  getPostTime,
} from "@/services/photo-feed";

export default function HomeScreen() {
  const palette = useSocialPalette();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<PhotoItem[]>("/photos");

        if (!active) {
          return;
        }

        setPhotos(response.data);
      } catch {
        if (!active) {
          return;
        }

        setError("Unable to load the home feed right now.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadPhotos();

    return () => {
      active = false;
    };
  }, []);

  return (
    <SocialScreenFrame>
      <FlatList
        data={photos}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={9}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            {loading ? (
              <View
                style={[
                  styles.messageCard,
                  {
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                  },
                ]}
              >
                <ActivityIndicator color={palette.accent} />
                <Text
                  style={[styles.messageText, { color: palette.textMuted }]}
                >
                  Loading stories...
                </Text>
              </View>
            ) : null}

            {error ? (
              <View
                style={[
                  styles.messageCard,
                  {
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                  },
                ]}
              >
                <Text style={[styles.messageTitle, { color: palette.text }]}>
                  {error}
                </Text>
              </View>
            ) : null}
          </View>
        }
        renderItem={({ item }) => {
          const stats = getPostStats(item.id);

          return (
            <Pressable
              style={[styles.feedCard, { backgroundColor: palette.card }]}
              onPress={() => router.push(`/post/${item.id}`)}
            >
              <View style={styles.heroWrap}>
                <Image
                  source={getPhotoImageUri(item, "hero")}
                  style={styles.feedHero}
                  contentFit="cover"
                  transition={180}
                />
                <View style={styles.liveChip}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveLabel}>LIVE</Text>
                </View>
              </View>

              <View style={styles.feedBody}>
                <Text style={[styles.feedTitle, { color: "#171717" }]}>
                  {item.title.charAt(0).toUpperCase()}
                  {item.title.slice(1)}
                </Text>

                <View style={styles.authorRow}>
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: palette.accentSoft },
                    ]}
                  >
                    <Text
                      style={[styles.avatarText, { color: palette.accent }]}
                    >
                      {getPostAuthor(item.id).slice(0, 2).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.authorCopy}>
                    <Text style={[styles.authorName, { color: "#555555" }]}>
                      {getPostAuthor(item.id)}
                    </Text>
                    <Text
                      style={[styles.authorMeta, { color: palette.textMuted }]}
                    >
                      {getPostLocation(item.id)} . {getPostTime(item.id)}
                    </Text>
                  </View>
                  <Text style={[styles.moreDots, { color: "#909090" }]}>
                    ...
                  </Text>
                </View>

                <Text style={[styles.feedExcerpt, { color: "#747474" }]}>
                  {getPostExcerpt(item.title, item.id)}
                </Text>

                <View style={styles.actionRow}>
                  <Text
                    style={[styles.actionPrimary, { color: palette.accent }]}
                  >
                    Like
                  </Text>
                  <Text
                    style={[
                      styles.actionSecondary,
                      { color: palette.textMuted },
                    ]}
                  >
                    Comment
                  </Text>
                  <Text style={[styles.actionSecondary, { color: "#FF8E41" }]}>
                    Sponsored Post
                  </Text>
                </View>

                <View style={styles.statsRow}>
                  <Text
                    style={[styles.statsText, { color: palette.textMuted }]}
                  >
                    {stats.comments} Comments
                  </Text>
                  <Text
                    style={[styles.statsText, { color: palette.textMuted }]}
                  >
                    {stats.views} Views
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          !loading && !error ? (
            <View
              style={[
                styles.messageCard,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
            >
              <Text style={[styles.messageTitle, { color: palette.text }]}>
                No stories found.
              </Text>
            </View>
          ) : null
        }
      />
    </SocialScreenFrame>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 132,
    gap: 14,
  },
  headerWrap: {
    gap: 14,
    paddingBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },
  coinBadge: {
    minWidth: 58,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignItems: "center",
  },
  coinValue: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },
  filterRow: {
    flexDirection: "row",
    gap: 16,
    paddingBottom: 2,
  },
  filterLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },
  messageCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 8,
  },
  messageTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },
  messageText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  feedCard: {
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#102B46",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  heroWrap: {
    position: "relative",
  },
  feedHero: {
    width: "100%",
    height: 220,
  },
  liveChip: {
    position: "absolute",
    left: 14,
    top: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(20, 24, 35, 0.68)",
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#FF4A5E",
  },
  liveLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "800",
  },
  feedBody: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  feedTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },
  authorCopy: {
    flex: 1,
    gap: 1,
  },
  authorName: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "700",
  },
  authorMeta: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "600",
  },
  moreDots: {
    fontSize: 22,
    lineHeight: 22,
    fontWeight: "700",
    marginTop: -6,
  },
  feedExcerpt: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  actionPrimary: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  actionSecondary: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
});
