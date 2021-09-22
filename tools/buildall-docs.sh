#!/bin/bash
echo "- Building codex"
bash build-codex.sh > ../docs/CODEX.md
echo "- Building index.js"
bash build-index.sh > index.js
echo "Done."