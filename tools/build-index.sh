#!/bin/bash
IFS=$'\n'
precategory=""
echo "var INDEX=["
for group in Events Heroes Stuff Keywords Generator
do
	for line in $(grep -h "\[CODEX-$group\]" ../database/* ../js/*|sed "s/^.*\[/\[/"|sort)
	do
		line="$(echo "$line"|sed "s/\",.*$//")"
		echo "	\"$line\","
	done
done
echo "];"

