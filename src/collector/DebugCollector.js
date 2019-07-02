
import DebugLog from "../log/DebugLog";
import BaseApi from './BaseCollector';

export default class DebugApi extends BaseApi {
    constructor({collector, sourceFn, deviceFn, userFn}) {
        super({sourceFn, deviceFn, userFn});
        this.collector = collector;
    }

    async log(msg) {
        const base = await this.base();
        this.collector.rpush(new DebugLog({
            msg, 
            ...base,
        }));
    }


}