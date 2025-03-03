

export const toast = (op:{
    message?: string;
    title?:string;
    text?:string;
    type?:'success' | 'warning' | 'info' | 'error',[key:string]:string|number|boolean
}={message:'',type:'info'}) => {
    // console.log("toast->" + op.message);
    

    ElMessage({
        message:op.message||op.title||op.text,
        type:op.type
    })
};
let loadingIndex=null
export const loading=(op:Partial<{
    lock:boolean;
    text:string;
   
    background:string;
    isClose:boolean;
    [key:string]:string|boolean
}>)=>{
    // console.log("loading->" + op.text);
    const loading = ElLoading.service({
        lock: true,
        text:op.text||'加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      loadingIndex=loading
      setTimeout(() => {
        hideLoading()
      }, 2000)
}
export const hideLoading=()=>{
    if(loadingIndex)
        loadingIndex.close()
        loadingIndex=null
}
