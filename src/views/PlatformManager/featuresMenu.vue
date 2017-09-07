<template>
  <section>
      <!-- 这是功能菜单 -->
      <el-row class="common">
            <el-col :span="24">
                <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                    <el-table-column label="项目名称" align="center">
                            <template scope="scope">
                                <a class="project" @click="ShowPreMessage(scope.row,scope.$index)">{{ scope.row.project }}</a>
                            </template>
                    </el-table-column>
                    <el-table-column prop="mananger" label="项目创建人" align="center">
                    </el-table-column>
                    <el-table-column prop="industry" label="所属行业" align="center">
                    </el-table-column>
                    <el-table-column prop="sort" label="项目类型" align="center">
                    </el-table-column>
                    <el-table-column prop="stage" label="项目阶段" align="center">
                    </el-table-column>
                    <el-table-column label="操作" min-width="100" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index,tableData)">
                                    删除
                                </el-button>
                            </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
  </section>
</template>
