/* eslint-disable no-undef */
import * as Sentry from '@sentry/browser';

if (IS_ONLINE) {
    Sentry.init({
        release: APP_GIT_VERSION,
        dsn: '///{sentry.dsn}///',
        env: NODE_ENV
    });
}
