import BaseLog from "./BaseLog";

export default class DebugLog extends BaseLog {
    constructor({msg, ...rest}) {
        super({type: 'DebugLog', ...rest});
        this.msg = msg;
    }
}