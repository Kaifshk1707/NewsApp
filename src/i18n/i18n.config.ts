import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultLanguage = 'en';
export const supportedLanguages = ['en', 'hi', 'bn'] as const;

export type AppLanguage = (typeof supportedLanguages)[number];

export const resources = {
  en: {
    translation: {
      tabs: {
        home: 'Home',
        search: 'Search',
        addPost: 'Add Post',
        explore: 'Explore',
        profile: 'Profile',
      },
      common: {
        live: 'LIVE',
        seeResults: 'See Results',
        viewAll: 'View All',
      },
      home: {
        location: 'G.T Road, Kolkata',
        categories: {
          popular: 'Popular',
          all: 'All',
          politics: 'Politics',
          tech: 'Tech',
          healthy: 'Healthy',
          science: 'Science',
        },
        heroBrand: 'ZEE NEWS',
        heroTitle:
          'Mohali blast: Police find dump of 7,000 mobile phones, Oppn knocks security lapses',
        pollQuestion: 'Who is the Best Player Of India Cricket Team ?',
        pollOptions: {
          dhoni: 'Ms Dhoni',
          kohli: 'Virat Kohli',
          rohit: 'Rohit Sharma',
        },
      },
      search: {
        placeholder: 'Search',
        popularTags: 'Popular Tags',
        latestNews: 'Latest News',
        recommendationTopic: 'Recommendation Topic',
      },
      addPost: {
        addPostImages: 'Add Post Images',
        addHeading: 'Add Heading',
        addTag: 'Add Tag',
        category: 'Category',
        addVideoLink: 'Add Video Link',
        writeArticles: 'Write Articles',
        post: 'POST',
      },
      explore: {
        title: 'Top picks',
        subtitle: 'Featured coverage and category mixes',
        featured: 'Featured',
        liveChannels: 'Live channels',
        popularTopics: 'Popular topics',
        snapshot: 'Snapshot',
        updated: 'Updated',
      },
      profile: {
        title: 'Account',
        subtitle: 'Profile, saved news, and app settings',
        quickSettings: 'Quick settings',
        manage: 'Manage',
        library: 'Library',
        open: 'Open',
        settings: 'Settings',
        changeLanguage: 'Change language',
        activeLanguage: 'Active language',
        notifications: 'Notifications',
        helpSupport: 'Help and support',
        notificationsValue: 'Breaking alerts enabled',
        helpSupportValue: 'FAQ and contact options',
      },
    },
  },
  hi: {
    translation: {
      tabs: {
        home: 'होम',
        search: 'सर्च',
        addPost: 'पोस्ट जोड़ें',
        explore: 'एक्सप्लोर',
        profile: 'प्रोफाइल',
      },
      common: {
        live: 'लाइव',
        seeResults: 'रिजल्ट देखें',
        viewAll: 'सभी देखें',
      },
      home: {
        location: 'जी.टी रोड, कोलकाता',
        categories: {
          popular: 'पॉपुलर',
          all: 'सभी',
          politics: 'राजनीति',
          tech: 'टेक',
          healthy: 'स्वास्थ्य',
          science: 'विज्ञान',
        },
        heroBrand: 'ज़ी न्यूज़',
        heroTitle:
          'मोहाली ब्लास्ट: पुलिस को 7,000 मोबाइल फोन का डंप मिला, विपक्ष ने सुरक्षा पर सवाल उठाए',
        pollQuestion: 'भारत की क्रिकेट टीम का सबसे बेहतरीन खिलाड़ी कौन है?',
        pollOptions: {
          dhoni: 'एम.एस. धोनी',
          kohli: 'विराट कोहली',
          rohit: 'रोहित शर्मा',
        },
      },
      search: {
        placeholder: 'सर्च',
        popularTags: 'पॉपुलर टैग्स',
        latestNews: 'लेटेस्ट न्यूज़',
        recommendationTopic: 'सुझाव विषय',
      },
      addPost: {
        addPostImages: 'पोस्ट इमेज जोड़ें',
        addHeading: 'हेडिंग जोड़ें',
        addTag: 'टैग जोड़ें',
        category: 'कैटेगरी',
        addVideoLink: 'वीडियो लिंक जोड़ें',
        writeArticles: 'आर्टिकल लिखें',
        post: 'पोस्ट',
      },
      explore: {
        title: 'टॉप पिक्स',
        subtitle: 'फीचर्ड कवरेज और कैटेगरी मिक्स',
        featured: 'फीचर्ड',
        liveChannels: 'लाइव चैनल्स',
        popularTopics: 'लोकप्रिय विषय',
        snapshot: 'स्नैपशॉट',
        updated: 'अपडेटेड',
      },
      profile: {
        title: 'अकाउंट',
        subtitle: 'प्रोफाइल, सेव्ड न्यूज़ और ऐप सेटिंग्स',
        quickSettings: 'क्विक सेटिंग्स',
        manage: 'मैनेज',
        library: 'लाइब्रेरी',
        open: 'ओपन',
        settings: 'सेटिंग्स',
        changeLanguage: 'भाषा बदलें',
        activeLanguage: 'चालू भाषा',
        notifications: 'नोटिफिकेशन',
        helpSupport: 'मदद और सपोर्ट',
        notificationsValue: 'ब्रेकिंग अलर्ट चालू हैं',
        helpSupportValue: 'FAQ और संपर्क विकल्प',
      },
    },
  },
  bn: {
    translation: {
      tabs: {
        home: 'হোম',
        search: 'সার্চ',
        addPost: 'পোস্ট যোগ করুন',
        explore: 'এক্সপ্লোর',
        profile: 'প্রোফাইল',
      },
      common: {
        live: 'লাইভ',
        seeResults: 'ফলাফল দেখুন',
        viewAll: 'সব দেখুন',
      },
      home: {
        location: 'জি.টি রোড, কলকাতা',
        categories: {
          popular: 'পপুলার',
          all: 'সব',
          politics: 'রাজনীতি',
          tech: 'টেক',
          healthy: 'স্বাস্থ্য',
          science: 'বিজ্ঞান',
        },
        heroBrand: 'জি নিউজ',
        heroTitle:
          'মোহালি বিস্ফোরণ: ৭,০০০ মোবাইল ফোনের ডাম্প উদ্ধার, নিরাপত্তা নিয়ে প্রশ্ন তুলল বিরোধীরা',
        pollQuestion: 'ভারতীয় ক্রিকেট দলে সেরা খেলোয়াড় কে?',
        pollOptions: {
          dhoni: 'এম.এস. ধোনি',
          kohli: 'বিরাট কোহলি',
          rohit: 'রোহিত শর্মা',
        },
      },
      search: {
        placeholder: 'সার্চ',
        popularTags: 'পপুলার ট্যাগ',
        latestNews: 'সর্বশেষ খবর',
        recommendationTopic: 'রেকমেন্ডেশন টপিক',
      },
      addPost: {
        addPostImages: 'পোস্ট ইমেজ যোগ করুন',
        addHeading: 'হেডিং যোগ করুন',
        addTag: 'ট্যাগ যোগ করুন',
        category: 'ক্যাটেগরি',
        addVideoLink: 'ভিডিও লিংক যোগ করুন',
        writeArticles: 'আর্টিকেল লিখুন',
        post: 'পোস্ট',
      },
      explore: {
        title: 'টপ পিকস',
        subtitle: 'ফিচার্ড কভারেজ এবং ক্যাটেগরি মিক্স',
        featured: 'ফিচার্ড',
        liveChannels: 'লাইভ চ্যানেল',
        popularTopics: 'জনপ্রিয় বিষয়',
        snapshot: 'স্ন্যাপশট',
        updated: 'আপডেটেড',
      },
      profile: {
        title: 'অ্যাকাউন্ট',
        subtitle: 'প্রোফাইল, সেভড নিউজ এবং অ্যাপ সেটিংস',
        quickSettings: 'কুইক সেটিংস',
        manage: 'ম্যানেজ',
        library: 'লাইব্রেরি',
        open: 'ওপেন',
        settings: 'সেটিংস',
        changeLanguage: 'ভাষা পরিবর্তন করুন',
        activeLanguage: 'চালু ভাষা',
        notifications: 'নোটিফিকেশন',
        helpSupport: 'সহায়তা এবং সাপোর্ট',
        notificationsValue: 'ব্রেকিং অ্যালার্ট চালু আছে',
        helpSupportValue: 'FAQ এবং যোগাযোগ অপশন',
      },
    },
  },
} as const;

function normalizeLanguage(locale?: string | null): AppLanguage {
  if (!locale) {
    return defaultLanguage;
  }

  const baseCode = locale.toLowerCase().split('-')[0] as AppLanguage;
  return supportedLanguages.includes(baseCode) ? baseCode : defaultLanguage;
}

function detectLanguage(): AppLanguage {
  if (typeof navigator !== 'undefined' && navigator.language) {
    return normalizeLanguage(navigator.language);
  }

  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  return normalizeLanguage(locale);
}

if (!i18next.isInitialized) {
  void i18next.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: detectLanguage(),
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    react: {
      useSuspense: false,
    },
  });
}

export function changeAppLanguage(language: AppLanguage) {
  return i18next.changeLanguage(language);
}

export function getCurrentLanguage(): AppLanguage {
  return normalizeLanguage(i18next.language);
}

export default i18next;
