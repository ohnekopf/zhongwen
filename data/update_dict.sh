#!/bin/sh
curl -L https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz | gzip -d  > orig_cedict.txt
{
	grep '^#' orig_cedict.txt ;
	cat <<-X   | unix2dos # for consistency
	#
	# File modified to work as popup browser dictionary for HuaHua
	# Huahua: https://github.com/ohnekopf/zhongwen/
	# Zhongwen: https://github.com/cschiller/zhongwen/
	#
	X
	grep -v '^#' orig_cedict.txt ;
}  |\
LC_ALL=C grep -v "^[a-zA-Z0-9%]" > cedict_ts.u8 #remove entries that start with common characters

node count.js > cedict.idx

