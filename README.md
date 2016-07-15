# 中山大学勤工俭学助理管理系统
# Assistant Management System (SYSU)

###系统部署：
- 系统前端使用html/css/javascript
- 后台采用php和thinkphp框架
- 数据库使用mysql

####Linux系统中：
安装LAMP(Linux + Apache + Mysql + Php)环境，开发本系统中使用的版本分别是：
- Linux: centOS 6.5
- Apache: 2.2.15
- Mysql: 5.6.29
- php: 5.6.18

将AMS放入`/var/www/html/`(Apache项目的默认文件)中，在terminal中执行：
```
# mv AMS /var/www/html/
# cd /var/www/html
# vim Common/Conf/config.php  //配置项目数据库
...
//修改'DB_NAME','DB_USER','DB_PWD'所对应的信息，**数据库名默认为am，如果要修改请确保和下面数据库表配置时的数据库名一致**
...
# sh setDBPassword.sh <your-mysql-password>  //配置数据库密码
# sh configDB.sh  //配置数据库表
# cd ..
# chmod -R 777 AMS //修改权限，让其可以创建运行时缓存文件，即Runtime中的文件
```
**注意检查防火墙设置，开启mysqld和httpd！**

####Windows系统中：
安装WAMP软件，将AMS放入默认项目文件夹中，修改'DB_NAME','DB_USER','DB_PWD'所对应的信息
修改AMS/Common/Conf/config.php文件，修改'DB_NAME','DB_USER','DB_PWD'所对应的信息，**数据库名默认为am，如果要修改请确保修改DB.txt的前两行，将am改为你设定的数据库名**
打开`MYSQL console`，打开复制DB.txt，全选复制到`MYSQL console`中。

####共同步骤：
在浏览器中输入localhost/AMS/index.php/Home/ManagerManage/DepartAdminForm.html**超级管理员** 界面，创建部门及管理部门的管理员
在浏览器中输入localhost/AMS/index.php/Home/Index/home进入登录界面

###系统主要功能：
- 超级管理员：添加/注销管理员，添加部门
- 管理员：添加/注销助理，排班，结算工时，修改个人信息 **注：管理员账号需要被添加后才能登陆，登陆初始密码为工号**
- 助理：登记空闲时间，登记上下班，修改个人信息，查看排班表 **注：助理账号需要被添加后才能登陆，登陆初始密码为工号**

