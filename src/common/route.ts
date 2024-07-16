import router from "@/router/index";

export {};

declare module "vue-router" {
  interface RouteMeta {
    transition?: string;
    isUnKeep?: boolean;
  }
}

function useRT() {
  const push = (op: any) => {
    console.log(router);
    return router.push(op);
  };

  return { push };
}

export const rt = useRT;
