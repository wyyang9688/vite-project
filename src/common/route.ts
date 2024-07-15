

const router = useRouter()
const route = useRoute()

export const rt = ( ) => {
   console.log(router )
   router.push({
    name: 'home',
    query: {
      a: 1234
    }
  })
    const push =(op:any)=>{
        console.log('push')
        router.push(op)
    }
   
    return { push};
};
