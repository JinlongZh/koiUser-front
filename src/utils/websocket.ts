import {WsRequestMessageType, WsResponseMessageType} from "@/d.ts/utils/websocket.d.ts";
import {getAccessToken} from "@/utils/auth";
import {worker} from "@/utils/initWorker";
import {useChatStore} from "@/store/im/chat";
import useUserStore from "@/store/user";

const WSService = {
    tasks: [] as WsRequestMessageType[],
    connectReady: false,
    chatStore: undefined as ReturnType<typeof useChatStore> | undefined,
    userStore: undefined as ReturnType<typeof useUserStore> | undefined,

    start() {
        this.initConnect();
        this.chatStore = useChatStore();
        this.userStore = useUserStore();
        worker.addEventListener('message', this.onWorkerMessage.bind(this));
    },

    initConnect() {
        const token = getAccessToken();
        worker.postMessage(`{"type":"initWS","value":${token ? `"${token}"` : null}}`);
    },

    onWorkerMessage(e: MessageEvent<any>) {
        const params: { type: string; value: unknown } = JSON.parse(e.data);
        switch (params.type) {
            case 'message': {
                this.onMessage(params.value as string);
                break;
            }
            case 'open': {
                this.dealTasks();
                break;
            }
            case 'close':
            case 'error': {
                this.onClose();
                break;
            }
            default:
                break;
        }
    },

    onMessage(value: string) {
        const params: { type: WsResponseMessageType; data: unknown } = JSON.parse(value);
        if (params.type === WsResponseMessageType.ReceiveMessage) {
            if (this.userStore?.userInfo && this.userStore?.userInfo.id === params.data.fromUser.userId) {
                // 自己发送的消息
                return;
            }
            this.chatStore.pushMessage(params.data);
        }
    },

    onClose() {
        console.log('关闭连接');
    },

    dealTasks() {
        console.log('处理任务', this.tasks);
    },
};

export default WSService;
