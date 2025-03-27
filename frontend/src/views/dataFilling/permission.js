

export function hasPermission(privileges, type) {
  if(!privileges) return false
  let permissionList = privileges.split(',')
  // 创建文件夹
  if(type === 'create_folder') {
    return hasCreateFolderP(permissionList)
  } else if(type === 'delete') {
    return hasDeleteP(permissionList)
  } else if(type === 'create_form' || type === 'create_template') {
    // 创建表单 模板
    return hasCreateFormTemplateP(permissionList)
  } else if(type === 'self_report') {
    // 此文件下是否可以进行自主填报
    return hasSelfReportP(permissionList)
  } else if(type === 'read' || type === 'template_read') {
    // 查看当前表单填报、自主填报及操作日志   模板库 查看此模板及使用此模板创建表单
    return hasReadP(permissionList)
  } else if(type === 'update_folder' || type === 'form_update' || type === 'self_report_update' || type === 'template_update') {
    // 编辑文件夹  编辑表单填报  编辑当前自主填报  编辑模板库模板
    return hasUpdateP(permissionList)
  } else if(type === 'form_filling') {
    // 此文件下是否可以进行表单填报
    return hasFormFillingP(permissionList)
  } else if(type === 'form_read_data') {
    // 查看此表单填报数据以及填写记录
    return hasFormFillingP(permissionList)
  } else if(type === 'export') {
    // 下载表单填报数据 自主填报数据
    return hasExportP(permissionList)
  } else if(type === 'form_write') {
    // 表单填报添加数据
    return hasWriteP(permissionList)
  } 
}

// 删除
function hasDeleteP(permissionList) {
  return permissionList.findIndex(item => item === 'manage') !== -1
}
function hasReadP(permissionList) {
  return permissionList.findIndex(item => item === 'read') !== -1
}
function hasUpdateP(permissionList) {
  return permissionList.findIndex(item => item === 'update') !== -1
}
function hasWriteP(permissionList) {
  return permissionList.findIndex(item => item === 'write') !== -1
}
// 文件夹
function hasCreateFolderP(permissionList) {
  return permissionList.findIndex(item => item === 'create') !== -1
}

// 创建表单 模板
function hasCreateFormTemplateP(permissionList) {
  return permissionList.findIndex(item => item === 'create_t') !== -1
}
// 自主填报
function hasSelfReportP(permissionList) {
  return permissionList.findIndex(item => item === 'write') !== -1
}

// 表单填报
function hasFormFillingP(permissionList) {
  return permissionList.findIndex(item => item === 'write') !== -1
}
// 下载数据
function hasExportP(permissionList) {
  return permissionList.findIndex(item => item === 'export') !== -1
}