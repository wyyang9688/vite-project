export const getConfig = (): ImportMetaEnv => {
    return {
        ...import.meta.env.config,
        ...{ $name: "vite" },
        devImgBasicUrl:
            (import.meta.env.config.IMG_URL ||
                import.meta.env.config.BASE_URL) + "/fs?v=true&name="
    };
};
