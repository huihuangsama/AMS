#!/bin/bash
# @brief: this shell file set user's mysql password
# @author: steveZhang
# @date: 2016-6-2

if [ "$#" -ne 1 ]; then
	echo "One parameter(password) allowed"
	exit
fi
echo "[client]
password = $1" >> $HOME/.my.cnf

chmod 400 $HOME/.my.cnf
