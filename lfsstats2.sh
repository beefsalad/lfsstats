#!/bin/bash

tmpdir=$(mktemp -d)
cp $1/userlist.list $tmpdir
cd $tmpdir
trap 'rm -rf $tmpdir; exit' 0

if [ -f userlist.list ]; then
	echo "[" > all.json
	while read line; do 
		curl -f -s -S -o ${line}.lfs "http://www.lfsworld.net/pubstat/get_stat2.php?version=1.5&idk=7p33EdzYnwLn7RgyiSNe2sw3UxjZyIrf&action=pb&racer=${line}&s=1"
		if [ $? -eq 0 ]; then
			sed -i "s/{/{\"racer\":\"${line}\",/g;s/\[//g;s/\]/,/g" ${line}.lfs
			cat ${line}.lfs >> all.json
			sleep 6
		else 
			echo "Curl failed with error:" >&2
			rm all.json
			exit 1
		fi
	done < userlist.list
	curl -f -s -S -o wr.lfs "http://www.lfsworld.net/pubstat/get_stat2.php?version=1.5&idk=7p33EdzYnwLn7RgyiSNe2sw3UxjZyIrf&action=wr&s=1" 
	if [ $? -eq 0 ]; then
		sed -i "s/{/{\"racer\":\"wr\",/g;s/\[//g;s/\]//g" wr.lfs
		cat wr.lfs >> all.json
	else
		echo "Curl failed with error:" >&2
		rm all.json
		exit 1
	fi
	echo "]" >> all.json
	cat all.json > lfs.json
	rm all.json *.lfs
	cp -ar $tmpdir/* $1
else
	echo "userlist.list not found" >&2
	exit 1
fi
exit 0
