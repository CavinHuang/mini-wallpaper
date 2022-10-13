import axios from 'axios'
import { computed } from 'vue'
import { ElMessage, UploadRequestOptions } from 'element-plus'

import { useQiNIu } from '@/hooks'
import { useAsyncState } from '@vueuse/core'

/**
 * 文件上传自行处理上传
 * @param upload
 */
export async function schemaRequest(upload: UploadRequestOptions) {
  const { state, execute } = useAsyncState(
    useQiNIu(),
    {
      uploadUrl: computed<string>(() => ''),
      qiniuHttpHost: computed<string>(() => ''),
      getKey: () => '',
      token: '',
      uploadPath: computed<string>(() => '')
    },
    { immediate: false }
  )
  await execute()
  // 创建FormData对象 添加相关上传参数
  const formData = new FormData()
  // 文件对象
  formData.append('file', upload.file)
  // key 文件名处理 images/时间戳_随机字符串.文件后缀
  formData.append('key', state.value.getKey())
  // token
  formData.append('token', state.value.token!)

  // 上传文件
  // onUploadProgress 查看axios文档 https://github.com/axios/axios
  axios
    .post(state.value.uploadUrl.value!, formData, {
      onUploadProgress: (event) => {
        // 监听上传进度
        event.percent = (event.loaded / event.total) * 100
        upload.onProgress(event)
      }
    })
    .then((response) => {
      const res = response.data
      if (response.status === 200) {
        // 调用组件上传成功方法
        upload.onSuccess(res)
        // 轮播图上传成功 这里做相关逻辑this.$message.success('上传成功')
      }
    })
    .catch((err) => {
      console.log('🚀 ~ file: schemaUpload.ts ~ line 54 ~ schemaRequest ~ err', err)
      // 调用组件上传失败方法
      upload.onError(err)
      ElMessage.error('上传失败,' + err)
    })
}
