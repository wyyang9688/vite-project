import { getConfig } from "../data/config";
import { router } from "@/common/route";
import { com } from "@/common/com";
import { toast,loading } from "@/common/toast";
import axios, { Method } from 'axios'
export const isFullUrl = (text: string) => {
    return /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
        text
    );
};
type Optional<T> = { [K in keyof T]+?: T[K] };
interface Config {
    timeout: number;
    baseUrl: string;
    isShowLoading?: boolean;
}
interface SData<T> {
    data: BaseData<T>;
}
export interface BaseData<T> {
    code: number;
    msg: string;
    massags: string;
    data: T;
    body: T;
    size: number;
}

const config = getConfig();
interface RequestConfig<T = any> {
    url: string;
    method: Method;
    data?: T;
    params?: T;
    header?: any;
    baseUrl?: string;
    dataType?: string;
    responseType?: string;
    withCredentials?: boolean;
    showToast?: boolean;
    needLogin?: boolean;
}
export interface BaseDataStruct<T> {
    code: number;
    msg: string;
    massags: string;
    data: T;
    body: T;
    size: number;
}
class Http {
    defaultOption: object = {
        url: "",
        method: "GET",
        header: {
            "content-type": "application/json",
            Authorization: undefined
        }
    };
    timeout: number;
    baseUrl: string;
    loadUrl: string;
    axios:any;
    async http<T>(op: RequestConfig): Promise<any> {
        if (this.isShowLoading) {
            this.loadUrl = op.url;
            toast({message:'加载中...'});
        }
        try {
            let ops = { ...op, timeout: this.timeout };
            if (ops.method == "GET") {
                ops.data = undefined;
            }
            // console.log("接口调用->", { url: ops.url, data: ops.data });
            const res = (await this.axios(ops)) as any;
            if (this.isShowLoading) {
                // if (this.loadUrl == ops.url) uni.hideLoading();
            }
            // console.log("接口返回->", { url: ops.url, data: res.data.data });
            if (op.showToast && res.data.code != 0 && res.data.msg) {
                // loading({text:'加载中...'});
                if (res.data.code == -99) {
                    if (op.needLogin) {
                        let {push } =router()
                        push({
                            url: "/pages/login/login"
                        });
                       toast({
                            title: "登录失效，请重新登录",
                            icon: "none"
                        });
                    } else {
                       toast({
                            title: "该功能需要登录后才能正常使用",
                            icon: "none"
                        });
                    }
                    console.log("需要登录");
                } else {
                    console.log("msg->" + res.data.msg);
                    toast({
                        title: res.data.msg,
                        icon: "none",
                        mask: true,
                        duration: 3000
                    });
                }
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }
    isShowLoading: boolean | undefined = false;
    constructor(options: Config) {
        let that = this;
        this.timeout = options.timeout;
        this.baseUrl = options.baseUrl;
        this.isShowLoading = options.isShowLoading;
        this.loadUrl = "";

        this.axios = axios.create({
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            // "application/x-www-form-urlencoded;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8"
          },
          responseType: "json",
          transformRequest: [
            function (data) {
              data = JSON.stringify(data);
              return data;
            }
          ],
    
          //   data: {}
        });
        this.axios.defaults.timeout = this.timeout;
        this.axios.defaults.headers['Authorization'] = 'Basic ' + 'dsh.uid + dsh.security'
    // this.$sendFormData.defaults.headers['Authorization'] = 'Basic ' + dsh.uid + dsh.security
    // this.$download.defaults.headers['Authorization'] = 'Basic ' + dsh.uid + dsh.security
        /** */
        let loadingIndex:any;
        this.axios.interceptors.request.use(
            function (config) {
              if (that.isShowLoading)
                loadingIndex = loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                })
              return config;
            },
            function (error) {
                if(loadingIndex)
                loadingIndex.close();
              return Promise.reject(error);
            }
          );

