import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  ArticleListRow,
  MetricChip,
  NewsBrand,
  SectionHeader,
  SocialScreen,
  SurfaceCard,
  Tag,
  useSocialPalette,
} from '@/components/social-ui';

export default function ExploreScreen() {
  const palette = useSocialPalette();
  const { t } = useTranslation();

  return (
    <SocialScreen>
      <NewsBrand
        subtitle={t('explore.subtitle')}
        rightSlot={<Tag label={t('explore.title')} tone="accent" />}
      />

      <SurfaceCard tone="hero">
        <View style={styles.featureTop}>
          <Tag label={t('explore.featured')} tone="accent" />
          <Text style={styles.featureMeta}>NewsWatch Originals</Text>
        </View>
        <View style={[styles.featureMedia, { backgroundColor: 'rgba(255,255,255,0.16)' }]} />
        <Text style={styles.featureTitle}>Why cities are redesigning transport, jobs, and climate policy at the same time.</Text>
        <Text style={styles.featureBody}>
          A long-form explainer on the pressure points shaping the next phase of urban development across Asia.
        </Text>
      </SurfaceCard>

      <View style={styles.sectionBlock}>
        <SectionHeader title={t('explore.liveChannels')} action={t('common.viewAll')} />
        <SurfaceCard tone="blue">
          <View style={styles.liveRow}>
            <View style={styles.liveCopy}>
              <Tag label={t('common.live')} tone="live" />
              <Text style={[styles.liveTitle, { color: palette.text }]}>24/7 NewsStream</Text>
              <Text style={[styles.liveBody, { color: palette.textMuted }]}>
                Continuous politics, finance, sports, and weather coverage curated into one stream.
              </Text>
            </View>
            <View style={[styles.liveBadge, { backgroundColor: palette.card }]}>
              <Text style={[styles.liveBadgeValue, { color: palette.accentDeep }]}>4</Text>
              <Text style={[styles.liveBadgeLabel, { color: palette.textMuted }]}>feeds</Text>
            </View>
          </View>
        </SurfaceCard>
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader title={t('explore.popularTopics')} action="Today" />
        <View style={styles.topicChips}>
          <Tag label="Elections" tone="accent" />
          <Tag label="Stock Market" tone="soft" />
          <Tag label="Cricket" tone="soft" />
          <Tag label="Weather" tone="soft" />
        </View>
        <SurfaceCard>
          <ArticleListRow
            title="Election strategy rooms focus on middle-class inflation, jobs, and welfare messaging."
            meta="Politics Desk . 21 min ago"
          />
          <ArticleListRow
            title="Oil prices slip as traders weigh demand outlook and shipping disruptions."
            meta="Global Markets . 39 min ago"
          />
          <ArticleListRow
            title="Team management hints at batting order shuffle after training camp review."
            meta="Sports Central . 56 min ago"
          />
        </SurfaceCard>
      </View>

      <SurfaceCard tone="soft">
        <SectionHeader title={t('explore.snapshot')} action={t('explore.updated')} />
        <View style={styles.snapshotStats}>
          <MetricChip value="58" label="headlines" />
          <MetricChip value="11" label="live now" />
          <MetricChip value="32K" label="readers" />
        </View>
      </SurfaceCard>
    </SocialScreen>
  );
}

const styles = StyleSheet.create({
  sectionBlock: {
    gap: 14,
  },
  featureTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  featureMeta: {
    color: '#DCF4FF',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  featureMedia: {
    height: 170,
    borderRadius: 22,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  featureBody: {
    color: '#E0F5FF',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
  liveRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  liveCopy: {
    flex: 1,
    gap: 8,
  },
  liveTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '800',
  },
  liveBody: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  liveBadge: {
    width: 84,
    height: 84,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadgeValue: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
  liveBadgeLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  topicChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  snapshotStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
