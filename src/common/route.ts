export const useRouter = () => {
    const { navigateTo, redirectTo, navigateBack, switchTab } = uni;
    
    const push = (option: UniApp.NavigateToOptions) => {
        navigateTo(option);
    };
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
