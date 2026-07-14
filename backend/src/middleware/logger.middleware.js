const pinoHttp = require("pino-http");
const logger = require("../shared/logger/logger");

const loggerMiddleware = pinoHttp({
    logger,
    // ⚡ Custom serializers to strip unwanted properties completely
    serializers: {
        req(req) {
            return {
                id: req.id,
                method: req.method,
                url: req.url,
                // query: req.query,
                params: req.params
                // ✂️ headers, remoteAddress, and remotePort are completely left out
            };
        },
        res(res) {
            return {
                statusCode: res.statusCode
                // ✂️ headers are completely left out
            };
        }
    }
});

module.exports = loggerMiddleware;