#!/bin/bash
sudo git pull
sudo npm install
sudo npm run build
pm2 restart h7tex
pm2 status
