import * as geoip from 'fast-geoip'
import { IncomingMessage, ServerResponse } from "http"

interface NextFunction {
    (err?: any): void
    (deferToNext: 'router'): void
    (deferToNext: 'route'): void
}

interface Response {
    ipInfo?: {
        range: [number, number]
        country: string
        region: string
        eu: "0" | "1"
        timezone: string
        city: string
        ll: [number, number]
        metro: number
        area: number
    }
    error?: string
}

export const ipInfo = async (ip: string | undefined): Promise<Response> => {
    if (!ip) {
        return { error: "Could not fetch ip from request." }
    }

    // IPV6 addresses can include IPV4 addresses
    // So req.ip can be '::ffff:86.3.182.58'
    // However geoip-lite returns null for these
    if (ip.includes('::ffff:')) {
        ip = ip.split(':').reverse()[0]
    }
    const lookedUpIP = await geoip.lookup(ip)
    if ((ip === '127.0.0.1' || ip === '::1')) {
        return { error: "This won't work on localhost." }
    }
    if (!lookedUpIP) {
        return { error: "Error occured while trying to process the information." }
    }
    return {
        ipInfo: lookedUpIP
    }
}

export const ip = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
    const xForwardedFor = ((req.headers['x-forwarded-for'] || '') as string).replace(/:\d+$/, '')
    const ip = xForwardedFor || req.socket.remoteAddress

    // @ts-ignore
    req.ipInfo = { ip, ...ipInfo(ip) }
    next()
}
