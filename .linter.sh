#!/bin/bash
cd /home/kavia/workspace/code-generation/oceanwave-log-94369-73bbf9fc/surfsync_web_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

