"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ip = exports.ipInfo = void 0;
const geoip = require("fast-geoip");
const ipInfo = (ip) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ip) {
        return { error: "Could not fetch ip from request." };
    }
    // IPV6 addresses can include IPV4 addresses
    // So req.ip can be '::ffff:86.3.182.58'
    // However geoip-lite returns null for these
    if (ip.includes('::ffff:')) {
        ip = ip.split(':').reverse()[0];
    }
    const lookedUpIP = yield geoip.lookup(ip);
    if (!lookedUpIP) {
        return { error: "Error occured while trying to process the information." };
    }
    return {
        ipInfo: lookedUpIP
    };
});
exports.ipInfo = ipInfo;
const ip = (req, res, next) => {
    const xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
    const ip = xForwardedFor || req.socket.remoteAddress;
    // @ts-ignore
    req.ipInfo = Object.assign({ ip }, (0, exports.ipInfo)(ip));
    next();
};
exports.ip = ip;
//# sourceMappingURL=index.js.map