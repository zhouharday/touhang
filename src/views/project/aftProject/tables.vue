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
                <el-table-column label="性质" prop="nature" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.nature }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.nature"></el-input>
                        </span>
                    </template>

                </el-table-column>
                <el-table-column label="教育背景" prop="educationalBg" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.educationalBg }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.educationalBg"></el-input>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="structureTable">
            <tabel-header :data="headerInfo_structure" @add="addStructure" class="structureHeader"></tabel-header>
            <el-table :data="structureData" border style="width: 100%">
                <el-table-column label="股东姓名" prop="stockholderName" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockholderName }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockholderName"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股东性质" prop="stockholderNature" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockholderNature }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockholderNature"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="investmentAmount" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.investmentAmount }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.investmentAmount"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="持股数量（股）" prop="stockCount" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockCount }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockCount"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockRatio }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockRatio"></el-input>
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
    props: {
        memberData: {
            type: Array,
            default: []
        },
        structureData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
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
