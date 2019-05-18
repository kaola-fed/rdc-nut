import { API } from '../api';

export default {
    beforeMount() {
        if (this.isDetail) {
            this.getDetail(this.$route.query.id);
        }
    },

    computed: {
        isCreate() {
            return true;
        },
        isDetail() {
            return false;
        },
        isEdit() {
            if (this.isCreate) {
                return true;
            }
            return false;
        }
    },
    methods: {
        async getDetail(id) {
            try {
                const { result } = await API.getDetail({ id });
                this.detail = result;
            } catch (err) {
                console.log(err);
            }
        },
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
        },
        reset() {
            this.$refs.queryForm.resetFields();
        }
    }
};
