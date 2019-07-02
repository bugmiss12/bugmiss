import BaseLog from "./BaseLog";

export default class PerformanceLog extends BaseLog {
    constructor({level, timepoint, time, ...rest}) {
        super({type: 'PerformanceLog', ...rest});
        this.level = level;
        this.timepoint = timepoint;
        this.time = time;
    }
}