          this.axios.interceptors.response.use(function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            // console.log("response___________")
            // console.log(response)
            // console.log("response___________ end")
            return response;
          }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            // console.log("接口超时处理")
            console.log(error)
              if(error.config.url.indexOf("/api/v3/report/usr/spend-rpt")>=0 ){
                console.log("用户超时")
                toast({
                  message: "查询超时，请重试。若多次查询超时，请缩短查询时间段再重试",
                  type: "error",
                  showClose: true
                });
              }
      
      
            return Promise.reject(error);
          });

    }
    // async upload<T>(
    //     url: string,
    //     tempFilePath: string,
    //     option?: RequestConfig
    // ): Promise<T> {
    //     if (!isFullUrl(url)) {
    //         url = this.baseUrl + url;
    //     }
    //     return new Promise((resolve, reject) => {
    //         uni.uploadFile({
    //             url,
    //             header: {
    //                 Authorization: uni.getStorageSync("local_token"),
    //                 "Content-Type": "image/"
    //             },
    //             fileType: "image",
    //             name: "file",
    //             filePath: tempFilePath,
    //             success: (resp) => {
    //                 const _res = JSON.parse(resp.data);

    //                 if (_res.code == 0) {
    //                    toast({
    //                         type: "none",
    //                         title: "上传成功",
    //                         icon: "none",
    //                         duration: 1500,
    //                         success: () => {
    //                             uni.hideLoading();
    //                         }
    //                     });
    //                     resolve(_res);
    //                 } else {
    //                    toast({
    //                         type: "none",
    //                         title: _res.msg,
    //                         icon: "none",
    //                         duration: 1500,
    //                         success: () => {
    //                             uni.hideLoading();
    //                         }
    //                     });
    //                     if (_res.code == -99) {
    //                         useRouter().push({
    //                             url: "/pages/login/login"
    //                         });
    //                     }
    //                     resolve(_res);
    //                 }
    //             },
    //             fail: function (err) {
    //                toast({
    //                     type: "none",
    //                     title: "上传失败，请重试",
    //                     icon: "none",
    //                     duration: 1500,
    //                     success: () => {
    //                         uni.hideLoading();
    //                     }
    //                 });
    //                 reject(err);
    //             }
    //         });
    //     });
    // }
    param(data: { [key: string]: any } | undefined, url: string): string {
        if (!data) {
            return url;
        }
        let ret = "";
        for (const key in data) {
            if (com.typesof(data[key]) == "array") {
                for (let v of data[key]) {
                    if (ret) ret += "&";
                    ret += key + "=" + v;
                }
            } else if (com.typesof(data[key]) == "object") {
                if (ret) ret += "&";
                ret += key + "=" + "object";
            } else {
                if (ret) ret += "&";

                ret += key + "=" + data[key];
            }
        }
        url.indexOf("?") > 0
            ? (url = url + "&" + ret)
            : (url = url + "?" + ret);
        return url;
    }
    get<T>(
        url: string,
        data?: object,
        option?: Optional<RequestConfig> // Optional<Omit<RequestConfig, "data">>
    ) {
        url = this.param(data, url);
        return this.request<T>({
            ...option,
            url,
            method: "GET"
        });
    }
    post<T>(
        url: string,
        data?: object,
        params?: object,
        option?: Optional<RequestConfig>
    ) {
        url = this.param(params, url);

        return this.request<T>({
            ...option,
            url,
            data,
            method: "POST"
        });
    }
    put<T>(
        url: string,
        data?: object,
        params?: object,
        option?: RequestConfig
    ) {
        url = this.param(params, url);

        return this.request<T>({
            ...option,
            url,
            data,
            method: "PUT"
        });
    }

    private request<T>(option: RequestConfig): Promise<SData<T>> {
        // const token = "";
        option = Object.assign(this.defaultOption, option);
        option.header.Authorization = option.header.Authorization ?? "token";
        // delete option.header._Authorization;
        if (!isFullUrl(option.url)) {
            option.url = this.baseUrl + option.url;
        }

        return this.http<BaseData<T>>({ ...option });
    }
}
export default Http;

// uni.addInterceptor("request", {
//     invoke(args) {
//         // console.log(args);
//         args.header.Authorization = uni.getStorageSync("local_token");
//     },
//     success(args) {
//         // 请求成功后，修改code值为1
//         // console.log("interceptor-success", args);
//     },
//     fail(err) {
//         console.warn(err);
//         uni.hideLoading();
//        toast({
//             title: "网络错误，请稍后重试",
//             icon: "none"
//         });
//     },
//     complete(res) {
//         if (res.statusCode != 200) {
//             // uni.showLoading();
//             // uni.hideLoading();
//             console.warn(res);
//         }
//         if (res.data && res.data.code !== 0) {
//             console.log(res.data.msg);
//             // if (res.data.code == -99) {
//             //     useRouter().push({
//             //         url: "/pages/login/login"
//             //     });
//             // }
//         }
//     }
// });

// uni.addInterceptor({
//     returnValue(args) {
//         return args;
//     }
// });
export const http: Http = new Http({
    baseUrl: config.BASE_URL,
    timeout: 9000
});
export const ajax: Http = new Http({
    baseUrl: config.BASE_URL,
    timeout: 9000,
    isShowLoading: true
});
export const httpM: Http = new Http({
    baseUrl: config.BASE_Mid_URL,
    timeout: 9000
});
export const ajaxM: Http = new Http({
    baseUrl: config.BASE_Mid_URL,
    timeout: 9000,
    isShowLoading: true
});
