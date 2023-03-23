const Mock = require('mockjs')

// 数据填报
var treeData = [
    {
        id: 1,
        name: '测试1',
        createdBy: '张三',
        updateBy: '张三',
        updateTime: '2023-02-28 14:18:34',
        type: 1,
        children: [],
    },
    {
        id: 2,
        name: '测试2',
        createdBy: '李四',
        updateBy: '李四',
        updateTime: '2023-03-01 14:22:34',
        type: 1,
        children: [
            {
                id: 3,
                pid: 2,
                name: '测试2-1',
                createdBy: '李四',
                updateBy: '李四',
                updateTime: '2023-03-01 14:24:34',
                type: 2,
                checkObjs: [
                    {   
                        addType: 'text',
                        showTitle: true,
                        titleValue: '姓名',
                        tableFieldName: 'sname',
                        placeholder: '请输入姓名',
                        desc: '测试111',
                        status: 'ordinary',
                        defaultValue: '',
                        isLoginName: false,
                    },
                    {   
                        addType: 'text',
                        showTitle: true,
                        titleValue: '学号',
                        tableFieldName: 'sid',
                        placeholder: '请输入学号',
                        desc: '测试222',
                        status: 'ordinary',
                        defaultValue: '',
                        isLoginName: false,
                    },
                    {   
                        addType: 'text',
                        showTitle: true,
                        titleValue: '班级',
                        tableFieldName: 'sclass',
                        placeholder: '请输入班级名称',
                        desc: '测试333',
                        status: 'ordinary',
                        defaultValue: '',
                        isLoginName: false,
                    },
                    {   
                        addType: 'number',
                        showTitle: true,
                        titleValue: '年龄',
                        tableFieldName: 'sage',
                        placeholder: '请输入年龄',
                        desc: '测试444',
                        minValue: 10,
                        maxValue: 20,
                        stepValue: 1,
                        defaultValue: 10,
                    },
                ],
                ownerList: ['001','002','003'], // 所有者
                describe: '李四测试一一一',
                dataManage: {
                    personData: [],
                }
            },
            {
                id: 4,
                pid: 2,
                name: '测试2-2',
                createdBy: '李四',
                updateBy: '李四',
                updateTime: '2023-03-01 14:26:34',
                type: 2,
                checkObjs: [],
                ownerList: ['002'], // 所有者
                describe: '李四测试ererer一',
                dataManage: {
                    personData: []
                }
            },
            {
                id: 5,
                pid: 2,
                name: '测试2-3',
                createdBy: '李四',
                updateBy: '李四',
                updateTime: '2023-03-01 14:27:34',
                type: 2,
                
                checkObjs: [],
                ownerList: ['002','003'], // 所有者
                describe: '李四测试一ssssabs一',
                dataManage: {
                    personData: []
                }
            }
        ],
    },
    {
        id: 6,
        name: '测试3',
        createdBy: '王五',
        updateBy: '王五',
        updateTime: '2023-03-02 14:13:34',
        type: 1,
        children: [
            {
                id: 7,
                pid: 6,
                name: '测试3-1',
                createdBy: '王五',
                updateBy: '王五',
                updateTime: '2023-03-02 14:14:34',
                type: 2, 
                checkObjs: [],
                ownerList: ['002','003'], // 所有者
                describe: '王五测11试一一一',
                dataManage: {
                    personData: []
                }
            }
        ],
    },
    {
        id: 8,
        name: '测试4',
        createdBy: '赵六',
        updateBy: '赵六',
        updateTime: '2023-03-03 14:18:34',
        type: 1,
        children: [
            {
                id: 9,
                pid: 8,
                name: '测试4-1',
                createdBy: '赵六',
                updateBy: '赵六',
                updateTime: '2023-03-03 14:20:34',
                type: 2,
                checkObjs: [],
                ownerList: ['002','003'], // 所有者
                describe: '54测11试一一一',
                dataManage: {
                    personData: []
                }
            }
        ],
    },
    {
        id: 10,
        name: '测试5',
        createdBy: '陈七',
        updateBy: '陈七',
        updateTime: '2023-03-03 14:18:34',
        type: 1,
        children: [
            {
                id: 11,
                pid: 10,
                name: '测试5-1',
                createdBy: '陈七',
                updateBy: '陈七',
                updateTime: '2023-03-03 14:22:34',
                type: 2,
                checkObjs: [],
                ownerList: ['002','003'], // 所有者
                describe: '43qaa测11试一一一',
                dataManage: {
                    personData: []
                }
            }
        ],
    },
    {
        id: 12,
        name: '测试6',
        createdBy: '刘八',
        updateBy: '刘八',
        updateTime: '2023-03-04 14:18:34',
        type: 1,
        children: [
            {
                id: 13,
                pid: 12,
                name: '测试6-1',
                createdBy: '刘八',
                updateBy: '刘八',
                updateTime: '2023-03-04 14:22:34',
                type: 2,
                checkObjs: [],
                ownerList: ['002','003'], // 所有者
                describe: '12测11试一一一',
                dataManage: {
                    personData: []
                }
            }
        ],
    },
    {
        id: 14,
        name: '测试7',
        createdBy: '刁九',
        updateBy: '刁九',
        updateTime: '2023-03-05 14:18:34',
        type: 1,
        children: [
            {
                id: 15,
                pid: 14,
                name: '测试7-1',
                createdBy: '刁九',
                updateBy: '刁九',
                updateTime: '2023-03-05 14:22:34',
                type: 2,
                checkObjs: [],
                ownerList: ['002','003'], // 所有者
                describe: '122测11试一一一',
                dataManage: {
                    personData: []
                }
            }
        ],
    },
]
// 查询过滤数据
const filterData = function(arr,value) {
    let newarr = []
    arr.map(item => {
        let obj = {}
        if(item.type === 1) {
            if(item.name.indexOf(value)!== -1) {
                obj = item
                if(item.children && item.children.length) {
                    obj.children = filterData(item.children,value)
                } else {
                    obj.children = []
                }
                newarr.push(obj)
            } else {
                if(item.children && item.children.length) {
                    let a = filterData(item.children,value)
                    if(a.length) {
                        obj = item
                        obj.children = a
                        newarr.push(obj)
                    }
                }
            }
        } else if(item.type === 2) {
            if(item.name.indexOf(value)!== -1) {
                newarr.push(item)
            }
        }
    })
    return newarr
}
// 新增树数据
function addData(arr,data) {
    // console.log('数据',arr,data)
    for(let i=0;i<arr.length;i++) {
        if(arr[i].id === data.pid) {
            arr[i].children.push(data)
        } else if(arr[i].children) {
            if(arr[i].children.length) {
                arr[i].children = addData(arr[i].children,data)
            }
        }
    }
    return arr
}

