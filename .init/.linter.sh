#!/bin/bash
cd /home/kavia/workspace/code-generation/smart-parking-reservation-system-179315-179325/react_frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

