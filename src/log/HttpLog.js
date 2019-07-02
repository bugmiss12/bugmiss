import BaseLog from "./BaseLog";

export default class HttpLog extends BaseLog {
    constructor({url, query, statusCode, errCode, errMsg, time, ...rest}) {
        super({type: 'HttpLog', ...rest});
        this.url = url;
        this.query = query;
        this.statusCode = statusCode;
        this.errCode = errCode;
        this.errMsg = errMsg;
        this.time = time;
    }
}