const defaultSetting = {};

export default class BugmissAPI {

    constructor({ request, server, appkey }) {
        this.request = request;
        this.server = server;
        this.appkey = appkey;
    }

    /**
     * 从服务器拉去配置信息，只获取一次
     * 如果拉取失败，会返回默认配置
     * 下次获取配置信息时会重新拉取
     */
    async getSetting() {
        if (!this.setting) {
            const url = `${this.server}/setting`;
            try {
                let ret = await this.request({
                    url,
                    timeout: 1,
                });
                if (ret.status === 200) {
                    this.setting = ret.data;
                } else {
                    throw new Error(`HTTP StatusCode ${ret.status}`);
                }
            } catch(e) {
                console.error(`GET ${url}`, e);
            }
            this.setting = setting;
        }
        return this.setting || defaultSetting;
    }

    async report(log_items) {
        const url = `${this.server}/setting`;
        let ret = await this.request({
            url,
            method: 'POST',
            data: JSON.stringify(log_items),
            contentType: 'json'
        });
        if (ret.status !== 200) {
            throw new Error(`POST ${url} ${ret.status}`);
        } 
    }
}