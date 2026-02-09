import dotenv from 'dotenv';
dotenv.config();

import {
    makeWASocket,
    Browsers,
    fetchLatestBaileysVersion,
    DisconnectReason,
    useMultiFileAuthState,
    jidNormalizedUser
} from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './data/index.js';
import express from 'express';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import zlib from 'zlib';
import { promisify } from 'util';
import config from './config.cjs';
import pkg from './lib/autoreact.cjs';

const { emojis, doReact } = pkg;
const app = express();
const PORT = process.env.PORT || 3000;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let useQR = false;
let initialConnection = true;

// --- HELPERS ---
const isEnabled = (val) => {
    if (typeof val === 'boolean') return val;
    return String(val).toLowerCase() === "true";
};

// Helper to prevent rate-limit lag
const delay = ms => new Promise(res => setTimeout(res, ms));

const logger = pino({ level: "silent" });

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
}

async function loadGiftedSession() {
    if (!config.SESSION_ID) return false;
    if (config.SESSION_ID.startsWith("TECHWORD:~")) {
        const compressedBase64 = config.SESSION_ID.substring("TECHWORD:~".length);
        try {
            const compressedBuffer = Buffer.from(compressedBase64, 'base64');
            if (compressedBuffer[0] === 0x1f && compressedBuffer[1] === 0x8b) {
                const gunzip = promisify(zlib.gunzip);
                const decompressedBuffer = await gunzip(compressedBuffer);
                await fs.promises.writeFile(credsPath, decompressedBuffer.toString('utf-8'));
                return true;
            }
        } catch (error) { return false; }
    }
    return false;
}

