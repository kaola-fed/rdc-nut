<template>
	<el-card class="list">
        <el-form ref="queryForm" label-position="top" :model="condition">
            <kl-search @search="refresh" @reset="reset">
                <el-form-item prop="department" label="业务部门">
                    <kl-select v-model="condition.department" :source="source.department" />
                </el-form-item>
                <el-form-item prop="shopId" label="门店ID/名称">
                    <kl-select v-model="condition.shopId" :source="source.shopList" placeholder="全部" />
                </el-form-item>
                <el-form-item prop="commerceType" label="门店类型">
                    <kl-select v-model="condition.commerceType" :source="source.commerceType" />
                </el-form-item>
            </kl-search>
        </el-form>
        <kl-divider :longer="24" class="list__divider" />
        <div class="f-mb10">
            <el-button type="primary" @click="onCreate">
                新增
            </el-button>
            <el-button @click="onExport">
                导出
            </el-button>
        </div>
        <el-table v-tableSticky v-loading="loading"
            :data="list" border stripe
            >
            <el-table-column label="业务部门" prop="departmentStr" width="120" align="center" />
            <el-table-column label="门店名称" prop="name" width="130" align="center" />
            <el-table-column label="门店ID" prop="code" width="100" align="center" />
            <el-table-column label="门店类型" prop="commerceTypeStr" width="120" align="center" />
            <el-table-column label="销售类型" prop="importTypeStr" width="100" align="center" />
            <el-table-column label="门店地址" prop="address" min-width="150" align="left" />
            <el-table-column label="门店状态" prop="disable" width="100" align="center">
                <template slot-scope="scope">
                    {{ scope.row.disable ? '冻结': '启用' }}
                </template>
            </el-table-column>
            <el-table-column label="合同状态" prop="contractStatusStr" width="120" align="center" />
            <el-table-column label="新建时间" prop="createTime" width="135" align="center" />
            <el-table-column label="操作" width="120" align="center" fixed="right">
                <template slot-scope="scope">
                    <a :href="`/pages/demo.vue/form/index?id=${scope.row.id}`" target="_blank" type="text">查看</a>
                </template>
            </el-table-column>
        </el-table>
        <div class="f-mt10 f-cb">
            <el-pagination background
                class="f-fr"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="pageNo"
                :page-sizes="[10, 20, 30, 40, 50, 80, 100]"
                :page-size="pageSize"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
	</el-card>
</template>

<script>
import {ListMixin, SelectMixin, AuthProviderMixin} from '~/vue/index';
import ActionMixin from './mixins/list.action';

export default {
    mixins: [ListMixin, SelectMixin, ActionMixin, AuthProviderMixin],
    data() {
        return {
            condition: {
                department: '',
                shopId: '',
                commerceType: ''
            },
            sourceKeys: ['department', 'shopList', 'commerceType']
        };
    }
};
</script>
