/**
 * 七牛配置
 */

import { CommonApi } from '@/api/modules/common'
import { GlobalStore } from '@/store'
import { computed, ref } from 'vue'

export async function useQiNIu() {
  const globalStore = GlobalStore()
  const uploadUrl = computed(() => globalStore.getAppData('qiniuUploadUrl')?.value)
  const uploadPath = computed(() => globalStore.getAppData('qiniuBannerPath')?.value)
  const qiniuHttpHost = computed(() => globalStore.getAppData('qiniuHttpHost')?.value)

  const getKey = (): string => {
    const randmKey = new Date().getTime() + Math.ceil(Math.random() * 30)
    return uploadPath.value ? String(uploadPath.value + randmKey) : String(randmKey)
  }

  async function getQiniuToken() {
    const res = await CommonApi.qiniuToken()
    return res.data
  }

  return {
    uploadUrl,
    uploadPath,
    qiniuHttpHost,
    getKey,
    token: await getQiniuToken()
  }
}
