import Client     from 'gofreta-client';
import AuthHelper from '@/utils/AuthHelper'

const clientInst = new Client(APP_CONFIG.apiUrl);

clientInst.setToken(AuthHelper.getData('token'));

export default clientInst;
