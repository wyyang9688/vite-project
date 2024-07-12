import { RouteParams ,} from "vue-router";

export const router = ( ) => {
   const router = useRouter();
    const push =(op:RouteParams)=> router.push(op)
   
    return { push};
};
