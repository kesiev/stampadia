#!/bin/bash
IFS=$'\n'
precategory=""
echo "# Chronicles of Stampadia - Codec"
echo ""
echo "<div align=center style='border:2px solid red;padding:5px'><b>Spoiler alert!</b> This codec contains a list and a description of all of the Chronicles of Stampadia contents. If you don't want to spoil the fun, <b>stop reading this now</b>.</div>"
for group in Events Stuff
do
	count="$(grep -h "\[CODEC-$group\]" ../database/*|wc -l|sed "s/ //g")"
	echo ""
	echo "## $group ($count items)"
	echo ""
	for line in $(grep -h "\[CODEC-$group\]" ../database/*|sed "s/.*\[CODEC-$group\] //"|sort)
	do
		category="$(echo "$line"|sed "s/ -.*//")"
		entry="$(echo "$line"|sed "s/^[^-]*- //;s/^/**/;s/: /**: /")"
		if [ "$category" != "$precategory" ];
		then
			echo "- $category"
			precategory="$category"
		fi
		echo "  - $entry"
	done

done

