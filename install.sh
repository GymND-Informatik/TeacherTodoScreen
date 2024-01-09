#!/bin/bash


#Kopiere Dateien
cp ../scripts ~/scripts

#1. autostart mit script
#backup der alten Datei
cp nano ~/.config/lxsession/LXDE-pi/autostart nano ~/.config/lxsession/LXDE-pi/autostart.backup
echo "@xset s off\n@xset -dpms\n@xset s noblank\n@chromium-browser --kiosk http://localhost" > nano ~/.config/lxsession/LXDE-pi/autostart


#2. cronjob TODO
echo "0 7 * * * ~/scripts/on.sh \n0 16 * * * ~/scripts/off.sh" >> crontab -e

