import { service } from "@/http/service";
import { toast } from "./toast";
import { com } from "./com";
import { useUserStore } from "@/store/user-store";
const userStore = useUserStore();
const getQueryParam = com.getQueryParam;
const failScan = () => {
    toast("不识别此二维码");
};

export const scan = async (): Promise<{
    key: string;
    [key: string]: any;
}> => {
    const { result } = await uni.scanCode();
    console.log(result);
    const url = result;
    // 二维码显示内容：
    // 未安装：#+ID， 如#8658660631555740
    // 已安装：pu短码，如https://h0.ink/1NlJ
    // pu定制长码，如https://b.hentre.top/h.html?wd=8624280599163040
    // 内部扫码活动码 进行活动参与
    let did = "";
    let longUrl = "";
    const pattern: RegExp = /^#\d{15,16}$/;
    if (pattern.test(url)) {
        did = url.substring(1);
    } else if (url.includes("sharePackId=") && url.includes("actId=")) {
        console.log("活动码");
        let eid = getQueryParam(url, "eid");
        let sharePackId = getQueryParam(url, "sharePackId");
        let obtainPackId = getQueryParam(url, "obtainPackId");
        let isShareFlag = getQueryParam(url, "isShareFlag");
        let actId = getQueryParam(url, "actId");
        let shareUid = getQueryParam(url, "shareUid");
        let ori = getQueryParam(url, "ori");
        try {
            let params = {
                iDisplayStart: 0,
                iDisplayLength: 20,
                hasCount: true,
                eid: eid,
                actconfig: {
                    actState: 1,
                    actType: 200,
                    id: actId
                },
                isCall: true
            };

            const adRes = await service.getActDetail(params);
            if (
                adRes.code == 0 &&
                adRes.data.length &&
                adRes.data[0].actState == 1 &&
                new Date().getTime() > adRes.data[0].actStartTime &&
                new Date().getTime() < adRes.data[0].actEndTime
            ) {
                let params = {
                    sharedata: {
                        sharePackInfoId: sharePackId,
                        distObtainPackInfoId: obtainPackId,
                        distObtainUid: userStore.userInfo.did,
                        actId: actId,
                        shareUid: shareUid,
                        isShareFlag: isShareFlag
                    },
                    eid: eid
                };
                try {
                    const res = await service.rechargePlug(params, {});
                    if (res.code == 0) {
                        toast("参与成功");
                        return {
                            key: "act",
                            status: 1
                        };
                    } else {
                        return {
                            key: "act",
                            status: 0
                        };
                    }
                } catch (error) {
                    console.warn(error);
                }
            } else {
                toast("活动已失效");
            }
        } catch (error) {
            console.log(error);
        }

        return {
            key: "act",
            status: 0
        };
    } else if (url.includes("https://h0.ink/")) {
        try {
            const res = await service.shortToLongUrl({
                shortUrl: url
            });
            if (res.code == 0 && res.data) {
                longUrl = res.data;
                console.log("longUrl", longUrl);
                if (longUrl.includes("qrid=")) {
                    did = getQueryParam(longUrl, "qrid");
                } else if (longUrl.includes("id=")) {
                    did = getQueryParam(longUrl, "id");
                } else {
                    failScan();
                }
            } else {
                failScan();
            }
        } catch (error) {
            failScan();
        }
    } else if (url.includes("h.html?wd=")) {
        did = getQueryParam(url, "wd");
    } else if (url.includes("qrid=")) {
        did = getQueryParam(url, "qrid");
    } else if (url.includes("id=")) {
        did = getQueryParam(url, "id");
    } else {
        failScan();
    }
    console.log("did->", did);
    if (did.length == 15) did = did.padEnd(16, "0");
    return {
        key: "did",
        did: did
    };
};
