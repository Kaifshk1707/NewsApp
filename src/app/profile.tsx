import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  SocialScreen,
  SurfaceCard,
  useSocialPalette,
} from "@/components/social-ui";
import {
  changeAppLanguage,
  getCurrentLanguage,
  supportedLanguages,
  type AppLanguage,
} from "@/i18n/i18n.config";

const languageLabels: Record<AppLanguage, string> = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
};

export default function ProfileScreen() {
  const palette = useSocialPalette();
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const activeLanguage = getCurrentLanguage();

  return (
    <SocialScreen>
      <View style={styles.headerRow}>
        <View style={styles.headerCopy}>
          <Text style={[styles.headerTitle, { color: palette.text }]}>
            {t("profile.title")}
          </Text>
        </View>

        <Pressable
          onPress={() => setShowSettings((value) => !value)}
          style={[
            styles.gearButton,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <Text style={[styles.gearIcon, { color: palette.accentDeep }]}>
            ⚙
          </Text>
        </Pressable>
      </View>

      <SurfaceCard>
        <View style={styles.profileTop}>
          <View style={[styles.avatar, { backgroundColor: palette.cardBlue }]}>
            <Text style={[styles.avatarText, { color: palette.accentDeep }]}>
              SK
            </Text>
          </View>
          <View style={styles.profileCopy}>
            <Text style={[styles.name, { color: palette.text }]}>
              Shaikh kaif
            </Text>
            <Text style={[styles.email, { color: palette.textMuted }]}>
              kaif.newswatch@email.com
            </Text>
            <Text style={[styles.bio, { color: palette.textMuted }]}>
              I’m a software developer dedicated to building fast, scalable, and
              intuitive mobile and web applications.
            </Text>
          </View>
        </View>
      </SurfaceCard>

      {showSettings ? (
        <SurfaceCard tone="soft">
          <View style={styles.settingsHeader}>
            <Text style={[styles.settingsTitle, { color: palette.text }]}>
              {t("profile.settings")}
            </Text>
          </View>

          <View style={styles.languageRow}>
            {supportedLanguages.map((language) => {
              const selected = language === activeLanguage;

              return (
                <Pressable
                  key={language}
                  onPress={() => {
                    void changeAppLanguage(language);
                  }}
                  style={[
                    styles.languageChip,
                    {
                      backgroundColor: selected ? palette.accent : palette.card,
                      borderColor: selected ? palette.accent : palette.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.languageChipText,
                      { color: selected ? "#FFFFFF" : palette.text },
                    ]}
                  >
                    {languageLabels[language]}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View
            style={[
              styles.settingCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <Text style={[styles.settingLabel, { color: palette.text }]}>
              {t("profile.notifications")}
            </Text>
            <Text style={[styles.settingValue, { color: palette.textMuted }]}>
              {t("profile.notificationsValue")}
            </Text>
          </View>

          <View
            style={[
              styles.settingCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <Text style={[styles.settingLabel, { color: palette.text }]}>
              {t("profile.helpSupport")}
            </Text>
            <Text style={[styles.settingValue, { color: palette.textMuted }]}>
              {t("profile.helpSupportValue")}
            </Text>
          </View>
        </SurfaceCard>
      ) : null}
    </SocialScreen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "800",
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  gearButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gearIcon: {
    fontSize: 22,
    lineHeight: 22,
  },
  profileTop: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
  },
  profileCopy: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "800",
  },
  email: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  settingsHeader: {
    gap: 4,
  },
  settingsTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "800",
  },
  settingsSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  languageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  languageChip: {
    minWidth: 94,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  languageChipText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
  },
  settingCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 4,
  },
  settingLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },
  settingValue: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },
});
