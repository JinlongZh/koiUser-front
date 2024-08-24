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

/**
 * 获取光标位置
 */
export const getEditorRange = () => {
    let range: Range | null = null;
    let selection: Selection | null = null;

    // 检查浏览器是否支持 window.getSelection API
    if (window.getSelection) {
        // 获取当前的 selection 对象
        selection = window.getSelection();

        // 确保 selection 对象存在并且有至少一个选区范围
        if (selection && selection.rangeCount > 0) {
            // 获取当前选区的第一个 Range 对象
            range = selection.getRangeAt(0);

            // 返回包含 range 和 selection 的对象
            return {
                range,
                selection,
            };
        }
    }

    // 如果 selection 不存在或没有有效的 range，返回 null
    return null;
};

/**
 * 将指定的文本插入到选定的文本范围 (range) 中，并在插入文本后更新光标位置
 *
 * @param content
 * @param selection
 * @param range
 */
export const insertInputText = ({
                                    content,
                                    selection,
                                    range,
                                }: {
    content?: string;
    selection?: Selection;
    range?: Range;
}) => {
    // 如果 selection、range 或 content 为空，则不执行任何操作
    if (!selection || !range || !content) {
        return;
    }

    // 确保选择范围存在且有效
    if (selection.rangeCount > 0) {
        // 删除当前选中的内容
        range.deleteContents();

        // 创建一个新的 div 元素，并将要插入的文本放入其中
        const tempContainer = document.createElement('div');
        tempContainer.textContent = content;

        // 创建一个文档片段用于插入内容
        const fragment = document.createDocumentFragment();
        let lastNode: Node | null = null;

        // 将 div 中的所有子节点依次移动到文档片段中
        while (tempContainer.firstChild) {
            lastNode = fragment.appendChild(tempContainer.firstChild);
        }

        // 将文档片段插入到选定的范围内
        range.insertNode(fragment);

        // 如果有最后一个节点，则将光标移动到它之后
        if (lastNode) {
            const newRange = range.cloneRange();
            newRange.setStartAfter(lastNode); // 将新范围的开始位置设置在最后一个节点之后
            newRange.collapse(true); // 折叠范围，使其变成一个插入点（光标）

            // 清除所有选区，然后添加新的选区
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    }
};
