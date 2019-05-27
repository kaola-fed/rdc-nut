import { Util } from '@@/vue/index';
import { API } from '../api';

export default {
    data() {
        return {
            listService: API.getList
        };
    },
    methods: {
        onCreate() {
            window.open('/#/pages/vue/demo/form/index');
        },
        async onExport() {
            try {
                const { result } = await API.exportList(this.getExtraParam());
                if (result) {
                    Util.download(result);
                    return;
                }
                this.$message.success('导出内容为空');
            } catch (err) {
                console.log(err);
            }
        }
    }
};
