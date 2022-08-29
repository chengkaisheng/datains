<template>
  <div>
    <el-dialog
      title="新增数据填报"
      :visible.sync="dialogVisible"
      width="80%"
      vh="10"
      :before-close="handleClose"
    >
      <div class="big_box">
        <div class="left_info">
          <el-row>
            <el-col :span="8">
              名称
            </el-col>
            <el-col :span="16">
              <el-input v-model="inputName" placeholder="请输入内容" />
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="8">
              空间类型
            </el-col>
            <el-col :span="16">
              <div v-for="item in spaceTyep" :key="item.type" class="type_class">
                <span class="type_info" @click="changeType(item)">{{ item.name }}</span>
              </div>
              <!-- <el-input v-model="inputName" placeholder="请输入内容" /> -->
            </el-col>
          </el-row>
        </div>
        <div class="show_info">
          <!-- 中间展示部分的信息 -->
          <div style="margin-bottom:20px;">
            {{ typeTitle }}
          </div>
          <el-row>
            <!-- 输入框 -->
            <el-col v-if="typeName==='input'">
              <el-input v-model="inputInfo" placeholder="请输入内容" />
            </el-col>
            <el-col v-if="typeName==='textarea'">
              <el-input v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" />
            </el-col>
            <el-col v-if="typeName==='select'">
              <el-select v-model="selectInfo" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col v-if="typeName==='inputNumber'">
              <el-input-number v-model="numInfo" label="描述文字" />
            </el-col>
            <el-col v-if="typeName==='radio'">
              <el-radio-group v-model="radioInfo">
                <el-radio :label="3">备选项</el-radio>
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
              </el-radio-group>
            </el-col>
            <el-col v-if="typeName==='cascader'">
              <el-cascader
                v-model="cascaderInfo"
                :options="cascaderOptions"
              />
            </el-col>
          </el-row>
        </div>
        <div class="set_info">
          <div>基本配置</div>
          <div style="margin-bottom:15px;">
            <el-checkbox v-model="checked">显示标题</el-checkbox>
          </div>
          <el-row v-show="checked" style="margin-bottom:15px;">
            <el-col :span="6">标题</el-col>
            <el-col :span="16">
              <el-input v-model="inputInfo" placeholder="请输入表字段名" />
            </el-col>
          </el-row>
          <div>表字段名称</div>
          <el-row style="margin-bottom:15px">
            <el-col :span="16" :offset="2">
              <el-input v-model="inputInfo" placeholder="请输入表字段名" />
            </el-col>
            <el-col :span="16" :offset="2">
              <span style="font-size:12px;scale:0.5">表字段名称必须以字母开头，支持字母、数字、下划线，最大长度为40个字符</span>
            </el-col>
          </el-row>
          <div>提示文字</div>
          <el-row style="margin-bottom:15px">
            <el-col :span="16" :offset="2">
              <el-input v-model="inputInfo" placeholder="请输入表字段名" />
            </el-col>
          </el-row>
          <div>描述信息</div>
          <el-row style="margin-bottom:15px">
            <el-col :span="16" :offset="2">
              <el-input v-model="textarea" type="textarea" :rows="2" placeholder="多行输入" />
            </el-col>
          </el-row>
          <div>默认状态</div>
          <el-row style="margin-bottom:15px">
            <el-col :offset="2">
              <el-radio-group v-model="radioInfo">
                <el-radio :label="3">普通</el-radio>
                <el-radio :label="6">只读</el-radio>
                <el-radio :label="9">隐藏</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">默认值</el-col>
            <el-col :span="16">
              <el-input v-model="inputInfo" placeholder="请输入默认值" />
            </el-col>
          </el-row>
          <el-row style="margin-bottom:15px">
            <el-col :offset="2">
              <el-checkbox v-model="loginInfo">使用登录用户名</el-checkbox>
            </el-col>
          </el-row>
          <div>
            <el-row>
              <el-col :span="8">数据来源</el-col>
              <el-col :span="16">
                <el-select v-model="dataForm" placeholder="请选择">
                  <el-option
                    v-for="item in dataFromOpins"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <el-row v-show="dataForm==='自定义数据'" style="margin-top:20px;">
              <el-col v-for="(item,index) in addInput" :key="index" :span="24" style="margin-bottom:10px;">
                <el-col :span="18">
                  <el-input v-model="item.value" placeholder="请输入默认值" />
                </el-col>
                <el-col :span="6" style="line-height:30px;padding-left:20px">
                  <i class="el-icon-delete" @click="deletVal(item,index)" />
                </el-col>
              </el-col>
              <el-col>
                <el-button size="mini" type="primary" @click="steNewValue()">添加</el-button>
              </el-col>
            </el-row>
            <el-row v-show="dataForm==='数据源'" style="margin-top:20px;">
              <el-col>
                <el-col :span="6"> 数据源</el-col>
                <el-col :span="18" style="margin-bottom:10px;">
                  <el-select v-model="dataScoces" placeholder="请选择">
                    <el-option
                      v-for="item in dataFromOpins"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="6">  数据表</el-col>
                <el-col :span="18" style="margin-bottom:10px;">
                  <el-select v-model="dataSheet" placeholder="请选择">
                    <el-option
                      v-for="item in dataFromOpins"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="6">  数据字段 </el-col>
                <el-col :span="18" style="margin-bottom:10px;">
                  <el-select v-model="dataField" placeholder="请选择">
                    <el-option
                      v-for="item in dataFromOpins"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="6">  默认值 </el-col>
                <el-col :span="18" style="margin-bottom:10px;">
                  <el-select v-model="defultVal" placeholder="请选择">
                    <el-option
                      v-for="item in dataFromOpins"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-col>
            </el-row>
          </div>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      addInput: [
        {
          value: ''
        }
      ],
      inputName: '',
      typeTitle: '输入框',
      typeName: 'input',
      inputInfo: '',
      textarea: '',
      options: [],
      cascaderOptions: [],
      selectInfo: '',
      numInfo: '',
      radioInfo: '',
      cascaderInfo: '',
      checked: true,
      loginInfo: false,
      // 数据来源
      dataScoces: '',
      dataSheet: '',
      dataField: '',
      defultVal: '',
      dataForm: '自定义数据',
      dataFromOpins: [{
        label: '自定义数据',
        value: '自定义数据'
      }, {
        label: '数据源',
        value: '数据源'
      }],
      spaceTyep: [
        {
          type: 'input',
          name: '输入框'
        }, {
          type: 'textarea',
          name: '文本输入框'
        }, {
          type: 'select',
          name: '选择器'
        }, {
          type: 'inputNumber',
          name: '计数器'
        }, {
          type: 'radio',
          name: '单选框'
        }, {
          type: 'cascader',
          name: '级联选择器'
        }
      ]
    }
  },
  methods: {
    deletVal(key, index) {
      this.addInput.splice(index, 1)
    },
    steNewValue() {
      this.addInput.push({
        value: ''
      })
    },
    changeType(item) {
      console.log(item)
      this.typeTitle = item.name
      this.typeName = item.type
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-input__inner{
  height: 32px;
  line-height: 30px;
}
/deep/ .el-input-number{
  line-height: 30px;
}
.big_box{
  display:flex
}
.left_info{
  width:280px;
  margin-right: 20px;
}
.show_info{
  flex:1;
}
.set_info{
 width:320px;
 margin-left: 20px;
}
.type_class{
  margin-bottom: 10px;
}
.type_info{
  cursor: pointer;
  font-size: 14px;
}
.el-icon-delete{
  cursor: pointer;
  font-size: 15px;
}
</style>
