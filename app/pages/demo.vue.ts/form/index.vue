<template>
    <el-card>
        <el-form ref="queryForm" class="base-form" :model="detail" label-width="100px">
            <el-form-item label="业务部门：" prop="department" verify rqeuired>
                <kl-select v-if="isEdit" v-model="detail.department" :source="source.department" />
                <p v-else>
                    {{ detail.departmentStr }}
                </p>
            </el-form-item>
            <el-form-item label="门店名称：" prop="name" verify rqeuired>
                <el-input v-if="isEdit" v-model="detail.name" placeholder="不超过6个字" />
                <p v-else>
                    {{ detail.name }}
                </p>
            </el-form-item>
            <el-form-item v-if="!isEdit" label="门店ID：" prop="code" verify rqeuired>
                <p>{{ detail.code }}</p>
            </el-form-item>
            <el-form-item label="门店类型：" prop="commerceType" verify rqeuired>
                <kl-select v-if="isEdit" v-model="detail.commerceType" :source="source.commerceType" />
                <p v-else>
                    {{ detail.commerceTypeStr }}
                </p>
            </el-form-item>
            <el-form-item label="销售类型：" prop="importType" verify rqeuired>
                <kl-select v-if="isEdit" v-model="detail.importType" :source="source.importType" />
                <p v-else>
                    {{ detail.importTypeStr }}
                </p>
            </el-form-item>
            <el-form-item label="门店地址：" prop="addressCode" verify rqeuired>
                <el-cascader
                    v-if="isEdit"
                    v-model="detail.addressCode"
                    class="address-location"
                    :options="source.geoRegion || []"
                    :props="props"
                />
                <p v-else>
                    {{ `${detail.provinceStr||''} ${detail.cityStr||''} ${detail.areaStr||''} ${detail.address||''}` }}
                </p>
            </el-form-item>
            <el-form-item v-if="isEdit" prop="address" verify rqeuired>
                <el-input v-model="detail.address" type="textarea" placeholder="请输入详细地址" />
            </el-form-item>
            <el-form-item label="门店状态：" prop="disable" verify rqeuired>
                <kl-select v-if="isEdit" v-model="detail.disable" :source="source.available" />
                <p v-else>
                    {{ detail.disable ? '冻结': '启用' }}
                </p>
            </el-form-item>
            <el-form-item label="合同状态：" prop="contractStatus" verify rqeuired>
                <kl-select v-if="isEdit" v-model="detail.contractStatus" :source="source.contractStatus" />
                <p v-else>
                    {{ detail.contractStatusStr }}
                </p>
            </el-form-item>
            <el-form-item label="联系人：" prop="principal" verify rqeuired>
                <el-input v-if="isEdit" v-model="detail.principal" placeholder="请输入联系人" />
                <p v-else>
                    {{ detail.principal }}
                </p>
            </el-form-item>
            <el-form-item label="联系电话：" prop="phone" verify rqeuired>
                <el-input v-if="isEdit" v-model="detail.phone" placeholder="请输入联系电话" />
                <p v-else>
                    {{ detail.phone }}
                </p>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-if="isEdit" v-model="detail.remark" type="textarea" placeholder="请输入备注内容" />
                <p v-else>
                    {{ detail.remark }}
                </p>
            </el-form-item>
            <el-form-item v-if="isEdit">
                <el-button type="primary" @click="save">
                    保存
                </el-button>
                <el-button @click="reset">
                    重置
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator';
import { SelectMixin } from '~/vue/index';

import DetailAction from './mixins/detail.action.js';
@Component
export default class Index extends Mixins(SelectMixin, DetailAction) {
    sourceKeys = ['department', 'commerceType', 'importType', 'geoRegion', 'available', 'contractStatus']
    detail = {
        department: '',
        name: '',
        commerceType: '',
        importType: '',
        addressCode: [],
        address: '',
        disable: '',
        contractStatus: '',
        principal: '',
        phone: '',
        remark: ''
    }
    props = {
        value: 'id',
        label: 'name'
    }
};
</script>

<style scoped lang="scss" src="./index.scss"></style>
