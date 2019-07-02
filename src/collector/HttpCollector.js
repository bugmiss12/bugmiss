
import HttpLog from "../log/HttpLog";
import BaseCollector from './BaseCollector';

export default class HttpCollector extends BaseCollector {
    constructor({collector, sourceFn, deviceFn, userFn}) {
        super({sourceFn, deviceFn, userFn});
        this.collector = collector;
    }

    async log({ url, query, statusCode, errCode, errMsg, time }) {
        const base = await this.base();
        this.collector.rpush(new HttpLog({
            url, 
            query, 
            statusCode, 
            errCode, 
            errMsg, 
            time,
            ...base,
        }));
    }
}