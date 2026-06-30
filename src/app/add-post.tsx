import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SocialScreen, useSocialPalette } from '@/components/social-ui';

const editorTools = ['B', 'I', 'U', '≣', '⟲', '⊖', 'T', '•', '≡', '☰'];

export default function AddPostScreen() {
  const palette = useSocialPalette();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SocialScreen>
      <View style={[styles.shell, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backButton}>
            <Text style={[styles.backIcon, { color: palette.accent }]}>←</Text>
          </Pressable>
        </View>

        <View style={[styles.divider, { backgroundColor: palette.border }]} />

        <View style={styles.form}>
          <View style={[styles.imageUpload, { backgroundColor: '#EFEFEF', borderColor: '#CFCFCF' }]}>
            <Text style={[styles.uploadPlus, { color: '#6E6E6E' }]}>+</Text>
            <Text style={[styles.uploadText, { color: '#6E6E6E' }]}>{t('addPost.addPostImages')}</Text>
          </View>

          <View style={[styles.inputBox, { borderColor: '#CFCFCF', backgroundColor: palette.card }]}>
            <Text style={[styles.inputPlaceholder, { color: '#727272' }]}>{t('addPost.addHeading')}</Text>
          </View>

          <View style={[styles.inputBox, { borderColor: '#CFCFCF', backgroundColor: palette.card }]}>
            <Text style={[styles.inputPlaceholder, { color: '#727272' }]}>{t('addPost.addTag')}</Text>
          </View>

          <View style={[styles.inputBox, { borderColor: '#CFCFCF', backgroundColor: palette.card }]}>
            <Text style={[styles.inputPlaceholder, { color: '#727272' }]}>{t('addPost.category')}</Text>
          </View>

          <View style={[styles.inputBox, { borderColor: '#CFCFCF', backgroundColor: palette.card }]}>
            <Text style={[styles.inputPlaceholder, { color: '#727272' }]}>{t('addPost.addVideoLink')}</Text>
            <Text style={[styles.dropdownIcon, { color: '#8E8E8E' }]}>⌄</Text>
          </View>

          <View style={[styles.editorBox, { borderColor: '#CFCFCF', backgroundColor: palette.card }]}>
            <View style={[styles.editorToolbar, { borderBottomColor: '#DADADA' }]}>
              {editorTools.map((tool) => (
                <View key={tool} style={[styles.toolChip, { borderColor: '#D8D8D8', backgroundColor: '#F7F7F7' }]}>
                  <Text style={[styles.toolText, { color: '#6D6D6D' }]}>{tool}</Text>
                </View>
              ))}
            </View>
            <Text style={[styles.editorPlaceholder, { color: '#727272' }]}>{t('addPost.writeArticles')}</Text>
          </View>

          <View style={[styles.postButton, { backgroundColor: palette.accent }]}>
            <Text style={styles.postButtonText}>{t('addPost.post')}</Text>
          </View>
        </View>
      </View>
    </SocialScreen>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: 28,
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 24,
    overflow: 'hidden',
  },
  header: {
    minHeight: 32,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingRight: 6,
  },
  backIcon: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    width: '100%',
    marginTop: 10,
  },
  form: {
    paddingHorizontal: 18,
    paddingTop: 26,
    gap: 14,
  },
  imageUpload: {
    height: 132,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 2,
  },
  uploadPlus: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '400',
  },
  uploadText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
  },
  inputBox: {
    minHeight: 46,
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputPlaceholder: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  dropdownIcon: {
    fontSize: 14,
    lineHeight: 16,
  },
  editorBox: {
    minHeight: 104,
    borderRadius: 7,
    borderWidth: 1,
    overflow: 'hidden',
  },
  editorToolbar: {
    minHeight: 28,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    alignItems: 'center',
  },
  toolChip: {
    minWidth: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toolText: {
    fontSize: 8,
    lineHeight: 10,
    fontWeight: '700',
  },
  editorPlaceholder: {
    paddingHorizontal: 12,
    paddingTop: 12,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  postButton: {
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginHorizontal: 28,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '800',
  },
});
