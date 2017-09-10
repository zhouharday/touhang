<template>
    <div class="wpoolMessage">
        <div class="title">
            <div class="left">
                <span class="desc">{{title}}</span>
            </div>
            <div class="right">
                <el-button type="danger" @click="dialogVisible=true">入项目池</el-button>
                <el-button type="danger" @click="jumpAdd">返回</el-button>
            </div>
            <!-- 确认转项目池 dialog -->
            <el-dialog title="转项目池" :visible.sync="dialogVisible" size="tiny">
                <span>确认将该项目转入项目池？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible=false">取 消</el-button>
                    <el-button type="primary" @click="jumpPool">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="详情" name="details" class="tab_list">
                    <detail-form :basicForm="basicForm" :companyForm="companyForm">
                    </detail-form>
                    <table-form></table-form>
                </el-tab-pane>
                <el-tab-pane label="工商信息" name="industry" class="tab_list">
                    <industry-form :industryForm="industryForm"></industry-form>
                </el-tab-pane>
                <el-tab-pane label="融资信息" name="capital" class="tab_list">
                    <capital-table></capital-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import detailForm from './details'
import tableForm from './tables'
import industryForm from './industry'
import capitalTable from './capital'
export default {
    data() {
        return {
            title: '双子金服投资项目',
            dialogVisible: false,
            activeName: 'details',
            basicForm: {
                baseInfo: '基本信息',
                flag: true
            },
            companyForm: {
                baseInfo: '企业信息',
                flag: true
            },
            industryForm: {
                baseInfo: '工商信息',
                flag: true
            }
        }
    },
    components: {
        detailForm,
        tableForm,
        industryForm,
        capitalTable,
    },
    methods: {
        jumpPool() {
            this.dialogVisible = false;
            this.addTab('项目池', '/home/projectPool', 'projectPool');
            this.$router.push({ name: 'projectPool' });
        },
        jumpAdd() {
            this.addTab('添加项目', '/home/addProject', 'addProject');
            this.$router.push({ name: 'addProject' });
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        }
    }
}
</script>





<style lang="less" scoped>
.wpoolMessage {
    width: 100%;
    /*height: 100%;*/
    background-color: #fff;
    padding: 24px;
    .title {
        width: 100%;
        height: 64px;
        line-height: 64px;
        background-color: #2a3142;
        margin-bottom: 24px;
        .left {
            height: 100%;
            float: left;
            margin-left: 24px;
            font-size: 0;
            .desc {
                font-size: 20px;
                font-weight: 600;
                color: #fff;
                vertical-align: top;
            }
        }
        .right {
            height: 100%;
            float: right;
            margin-right: 24px;
        }
    }
}
</style>