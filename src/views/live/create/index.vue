<template>
  <div class= "liveManager">
    <el-row type="flex" :gutter="40">
      <el-col :span="layout.center" :offset="layout.left">
        <el-row type="flex" :gutter="12">
          <el-col :span="9">
            <el-input style="width:100%;" v-model="liveHouseName" placeholder="请输入直播间名称"/>
            <div style="font-size: 8px;padding: 4px 0;color:#B4B4B4;"><span style="color:red;">*</span>直播间名称必填，直播间销毁时间至少要一天以后</div>
          </el-col>
          <el-col :span="9">
            <el-date-picker
              style="width:100%;"
              align="center"
              clearable
              v-model="endDay"
              type="datetime"
              placeholder="选择直播间销毁日期,默认一天后"
              :picker-options="pickerOptions"/>
          </el-col>
          <el-col :span="6">
            <el-button style="width:100%;" type="primary" @click="handleCreateClick" :disabled="disableButton">生成直播间</el-button>
          </el-col>
        </el-row>
        <div v-if="result" class="liveRoomResult">
          <div><svg-icon icon-class="success" style="height:24px;width:24px;"/></div>
          <p>生成成功!</p>
          <p>直播间地址:{{this.result}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Request from '../request'
export default {
  name: 'liveManager',
  data() {
    return {
      layout: {
        left: 5,
        center: 14,
        right: 5,
      },
      liveHouseName: '',
      endDay: '',
      pickerOptions: {
        shortcuts: [{
          text: '后天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }, {
          text: '三十天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', date);
          }
        }]
      },
      result: '',
    };
  },
  computed: {
    ...mapGetters(['userName']),
    disableButton() {
      if (this.endDay) return this.liveHouseName === '' || (parseInt(this.endDay.getTime() - new Date()) / 1000 <= 24 * 60 * 60)
      else return this.liveHouseName === ''
    }
  },
  beforeMount() {
    this.liveHouseName = this.userName
  },
  methods: {
    handleCreateClick() {
      const time = this.endDay ? parseInt(this.endDay.getTime() / 1000) : parseInt(new Date().getTime() / 1000 + 24 * 60 * 60)
      Request.createLiveHouse(this.liveHouseName, time, this.userName).then((res) => {
        this.$message.success('创建直播服务成功')
        this.result = res.data
      }).catch((err) => {
        if (err.responseMsg) this.$message.error(`创建直播服务失败,${err.responseMsg}`)
        else console.log(err)
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.liveRoomResult{
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #4c5563;
}
</style>
