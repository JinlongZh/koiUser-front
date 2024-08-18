// 数据类型转换  NodeList => MentionData
import {IMention, INode, IPerson, NodeType} from "@/views/content/im/components/input/type.d.ts";

/**
 * 将NodeList转换为MentionData
 *
 * @param nodeList
 */
export const transformNodeListToMentionData = (nodeList: INode[]) => {
    let pureString = '';
    const mentionList: IMention[] = [];
    nodeList.forEach((item) => {
        if (item.type === NodeType.text || item.type === NodeType.br) {
            pureString += item.data;
        }
        if (item.type === NodeType.at) {
            const {userId = 0, nickname = '', avatar = ''} = item.data as IPerson
            mentionList.push({
                userId,
                nickname,
                avatar,
                length: nickname.length + 1,
                offset: pureString.length,
            })
            pureString += '@' + nickname;
        }
    })
    return {pureString, mentionList};
}