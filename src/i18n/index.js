import Config from '../Config'
import enEN from './en-EN';
import trTR from './tr-TR';

class I18N{
    get(key) {
        switch (Config.LANG) {
            case 'tr-TR':
                return trTR[key];
            case 'en-EN':
                return enEN[key];
            default:
                return '';
        }
    }
}
export default new I18N();