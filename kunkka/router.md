# Router api 配套解析

## Router/admin.js

* `api/v1/images`, `admin.api.getImageList` | get
```js
  // 先拿出 query + token + remote(从 endpoint 中拿) 
  // 循环取出 images (向 openstack 接口发) 
  // /v2/images 加 header  X-Auth-Token: token
  // 如果结果有 next 属性，则继续发送
```
* `/api/v1/images/:imageId`, `admin.api.getImageDetails` | get
```js
  // 先拿出 query + token + remote(从 endpoint 中拿) 
  // /v2/images/imageId 加 header  X-Auth-Token: token
  // 返回结果
```
* `/api/v1/instanceSnapshots`, `admin.api.getInstanceSnapshotList` | get
```js
  // 与 getImageList 相同操作
  // 将结果取出 type = snapshot 的
```
* `/api/v1/instanceSnapshots/:imageId`, `admin.api.getInstanceSnapshotDetails` | get
```js
  // 和 getImageDetails 相同
```
* `/api/v1/images/:imageId`, `admin.api.updateImage` | patch
```js
  // 取出 imageId + 请求体 + token + remote
  // /v2/images/imageId 加 header 'X-Auth-Token': token
  // 再加 'Content-Type': 'application/openstack-images-v2.1-json-patch'
  // 返回结果
```
* `/api/v1/:projectId/stacks`, `admin.api.createStack` | post
```js
  // 暂时为空
```
* `/api/v1/:projectId/stacks`, `admin.api.getStackList` | get
```js
  // 暂时为空
```
* `/api/admin/host/overview/osd-stats`, `admin.api.overviewGetOSDStats` | get
```js
  // 执行命令 `ceph osd df tree --format json --id openstack`
  // 返回 stdout.nodes.item.type = root
```
* `/api/v1/:projectId/os-hypervisors/detail`, `admin.api.getHostList` | get
```js
  // 拿出 projectId + token + remote + query
  // /v2.1/prijectId/os-hypervisors/detail + querystring
  // 分页操作
```
* `/api/v1/users`, `admin.api.getUserList` | get
```js
  // 拿出 projectId + token + remote + query
  // /v3/users 
```
* `/api/v1/user/:userId`, `admin.api.getUser` | get
```js
  // /v3/users/userId + model/User 中 userId
  // user[0] + user[1].phone
```
* `/api/v1/role_assignments`, `admin.api.getRoleAssignments` | get
```js
  // domain_id + query 整理后的 对象
  // token + remote(keystone) +
  // /v3/role_assignments 
  // 如果有 include_names 则查询字符串是否有 user | role | group | scope.project | scope.domain 的 id 则获取单个，否则获取列表
  // 将两个互相对应
```
* `/api/v1/users`, `admin.api.createUser` | post
```js
  // 拿出 token + remote(keystone) + userObject = {name, password, domain_id, description, email}
  // 判断 isCreateProject 
  // 为假的话 /v3/users 创建走起, 然后把 id 和 name，放入 model/User 中
  // 为真的话 ， 拿出 project_name + role | 从 cache/setting 中拿到 global 和 enable_ldap | 从 model/tusk 取出 app = global, name = enable_ldap 
  // 从 cache 拿数据，拿不到的从 model / tusk 去拿
  // 创建用户和项目 并绑定 
  // ${remote}/v3/projects/${projectId}/users/${userId}/roles/${roleId}
```
* `/api/v1/services`, `admin.api.getServices` | get