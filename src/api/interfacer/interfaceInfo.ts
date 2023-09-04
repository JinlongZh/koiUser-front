import type {InterfaceInfoResp, PageResultInterfaceInfoResp} from "@/d.ts/api/interfacer/interfaceInfo";
import request from "@/utils/request";

/**
 * 获得接口信息分页
 * @returns
 * @param pageNo
 * @param pageSize
 * @param name
 */
export const getInterfaceInfoPage = async (pageNo: number, pageSize: number, name: string) : Promise<PageResultInterfaceInfoResp> => {
    return request.get(`/interface/page?pageNo=${pageNo}&pageSize=${pageSize}&name=${name}`);
}

/**
 * 根据id获取接口信息
 * @param {string} id
 * @returns
 */
export const getInterfaceInfo = async (id: number): Promise<InterfaceInfoResp> => {
    return request.get(`/interface/get?id=${id}`);
}