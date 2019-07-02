const defaultOption = {
    performanceLoglevel: 'INFO',
    enableDebug: false
    // enableCommonEvent: false,
    // enableCustomEvent: false,
}

const Level = {
    'INFO': 3,
    'DEBUG': 2,
    'TRACE': 1,
    'NONE': 0
}

export default class Filter {
    constructor({ performanceLoglevel, enableDebug }) {
        this.performanceLoglevel = performanceLoglevel || defaultOption.performanceLoglevel;
        this.enableDebug = enableDebug || defaultOption.enableDebug;
        // this.enableCommonEvent = option.enableCommonEvent || defaultOption.enableCommonEvent;
        // this.enableCustomEvent = option.enableCustomEvent || defaultOption.enableCustomEvent;
    }

    match(log_item) {
        // 日志过滤
        if (log_item.type === 'PerformanceLog') {
            return Level[log_item.level] <= Level[this.performanceLoglevel];
        }
        if (log_item.type === 'DebugLog') {
            return this.enableDebug;
        }
        return true;
    }
}