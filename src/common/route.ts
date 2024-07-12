import { RouteParams ,RouteParamsGeneric} from "vue-router";

export const router = (op:RouteParamsGeneric ) => {
   const router = useRouter();
    
    const push = router.push(op)
   
    return { push};
};
