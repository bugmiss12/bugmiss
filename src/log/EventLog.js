import BaseLog from "./BaseLog";

export default class EventLog extends BaseLog {
    constructor({event, ...rest}) {
        super({type: 'EventLog', ...rest});
        this.event = event;
    }
}