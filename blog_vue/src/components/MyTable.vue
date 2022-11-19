<template>
  <div>
    <el-table
    border
    :data="list"
    style="width: 100%">
    <el-table-column v-for="(item,index) in label" :key="index" :prop="item.prop" :label="item.label" align="center">
      <template v-slot="{row}" v-if="item.prop == 'registration'">
        <span style="margin-left: 10px">{{ $dayjs(row.registration).format('YYYY-MM-DD') }}</span>
      </template>

      <template v-slot="{row}" v-else-if="item.prop == 'rights'">
        <el-tag v-if="row.rights === 0" effect="dark" type="warning">管理员</el-tag>
        <el-tag v-else effect="dark" type="info">普通用户</el-tag>
      </template>
      <template v-slot="{row}" v-else-if="item.prop == 'label'">
        <span v-for="(item,index) in row.label" :key="index" style="margin:0 5px">
          <el-tag effect="dark" type="warning">{{item}}</el-tag>
        </span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template v-slot="{row}">
        <slot name="operation" :data="row"></slot>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  props: ['list', 'label'],
  data () {
    return {

    }
  }
}
</script>

<style >

</style>
