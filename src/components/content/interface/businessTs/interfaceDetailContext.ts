import type {InterfaceContextInterface} from "@/components/content/interface/d.ts/interfaceDetailContext";

const interfaceDetailContext: InterfaceContextInterface = {
    data: {},
    init: (cx) => {
        Object.assign(blogDetailContext.data, cx);
    },
}

export default interfaceDetailContext;