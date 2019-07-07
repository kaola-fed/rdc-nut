import * as Sentry from '@sentry/browser';

/* eslint-disable */
// @ts-ignore
if (IS_ONLINE) {
    Sentry.init({
        // @ts-ignore
        release: APP_GIT_VERSION,
        dsn: '///{sentry.dsn}///',
        // @ts-ignore
        env: NODE_ENV
    });
}
/* eslint-enable */
