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


## Router/auth.js

* `/logout` | get
```js
  // 1. user.provider === 'saml'
  //      redirect('/passport/saml/logout')
  // 2. 否则 
  //      ctx.logout()   egg-passport 提供，清除用户session
  //      redirect('/')
```
* `/auth/switch_project`, `auth.switchProject` | put
```js
  // 1. 先去找 config.keystone.url   pre4....:13000
  // 2. 找 body 或 querystring 中的 projectId
  // 3. 拿 token ，发 /v3/auth/tokens
  // 4. 把 endpoint projectId scopedToken isAdmin
  // 5. 更新 project 和 region
```
* `/auth/switch_region`, `auth.switchRegion` | put
```js
  // 拿出 session 中对应 userId 的 cookies
  // 把 body 中的 regionId 
```
* `/passport/local` | post
```js
  // 1. 拿出 session 的验证码和 body 中的 captcha 进行对比
  // 2. 利用 passport 的 local 策略验证账号密码
  // 3. 验证成功转到 '/'
```

## Router/ccap.js

* `/api/captcha` | get
```js
  // 利用 ccap 生成 随机的 验证码
```

## Router/ticket.js

* `/api/ticket/:owner/ticket/:ticketId/reply`, `ticket.createReply` | post
```js
  // 获取 param 中的 owner ticketId
  // 获取 body 中的 content
  // 获取 session 中的 username
  // 获取 user.roles 中最高级的 role
  // 把以上存在 model/reply 中
```
* `/api/ticket/:owner/ticket/:ticketId/reply/:replyId`, `ticket.updateReply` | put
```js
  // 根据 replyId 找到工单
  // 更新工单的 content
```
* `/api/ticket/:owner/ticket/:ticketId/reply/:replyId`, `ticket.deleteReply` | delete
```js
  // 根据 replyId 删掉对应数据 
```
* `/api/ticket/:owner/tickets`, `ticket.createTicket` | post
```js
  // param 中的 owner
  // session 中的 username projectId
  // body 中的 title description type status attachments
  // attachments 形式 [{owner}, {url}]
  // 存到 model/ticket 中
```

## Router/bill.js

* `/api/pay/:method`, `bill.pay`
```js
  // alipay paypal 两种支付方式
  // session 中的 userId username
  // query 中的 amount
  // 放入 model/pay 中
  // 转向 alipau 或 paypal 的开放接口
```
* `/api/pay/alipay/notify/:regionId`, `bill.alipayNotify` | post
```js
  // 取出 request.body.trade_status model.Pay 
  // body 变成 querystring
  // querystring + partnerKey 用 md5 进行加密
  // 去数据库里找此条数据并 transferred = true 并保存
```
* `/api/pay/paypal/:result`, `bill.paypalExecute` | get
```js
  // 检测 params.result 是否为 'success'
  // 拿出 mode.Pay 
  // query 中的 PayerID paymentID token
```