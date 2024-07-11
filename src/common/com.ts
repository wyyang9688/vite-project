class Common {
    isValidPhoneNumber = (phoneNumber: string): boolean => {
        const phoneNumberPattern: RegExp = /^((\+?86)|(\(\+86\)))?\d{11}$/;

        return phoneNumberPattern.test(phoneNumber);
    };
    typesof = (type: any): string => {
        let typeList: any = {};
        [
            "Boolean",
            "Number",
            "String",
            "Function",
            "Array",
            "Date",
            "RegExp",
            "Object",
            "Error",
            "Symbol"
        ].forEach((item) => {
            typeList[`[object ${item}]`] = item.toLowerCase();
        });
        if (type == null) {
            return type + "";
        }
        if (typeof type === "object" || typeof type === "function") {
            return typeList[toString.call(type)] || "object";
        } else {
            return typeof type;
        }
    };
    getQueryParam = (url: string, paramName: string): string => {
        const queryString = url.split("?")[1];

        if (!queryString) {
            return "";
        }

        const arr = queryString.split("&");
        const o: {
            [index: string]: string;
        } = {};
        for (const v of arr) {
            if (v) {
                const k = v.split("=");
                o[k[0]] = k[1];
            }
        }
        return o[paramName] || "";
    };
    qs = (obj: AnyObject): string => {
        let str = "";
        for (let k in obj) {
            if (str) {
                str += "&";
            }
            str += k + "=" + obj[k];
        }
        return str;
    };
    format = (t: any, str: string = "yyyy-MM-dd hh:mm:ss"): string => {
        interface DatePrototype {
            Format(formatStr: string): string;
            [x: string]: any;
        }
        (Date.prototype as any).Format = function (formatStr: string) {
            var str = formatStr;
            var Week = ["日", "一", "二", "三", "四", "五", "六"];

            str = str.replace(/yyyy|YYYY/, this.getFullYear().toString());
            str = str.replace(
                /yy|YY/,
                (this.getFullYear() % 100 > 9
                    ? (this.getFullYear() % 100).toString()
                    : "0" + (this.getFullYear() % 100)
                ).toString()
            );

            str = str.replace(
                /MM/,
                +this.getMonth() + 1 > 9
                    ? (+this.getMonth() + 1).toString()
                    : "0" + (+this.getMonth() + 1)
            );
            str = str.replace(/M/g, (+this.getMonth() + 1).toString());

            str = str.replace(/w|W/g, Week[this.getDay()]);

            str = str.replace(
                /dd|DD/,
                this.getDate() > 9
                    ? this.getDate().toString()
                    : "0" + this.getDate()
            );
            str = str.replace(/d|D/g, this.getDate().toString());

            str = str.replace(
                /hh|HH/,
                this.getHours() > 9
                    ? this.getHours().toString()
                    : "0" + this.getHours()
            );
            str = str.replace(/h|H/g, this.getHours().toString());
            str = str.replace(
                /mm/,
                this.getMinutes() > 9
                    ? this.getMinutes().toString()
                    : "0" + this.getMinutes()
            );
            str = str.replace(/m/g, this.getMinutes().toString());

            str = str.replace(
                /ss|SS/,
                this.getSeconds() > 9
                    ? this.getSeconds().toString()
                    : "0" + this.getSeconds()
            );
            str = str.replace(/s|S/g, this.getSeconds().toString());

            return str;
        };
        return (new Date(t) as any).Format(str);
    };
    setShareParams = (options: any) => {
        if (options.q) {
            let shareParams = {
                eid: "",
                sharePackId: "",
                obtainPackId: "",
                isShareFlag: "",
                actId: "",
                shareUid: "",
                ori: "",
                url: ""
            };
            let url = decodeURIComponent(options.q);
            console.log(url);
            shareParams.url = url;
            shareParams.eid = this.getQueryParam(url, "eid");
            shareParams.sharePackId = this.getQueryParam(url, "sharePackId");
            shareParams.obtainPackId = this.getQueryParam(url, "obtainPackId");
            shareParams.isShareFlag = this.getQueryParam(url, "isShareFlag");
            shareParams.actId = this.getQueryParam(url, "actId");
            shareParams.shareUid = this.getQueryParam(url, "shareUid");
            shareParams.ori = this.getQueryParam(url, "ori");
            uni.setStorageSync("shareParams", shareParams);
        }
    };
    checkShowByKey = (key: string, num: string | number) => {
        num = isNaN(parseInt(num as string)) ? 0 : parseInt(num as string);

        let data = uni.getStorageSync(key);
        if (
            data &&
            data.date &&
            data.date == this.format(new Date(), "YYYYMMDD")
        ) {
        } else {
            data = {
                date: this.format(new Date(), "YYYYMMDD"),
                num: 0,
                setNum: num || 0
            };
        }

        let flag = false;
        if (data.num < num || !num) {
            flag = true;
        } else {
        }
        data.num = data.num + 1;
        data.setNum = num || 0;
        uni.setStorageSync(key, data);
        console.log(key, num, data.num, flag);
        return flag;
    };
}

export const com = new Common();
