import {useRoute} from 'vue-router'
export const useRouterr = () => {
   const router = useRoute();
    
    const push = router.push()
    const replace = (option: UniApp.RedirectToOptions) => {
        redirectTo(option);
    };
    const back = (option?: UniApp.NavigateBackOptions) => {
        navigateBack(option);
    };
    const tab = (option: UniApp.SwitchTabOptions) => {
        switchTab(option);
    };
    return { push, replace, back, tab };
};