// 修改树数据
function updateData(arr,data) {
    for(let i=0;i<arr.length;i++) {
        if(arr[i].id === data.id) {
            arr[i] = data
        } else if(arr[i].children) {
            if(arr[i].children.length) {
                arr[i].children = updateData(arr[i].children,data)
            }
        }
    }
    return arr
}

// 过滤分类数据
function filterTypeData(arr,data) {
    let newarr = []
    arr.map(item => {
        let obj = {}
        if(item.type === 1 && item.id !== data.id) {
            obj = item
            if(item.children && item.children.length) {
                obj.children = filterTypeData(item.children,data)
            } else {
                obj.children = []
            }
            newarr.push(obj)
        }
    })
    return newarr
}

// 删除数据
function deleteData(arr,data) {
    for(let i=0;i<arr.length;i++) {
        if(arr[i].id === data.id) {
            arr.splice(i,1)
        } else if (arr[i].children) {
            if(arr[i].children.length) {
                arr[i].children = deleteData(arr[i].children,data)
            }
        }
    }
    return arr
}


// 查询所有
Mock.mock('/system/data/fill/table/list','get',{list:treeData})
// 按条件查询
Mock.mock('/system/data/fill/table/search','post',(options) => {
    // console.log('options,,,',options)
    let arr = []
    if(options.body !== '') {
        arr = filterData(JSON.parse(JSON.stringify(treeData)),options.body)
    }
    return {list: arr}
})
// 查询所有的分类
Mock.mock('/system/data/fill/add/search','post',(options) => {
    console.log('参数',options)
    let obj = JSON.parse(options.body)
    let datas = JSON.parse(JSON.stringify(treeData))
    let arr = filterTypeData(datas,obj)
    console.log('arrrrr',arr)
    return {list: arr}
})
// 新增
Mock.mock('/system/data/fill/table/add','post',(options) => {
    // console.log('options,,,',JSON.parse(options.body))
    let obj = JSON.parse(options.body)
    if(obj.pid) {
        treeData = addData(JSON.parse(JSON.stringify(treeData)),obj)
        // console.log('数据',treeData)
    } else {
        treeData.push(obj)
    }
    return {list: treeData}
})
// 修改
Mock.mock('/system/data/fill/table/update','post',(options) => {
    let obj = JSON.parse(options.body)
    // console.log('修改obj',obj)
    treeData = updateData(JSON.parse(JSON.stringify(treeData)),obj)
    return {list:treeData}
})
// 删除
Mock.mock('/system/data/fill/table/delete','post',(options) => {
    // console.log('options',options)
    let obj = JSON.parse(options.body)
    treeData = deleteData(JSON.parse(JSON.stringify(treeData)),obj)
    // console.log('ttttttt',treeData)
    return {list: treeData}
})
// 移动
Mock.mock('/system/data/fill/table/move','post',(options) => {
    let obj = JSON.parse(options.body)
    // console.log('移动数据：',obj)
    let arr = deleteData(JSON.parse(JSON.stringify(treeData)),obj)
    // console.log('删除后',arr)
    treeData = addData(JSON.parse(JSON.stringify(arr)),obj)
    // console.log('新增后',treeData)
    return {list: treeData}
})


