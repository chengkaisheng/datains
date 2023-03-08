<template>
  <div>
    <div v-if="panelType === 'list'">
      <el-container>
        <el-header style="line-height: 60px;">
          <el-row>
            <el-col :span="6">
              <el-button @click="typeClick()">
                <i class="el-icon-folder-add"></i>
                <span>新增分类</span>
              </el-button>
              <el-button @click="fillClick()">
                <i class="el-icon-circle-plus-outline"></i>
                <span>新增数据填报</span>
              </el-button>
            </el-col>
            <el-col :span="6" :offset="12">
              <el-input
                v-model="searchValue"
                prefix-icon="el-icon-d-arrow-right"
                clearable
                placeholder="根据名称搜索"
              >
              <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="main_box">
          <el-row>
            <el-col>
              <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                :tree-props="{children: 'children',hasChildren: 'hasChildren'}"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                  label="名称"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <i v-if="scope.row.type === 2" class="el-icon-document"></i>
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createdBy"
                  label="创建者"
                  width="120"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="updateBy"
                  label="修改人"
                  width="120"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  label="修改时间"
                  width="160"
                  show-overflow-tooltip>
                  <!-- <template slot-scope="scope">
                    <span>{{scope.row.updateTime | dateFormat}}</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="120"
                > 
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" title="编辑" @click="revise(scope.row)"></el-button>
                    <el-button v-if="scope.row.type === 1" type="text" icon="el-icon-folder-add" title="新增分类" @click="typeClick(scope.row)"></el-button>
                    <el-button v-if="scope.row.type === 1" type="text" icon="el-icon-circle-plus-outline" title="新增数据填报" @click="fillClick(scope.row)"></el-button>
                    <el-button v-if="scope.row.type === 2" type="text" icon="el-icon-setting" title="属性" @click="attributeClick(scope.row)"></el-button>
                    <el-button v-if="scope.row.type === 2" type="text" icon="el-icon-s-grid" title="数据管理" @click="dataManage(scope.row)"></el-button>
                    <el-popover
                      width="90"
                      trigger="click"
                      placement="left"
                      :append-to-body="false"
                    > 
                      <div>
                        <el-row>
                          <el-col>
                            <el-button type="text"  icon="el-icon-rank" @click="moveClick(scope.row)">
                              移动
                            </el-button>
                          </el-col>
                          <el-col>
                            <el-button type="text"  icon="el-icon-delete" @click="deleteClick(scope.row)">
                              删除
                            </el-button>
                          </el-col>
                        </el-row>
                      </div>
                      <el-button slot="reference" type="text"  icon="el-icon-more" title="更多" style="margin-left: 10px;"></el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <div v-if="panelType === 'add'" class="main_panel">
      <el-container>
        <el-header style="line-height: 60px;border: 1px solid #cccccc;">
          <el-row>
            <el-col :span="4">
              <el-button icon="el-icon-d-arrow-left" circle @click="goback"></el-button>
            </el-col>
            <el-col :span="6" :offset="14">
              <el-button @click="goback">取消</el-button>
              <el-button type="primary">预览</el-button>
              <el-button type="primary" @click="saveAdd">保存</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-row type="flex">
            <el-col :span="6" class="bor_box" style="padding: 10px 20px;">
              <el-row>
                <el-form ref="addForm" :model="addForm" class="form_box">
                  <el-form-item label="所属文件：" v-if="typeTitle === '新增'">
                    <el-select
                      v-model="addtypename"
                      placeholder="请选择"
                      ref="selectAdd"
                      clearable
                      @clear="clearable"
                      style="width: 100%;"
                      :popper-append-to-body="false"
                    >
                      <el-option :value="addTypeList" style="height: auto">
                        <el-tree
                          node-key="id"
                          ref="treeAdd"
                          :data="addTypeList"
                          :props="defaultProps"
                          highlight-current
                          @node-click="nodeClick"
                        ></el-tree>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="名称：">
                    <el-input v-model="addForm.addName"></el-input>
                  </el-form-item>
                  <el-form-item label="控件类型：">
                    <el-col>
                      <div v-for="(item,index) in elementData" :key="index" style="text-align: center;margin-bottom: 10px;" @click="checkElement(item)">
                        <p class="namebox" :class="{boxCheck: item.value === addForm.addType}">
                          {{item.name}}
                        </p>
                      </div>
                    </el-col>
                  </el-form-item>
                </el-form>
              </el-row>
              
            </el-col>
            <el-col :span="8" class="bor_box" style="padding: 10px 20px;">
              <div>
                <div v-if="addForm.addType === 'text'">
                  <!-- <p v-if="checkObj.showTitle">{{checkObj.titleValue}}</p>
                  <div>
                    <el-input v-model="checkObj.defaultValue" 
                      :placeholder="checkObj.placeholder" 
                      :readonly="checkObj.status === 'onlyread'">
                    </el-input>
                  </div> -->
                  <p>标题</p>
                  <div>
                    <el-input v-model="inputValue" placeholder="请输入" readonly></el-input>
                  </div>
                </div>
                <div v-if="addForm.addType === 'area'">
                  <p>内容</p>
                  <div>
                    <el-input type="textarea" v-model="inputValue" readonly :rows="2" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                <div v-if="addForm.addType === 'select'">
                  <p>下拉框</p>
                  <div>
                    <el-select v-model="inputValue" placeholder="请选择">
                      <el-option value="1">数值一</el-option>
                      <el-option value="2">数值一</el-option>
                      <el-option value="3">数值一</el-option>
                    </el-select>
                  </div>
                </div>
                <div v-if="addForm.addType === 'label'">
                  <p>标签</p>
                  <div>
                    <el-select v-model="inputValue" multiple placeholder="请选择">
                      <el-option value="1">标签1</el-option>
                      <el-option value="2">标签2</el-option>
                      <el-option value="3">标签3</el-option>
                    </el-select>
                  </div>
                </div>
                <div v-if="addForm.addType === 'number'">
                  <p>数字输入框</p>
                  <div>
                    <el-input-number v-model="inputValue" :min="1" :max="10"></el-input-number>
                  </div>
                </div>
                <div v-if="addForm.addType === 'time'">
                  <p>日期</p>
                  <div>
                    <el-date-picker
                      type="date"
                      v-model="inputValue"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
                <div v-if="addForm.addType === 'radio'">
                  <p>单选</p>
                  <div>
                    <el-radio-group v-model="inputValue">
                      <el-radio>备选项</el-radio>
                      <el-radio>备选项</el-radio>
                      <el-radio>备选项</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div v-if="addForm.addType === 'checkbox'">
                  <p>多选</p>
                  <div>
                    <el-checkbox-group v-model="inputValue"> 
                      <el-checkbox>选项1</el-checkbox>
                      <el-checkbox>选项2</el-checkbox>
                      <el-checkbox>选项3</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div v-if="addForm.addType === 'cascader'">
                  <p>级联选择器</p>
                  <div>
                    <el-cascader :options="options" v-model="inputValue"></el-cascader>
                  </div>
                </div>
                
              </div>
            </el-col>
            <el-col :span="10" class="bor_box">
              <div>
                <el-collapse v-model="panelValue" v-if="addForm.addType">
                  <el-collapse-item title="基本配置" name="name">
                    <div v-if="addForm.addType === 'text'" style="padding: 10px 20px;">
                      <el-row>
                        <el-col class="col_bottom">
                          <el-checkbox v-model="checkObj.showTitle">显示标题</el-checkbox>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">标题</el-col>
                          <el-col :span="18">
                            <el-input v-model="checkObj.titleValue" placeholder="请输入"></el-input>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">表文字字段名称</el-col>
                          <el-col :span="18">
                            <el-col>
                              <el-input v-model="checkObj.tableFieldName" placeholder="请输入"></el-input>
                            </el-col>
                            <el-col>
                              <span>表字段名称必须以字母开头，支持字母、数字、下划线，最大长度为40个字符</span>
                            </el-col>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">提示文字</el-col>
                          <el-col :span="18">
                            <el-input v-model="checkObj.placeholder" placeholder="请输入"></el-input>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">描述信息</el-col>
                          <el-col :span="18">
                            <el-input type="textarea" v-model="checkObj.desc" placeholder="多行输入"></el-input>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">默认状态</el-col>
                          <el-col :span="18">
                            <el-radio-group v-model="checkObj.status">
                              <el-radio label="ordinary">普通</el-radio>
                              <el-radio label="onlyread">只读</el-radio>
                              <!-- <el-radio label="hiden">隐藏</el-radio> -->
                            </el-radio-group>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">默认值</el-col>
                          <el-col :span="18">
                            <el-input v-model="checkObj.defaultValue" placeholder="请输入"></el-input>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-checkbox v-model="checkObj.isLoginName">使用登录用户名</el-checkbox>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="addForm.addType === 'area'" style="padding: 10px 20px;">
                      <el-row>
                        <el-col class="col_bottom">
                          <el-collapse v-model="areaValue">
                            <el-collapse-item title="校验" name="check">
                              <el-col style="margin-left: 20px;">
                                <el-checkbox-group v-model="checkObj.checkList">
                                  <el-checkbox label="must">必须</el-checkbox>
                                  <el-checkbox label="min">最小长度</el-checkbox>
                                  <el-checkbox label="max">最大长度</el-checkbox>
                                </el-checkbox-group>
                              </el-col>
                            </el-collapse-item>
                            <el-collapse-item title="样式" name="style">
                              <el-col style="margin-left: 20px;">
                                <el-col :span="6">
                                  最大宽度
                                </el-col>
                                <el-col :span="18">
                                  <el-radio-group v-model="checkObj.styleValue" style="width: 100%">
                                    <el-col :span="12">
                                      <el-radio label="440">440px</el-radio>
                                    </el-col>
                                    <el-col :span="12">
                                      <el-radio label="isometric">等比</el-radio>
                                    </el-col>
                                  </el-radio-group>
                                </el-col>
                              </el-col>
                            </el-collapse-item>
                          </el-collapse>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="addForm.addType === 'select'" style="padding: 10px 20px;">
                      <el-row>
                        <el-col class="col_bottom">
                          <el-col :span="6">来源于</el-col>
                          <el-col :span="18">
                            <el-select v-model="checkObj.sourceBy">
                              <el-option value="sourceCustom" label="自定义数据"></el-option>
                              <el-option value="sourceData" label="数据源"></el-option>
                            </el-select>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceCustom'">
                          <el-col class="col_bottom">
                            <el-checkbox v-model="checkObj.customId">自定义数据ID值</el-checkbox>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">标题</el-col>
                            <el-col :span="18">
                              <el-input v-model="checkObj.titleValue" placeholder="请输入"></el-input>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据字段名</el-col>
                            <el-col :span="18">
                              <el-input v-model="checkObj.dataFieldName" placeholder="请输入"></el-input>
                            </el-col>
                            <el-col :span="18" :offset="6" style="font-size: 10px;">
                              表字段名称必须以字母开头，支持字母、数字、下划线，最大长度为40个字符
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col style="text-align: center;">
                              <el-col :span="10">选项展示名称</el-col>
                              <el-col :span="12" :offset="2">关键字段ID值</el-col>
                            </el-col>
                            <el-col v-for="(item,index) in checkObj.optionData" :key="index" class="col_bottom">
                              <el-col :span="10">
                                <el-input v-model="item.optionValue" placeholder="请输入"></el-input>
                              </el-col>
                              <el-col :span="10" :offset="2">
                                <el-input v-model="item.relationId" placeholder="请输入"></el-input>
                              </el-col>
                              <el-col :span="2" style="text-align: center;">
                                <i class="el-icon-delete-solid" @click="clickDel(index)"></i>
                              </el-col>
                            </el-col>
                            <el-col :span="22">
                              <p class="add_p" @click="clickAdd">
                                <i class="el-icon-plus"></i>
                              </p>
                            </el-col>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceData'">
                          <el-col class="col_bottom">
                            <el-col :span="6">数据源</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataSource">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据表</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataTable">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据字段</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataField">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">默认值</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.defualtValue">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="addForm.addType === 'label'" style="padding: 10px 20px;">
                      <el-row>
                        <el-col class="col_bottom">
                          <el-col :span="6">来源于</el-col>
                          <el-col :span="18">
                            <el-select v-model="checkObj.sourceBy">
                              <el-option value="sourceCustom" label="自定义数据"></el-option>
                              <el-option value="sourceData" label="数据源"></el-option>
                            </el-select>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceCustom'">
                          <el-col v-for="(item,index) in checkObj.labelData" :key="index" class="col_bottom">
                            <el-col :span="14">
                              <el-input v-model="item.labelValue" placeholder="请输入"></el-input>
                            </el-col>
                            <el-col :span="2" style="text-align: center;">
                              <i class="el-icon-delete-solid" @click="labelDel(index)"></i>
                            </el-col>
                          </el-col>
                          <el-col :span="16">
                            <p class="add_p" @click="labelAdd">
                              <i class="el-icon-plus"></i>
                            </p>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceData'">
                          <el-col class="col_bottom">
                            <el-col :span="6">数据源</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataSource">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据表</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataTable">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据字段</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataField">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">默认值</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.defualtValue">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="addForm.addType === 'number'" style="padding: 10px 20px;">
                      <el-row>
                        <el-col class="col_bottom">
                          <el-checkbox v-model="checkObj.showTitle">显示标题</el-checkbox>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">表字段名称</el-col>
                          <el-col :span="18">
                            <el-input v-model="checkObj.tableFieldName" placeholder="请输入"></el-input>
                          </el-col>
                          <el-col :span="18" :offset="6" style="font-size: 10px;">
                            表字段名称必须以字母开头，支持字母、数字、下划线，最大长度为40个字符
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">提示文字</el-col>
                          <el-col :span="18">
                            <el-input v-model="checkObj.placeholder" placeholder="请输入"></el-input>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">描述信息</el-col>
                          <el-col :span="18">
                            <el-input type="textarea" v-model="checkObj.desc" placeholder="请输入"></el-input>
                          </el-col>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="addForm.addType === 'time'" style="padding: 10px 20px;">
                      <el-row>
                        <el-col class="col_bottom">
                          <el-checkbox v-model="checkObj.showTitle">显示标题</el-checkbox>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">表字段名称</el-col>
                          <el-col :span="18">
                            <el-input v-model="checkObj.tableFieldName" placeholder="请输入"></el-input>
                          </el-col>
                          <el-col :span="18" :offset="6" style="font-size: 10px;">
                            表字段名称必须以字母开头，支持字母、数字、下划线，最大长度为40个字符
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">提示文字</el-col>
                          <el-col :span="18">
                            <el-input v-model="checkObj.placeholder" placeholder="请输入"></el-input>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">描述信息</el-col>
                          <el-col :span="18">
                            <el-input type="textarea" v-model="checkObj.desc" placeholder="请输入"></el-input>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">默认状态</el-col>
                          <el-col :span="18">
                            <el-radio-group v-model="checkObj.status">
                              <el-radio label="ordinary">普通</el-radio>
                              <el-radio label="onlyread">只读</el-radio>
                              <el-radio label="hiden">隐藏</el-radio>
                            </el-radio-group>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">默认值</el-col>
                          <el-col :span="18">
                            <el-input v-model="checkObj.defaultValue" placeholder="请输入"></el-input>
                          </el-col>
                        </el-col>
                        <el-col class="col_bottom">
                          <el-col :span="6">格式</el-col>
                          <el-col :span="18">
                            <el-select v-model="checkObj.formatValue">
                              <el-option label="年-月-日" value="yyyy-MM-dd"></el-option>
                              <el-option label="年" value="yyyy"></el-option>
                              <el-option label="年-季度" value="yyyy-Q"></el-option>
                              <el-option label="年-月年-周" value="yyyy-MM-yyyy-w"></el-option>
                              <el-option label="年-月-日 时:分:秒" value="yyyy-MM-dd HH:mm:ss"></el-option>
                            </el-select>
                          </el-col>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="addForm.addType === 'radio'" style="padding: 10px 20px;">
                      <el-row>
                        <el-col class="col_bottom">
                          <el-col :span="6">来源于</el-col>
                          <el-col :span="18">
                            <el-select v-model="checkObj.sourceBy">
                              <el-option value="sourceCustom" label="自定义数据"></el-option>
                              <el-option value="sourceData" label="数据源"></el-option>
                            </el-select>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceCustom'">
                          <el-col  class="col_bottom">
                            <el-checkbox v-model="checkObj.selfRelationId">自动关联字段ID值</el-checkbox>
                          </el-col>
                          <el-col v-for="(item,index) in checkObj.radioData" :key="index" class="col_bottom">
                            <el-col :span="14">
                              <el-input v-model="item.radioValue" placeholder="请输入"></el-input>
                            </el-col>
                            <el-col :span="2" style="text-align: center;">
                              <i class="el-icon-delete-solid" @click="radioDel(index)"></i>
                            </el-col>
                          </el-col>
                          <el-col :span="16">
                            <p class="add_p" @click="radioAdd">
                              <i class="el-icon-plus"></i>
                            </p>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceData'">
                          <el-col class="col_bottom">
                            <el-col :span="6">数据源</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataSource">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据表</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataTable">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据字段</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataField">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">默认值</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.defualtValue">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="addForm.addType === 'checkbox'" style="padding: 10px 20px;">
                      <el-row>
                        <el-col class="col_bottom">
                          <el-col :span="6">来源于</el-col>
                          <el-col :span="18">
                            <el-select v-model="checkObj.sourceBy">
                              <el-option value="sourceCustom" label="自定义数据"></el-option>
                              <el-option value="sourceData" label="数据源"></el-option>
                            </el-select>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceCustom'">
                          <el-col  class="col_bottom">
                            <el-checkbox v-model="checkObj.selfRelationId">自动关联字段ID值</el-checkbox>
                          </el-col>
                          <el-col v-for="(item,index) in checkObj.checkBoxData" :key="index" class="col_bottom">
                            <el-col :span="14">
                              <el-input v-model="item.checkBoxValue" placeholder="请输入"></el-input>
                            </el-col>
                            <el-col :span="2" style="text-align: center;">
                              <i class="el-icon-delete-solid" @click="checkDel(index)"></i>
                            </el-col>
                          </el-col>
                          <el-col :span="16">
                            <p class="add_p" @click="checkAdd">
                              <i class="el-icon-plus"></i>
                            </p>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceData'">
                          <el-col class="col_bottom">
                            <el-col :span="6">数据源</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataSource">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据表</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataTable">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据字段</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataField">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">默认值</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.defualtValue">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="addForm.addType === 'cascader'" style="padding: 10px 20px;">
                      <el-row>
                        <el-col class="col_bottom">
                          <el-col :span="6">来源于</el-col>
                          <el-col :span="18">
                            <el-select v-model="checkObj.sourceBy">
                              <el-option value="sourceCustom" label="自定义数据"></el-option>
                              <el-option value="sourceData" label="数据源"></el-option>
                            </el-select>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceCustom'">
                          <el-col class="col_bottom">
                            <el-checkbox v-model="checkObj.customId">自定义数据ID值</el-checkbox>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">标题</el-col>
                            <el-col :span="18">
                              <el-input v-model="checkObj.titleValue" placeholder="请输入"></el-input>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">标题</el-col>
                            <el-col :span="18">
                              <el-input v-model="checkObj.dataFieldName" placeholder="请输入"></el-input>
                            </el-col>
                            <el-col :span="18" :offset="6" style="font-size: 10px;">
                              表字段名称必须以字母开头，支持字母、数字、下划线，最大长度为40个字符
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col style="text-align: center;">
                              <el-col :span="10">选项展示名称</el-col>
                              <el-col :span="12" :offset="2">关键字段ID值</el-col>
                            </el-col>
                            <el-col v-for="(item,index) in checkObj.cascaderData" :key="index" class="col_bottom">
                              <el-col :span="10">
                                <el-input v-model="item.cascaderValue" placeholder="请输入"></el-input>
                              </el-col>
                              <el-col :span="10" :offset="2">
                                <el-input v-model="item.relationId" placeholder="请输入"></el-input>
                              </el-col>
                              <el-col :span="2" style="text-align: center;">
                                <i class="el-icon-delete-solid" @click="cascaderDel(index)"></i>
                              </el-col>
                            </el-col>
                            <el-col :span="22">
                              <p class="add_p" @click="cascaderAdd">
                                <i class="el-icon-plus"></i>
                              </p>
                            </el-col>
                          </el-col>
                        </el-col>
                        <el-col v-if="checkObj.sourceBy === 'sourceData'">
                          <el-col class="col_bottom">
                            <el-col :span="6">数据源</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataSource">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据表</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataTable">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                          <el-col class="col_bottom">
                            <el-col :span="6">数据字段</el-col>
                            <el-col :span="18">
                              <el-select v-model="checkObj.dataField" multiple>
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                              </el-select>
                            </el-col>
                          </el-col>
                        </el-col>
                      </el-row>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <div v-if="panelType === 'manage'">

    </div>
    <el-dialog
      :title="typeTitle"
      :visible.sync="visibleType"
      :close-on-click-modal="false"
      width="30%"
      :before-close="onCancel">
      <div>
        <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" ></el-input>
          </el-form-item>
        </el-form>
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSuccess">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog
      title="移动"
      :visible.sync="visibleMove"
      :close-on-click-modal="false"
      width="30%"
      :before-close="onMoveCancel"
    >
      <div>
        <el-row>
          <el-col>
            <el-tree
              node-key="id"
              ref="treeAdd"
              :data="addTypeList"
              :props="defaultProps"
              highlight-current
              @node-click="nodeMoveClick"
            ></el-tree>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onMoveCancel">取 消</el-button>
        <el-button type="primary" @click="onMoveSuccess">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LayoutContent from '@/components/business/LayoutContent'
