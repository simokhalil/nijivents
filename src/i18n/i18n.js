import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import fr from './locales/fr';

i18n.fallbacks = true;
i18n.translations = {
  fr,
  'fr-FR': fr,
  'fr-US': fr,
};
i18n.defaultLocale = 'fr';

// i18n.locale = Localization.locale || fallback;
i18n.locale = Localization.locale || 'fr';

export function translate(name, params = {}) {
  return i18n.t(name, params);
}

export default i18n;
