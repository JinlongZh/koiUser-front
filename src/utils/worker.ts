// 向主线程发送消息
import {WsRequestMessageType} from "@/d.ts/utils/websocket.d.ts";

const postMessageToMainThread = ({type, value}: { type: string; value?: object }) => {
    self.postMessage(JSON.stringify({type, value}));
};

// WebSocket 实例
let websocket: WebSocket | null = null;
// 心跳检测的定时器 ID
let heartbeatTimer: number | null = null;

// 重连机制相关变量
const MAX_RECONNECT_ATTEMPTS = 100;
let reconnectAttempts = 0;
let reconnectTimer: number | null = null;
let isReconnecting = false;

// 连接使用的 token
let connectionToken: string | null = null;

// 向 WebSocket 发送消息
const sendMessage = (message: object) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(message));
    }
};

// 开始发送心跳包，每 10 秒发送一次
const startHeartbeat = () => {
    heartbeatTimer = setInterval(() => {
        sendMessage({type: WsRequestMessageType.HeartBeatDetection});
    }, 10000);
};

// 清除心跳包定时器
const stopHeartbeat = () => {
    if (heartbeatTimer !== null) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
    }
};

// 处理 WebSocket 连接关闭事件
const handleConnectionClose = () => {
    stopHeartbeat();

    if (isReconnecting) {
        return;
    }
    isReconnecting = true;

    // 清除 timer，避免任务堆积。
    if (reconnectTimer !== null) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }

    // 达到重连次数上限
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts = 0;
        return;
    }

    // 在 2 秒后尝试重新连接
    reconnectTimer = setTimeout(() => {
        initializeWebSocketConnection();
        reconnectAttempts++;
        // 标识已经开启重连任务
        isReconnecting = false;
    }, 2000);
};

// 处理 WebSocket 连接错误事件
const handleConnectionError = () => {
    handleConnectionClose();
    postMessageToMainThread({type: 'error'});
};

// 处理 WebSocket 连接关闭事件
const handleWebSocketClose = () => {
    handleConnectionClose();
    connectionToken = null;
    postMessageToMainThread({type: 'close'});
};

// 处理 WebSocket 连接成功事件
const handleWebSocketOpen = () => {
    postMessageToMainThread({type: 'open'});
    startHeartbeat();
};

// 处理 WebSocket 收到消息事件
const handleWebSocketMessage = (event: any) => {
    postMessageToMainThread({type: 'message', value: event.data});
};

// 初始化 WebSocket 连接
const initializeWebSocketConnection = () => {
    // 移除之前的事件监听器（如果存在）
    websocket?.removeEventListener('message', handleWebSocketMessage);
    websocket?.removeEventListener('open', handleWebSocketOpen);
    websocket?.removeEventListener('close', handleWebSocketClose);
    websocket?.removeEventListener('error', handleConnectionError);

    // 创建新的 WebSocket 连接
    const wsUrl = `${import.meta.env.VITE_WS_URL}${connectionToken ? `?Authorization=${connectionToken}` : ''}`;
    websocket = new WebSocket(wsUrl);

    // 添加事件监听器
    websocket.addEventListener('message', handleWebSocketMessage);
    websocket.addEventListener('open', handleWebSocketOpen);
    websocket.addEventListener('close', handleWebSocketClose);
    websocket.addEventListener('error', handleConnectionError);
};

// 处理主线程发送过来的消息
self.onmessage = (event: MessageEvent<string>) => {
    const {type, value} = JSON.parse(event.data);

    switch (type) {
        case 'initWS':
            reconnectAttempts = 0;
            connectionToken = value;
            initializeWebSocketConnection();
            break;

        case 'message':
            sendMessage(value as object);
            break;

        default:
            break;
    }
};
