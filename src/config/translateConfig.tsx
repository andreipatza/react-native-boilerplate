import {I18nManager} from 'react-native';

// LIBRARIES
import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash.memoize';
import i18n from 'i18n-js';

const translationGetters = {
  // lazy requires
  ro: () => require('../translations/ro.json'),
  en: () => require('../translations/en.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  i18n.translations = {
    [languageTag]: translationGetters[languageTag](),
  };

  i18n.locale = languageTag;
};
