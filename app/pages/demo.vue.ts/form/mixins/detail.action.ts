import { API } from '../api';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DetailActionMixin extends Vue {
    beforeMount() {
        if (this.isDetail) {
            this.getDetail(this.$route.query.id);
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
            this.detail = result;
        } catch (err) {
            console.log(err);
        }
    }
    async save() {
        try {
            await this.$refs.queryForm.validate();
            const api = this.isCreate ? API.addShop : API.save;
            const { result } = await api(this.detail);
            this.$message.success('保存成功！');
            if (result && result.id) {
                location.href = `/shop/infoDetail?id=${result.id}`;
            }
        } catch(err) {
            console.log(err);
        }
    }
    reset() {
        this.$refs.queryForm.resetFields();
    }
};
