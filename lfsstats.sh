#!/bin/bash

cd /var/www/motoracing/lfsstats/ 

echo "[" > all.json

while read line; do 
    	curl "http://www.lfsworld.net/pubstat/get_stat2.php?version=1.5&idk=7p33EdzYnwLn7RgyiSNe2sw3UxjZyIrf&action=pb&racer=${line}&s=1" > ${line}.lfs
	sed -i "s/{/{\"racer\":\"${line}\",/g" ${line}.lfs
	sed -i "s/\[//g"  ${line}.lfs
	sed -i "s/\]/,/g"  ${line}.lfs
	cat ${line}.lfs >> all.json
	sleep 6
done < userlist.list

curl "http://www.lfsworld.net/pubstat/get_stat2.php?version=1.5&idk=7p33EdzYnwLn7RgyiSNe2sw3UxjZyIrf&action=wr&s=1" > wr.lfs
sed -i "s/{/{\"racer\":\"wr\",/g"  wr.lfs
sed -i "s/\[//g"  wr.lfs
sed -i "s/\]//g"  wr.lfs
cat wr.lfs >> all.json
echo "]" >> all.json
cat all.json > lfs.json
