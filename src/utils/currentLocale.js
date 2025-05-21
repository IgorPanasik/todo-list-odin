import { enUS, ru } from 'date-fns/locale';

export const currentLocale = navigator.language.startsWith('ru') ? ru : enUS;
