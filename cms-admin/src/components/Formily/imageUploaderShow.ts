import { GlobalStore } from '@/store'
import { Plus } from '@element-plus/icons-vue'
import { observer } from '@formily/reactive-vue'
import { useField } from '@formily/vue'
import { ElIcon } from 'element-plus'
import { computed, defineComponent, h } from 'vue'

export const pictureComponent = () =>
  observer(
    defineComponent({
      name: 'PictureComponet',
      setup() {
        const fieldRef = useField() as any
        const globalStore = GlobalStore()
        const qiniuHttpHost = computed(() => globalStore.getAppData('qiniuHttpHost')?.value)

        return {
          fieldRef,
          qiniuHttpHost
        }
      },
      render() {
        let imageUrl = ''
        if (this.fieldRef.value.length && this.fieldRef.value[0].response) {
          imageUrl = (this.qiniuHttpHost || '') + '/' + this.fieldRef.value[0].response.key
        }
        console.log('🚀 ~ file: imageUploaderShow.ts ~ line 26 ~ render ~ imageUrl', imageUrl)
        return imageUrl
          ? h('img', { src: imageUrl, class: 'banner-image' })
          : h(
              ElIcon,
              { class: 'banner-uploader-icon' },
              {
                default: () => h(Plus)
              }
            )
      }
    })
  )
