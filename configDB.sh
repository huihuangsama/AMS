#!/bin/bash
#
# @file: db.sh
# @brief: create table in mysql
# @author: steveZhang
# @date: 2016/06/01
# @version: 1.0
#
#################################
read -p "Pleast input user name of MySql:" USER
read -p "The default database name is 'am', do you want to set a new name:(y/n)" choice
if [ $choice == 'y' -o $choice == 'Y' ]; then
read -p "Please input the database name:" DATABASE
else DATABASE="am"
fi

echo "Your user name: " $USER
echo "The name of database: "$DATABASE
################################
# Connecting mysql
mysql -u $USER << EOF 2>/dev/null
create database if not exists $DATABASE;
use $DATABASE;
create table if not exists ams_department (
id tinyInt(4) not null primary key auto_increment,
name varchar(64) not null
)engine=innodb default charset=utf8;

create table if not exists ams_assistant (
id varchar(8) not null primary key,
name varchar(20) not null default 'anonymous',
passwd varchar(32) not null,
email varchar(20) not null default 'xxx@xxx.com',
phone varchar(11) not null default '12345678910',
did tinyInt(4) not null,
foreign key(did) references ams_department(id) on delete cascade on update cascade
)engine=innodb default charset=utf8;

create table if not exists ams_manager (
id varchar(8) not null primary key,
name varchar(20) not null default 'anonymous',
passwd varchar(32) not null,
email varchar(20) not null default 'xxx@xxx.com',
phone varchar(11) not null default '12345678910'
)engine=innodb default charset=utf8;

create table if not exists ams_manage (
aid varchar(8) default null,
did tinyInt(4) not null,
mid varchar(8) not null,
foreign key(aid) references ams_assistant(id) on delete cascade on update cascade,
foreign key(mid) references ams_manager(id) on delete cascade on update cascade,
foreign key(did) references ams_department(id) on delete cascade on update cascade,
unique (aid, did),
unique (aid, mid)
)engine=innodb default charset=utf8;

create index mindex on ams_manage (mid);

create table if not exists ams_free_time (
id int(11) not null primary key auto_increment,
aid varchar(8) not null,
stime varchar(4) not null default '0000',
etime varchar(4) not null default '0000',
weekday varchar(1) not null default 1,
foreign key(aid) references ams_assistant(id) on delete cascade on update cascade
)engine=innodb default charset=utf8;

create index freeIndex on ams_free_time (aid);

create table if not exists ams_schedule (
id int(11) not null primary key auto_increment,
aid varchar(8) not null,
stime varchar(4) not null default '0000',
etime varchar(4) not null default '0000',
weekday varchar(1) not null default '1',
unique (stime, etime, weekday),
foreign key(aid) references ams_assistant(id) on delete cascade on update cascade
)engine=innodb default charset=utf8;

create table if not exists ams_check_in_out_info (
sid int(11) not null,
aid varchar(8) not null,
date varchar(8) not null default '00000000',
bias int(4) not null default 0,
unique (sid, date),
foreign key(sid) references ams_schedule(id) on delete cascade on update cascade,
foreign key(aid) references ams_assistant(id) on delete cascade on update cascade
)engine=innodb default charset=utf8;

create table if not exists ams_counting_time (
id int(11) not null primary key auto_increment,
mid varchar(8) not null,
time varchar(8) not null default '00000000',
foreign key(mid) references ams_manager(id) on delete cascade on update cascade
)engine=innodb default charset=utf8;

create table if not exists ams_work_hour (
aid varchar(8) not null,
time varchar(8) not null default '00000000',
lel_time tinyInt(4) not null default 0,
lel_work_hour FLOAT(4,2) not null default 0.0,
work_hour FLOAT(4,2) not null default 0.0,
foreign key(aid) references ams_assistant(id) on delete cascade on update cascade
)engine=innodb default charset=utf8;

EOF
echo "done!"
