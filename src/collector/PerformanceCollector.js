import PerformanceLog from "../log/PerformanceLog";
import BaseCollector from './BaseCollector';

export default class PerformanceCollector extends BaseCollector {

    constructor({collector, sourceFn, deviceFn, userFn}) {
        super({sourceFn, deviceFn, userFn});
        this.collector = collector;
    }

    start() {
        this.startTime = new Date().getTime();
    }

    async trace(timepoint) {
        await this.log('TRACE', timepoint);
    }

    async debug(timepoint) {
        await this.log('DEBUG', timepoint);
    }

    async info(timepoint) {
        await this.log('INFO', timepoint);
    }

    async log(level, timepoint) {
        const base = await this.base();
        this.collector.rpush(new PerformanceLog({
            level, 
            timepoint, 
            time: new Date().getTime() - this.startTime, 
            ...base,
        }));
    }


}