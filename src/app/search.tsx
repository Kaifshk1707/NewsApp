import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SocialScreen, useSocialPalette } from '@/components/social-ui';
import { api } from '@/services/api';

type UserItem = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
};

type SearchBlock =
  | { type: 'user'; user: UserItem }
  | { type: 'suggestion'; title: string; subtitle: string };

export default function SearchScreen() {
  const palette = useSocialPalette();
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<UserItem[]>('/users');

        if (!active) {
          return;
        }

        setUsers(response.data);
      } catch {
        if (!active) {
          return;
        }

        setError('Unable to load user suggestions right now.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      active = false;
    };
  }, []);

  const blocks = useMemo<SearchBlock[]>(() => {
    const items: SearchBlock[] = [];

    users.forEach((user, index) => {
      items.push({ type: 'user', user });

      if (index === 2) {
        items.push({
          type: 'suggestion',
          title: 'Suggested editors',
          subtitle: 'People reading business, politics, and world news also follow these profiles.',
        });
      }

      if (index === 6) {
        items.push({
          type: 'suggestion',
          title: 'Suggestion for you',
          subtitle: 'Explore more public profiles and newsroom-style contributors from different cities.',
        });
      }
    });

    return items;
  }, [users]);

  return (
    <SocialScreen>
      <View style={[styles.shell, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <View style={[styles.searchBar, { borderColor: palette.border, backgroundColor: palette.cardSoft }]}>
          <Text style={[styles.searchPlaceholder, { color: palette.textMuted }]}>
            {t('search.placeholder')}
          </Text>
          <Text style={[styles.searchIcon, { color: palette.textMuted }]}>⌕</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: palette.text }]}>{t('tabs.search')}</Text>
          <Text style={[styles.sectionAction, { color: palette.accent }]}>{users.length} users</Text>
        </View>

        {loading ? (
          <View style={styles.loadingBlock}>
            <ActivityIndicator color={palette.accent} />
            <Text style={[styles.loadingText, { color: palette.textMuted }]}>Loading users...</Text>
          </View>
        ) : null}

        {error ? (
          <View style={[styles.errorCard, { backgroundColor: palette.cardSoft }]}>
            <Text style={[styles.errorText, { color: palette.text }]}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.resultsList}>
          {blocks.map((block, index) => {
            if (block.type === 'suggestion') {
              return (
                <View
                  key={`suggestion-${index}`}
                  style={[styles.suggestionCard, { backgroundColor: palette.cardBlue }]}>
                  <Text style={[styles.suggestionTitle, { color: palette.text }]}>{block.title}</Text>
                  <Text style={[styles.suggestionBody, { color: palette.textMuted }]}>
                    {block.subtitle}
                  </Text>
                </View>
              );
            }

            const initials = block.user.name
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <View
                key={block.user.id}
                style={[styles.userCard, { backgroundColor: palette.cardSoft, borderColor: palette.border }]}>
                <View style={[styles.avatar, { backgroundColor: palette.accent }]}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>

                <View style={styles.userCopy}>
                  <Text style={[styles.userName, { color: palette.text }]}>{block.user.name}</Text>
                  <Text style={[styles.userMeta, { color: palette.textMuted }]}>
                    @{block.user.username} . {block.user.company.name}
                  </Text>
                  <Text style={[styles.userMeta, { color: palette.textMuted }]}>
                    {block.user.email} . {block.user.address.city}
                  </Text>
                  <Text style={[styles.userLink, { color: palette.accent }]}>{block.user.website}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </SocialScreen>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: 28,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 22,
    gap: 18,
  },
  searchBar: {
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchPlaceholder: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  searchIcon: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '800',
  },
  sectionAction: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  loadingBlock: {
    paddingVertical: 18,
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  errorCard: {
    borderRadius: 16,
    padding: 14,
  },
  errorText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  resultsList: {
    gap: 14,
  },
  suggestionCard: {
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  suggestionTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
  },
  suggestionBody: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
  },
  userCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
  },
  userCopy: {
    flex: 1,
    gap: 4,
  },
  userName: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800',
  },
  userMeta: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
  userLink: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
});
