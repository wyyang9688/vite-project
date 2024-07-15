import { http, ajax, httpM, ajaxM } from "@/http/http";

export interface PromptSendParams {
    promptType: string;
    promptWord: string;
    promptModel: string;
    promptLabel?: string;
    imageId?: string;

    promptTitle: string;
}

export interface PageParams {
    iDisplayStart: number | string;
    iDisplayLength: number | string;
    hasCount: boolean;
}
export interface RegParams {
    pn: string;
    pwd: string;
    eid: string;
    oid: string;
    name: string;
    headImage: string;
    age?: string | number;
    gender?: string | number;
}
class Service {
    async getProDetail(params: { id: string }) {
        const serviceData = await http.get<any>(
            `/api/v3/share/proj/view`,
            {
                ...params,
                force: true
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async getPlusList(
        params: PageParams & { uid: string; eid: string; obtainState?: string }
    ) {
        const serviceData = await http.post<any>(
            `/api/v3/drainage/pack/packinfo/lst`,
            {
                ...params
            },
            {
                ...params
            },
            {
                showToast: true,
                headers:{
                    // a:'123'
                }
            }
        );
        return serviceData.data;
    }
    async getSpendRecord(
        params: Partial<PageParams> & { eid: string; uid: string }
    ) {
        const serviceData = await http.get<any>(
            `/pay/lst`,
            {
                ...params,
                catalogs: [2, 18],
                ninTypes: 29,
                all: true
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async getShareList(
        params: Partial<PageParams> & { uid: string; eid: string }
    ) {
        const serviceData = await ajax.post<any>(
            `/api/v3/drainage/pack/share/lst`,
            {
                ...params
            },
            {
                ...params
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async getUserAb(params: { pn: string }) {
        const serviceData = await http.get<any>(
            `/kzy/balance/list`,
            {
                ...params
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async getBalances(params: { did: string }) {
        const serviceData = await http.get<any>(
            `/dev/wp/billing/balance`,
            {
                ...params
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async getDevDetail(params: { dids: string }) {
        const serviceData = await http.get<any>(
            `/dev/lst-ali`,
            {
                ...params
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async endDev(params: { did: string }) {
        const serviceData = await http.put<any>(
            `/dev/wp/billing/end`,
            {
                ...params
            },
            {
                ...params
            }
        );
        return serviceData.data;
    }
    async startDev(params: { did: string }) {
        const serviceData = await http.put<any>(
            `/dev/wp/billing/start`,
            {
                ...params
            },
            {
                ...params
            }
        );
        return serviceData.data;
    }
    async shortToLongUrl(params: { shortUrl: string }) {
        const serviceData = await http.get<string>(
            `/dev/short/long`,
            {
                ...params
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async login(params: { pn: string; pwd: string; model: number }) {
        const serviceData = await ajax.post<any>(
            `/acc/bcq/login`,
            {
                ...params
            },
            {
                ...params
            },
            {
                showToast: true,
                headers:{
                     Authorization:'123'
                }
            },
            
        );
        return serviceData.data;
    }
    async rechargePlug(data: any, params: any) {
        const serviceData = await ajax.post<any>(
            `/api/v3/drainage/pack/receive`, //后台二维码
            {
                ...data
            },
            {
                ...params
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async getActDetail(params: any) {
        const serviceData = await httpM.post<any>(
            `/api/act/lst`,
            {
                ...params,
                isMiddleFlag: 1
            },
            {
                ...params,
                isMiddleFlag: 1
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async rechargePlugUserShare(params: any) {
        const serviceData = await ajax.post<any>(
            `/api/v3/drainage/pack/receive`, //所有二维码
            {
                ...params
            },
            {
                ...params
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
        // const serviceData = await ajax.post<any>(
        //     `/api/v3/drainage/pack/share`, //用户二维码
        //     {
        //         ...params
        //     },
        //     {},
        //     {
        //         showToast: true
        //     }
        // );
        // return serviceData.data;
    }
    async regAcc(params: RegParams) {
        const serviceData = await ajax.post<any>(
            `/acc/bcq/reg`,
            {
                ...params
            },
            {
                ...params
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
    async getOptions(params: { type: string; promptType?: string | number }) {
        const serviceData = await http.post<any>(
            `/prompt/api/get/congis`,
            {
                ...params
            },
            {
                ...params
            }
        );
        return serviceData.data;
    }
    async updateImg(params: { uid: string; name?: string; headImg?: string }) {
        const serviceData = await ajax.post<any>(
            `/prompt/api/acc/upt`,
            {
                ...params
            },
            {
                ...params
            },
            {
                showToast: true
            }
        );
        return serviceData.data;
    }
}
export const service = new Service();
