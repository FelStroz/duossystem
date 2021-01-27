import portugueseMessages from '../languages/pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';

const messages = {
    br: portugueseMessages,
}
export default polyglotI18nProvider(locale => messages[locale], 'br');
