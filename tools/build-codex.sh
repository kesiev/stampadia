#!/bin/bash
IFS=$'\n'
precategory=""
echo "# Chronicles of Stampadia - Codex"
echo ""
echo "<div align=center style='border:2px solid red;padding:5px'><b>Spoiler alert!</b> This codex contains a list and a description of all of the Chronicles of Stampadia contents. If you don't want to spoil the fun, <b>stop reading this now</b>.</div>"
for group in Events Heroes Stuff Keywords Generator
do
	count="$(grep -h "\[CODEX-$group\]" ../database/* ../js/*|sed "s/.*\[CODEX-$group\] //;s/ ([0-9]*)//g"|sort|uniq|wc -l|sed "s/ //g")"
	echo ""
	echo "## $group ($count items)"
	echo ""
	for line in $(grep -h "\[CODEX-$group\]" ../database/*  ../js/*|sed "s/.*\[CODEX-$group\] //;s/ ([0-9]*)//g"|sort|uniq)
	do
		line="$(echo "$line"|sed "s/\",.*$//")"
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

