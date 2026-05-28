import { translate } from '../../../../../lib/locale/translate/translate.js';
import { buildUrl } from '../../../../../lib/router/buildUrl.js';
import { setPageMetaInfo } from '../../../../cms/services/pageMetaInfo.js';
export default ((request, response, next)=>{
    if (request.getCurrentCustomer()) {
        response.redirect(buildUrl('homepage'));
    } else {
        setPageMetaInfo(request, {
            title: translate('Create an account'),
            description: translate('Create an account')
        });
        next();
    }
});
