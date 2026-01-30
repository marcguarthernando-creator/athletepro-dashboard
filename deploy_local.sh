#!/bin/bash
echo "Starting..." > deploy_status.txt
git add . >> deploy_status.txt 2>&1
git commit -m "Update application with latest features and design adjustments" >> deploy_status.txt 2>&1
git push origin main >> deploy_status.txt 2>&1
echo "Done." >> deploy_status.txt
