// @ts-ignore
// eslint-disable-next-line
const appKey = IS_ONLINE ? '///hubble.onlineKey///' : '///hubble.testKey///';

window.DATracker.init(appKey, {
    persistence: 'localStorage',
    heatmap: {
        isTrackLink: true,
    },
});
