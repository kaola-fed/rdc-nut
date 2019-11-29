// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line
const appKey = IS_ONLINE ? '///hubble.onlineKey///' : '///hubble.testKey///';

(window as any).DATracker.init(appKey, {
    persistence: 'localStorage',
    heatmap: {
        isTrackLink: true,
    },
});
