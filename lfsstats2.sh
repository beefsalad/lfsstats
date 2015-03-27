#!/bin/bash

cd /var/www/motoracing/lfsstats/ 

if [ -f "userlist.list"]; then
	echo "[" > all.json
	while read line; do 
		curl -o ${line}.lfs "http://www.lfsworld.net/pubstat/get_stat2.php?version=1.5&idk=7p33EdzYnwLn7RgyiSNe2sw3UxjZyIrf&action=pb&racer=${line}&s=1"
		if [ $? -eq 0 ]; then	
			sed -i 's/{/{\"racer\":\"${line}\",/g;s/\[//g;s/\]/,/g' ${line}.lfs
			cat ${line}.lfs >> all.json
		else 
			echo "Could not append json due to error" >&2
			exit 1
		sleep 6
	done < userlist.list
	curl -o wr.lfs "http://www.lfsworld.net/pubstat/get_stat2.php?version=1.5&idk=7p33EdzYnwLn7RgyiSNe2sw3UxjZyIrf&action=wr&s=1" 
	if [ $? -eq 0 ]; then
		sed -i 's/{/{\"racer\":\"wr\",/g;s/\[//g;s/\]//g' wr.lfs
		cat wr.lfs >> all.json
	else
		echo "Could not append json due to error" >&2
		exit 1
	fi
	echo "]" >> all.json
	cat all.json > lfs.json
else
	echo "userlist.list not found" >&2
fi
exit 0