// 自助取数
var assistData = [
    {
        id: 1,
        name: '测试1',
        createdBy: '张三',
        updateBy: '张三',
        updateTime: '2023-02-28 14:18:34',
        type: 1,
        children: [
            {
                id: 2,
                pid: 1,
                name: '测试自助11',
                createdBy: '张三',
                updateBy: '张三',
                updateTime: '2023-02-28 14:20:01',
                type: 2,
                ownerList: ['001','002','003'], // 所有者
                describe: '张三测试一一一',
            }
        ],
    },
    {
        id: 3,
        name: '测试2',
        createdBy: '李四',
        updateBy: '李四',
        updateTime: '2023-03-01 14:22:34',
        type: 1,
        children: [],
    },
    {
        id: 4,
        name: '测试3',
        createdBy: '王五',
        updateBy: '王五',
        updateTime: '2023-03-02 14:13:34',
        type: 1,
        children: [],
    },
]

// 查询所有
Mock.mock('/system/data/assist/table/list','get',{list:assistData})
// 查询所有的分类
Mock.mock('/system/data/assist/add/search','post',(options) => {
    let obj = JSON.parse(options.body)
    let datas = JSON.parse(JSON.stringify(assistData))
    let arr = filterTypeData(datas,obj)
    return {list: arr}
})
// 新增
Mock.mock('/system/data/assist/table/add','post',(options) => {
    // console.log('options,,,',JSON.parse(options.body))
    let obj = JSON.parse(options.body)
    if(obj.pid) {
        assistData = addData(JSON.parse(JSON.stringify(assistData)),obj)
    } else {
        assistData.push(obj)
    }
    return {list: assistData}
})
// 修改
Mock.mock('/system/data/assist/table/update','post',(options) => {
    let obj = JSON.parse(options.body)
    // console.log('修改obj',obj)
    assistData = updateData(JSON.parse(JSON.stringify(assistData)),obj)
    return {list:assistData}
})
// 移动
Mock.mock('/system/data/assist/table/move','post',(options) => {
    let obj = JSON.parse(options.body)
    // console.log('移动数据：',obj)
    let arr = deleteData(JSON.parse(JSON.stringify(assistData)),obj)
    // console.log('删除后',arr)
    assistData = addData(JSON.parse(JSON.stringify(arr)),obj)
    // console.log('新增后',treeData)
    return {list: assistData}
})
// 删除
Mock.mock('/system/data/assist/table/delete','post',(options) => {
    let obj = JSON.parse(options.body)
    assistData = deleteData(JSON.parse(JSON.stringify(assistData)),obj)
    return {list: assistData}
})

// const Random = Mock.Random
// const produceList = function(){
//     let list = []
//     for(let i=0;i<20;i++) {
//         let data = {
//             id: i,
//             name: Random.cname(),
//             createdBy: Random.cname(),
//             updateBy: Random.cname(),
//             updateTime: Random.date(),
//             'type|+1': ['1','2'], 
//         }
//         list.push(data)
//     }

//     return {
//         list: list
//     }
// }
// console.log('mock???',produceList)
// Mock.mock('/system/datafill/table/list','get',{
//     "list|30": [{
//         id: "@increment",
//         name: "@csentence",
//         createdBy: '@cname',
//         updateBy: '@cname',
//         updateTime: '@datetime',
//         type: 1,
//         'children|0-10': [{
//             id: "@increment(31)",
//             name: '@csentence',
//             createdBy: '@cname',
//             updateBy: '@cname',
//             updateTime: '@datetime',
//             type: 2,
//         }]
//     }] 
// })