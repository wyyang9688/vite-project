<script setup lang="ts">
import { useMain } from '@/store/index';
import { http } from '@/http/http'
import { service } from '@/service/service'
import { rt } from "@/common/route";
import { storeToRefs } from 'pinia';


// import { useRouter, useRoute } from 'vue-router'

// const router = useRouter()
// const route = useRoute()
// router.push({
//   name: 'home',
//   query: {
//     a: 123
//   }
// })
const main = useMain()
http.post('/a/123', {
  key: 'val'
})

const login = async () => {
  console.log('login')
  const res = await service.login({
    pn: "15348401122",
    pwd: "123456",
    model: 8388604,
  })
  console.log(res)
  if (res.code == 0) {
    const { push } = rt()
    push({
      name: 'home',
      query: {
        a: 123
      }
    })
  }
  console.log('sendHttp')
  try {
    const res = await service.getBalances({ did: '8696220592622390' })
    console.log(res)
  } catch (error) {
    console.error(error)
  }

}

login()


const getAbPlugDetailList = async (type: string) => {

  try {
    const res = await service.getPlusList({
      uid: "17dd1c9ca727cb6c",
      eid: "172678d04880c400",
      iDisplayStart: 0,
      iDisplayLength: 10,
      hasCount: true
    });
    if (res.data)
      res.data = res.data.map((v: any) => {
        let endTime =
          +new Date(v.createTime).getTime() +
          60 * 60 * 1000 * 24 * (v.drDays || 0);
        let isOutOfRange = endTime - new Date().getTime() <= 0;
        return {
          ...v,
          endTime,
          isOutOfRange
        };
      });

  } catch (error) {
    console.log(error);
  }
};
console.log('getAbPlugDetailList')
getAbPlugDetailList("init")

main.increment()
console.log(main.counter)
// ElMessage({
//   message: 'Congrats, this is a success message.',
//   type: 'success',
// })
// let { counter, name, doubleCount } = storeToRefs(main)
// console.log(counter.value)
// defineProps<{ msg: string }>()
console.log(import.meta.env.config)
const count = ref(0)
</script>

<template>
  <h1>{{ '' }}</h1>
  <!-- <el-button type="primary">按钮</el-button>
  <div>
    <el-icon>
      <CameraFilled />
    </el-icon>
  </div> -->
  <!-- <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit

      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
