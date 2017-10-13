<template>
    <div class="tables">
        <div class="memberTable">
            <tabel-header :data="headerInfo_member" @add="addMember"></tabel-header>
            <el-table :data="memberData" border style="width: 100%">
                <el-table-column label="姓名" prop="name" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.name"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="性质" prop="property" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.property }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.property"></el-input>
                        </span>
                    </template>

                </el-table-column>
                <el-table-column label="教育背景" prop="edu" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.edu }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.edu"></el-input>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="structureTable">
            <tabel-header :data="headerInfo_structure" @add="addStructure" class="structureHeader"></tabel-header>
            <el-table :data="structureData" border style="width: 100%">
                <el-table-column label="股东姓名" prop="name" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.name"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股东性质" prop="property" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.property }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.property"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="capital" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.capital }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.capital"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="持股数量（股）" prop="num" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.num }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.num"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="percent" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.percent }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.percent"></el-input>
                        </span>
                    </template>
                </el-table-column>  
            </el-table>
        </div>
    </div>
</template>



<script style="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            //董事会成员
            memberData: [
                {
                    name: '张飞',
                    property: '合伙人',
                    edu: '北大金融系研究院博士后',
                    editFlag: false
                }, {
                    name: '李四',
                    property: '创建人',
                    edu: '中国人民大学金融系博士',
                    editFlag: false
                }
            ],
            //股权结构
            structureData: [
                {
                    name: '张飞',
                    property: '合伙人',
                    capital: '10,000,000,000',
                    num: '20',
                    percent: '12%',
                    editFlag: false
                },
                {
                    name: '李四',
                    property: '创建人',
                    capital: '10,000,000,000',
                    num: '15',
                    percent: '10%',
                    editFlag: false
                }
            ],
            headerInfo_member: {
                desc: '董事会成员'
            },
            headerInfo_structure: {
                desc: '股权结构'
            }
        }
    },
    methods: {
    },
    components: {
        tabelHeader
    }
}
</script>



<style lang="less" scoped>
.tables {
    width: 100%;
    height: 100%;
    .memberTable,
    .structureTable {
        width: 100%;
        height: 100%;
        .structureHeader {
            margin-top: 22px;
        }
    }
}
</style>
