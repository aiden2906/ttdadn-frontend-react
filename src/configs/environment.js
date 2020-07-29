const path = require('path')
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const ENDPOINT = process.env.ENDPOINT || 'http://40.87.101.198:4000';
const SOCKET_NOTIFICATION = process.env.SOCKET_NOTI || 'notification';
const SOCKET_COUNT_NOTIFICATION = process.env.SOCKET_COUNT_NOTI || 'count-notification';
const SOCKET_HUMI = process.env.SOCKET_HUMI || 'sensorChange';
const SOCKET_LIGHTD = process.env.SOCKET_LIGHTD || 'controlChange';

console.log(process.env.ENDPOINT)

export { BASE_URL, ENDPOINT, SOCKET_NOTIFICATION, SOCKET_HUMI, SOCKET_LIGHTD, SOCKET_COUNT_NOTIFICATION };
