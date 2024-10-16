import dayjs from 'dayjs'
import type {Dayjs, OpUnitType, ConfigType} from 'dayjs'
import {MessageType} from "@/d.ts/api/chat/chat";

// 5 分钟 5 * 60 * 1000;
const intervalTime = 300;
// 计数上限 20 条，到达 20 重置
const computedCountMax = 20;
// 计数
let computedCount = 0;


// 时间格式化为相对文本，仿微信风格
const timeToStr = (time: number | string) => {
    const sendTime = typeof time === 'number' ? dayjs(time) : dayjs(time, 'YYYY-MM-DD HH:mm:ss');
    // 计算今天和消息的发送时间间隔多少天
    const gapDay = dayjs().endOf('day').diff(sendTime, 'day');
    // 消息与今天是否 7 天及以上了
    const isLastWeek = gapDay >= 7;
    // 今天显示时分, 昨天的显示 `昨天 时分`, 今天往前一周内，显示`周几 时分`， 再前面显示日期 `年月日 时分`
    return gapDay < 2
        ? `${gapDay === 1 ? '昨天 ' : ''}${sendTime.format('HH:mm')}`
        : isLastWeek
            ? sendTime.format('YYYY-MM-DD HH:mm')
            : sendTime.format('dddd HH:mm');
};

// 超过5分钟，或者超过20条消息，就添加展示时间
const checkTimeInterval = (cur: MessageType, pre: MessageType) => {
    // 如果有一个超过 5 分钟了或者计数达到 20 条了
    let timeGap = dayjs(cur.message.createTime, 'YYYY-MM-DD HH:mm:ss')
        .diff(dayjs(pre.message.createTime, 'YYYY-MM-DD HH:mm:ss'), 'second');
    if (
        (pre && (timeGap > intervalTime)) ||
        (computedCount >= computedCountMax)
    ) {
        // 重置计数
        computedCount = 0;
        // 返回时间标记
        return {...cur, timeBlock: timeToStr(cur.message.createTime)};
    } else {
        // 时间间隔很短的就累计计数
        computedCount += 1;
        return cur;
    }
}

export const computedTimeBlock = (list: MessageType[], needFirst = true) => {
    if (!list || list.length === 0) {
        return [];
    }
    // 是否需要保留 传入 list 第一个，如果是接口拉回来的消息列表就要保留，如果接收到新消息，需要拿当前消息列表最后一个拿来做时间间隔计算的话，就不需要保留第一个
    const temp = needFirst ? [list[0]] : [];
    // 跳过第一个
    for (let index = 1, len = list.length; index < len; index++) {
        const item = list[index];
        // 上个聊天记录
        const preItem = list[index - 1];
        // 超过20分钟，或者超过50条评论，展示时间
        temp.push(checkTimeInterval(item, preItem));
    }
    return temp;
}

/**
 * 消息时间戳格式化
 * @returns 格式化后的时间字符串
 * @param time
 */
export const formatTime = (time: string): string => {
    const date: Dayjs = dayjs(time, 'YYYY-MM-DD HH:mm:ss')
    return formatTimeByDayjs(date);
}

/**
 * 消息时间戳格式化
 * @param timestamp 时间戳
 * @returns 格式化后的时间字符串
 */
export const formatTimestamp = (timestamp: number): string => {
    const date: Dayjs = dayjs(timestamp);
    return formatTimeByDayjs(date);
}

const formatTimeByDayjs = (date: Dayjs): string => {
    const now: Dayjs = dayjs()
    if (now.isSame(date, 'day')) {
        return date.format('HH:mm')
    } else if (now.diff(date, 'year') >= 1) {
        return date.format('YYYY年MM月DD日')
    } else {
        return date.format('MM月DD日')
    }
}

/**
 * 将时间戳转为字符串
 *
 * @param timestamp
 */
export const formatStampToString = (timestamp: number): string => {
    const date: Dayjs = dayjs(timestamp);
    return date.format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 将字符串时间转为时间戳
 * @param time
 */
export const formatStringToStamp = (time: string): number => {
    const date: Dayjs = dayjs(time, 'YYYY-MM-DD HH:mm:ss');
    return date.valueOf();
}

/**
 * 消息间隔判断
 * @param {ConfigType} time 输入时间
 * @param {OpUnitType} unit 间隔单位
 * @param {number} diff 间隔值
 * @returns boolean 输入时间是否间隔 now 间隔值以上。
 */
export const isDiffNow = ({
                              time,
                              unit,
                              diff,
                          }: {
    unit: OpUnitType
    time: ConfigType
    diff: number
}): boolean => {
    return dayjs().diff(dayjs(time), unit) > diff
}

/**
 * 距离现在 10 分钟了
 * @param {ConfigType} time 输入时间
 * @param {OpUnitType} unit 间隔单位
 * @param {number} diff 间隔值
 * @returns boolean 输入时间是否间隔 now 间隔值以上。
 */
export const isDiffNow10Min = (time: ConfigType): boolean => {
    return isDiffNow({time, unit: 'minute', diff: 10})
}
