import Filter from "./Filter";
import Collector from "./Collector";
import Receiver from "./Receiver";
import BugmissAPI from "./BugmissAPI";
import Reporter from "./Reporter";

import DebugCollector from "./collector/DebugCollector";
import ErrorCollector from "./collector/ErrorCollector";
import EventCollector from "./collector/EventCollector";
import HttpCollector from "./collector/HttpCollector";
import PerformanceCollector from "./collector/PerformanceCollector";



const bugmiss = {

    collector: null,
    receiver: null,
    bugmissApi: null,
    reporter: null,
    sourceFn: null, 
    deviceFn: null, 
    userFn: null,
    pages: {},

    async init({ appkey, server, delaySeconds, intervalSeconds, sourceFn, deviceFn, userFn, request, cache }) {
        // 构造 bugmissApi
        bugmiss.bugmissApi = new BugmissAPI({ request, server, appkey });
        // 获取配置，构造 Filter
        const setting = await bugmiss.bugmissApi.getSetting();
        bugmiss.filter = new Filter(setting);
        // 构造 Collector
        bugmiss.collector = new Collector(cache, bugmiss.filter);
        // 构造 Receiver
        bugmiss.receiver = new Receiver(cache);
        // 构造 Reporter
        bugmiss.reporter = new Reporter({ 
            bugmissApi: bugmiss.bugmissApi, 
            receiver: bugmiss.receiver,
            collector: bugmiss.collector,
            delaySeconds: delaySeconds || 10,
            intervalSeconds: intervalSeconds || 30,
        })

        // sourceFn deviceFn userFn
        bugmiss.sourceFn = sourceFn;
        bugmiss.deviceFn = deviceFn;
        bugmiss.userFn = userFn;
    },

    http: {
        log: async ({ url, query, statusCode, errCode, errMsg, time, sourceFn }) => {
            return await new HttpCollector({ 
                collector: bugmiss.collector, 
                sourceFn: sourceFn || bugmiss.sourceFn, 
                deviceFn: bugmiss.deviceFn, 
                userFn: bugmiss.userFn 
            }).log(
                { url, query, statusCode, errCode, errMsg, time, source }
            );
        },
    },

    performance: {
        start: async (sourceFn) => {
            let source = await sourceFn();
            const performanceApi = new PerformanceCollector({
                collector,
                sourceFn: sourceFn || bugmiss.sourceFn, 
                deviceFn: bugmiss.deviceFn, 
                userFn: bugmiss.userFn 
            })
            bugmiss.pages[source.pageId] = performanceApi;
        },

        info: async (sourceFn) => {
            let source = await sourceFn();
            const performanceApi = bugmiss.pages[source.pageId];
            performanceApi && performanceApi.info(timepoint);
        },

        debug: async (sourceFn) => {
            let source = await sourceFn();
            const performanceApi = bugmiss.pages[source.pageId];
            performanceApi && performanceApi.debug(timepoint);
        },

        trace: async (sourceFn) => {
            let source = await sourceFn();
            const performanceApi = bugmiss.pages[source.pageId];
            performanceApi && performanceApi.trace(timepoint);
        },

        stop: (sourceFn) => {
            delete bugmiss.pages[source.pageId];
        } 
    },

    debug: async (msg) => {
        return await new DebugCollector({
            collector: bugmiss.collector, 
            sourceFn: sourceFn || bugmiss.sourceFn, 
            deviceFn: bugmiss.deviceFn, 
            userFn: bugmiss.userFn 
        }).log(msg);
    },

    error: async ({ errorId, msg, stack }) => {
        return await new ErrorCollector({
            collector: bugmiss.collector, 
            sourceFn: sourceFn || bugmiss.sourceFn, 
            deviceFn: bugmiss.deviceFn, 
            userFn: bugmiss.userFn 
        }).log({ errorId, msg, stack });
    },

    event: async (event) => {
        return await new EventCollector({
            collector: bugmiss.collector, 
            sourceFn: sourceFn || bugmiss.sourceFn, 
            deviceFn: bugmiss.deviceFn, 
            userFn: bugmiss.userFn 
        }).log(event);
    },
}