import type {PageResultInterfaceInfoResp} from "@/d.ts/api/interfacer/interfaceInfo";
import request from "@/utils/request";

/**
 * 获得接口信息分页
 * @returns
 * @param pageNo
 * @param pageSize
 * @param name
 */
export const getInterfaceInfoPage = (pageNo: number, pageSize: number, name: string) : Promise<PageResultInterfaceInfoResp> => {
    return request.get(`/interface/page?pageNo=${pageNo}&pageSize=${pageSize}&name=${name}`);
}