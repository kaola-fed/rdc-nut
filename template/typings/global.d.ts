interface Window {
    feedback: (id: string) => {};
    DATracker: {
        init: (appKey: string, opts: {}) => {};
        track: any;
    };
}
