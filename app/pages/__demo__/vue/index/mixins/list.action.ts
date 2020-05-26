import { Component, Vue } from 'vue-property-decorator';
import { utils } from 'rds-vue';
import { API } from '../api';

@Component
export default class ListActionMixin extends Vue {
  public onCreate() {
    window.open('/pages/__demo__/vue/form/index');
  }

  public async onExport() {
    try {
      const { result } = await API.exportList((this as any).getExtraParam());
      if (result) {
        utils.download(result);
        return;
      }
      (this as any).$message.success('导出内容为空');
    } catch (err) {
      console.error(err);
    }
  }
}
