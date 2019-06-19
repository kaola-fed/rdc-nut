import { Component, Vue } from 'vue-property-decorator';
import { API } from '../api';

@Component
export default class DetailActionMixin extends Vue {
    beforeMount() {
        if (this.isDetail) {
            this.getDetail((this as any).$route.query.id);
        }
    }

    get isCreate() {
        return true;
    }
    get isDetail() {
        return false;
    }
    get isEdit() {
        if (this.isCreate) {
            return true;
        }
        return false;
    }


    async getDetail(id) {
        try {
            const { result } = await API.getDetail({ id });
            (this as any).detail = result;
        } catch (err) {
            console.error(err);
        }
    }
    async save() {
        try {
            await (this as any).$refs.queryForm.validate();
            const api = this.isCreate ? API.addShop : API.save;
            const { result } = await api((this as any).detail);
            (this as any).$message.success('保存成功！');
            if (result && result.id) {
                location.href = `/shop/infoDetail?id=${result.id}`;
            }
        } catch(err) {
            console.error(err);
        }
    }
    reset() {
        (this as any).$refs.queryForm.resetFields();
    }
}