import { mapState } from 'vuex'

export default {
  components: {LayoutContent},
  data() {
    return {
      panelType: 'list',
      searchValue: '',
      formData: {
        name: '',
      },
      addForm: {
        pid: null,
        addName: '',
        addType: '',
      },
      updateForm: {},
      defaultProps: {
        id: 'id',
        label: 'name',
        children: 'children'
      },
      addTypeList: [],
      addtypename: '',
      tableData: [],
      indent: 16,
      checkedAll: false,

      visibleType: false,
      visibleMove: false,
      moveObj: {}, // 移动对象
      moveInObj: {}, // 移动到对象
      typeTitle: '',
      rules:{
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },

      elementData: [
        {name: '文本框',value: 'text'},
        {name: '文本域',value: 'area'},
        {name: '下拉框',value: 'select'},
        {name: '标签',value: 'label'},
        {name: '数字输入框',value: 'number'},
        {name: '日期',value: 'time'},
        {name: '单选框',value: 'radio'},
        {name: '多选框',value: 'checkbox'},
        {name: '级联选择器',value: 'cascader'},
      ],
      panelValue: 'name',
      areaValue: '',
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }
      ],
      inputValue: null,
      checkData: {
        'text': {
          showTitle: true,
          titleValue: '',
          tableFieldName: '',
          placeholder: '',
          desc: '',
          status: 'ordinary',
          defaultValue: '',
          isLoginName: false,
        },
        'area': {
          checkList: [],
          styleValue: '',
        },
        'select': {
          sourceBy: 'sourceCustom',
          customId: false,
          titleValue: '',
          dataFieldName: '',
          optionData: [],
          dataSource: '',
          dataTable: '',
          dataField: '',
          defualtValue: '',
        },
        'label': {
          sourceBy: 'sourceCustom',
          labelData: [],
          dataSource: '',
          dataTable: '',
          dataField: '',
          defualtValue: '',
        },
        'number': {
          showTitle: false,
          tableFieldName: '',
          placeholder: '',
          desc: '',
        },
        'time': {
          showTitle: false,
          tableFieldName: '',
          placeholder: '',
          desc: '',
          status: 'ordinary',
          defaultValue: '',
          formatValue: '',
        },
        'radio': {
          sourceBy: 'sourceCustom',
          selfRelationId: false,
          radioData: [],
          dataSource: '',
          dataTable: '',
          dataField: '',
          defualtValue: '',
        },
        'checkbox': {
          sourceBy: 'sourceCustom',
          selfRelationId: false,
          checkBoxData: [],
          dataSource: '',
          dataTable: '',
          dataField: '',
          defualtValue: '',
        },
        'cascader': {
          sourceBy: 'sourceCustom',
          selfRelationId: false,
          titleValue: '',
          dataFieldName: '',
          cascaderData: [],
          dataSource: '',
          dataTable: '',
          dataField: [],
        },
      },
      checkObj: {},
      addId: 16,
    }
  },
  computed:{
    ...mapState([
      'fillNumber'
    ])
  },
  filters: {
    // dateFormat(date) {
    //   if(!date || new Date(date) === 'Invalid Date') return
    //   let time = new Date(date)
    //   let year = time.getFullYear()
    //   let mon = time.getMonth()+1<10? '0'+ time.getMonth() : time.getMonth()
    //   let day = time.getDate()<10? '0'+ time.getDate() : time.getDate()
    //   let h = time.getHours()<10? '0' + time.getHours() : time.getHours()
    //   let m = time.getMinutes()<10? '0' + time.getMinutes() : time.getMinutes()
    //   let s = time.getSeconds()<10? '0' + time.getSeconds() : time.getSeconds()

    //   return year +'-'+ mon +'-'+ day + ' '+ h +':'+ m +':'+ s
    // },
  },
  mounted() {
    this.addId = this.fillNumber
    this.init()
  },
  methods: {
    init() {
      console.log('初始111')
      this.axios.get('/system/data/fill/table/list').then(res => {
        // console.log('数据，，',res)
        if(res.status === 200) {
          this.tableData = res.data.list
        }
      })
      // getTableList().then(res => {
      //   console.log('数据',res)
      // })
    },
    searchList() {
      console.log(this.searchValue)
      if(!this.searchValue || !this.searchValue.replace(/\s/g,'')) return this.init()
      this.axios.post('/system/data/fill/table/search',this.searchValue).then(res => {
        // console.log('查询',res)
        if(res.status === 200) {
          this.tableData =  res.data.list
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    typeClick(data) {
      console.log('数据',data)
      this.visibleType = true
      this.typeTitle = '新增'
      if(data && data.id) {
        this.formData.pid = data.id
      }
    },
    // 修改点击
    revise(data) {
      console.log('点击',data)
      this.typeTitle = '修改'
      if(data.type === 1) {
        this.visibleType = true
        this.formData = data
      } else if (data.type ===2) {
        this.updateForm = data
        this.addForm.addName = data.name
        this.addForm.addType = data.addType
        this.checkObj = data.checkObj
        this.panelType = 'add'
        // this.searchTypes()
      }
      
    },
    // 删除
    deleteClick(data) {
      // console.log('删除，，',data)
      this.$confirm('是否删除此文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.axios.post('/system/data/fill/table/delete',{id: data.id}).then(res => {
            // console.log('ressssssss',res)
            if(res.status === 200) {
              this.tableData = res.data.list
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {});
    },
    // 分类新增和修改
    onSuccess() {
      // console.log('提交，，，',this.formData)
      if(this.typeTitle === '新增') {
        let obj = {
          id: this.addId,
          name: this.formData.name,
          createdBy: this.$store.getters.name,
          updateBy: '',
          updateTime: '',
          type: 1,
          children: [],
        }
        if(this.formData.pid!== undefined) {
          obj.pid = this.formData.pid
        }
        this.axios.post('/system/data/fill/table/add',obj).then(res => {
          if(res.status === 200) {
            this.$message.success('新增成功')
            this.tableData = res.data.list
            this.visibleType = false
            this.formData = {name: ''}
            this.addId += 1
            this.$store.commit('setFillNumber',this.addId)
          }
        }).catch(err => { this.$message.error('新增失败') })
      } else if(this.typeTitle === '修改') {
        let obj = {
          id: this.formData.id,
          name: this.formData.name,
          createdBy: this.formData.createdBy,
          updateBy: this.$store.getters.name,
          updateTime: this.dateFormat(new Date()),
          type: this.formData.type,
          children: this.formData.children
        }
        if(this.formData.pid!== undefined) {
          obj.pid = this.formData.pid
        }
        this.axios.post('/system/data/fill/table/update',obj).then(res => {
            // console.log('数据，，',res.data.list)
          if(res.status === 200) {
            this.$message.success('修改成功')
            this.tableData = res.data.list
            this.visibleType = false
            this.formData = {name: ''}
          }
        })
      }
    },
    onCancel() {
      this.visibleType = false
      this.formData = {name: ''}
      this.init()
    },
    // 移动
    moveClick(data) {
      console.log('移动',data)
      this.visibleMove = true
      this.moveObj = data  // 移动的对象
      this.searchTypes(data)
    },
    nodeMoveClick(data) {
      this.moveInObj = data // 移动的父类
    },
    onMoveSuccess() {
      if(!this.moveInObj.id) return
      console.log(this.moveObj,this.moveInObj)
      let obj = {
        ...this.moveObj,
        pid: this.moveInObj.id,
      }
      // console.log('oooooo',obj)
      this.axios.post('/system/data/fill/table/move',obj).then(res => {
        // console.log('移动数据',res)
        if(res.status === 200) {
          this.$message.success('移动成功')
          this.tableData = res.data.list
          this.visibleMove = false
        }
      })
    },
    onMoveCancel(){
      this.visibleMove =false
      this.moveObj = {}
      this.moveInObj = {}
    },
    dateFormat(date) {
      let time = new Date(date)
      let year = time.getFullYear()
      let mon = time.getMonth()+1<10? '0'+ time.getMonth() : time.getMonth()
      let day = time.getDate()<10? '0'+ time.getDate() : time.getDate()
      let h = time.getHours()<10? '0' + time.getHours() : time.getHours()
      let m = time.getMinutes()<10? '0' + time.getMinutes() : time.getMinutes()
      let s = time.getSeconds()<10? '0' + time.getSeconds() : time.getSeconds()

      return year +'-'+ mon +'-'+ day + ' '+ h +':'+ m +':'+ s
    },
    //展示数据填报编辑页
    fillClick(data) {
      console.log('点击',data)
      if(data && data.id) {
        this.addtypename = data.name
        this.addForm.pid = data.id
      }
      this.typeTitle = '新增'
      this.searchTypes()
      this.panelType = 'add'
    },
    // 查询类型
    searchTypes(data){
      let obj = {id: ''}
      if(data) { // 用于去除当前所在文件id
        if(!data.pid) {
          obj.id = data.id
        } else {
          obj.id = data.pid
        }
      }
      this.axios.post('/system/data/fill/add/search',obj).then(res => {
        // console.log('数据1111',res)
        if(res.status === 200) {
          this.addTypeList = res.data.list
        }
      })
    },
    // 属性设置
    attributeClick(data) {
      console.log('属性',data)
    },
    dataManage(data){
      console.log('数据管理',data)
    },
    // 返回
    goback() {
      this.panelType = 'list'
      this.inputValue = null
      this.checkObj = {}
      this.addForm = {
        pid: null,
        addName: '',
        addType: '',
      }
      this.addtypename = ''
      this.updateForm = {}
    },
    // 保存
    saveAdd() {
      // console.log('保存',this.checkObj,this.addForm,this.updateForm)
      if(this.typeTitle === '新增') {
        let obj = {
          pid: this.addForm.pid,
          id: this.addId,
          name: this.addForm.addName,
          createdBy: this.$store.getters.name,
          updateBy: '',
          updateTime: '',
          type:  2,
          addType: this.addForm.addType,
          checkObj: {
            ...this.checkObj
          }
        }
        console.log('objjjjjjjjjjjjjjj',obj)
        this.axios.post('/system/data/fill/table/add',obj).then(res => {
          console.log('数据',res)
          if(res.status === 200) {
            this.$message.success('新增成功')
            this.tableData = res.data.list
            this.goback()
            this.addId += 1
            this.$store.commit('setFillNumber',this.addId)
          }
        })
      } else if(this.typeTitle === '修改') {
        let obj = {
          pid: this.addForm.pid,
          id: this.updateForm.id,
          name: this.addForm.addName,
          createdBy: this.updateForm.createdBy,
          updateBy: this.$store.getters.name,
          updateTime: this.dateFormat(new Date()),
          type: this.updateForm.type,
          addType: this.addForm.addType,
          checkObj: this.checkObj,
        }
        console.log('xxxxxxxx',obj)
        this.axios.post('/system/data/fill/table/update',obj).then(res => {
            // console.log('数据，，',res.data.list)
          if(res.status === 200) {
            this.$message.success('修改成功')
            this.tableData = res.data.list
            this.goback()
          }
        })
        
      }
      
    },
    // 树点击赋值
    nodeClick(data) {
      // console.log(data)
      this.addForm.pid = data.id
      this.addtypename = data.name
      this.$refs.selectAdd.blur();
    },
    // 清空树选择
    clearable() {
      console.log('1111111')
      this.addForm.pid = null
    },
    checkElement(data) {
      this.addForm.addType = data.value

      this.inputValue = null

      this.checkObj = this.checkData[data.value]
      console.log('checkObj',this.checkObj)
    },
    clickDel(index) {
      if(this.checkObj.optionData) {
        this.checkObj.optionData.splice(index,1)
      }
    },
    clickAdd() {
      if(this.checkObj.optionData) {
        this.checkObj.optionData.push({optionValue: '',relationId: ''})
      }
    },
    labelDel(index) {
      if(this.checkObj.labelData) {
        this.checkObj.labelData.splice(index,1)
      }
    },
    labelAdd() {
      if(this.checkObj.labelData) {
        this.checkObj.labelData.push({labelValue: ''})
      }
    },
    radioDel(index) {
      if(this.checkObj.radioData) {
        this.checkObj.radioData.splice(index,1)
      }
    },
    radioAdd() {
      if(this.checkObj.radioData) {
        this.checkObj.radioData.push({radioValue: ''})
      }
    },
    checkDel(index) {
      if(this.checkObj.checkBoxData) {
        this.checkObj.checkBoxData.splice(index,1)
      }
    },
    checkAdd() {
      if(this.checkObj.checkBoxData) {
        this.checkObj.checkBoxData.push({checkBoxValue: ''})
      }
    },
    cascaderDel(index) {
      if(this.checkObj.cascaderData) {
        this.checkObj.cascaderData.splice(index,1)
      }
    },
    cascaderAdd() {
      if(this.checkObj.cascaderData) {
        this.checkObj.cascaderData.push({cascaderValue: '',relationId: ''})
      }
    }
  }
}
</script>

<style scoped>
.form_box ::v-deep .el-select-dropdown__item {
  padding: 0px;
}
.main_box ::v-deep .el-popover {
  min-width: 90px;
}
::v-deep .main_panel .el-main {
  padding: 0px;
}
.bor_box {
  border: 1px solid #cccccc;
  min-height: 500px;
}

.namebox {
  border: 1px solid #C0C4CC;
  border-radius: 3px;
}
.namebox:hover {
  border: 1px solid #409EFF;
}
.boxCheck {
  border: 1px solid #409EFF;
  background-color: #409EFF;
  color: #ffffff;
}

.col_bottom {
  margin-bottom: 10px;
}
.add_p {
  text-align: center;
  border: 1px solid #eeeeee;
}
</style>