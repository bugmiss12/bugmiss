
import EventLog from "../log/EventLog";
import BaseCollector from './BaseCollector';

export default class EventCollector extends BaseCollector {
    constructor({collector, sourceFn, deviceFn, userFn}) {
        super({sourceFn, deviceFn, userFn});
        this.collector = collector;
    }

    async log(event) {
        const base = await this.base();
        this.collector.rpush(new EventLog({
            event, 
            ...base,
        }));
    }
}