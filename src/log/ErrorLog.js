import BaseLog from "./BaseLog";

export default class ErrorLog extends BaseLog {
    constructor({errorId, msg, stack, ...rest}) {
        super({type: 'ErrorLog', ...rest});
        this.errorId = errorId;
        this.msg = msg;
        this.stack = stack;
    }
}