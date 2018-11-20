 # ceph 概念介绍 

* Monitor | 通过 paxos 同步数据， 保存 OSD 的元数据
* OSD | OBject Storage Device | 负责响应客户端请求返回具体数据的进程
* MDS | Ceph Metadata Server | CephFS 服务依赖的元数据服务
* Object | Ceph 最底层的存储单元 | 包含 元数据 和 原始数据
* PG | Placement Groups
* RADOS | Reliable Autonomic Distributed Object Store | Ceph 集群的精华，用户实现数据分配、Failover等集群操作。
* Libradio | RADOS 提供库 | 上层的RBD、RGW和CephFS都是通过librados访问的。
* CRUSH | Ceph 数据分布算法
* RBD | RADOS block device | Ceph 对外提供的块设备服务
* RGW | RADOS gateway | Ceph 对外提供的对象存储服务，接口与 S3 和 Swift 兼容
* CephFS | Ceph File System | Ceph 对外提供的文件系统服务
* *************************************************
* ceph-mgr | Ceph Manager daemon | 给 Monitor 提供额外的 监测 和 接口

## 块存储 | 将裸盘空间映射给主机用

## 文件存储 | FTP， NFS 服务器

## 对象存储 | 适合更新变动较少的数据 (图片存储， 视频存储)

## ISCSI 存储设备 | iqn 唯一标示

* 先通过 iscsi 协议的 ip 映射方式挂载在操作系统中， 再对该磁盘分区， 并安装文件系统(格式化分区)。