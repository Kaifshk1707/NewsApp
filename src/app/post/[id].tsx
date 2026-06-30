import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
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
  getPostBody,
  getPostCategory,
  getPostHandle,
  getPostStats,
  getPostTime,
} from "@/services/photo-feed";

export default function PostDetailScreen() {
  const palette = useSocialPalette();
  const params = useLocalSearchParams<{ id?: string }>();
  const [photo, setPhoto] = useState<PhotoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPhoto() {
      if (!params.id) {
        setError("Post not found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await api.get<PhotoItem>(`/photos/${params.id}`);

        if (!active) {
          return;
        }

        setPhoto(response.data);
      } catch {
        if (!active) {
          return;
        }

        setError("Unable to open this story right now.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadPhoto();

    return () => {
      active = false;
    };
  }, [params.id]);

  if (loading) {
    return (
      <SocialScreenFrame>
        <View style={styles.centerState}>
          <ActivityIndicator color={palette.accent} />
          <Text style={[styles.centerText, { color: palette.textMuted }]}>
            Opening story...
          </Text>
        </View>
      </SocialScreenFrame>
    );
  }

  if (error || !photo) {
    return (
      <SocialScreenFrame>
        <View style={styles.centerState}>
          <Text style={[styles.errorTitle, { color: palette.text }]}>
            {error ?? "Story not available."}
          </Text>
          <Pressable
            style={[styles.backButton, { backgroundColor: palette.accent }]}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
                return;
              }

              router.replace("/");
            }}
          >
            <Text style={styles.backButtonLabel}>Back to Home</Text>
          </Pressable>
        </View>
      </SocialScreenFrame>
    );
  }

  const stats = getPostStats(photo.id);

  return (
    <SocialScreenFrame>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.articleShell, { backgroundColor: palette.card }]}>
          <View style={styles.topBar}>
            <Pressable
              hitSlop={10}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                  return;
                }

                router.replace("/");
              }}
            >
              <Text style={[styles.topIcon, { color: palette.text }]}>{"<"}</Text>
            </Pressable>
            <View style={styles.topActions}>
              <Text style={[styles.topIcon, { color: palette.text }]}>Save</Text>
              <Text style={[styles.topIcon, { color: palette.text }]}>Share</Text>
            </View>
          </View>

          <Image
            source={getPhotoImageUri(photo, "hero")}
            style={styles.articleImage}
            contentFit="cover"
            transition={180}
          />

          <View style={styles.articleContent}>
            <Text style={[styles.categoryLabel, { color: palette.accent }]}>
              {getPostCategory(photo.id)}
            </Text>
            <Text style={[styles.articleTitle, { color: "#242424" }]}>
              {photo.title.charAt(0).toUpperCase()}
              {photo.title.slice(1)}
            </Text>

            <View style={styles.bylineRow}>
              <View
                style={[
                  styles.authorBadge,
                  { backgroundColor: palette.accentSoft },
                ]}
              >
                <Text style={[styles.authorBadgeText, { color: palette.accent }]}>
                  {getPostAuthor(photo.id).slice(0, 2).toUpperCase()}
                </Text>
              </View>
              <View style={styles.bylineCopy}>
                <Text style={[styles.bylineAuthor, { color: "#656565" }]}>
                  By {getPostAuthor(photo.id)}
                </Text>
                <Text style={[styles.bylineHandle, { color: palette.textMuted }]}>
                  {getPostHandle(photo.id)}
                </Text>
              </View>
              <Text style={[styles.bylineTime, { color: palette.textMuted }]}>
                {getPostTime(photo.id)}
              </Text>
            </View>

            <View style={styles.metricsRow}>
              <Text style={[styles.metricText, { color: "#353535" }]}>
                {stats.comments} comments
              </Text>
              <Text style={[styles.metricText, { color: "#353535" }]}>
                {stats.likes} likes
              </Text>
              <Text style={[styles.metricText, { color: "#353535" }]}>
                Share
              </Text>
            </View>

            <View style={styles.bodyWrap}>
              {getPostBody(photo).map((paragraph) => (
                <Text
                  key={paragraph}
                  style={[styles.bodyText, { color: "#383838" }]}
                >
                  {paragraph}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SocialScreenFrame>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 42,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
  },
  centerText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  errorTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  backButton: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButtonLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
  },
  articleShell: {
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#112A43",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 7,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  topIcon: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },
  articleImage: {
    width: "100%",
    height: 250,
  },
  articleContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  categoryLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  articleTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
  },
  bylineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  authorBadge: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  authorBadgeText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
  },
  bylineCopy: {
    flex: 1,
    gap: 2,
  },
  bylineAuthor: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
  },
  bylineHandle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  bylineTime: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },
  metricsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  metricText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  bodyWrap: {
    gap: 16,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "500",
  },
});