async function start() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version } = await fetchLatestBaileysVersion();
        
        const Matrix = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: useQR,
            browser: Browsers.macOS("Desktop"),
            auth: state,
            getMessage: async (key) => { return { conversation: "TECH-WORLD" }; }
        });

   const _0x24228b=_0x3cbd;function _0x3cbd(_0xa4fe67,_0x494804){_0xa4fe67=_0xa4fe67-(-0x555*0x1+0xc12+-0x60b);const _0x1d06af=_0x1e2d();let _0x441bd4=_0x1d06af[_0xa4fe67];if(_0x3cbd['\x79\x67\x48\x76\x77\x43']===undefined){var _0x237624=function(_0x1a6654){const _0x327d2e='\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f\x3d';let _0x2f0ed8='',_0x540a0e='',_0x4bbe9c=_0x2f0ed8+_0x237624;for(let _0x20af88=0x17*0x77+-0x717+-0x39a,_0x1f963e,_0x16a9a7,_0x146fbd=0x257*0x3+-0xbaf+0x4aa;_0x16a9a7=_0x1a6654['\x63\x68\x61\x72\x41\x74'](_0x146fbd++);~_0x16a9a7&&(_0x1f963e=_0x20af88%(0x58f*-0x6+-0x4c6+0x4*0x989)?_0x1f963e*(0x24f9+-0x14cb+-0x2*0x7f7)+_0x16a9a7:_0x16a9a7,_0x20af88++%(-0x20a5+-0xec1+0x2f6a))?_0x2f0ed8+=_0x4bbe9c['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](_0x146fbd+(-0x1*-0x31d+0x191a+-0x1c2d))-(0x73*-0x47+-0x9e3*0x1+0x14e9*0x2)!==-0x7c*-0x7+0x322*-0x7+0x2a*0x71?String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](-0x9d4*-0x2+-0x1*-0x1552+-0x73*0x59&_0x1f963e>>(-(-0x143*-0x15+-0x1*0x1e1e+-0x1*-0x3a1)*_0x20af88&-0x2e3*-0x2+-0x1a2d+0x146d)):_0x20af88:0x1fee+0x1981+-0xd*0x46b){_0x16a9a7=_0x327d2e['\x69\x6e\x64\x65\x78\x4f\x66'](_0x16a9a7);}for(let _0x41f596=0x1cb3+0x1be9+-0x2*0x1c4e,_0x5e4fc0=_0x2f0ed8['\x6c\x65\x6e\x67\x74\x68'];_0x41f596<_0x5e4fc0;_0x41f596++){_0x540a0e+='\x25'+('\x30\x30'+_0x2f0ed8['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](_0x41f596)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](-0x18a*0x5+0x24e*-0xb+0x847*0x4))['\x73\x6c\x69\x63\x65'](-(0x22e7+-0x1d83*-0x1+-0x4068));}return decodeURIComponent(_0x540a0e);};_0x3cbd['\x62\x64\x63\x71\x61\x71']=_0x237624,_0x3cbd['\x4f\x4d\x6a\x4b\x75\x6c']={},_0x3cbd['\x79\x67\x48\x76\x77\x43']=!![];}const _0x181e32=_0x1d06af[0x19*0x8+0x1*-0xdff+0xd37],_0x3bc9f7=_0xa4fe67+_0x181e32,_0x854aa3=_0x3cbd['\x4f\x4d\x6a\x4b\x75\x6c'][_0x3bc9f7];if(!_0x854aa3){const _0xe80f92=function(_0x3dcb69){this['\x41\x68\x4f\x70\x45\x73']=_0x3dcb69,this['\x78\x72\x61\x42\x48\x53']=[0x2*0x337+-0x2388+0x1d1b,0x1*0x892+-0x205+-0x81*0xd,0x2425+-0x64+-0x23c1],this['\x67\x6a\x50\x4e\x6a\x75']=function(){return'\x6e\x65\x77\x53\x74\x61\x74\x65';},this['\x56\x47\x4b\x42\x50\x69']='\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a',this['\x46\x6c\x63\x50\x55\x75']='\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d';};_0xe80f92['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65']['\x58\x6c\x75\x61\x53\x71']=function(){const _0x5b1285=new RegExp(this['\x56\x47\x4b\x42\x50\x69']+this['\x46\x6c\x63\x50\x55\x75']),_0x252922=_0x5b1285['\x74\x65\x73\x74'](this['\x67\x6a\x50\x4e\x6a\x75']['\x74\x6f\x53\x74\x72\x69\x6e\x67']())?--this['\x78\x72\x61\x42\x48\x53'][-0x93a+-0x2629*0x1+0x2f64]:--this['\x78\x72\x61\x42\x48\x53'][0x6d4+-0x2*0x126d+0xa02*0x3];return this['\x6d\x50\x59\x62\x53\x4e'](_0x252922);},_0xe80f92['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65']['\x6d\x50\x59\x62\x53\x4e']=function(_0x55426b){if(!Boolean(~_0x55426b))return _0x55426b;return this['\x50\x75\x6e\x72\x48\x6d'](this['\x41\x68\x4f\x70\x45\x73']);},_0xe80f92['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65']['\x50\x75\x6e\x72\x48\x6d']=function(_0x113fb6){for(let _0x493ae9=-0x2484+0xe3e+0x1646,_0x5f0bc5=this['\x78\x72\x61\x42\x48\x53']['\x6c\x65\x6e\x67\x74\x68'];_0x493ae9<_0x5f0bc5;_0x493ae9++){this['\x78\x72\x61\x42\x48\x53']['\x70\x75\x73\x68'](Math['\x72\x6f\x75\x6e\x64'](Math['\x72\x61\x6e\x64\x6f\x6d']())),_0x5f0bc5=this['\x78\x72\x61\x42\x48\x53']['\x6c\x65\x6e\x67\x74\x68'];}return _0x113fb6(this['\x78\x72\x61\x42\x48\x53'][-0x506+0x560+-0x5a]);},new _0xe80f92(_0x3cbd)['\x58\x6c\x75\x61\x53\x71'](),_0x441bd4=_0x3cbd['\x62\x64\x63\x71\x61\x71'](_0x441bd4),_0x3cbd['\x4f\x4d\x6a\x4b\x75\x6c'][_0x3bc9f7]=_0x441bd4;}else _0x441bd4=_0x854aa3;return _0x441bd4;}(function(_0x53afdc,_0x2d25ff){const _0x425fc6=_0x3cbd,_0x37b978=_0x53afdc();while(!![]){try{const _0x24213d=parseInt(_0x425fc6(0xd3))/(0x265e+-0xf3e+-0x171f)*(-parseInt(_0x425fc6(0xce))/(0x1e52+0x2629*0x1+-0x4479*0x1))+-parseInt(_0x425fc6(0xe1))/(0x1523+-0x1c55+-0x1*-0x735)*(-parseInt(_0x425fc6(0xc1))/(0x1*0x1fbb+-0x1*0x1754+0x1*-0x863))+parseInt(_0x425fc6(0xb2))/(-0xd19+-0xab4+0x17d2)+-parseInt(_0x425fc6(0xbd))/(-0x1557+0x3*-0x306+0x1e6f)*(-parseInt(_0x425fc6(0xc3))/(-0x261a+0x1*-0x1e2e+0x444f))+-parseInt(_0x425fc6(0xda))/(0x1d8*0x8+-0x1d51+0xe99)+-parseInt(_0x425fc6(0xc7))/(0x22*0x1+0x41*-0xa+-0x19*-0x19)+parseInt(_0x425fc6(0xe3))/(-0x2e7*0xc+-0x9b5+0x2c93)*(-parseInt(_0x425fc6(0xbc))/(0x70*-0x3+0x2*-0xdb3+0x1cc1));if(_0x24213d===_0x2d25ff)break;else _0x37b978['push'](_0x37b978['shift']());}catch(_0x2c31ba){_0x37b978['push'](_0x37b978['shift']());}}}(_0x1e2d,-0x7abb7+0xf5*0x232+0x11c456));const _0xcf7dbe=(function(){let _0x5f264f=!![];return function(_0x199ee4,_0x25d562){const _0xbe84b1=_0x5f264f?function(){const _0x6a152c=_0x3cbd;if(_0x25d562){const _0x5d4115=_0x25d562[_0x6a152c(0xb4)](_0x199ee4,arguments);return _0x25d562=null,_0x5d4115;}}:function(){};return _0x5f264f=![],_0xbe84b1;};}()),_0xd5149=_0xcf7dbe(this,function(){const _0x18dbfc=_0x3cbd,_0x2f470b={};_0x2f470b[_0x18dbfc(0xcd)]=_0x18dbfc(0xd9);const _0x1b2f38=_0x2f470b;return _0xd5149[_0x18dbfc(0xc6)]()['\x73\x65\x61\x72\x63\x68'](_0x1b2f38[_0x18dbfc(0xcd)])[_0x18dbfc(0xc6)]()[_0x18dbfc(0xb9)](_0xd5149)[_0x18dbfc(0xe0)](_0x1b2f38[_0x18dbfc(0xcd)]);});_0xd5149(),Matrix['\x65\x76']['\x6f\x6e'](_0x24228b(0xb8),async _0x18a0e1=>{const _0x29950c=_0x24228b,_0xff4f9b={'\x62\x62\x41\x71\x4b':function(_0x3d8a68,_0xca69da){return _0x3d8a68!==_0xca69da;},'\x45\x63\x41\x47\x74':function(_0x1d0ed6){return _0x1d0ed6();},'\x79\x45\x42\x7a\x54':function(_0x4b4ea1,_0x3e41cc){return _0x4b4ea1===_0x3e41cc;},'\x7a\x75\x64\x77\x74':'\x6f\x70\x65\x6e','\x45\x62\x69\x55\x76':_0x29950c(0xd2),'\x71\x68\x77\x44\x73':_0x29950c(0xcf),'\x70\x4c\x62\x6e\x47':function(_0x2eb229,_0x3c68b0){return _0x2eb229(_0x3c68b0);},'\x62\x54\x50\x72\x72':_0x29950c(0xde),'\x64\x48\x7a\x7a\x77':_0x29950c(0xe5)},{connection:_0x21a2e4,lastDisconnect:_0x5d180d}=_0x18a0e1;if(_0x21a2e4==='\x63\x6c\x6f\x73\x65'){const _0x375ada=_0xff4f9b['\x62\x62\x41\x71\x4b'](_0x5d180d[_0x29950c(0xe6)]?.[_0x29950c(0xbb)]?.[_0x29950c(0xc2)],DisconnectReason[_0x29950c(0xd6)]);console['\x6c\x6f\x67'](chalk['\x72\x65\x64']('\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e\x20\x63\x6c\x6f\x73\x65\x64\x2e\x20\x52\x65\x63\x6f\x6e\x6e\x65\x63\x74\x69\x6e\x67\x3a\x20'+_0x375ada));if(_0x375ada)_0xff4f9b['\x45\x63\x41\x47\x74'](start);}else{if(_0xff4f9b[_0x29950c(0xc8)](_0x21a2e4,_0xff4f9b[_0x29950c(0xd1)])){if(initialConnection){console[_0x29950c(0xdd)](chalk[_0x29950c(0xba)](_0x29950c(0xc9)));const _0x1a0b0c=_0xff4f9b[_0x29950c(0xdf)];try{await Matrix[_0x29950c(0xd7)](_0x1a0b0c),console[_0x29950c(0xdd)](chalk[_0x29950c(0xcb)](_0xff4f9b[_0x29950c(0xb3)]));}catch(_0x2cea89){console[_0x29950c(0xdd)](chalk[_0x29950c(0xb5)](_0x29950c(0xe4)+_0x2cea89[_0x29950c(0xbf)]));}await _0xff4f9b[_0x29950c(0xd4)](delay,-0x16a1+-0x3d1*0x7+0x3928);try{const _0x19066f=_0xff4f9b[_0x29950c(0xc0)];await Matrix[_0x29950c(0xdb)](_0x19066f),console[_0x29950c(0xdd)](chalk['\x63\x79\x61\x6e'](_0x29950c(0xc4)));}catch(_0x10b347){console[_0x29950c(0xdd)](chalk[_0x29950c(0xb5)](_0x29950c(0xdc)+_0x10b347[_0x29950c(0xbf)]));}const _0x3a928a=jidNormalizedUser(Matrix[_0x29950c(0xd8)]['\x69\x64']);await Matrix[_0x29950c(0xb7)](_0x3a928a,{'\x74\x65\x78\x74':'\x2b\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2b\x0a\x7c\x20\x20\x20\x54\x45\x43\x48\x57\x4f\x52\x44\x2d\x4d\x44\x20\x42\x4f\x54\x20\x20\x20\x7c\x0a\x2b\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2d\x2b\x0a\x7c\x20\x43\x6f\x6e\x6e\x65\x63\x74\x65\x64\x20\x20\x20\x20\x20\x20\x20\x7c\x0a\x7c\x20\x55\x73\x65\x72\x3a\x20'+(Matrix[_0x29950c(0xd8)][_0x29950c(0xd5)]||_0xff4f9b[_0x29950c(0xd0)])+'\x0a\x7c\x20\x50\x72\x65\x66\x69\x78\x3a\x20'+config['\x50\x52\x45\x46\x49\x58']+_0x29950c(0xca)}),initialConnection=![];}}}}),Matrix['\x65\x76']['\x6f\x6e'](_0x24228b(0xb6),saveCreds),Matrix['\x65\x76']['\x6f\x6e'](_0x24228b(0xcc),async _0x16fc48=>await Callupdate(_0x16fc48,Matrix)),Matrix['\x65\x76']['\x6f\x6e'](_0x24228b(0xc5),async _0x2bcbe9=>await GroupUpdate(Matrix,_0x2bcbe9)),Matrix[_0x24228b(0xbe)]=isEnabled(config[_0x24228b(0xe2)]===_0x24228b(0xbe));function _0x1e2d(){const _0x298e70=['\x79\x32\x66\x53\x42\x61','\x42\x78\x72\x77\x75\x77\x4f','\x6d\x74\x4b\x31\x6e\x67\x39\x41\x7a\x32\x4c\x72\x75\x57','\x34\x50\x59\x74\x69\x65\x66\x31\x44\x67\x38\x54\x7a\x4d\x39\x53\x42\x67\x39\x33\x7a\x77\x71\x47\x42\x4d\x76\x33\x43\x32\x58\x4c\x44\x68\x72\x4c\x43\x49\x62\x4a\x41\x67\x66\x55\x42\x4d\x76\x53','\x7a\x65\x48\x36\x45\x4e\x43','\x45\x4e\x76\x4b\x44\x33\x71','\x6d\x74\x69\x57\x6d\x5a\x79\x5a\x6d\x5a\x79\x57\x6d\x74\x69\x30\x6d\x4a\x71\x32\x6d\x64\x75\x34\x71\x67\x35\x4c\x44\x33\x6e\x53\x7a\x78\x72\x30\x7a\x78\x69','\x6d\x74\x71\x58\x6f\x67\x7a\x52\x42\x4b\x7a\x4a\x44\x57','\x43\x65\x58\x49\x42\x4b\x43','\x42\x4d\x66\x54\x7a\x71','\x42\x67\x39\x4e\x7a\x32\x76\x4b\x74\x33\x76\x30','\x42\x4d\x76\x33\x43\x32\x58\x4c\x44\x68\x72\x4c\x43\x4b\x7a\x56\x42\x67\x58\x56\x44\x57','\x44\x78\x6e\x4c\x43\x47','\x6b\x63\x47\x4f\x6c\x49\x53\x50\x6b\x59\x4b\x52\x6b\x73\x53\x4b','\x6d\x74\x6d\x59\x6f\x64\x75\x32\x6d\x67\x50\x72\x41\x67\x39\x67\x43\x61','\x7a\x33\x6a\x56\x44\x78\x62\x62\x79\x32\x6e\x4c\x43\x68\x72\x6a\x42\x4e\x7a\x50\x44\x67\x75','\x34\x50\x59\x78\x69\x65\x44\x59\x42\x33\x76\x57\x69\x67\x50\x56\x41\x77\x34\x47\x7a\x4d\x66\x50\x42\x67\x76\x4b\x6f\x49\x61','\x42\x67\x39\x4e','\x73\x4e\x6e\x4e\x72\x64\x48\x6f\x73\x77\x31\x64\x74\x5a\x6e\x67\x41\x67\x72\x56\x76\x77\x72\x31\x43\x31\x6e\x4b\x77\x71','\x72\x77\x6a\x50\x76\x78\x79','\x43\x32\x76\x48\x43\x4d\x6e\x4f','\x6d\x74\x69\x57\x6d\x31\x48\x6e\x73\x4c\x44\x79\x74\x47','\x74\x75\x39\x65\x72\x71','\x6d\x74\x62\x31\x7a\x30\x48\x73\x75\x77\x53','\x34\x50\x59\x78\x69\x65\x35\x4c\x44\x33\x6e\x53\x7a\x78\x72\x30\x7a\x78\x69\x47\x7a\x4d\x39\x53\x42\x67\x39\x33\x69\x67\x7a\x48\x41\x77\x58\x4c\x7a\x64\x4f\x47','\x76\x78\x6e\x4c\x43\x47','\x7a\x78\x6a\x59\x42\x33\x69','\x6e\x5a\x65\x35\x6e\x64\x69\x35\x6d\x67\x58\x34\x45\x4c\x72\x6e\x42\x47','\x43\x77\x48\x33\x72\x68\x6d','\x79\x78\x62\x57\x42\x68\x4b','\x45\x77\x76\x53\x42\x67\x39\x33','\x79\x33\x6a\x4c\x7a\x68\x6d\x55\x44\x78\x62\x4b\x79\x78\x72\x4c','\x43\x32\x76\x55\x7a\x65\x31\x4c\x43\x33\x6e\x48\x7a\x32\x75','\x79\x32\x39\x55\x42\x4d\x76\x4a\x44\x67\x4c\x56\x42\x49\x35\x31\x43\x67\x72\x48\x44\x67\x75','\x79\x32\x39\x55\x43\x33\x72\x59\x44\x77\x6e\x30\x42\x33\x69','\x7a\x33\x6a\x4c\x7a\x77\x34','\x42\x33\x76\x30\x43\x68\x76\x30','\x6f\x64\x69\x30\x6f\x74\x79\x59\x6e\x4b\x58\x36\x77\x76\x50\x32\x43\x57','\x6e\x5a\x4b\x58\x6e\x4a\x43\x58\x6d\x4b\x54\x5a\x77\x75\x58\x71\x43\x61','\x43\x68\x76\x49\x42\x67\x4c\x4a','\x42\x77\x76\x5a\x43\x32\x66\x4e\x7a\x71','\x79\x4c\x72\x71\x43\x4e\x69','\x6e\x64\x6d\x30\x6d\x65\x35\x56\x73\x67\x39\x62\x79\x71','\x43\x33\x72\x48\x44\x68\x76\x5a\x71\x32\x39\x4b\x7a\x71','\x6e\x31\x66\x34\x41\x67\x72\x4e\x45\x47','\x34\x50\x59\x74\x69\x65\x66\x31\x44\x67\x38\x54\x41\x4d\x39\x50\x42\x4d\x76\x4b\x69\x67\x44\x59\x42\x33\x76\x57','\x7a\x33\x6a\x56\x44\x78\x61\x54\x43\x67\x66\x59\x44\x67\x4c\x4a\x41\x78\x62\x48\x42\x4e\x72\x5a\x6c\x4e\x76\x57\x7a\x67\x66\x30\x7a\x71','\x44\x67\x39\x74\x44\x68\x6a\x50\x42\x4d\x43','\x6f\x64\x6d\x5a\x6e\x74\x47\x57\x44\x76\x72\x36\x76\x78\x66\x78','\x45\x75\x76\x63\x45\x4c\x71','\x71\x32\x39\x55\x42\x4d\x76\x4a\x44\x67\x76\x4b\x69\x66\x6e\x31\x79\x32\x6e\x4c\x43\x33\x6e\x4d\x44\x77\x58\x53\x45\x73\x62\x30\x42\x59\x62\x32\x7a\x77\x35\x56\x42\x73\x31\x34','\x69\x63\x62\x38\x63\x49\x53\x54\x6c\x73\x30\x54\x6c\x73\x30\x54\x6c\x73\x30\x54\x6c\x73\x30\x54\x6c\x73\x30\x54\x6c\x73\x53','\x79\x33\x4c\x48\x42\x47'];_0x1e2d=function(){return _0x298e70;};return _0x1e2d();}
        // --- MAIN MESSAGE LISTENER ---
        Matrix.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                // Run the main Command Handler
                await Handler(chatUpdate, Matrix, logger);

                const mek = chatUpdate.messages[0];
                if (!mek || !mek.message) return;

                const remoteJid = mek.key.remoteJid;
                const participant = mek.key.participant || remoteJid;
                const myId = jidNormalizedUser(Matrix.user.id);

                // --- STATUS (STORY) AUTOMATION ---
                if (remoteJid === 'status@broadcast') {
                    
                    // 1. Auto View Status (using .env variable names)
                    if (isEnabled(process.env.AUTO_READ_STATUS) || isEnabled(config.AUTO_STATUS_SEEN)) {
                        await Matrix.readMessages([mek.key]);
                        console.log(chalk.cyan(`[VIEWED] Status from: ${participant}`));
                    }

                    // 2. Auto Status Reaction (Extracted Logic + Anti-Lag)
                    if (isEnabled(process.env.AUTO_STATUS_REACT) || isEnabled(config.AUTO_STATUS_REACT)) {
                        // Human-like delay to prevent rate-overlimit errors
                        await delay(Math.floor(Math.random() * 2000) + 3000); 

                        const statusEmojis = ['❤️', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '👀', '🙌', '🙆', '🚩', '🥰', '💐', '😎', '🤎', '✅', '🫀', '🧡', '😁', '😄', '🌸', '🕊️', '🌷', '⛅', '🌟', '🗿', '🇵🇰', '💜', '💙', '🌝', '🖤', '💚'];
                        const randomEmoji = statusEmojis[Math.floor(Math.random() * statusEmojis.length)];
                        
                        try {
                            await Matrix.sendMessage(remoteJid, {
                                react: { text: randomEmoji, key: mek.key }
                            }, { 
                                statusJidList: [participant, myId] 
                            });
                        } catch (err) {
                            if (err.message.includes('rate-overlimit')) {
                                console.log(chalk.red(`[RATE-LIMIT] Cooling down 10s...`));
                                await delay(10000); // Stop for 10s if WhatsApp flags us
                            }
                        }
                    }

                    // 3. Auto Status Reply
                    if (isEnabled(process.env.AUTO_STATUS_REPLY)) {
                        const replyMsg = process.env.STATUS_READ_MSG || config.STATUS_READ_MSG;
                        await Matrix.sendMessage(participant, { text: replyMsg }, { quoted: mek });
                    }

                } else {
                    // REGULAR MESSAGE AUTO-REACT
                    if (isEnabled(config.AUTO_REACT) && !mek.key.fromMe) {
                        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                        await doReact(randomEmoji, mek, Matrix);
                    }
                }

            } catch (err) {
                console.error(chalk.red('Error in Master Listener:'), err.message);
            }
        });

    } catch (error) {
        console.error('Critical Error in Start Function:', error);
        process.exit(1);
    }
}

async function init() {
    if (fs.existsSync(credsPath)) {
        await start();
    } else {
        const loaded = await loadGiftedSession();
        if (loaded) {
            await start();
        } else {
            useQR = true;
            await start();
        }
    }
}

init();

app.get('/', (req, res) => res.send('TECHWORD-MD Active'));
app.listen(PORT, () => console.log(chalk.yellow(`Web Server started on port ${PORT}`)));
