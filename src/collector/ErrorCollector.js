
import ErrorLog from "../log/ErrorLog";
import BaseCollector from './BaseCollector';

export default class ErrorCollector extends BaseCollector {
    constructor({collector, sourceFn, deviceFn, userFn}) {
        super({sourceFn, deviceFn, userFn});
        this.collector = collector;
    }

    async log({ errorId, msg, stack }) {
        const base = await this.base();
        this.collector.rpush(new ErrorLog({
            errorId,
            msg, 
            stack,
            ...base,
        }));
    }
}