<template>
  <Table :columns="columns" :data-source="list">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          Name111
        </span>
      </template>
    </template>

    <template #bodyCell="{ column,record }">
      <template v-if="column.key === 'action'">
        <span>
          <Popconfirm
          v-if="list.length"
          title="Sure to delete?"
          @confirm="onDelete(record)"
        >
          <a>Delete</a>
        </Popconfirm>
        </span>
      </template>
    </template>
  </Table>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Input, Button, message,Table,Popconfirm } from "ant-design-vue";
import { findStaff,deleteStaff } from "../services";
const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'emial',
    dataIndex: 'emial',
    key: 'emial',
  },
  {
    title: 'sex',
    key: 'sex',
    dataIndex: 'sex',
  },
  {
    title: 'Action',
    key: 'action',
  }
];
@Options({
  components: {
    Table,Popconfirm
  }
})
export default class Actions extends Vue {
  data(){
    return {
     columns,
     list:[]
    }
  }

  async onDelete(rec:any){
    console.log(rec);
    if(rec.id){
       let res:any=await deleteStaff({
        id:rec.id
      });
      if(res.code==200){
        message.success("删除成功");
        let instance:any=this.$data;
        let res:any=await findStaff({
          pageNum:1,
          pageSize:10
        });
        instance.list=res.data;
        console.log(res);
      }
    }
  }
  async mounted(){
    let instance:any=this.$data;
      let res:any=await findStaff({
        pageNum:1,
        pageSize:10
      });
      instance.list=res.data;
      console.log(res);
  }

}
</script>