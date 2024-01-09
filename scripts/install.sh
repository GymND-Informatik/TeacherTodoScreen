# #!/bin/bash


# #Kopiere Dateien
# cp ../scripts ~/scripts

# #1. autostart mit script
# #backup der alten Datei
# cp nano ~/.config/lxsession/LXDE-pi/autostart nano ~/.config/lxsession/LXDE-pi/autostart.backup
# echo "@xset s off\n@xset -dpms\n@xset s noblank\n@chromium-browser --kiosk http://localhost" > nano ~/.config/lxsession/LXDE-pi/autostart


# #2. cronjob TODO
# echo "0 7 * * * ~/scripts/on.sh \n0 16 * * * ~/scripts/off.sh" >> crontab -e

#!/bin/bash

# Define log file
LOG_FILE="~/install.log"

# log messages
log_message() {
    echo "$(date) - $1" >> $LOG_FILE
}

log_message "Installation Script Started"

# Copy scripts
cp -r ../scripts ~/scripts
log_message "Scripts copied to ~/scripts"

# Autostart with script
# Backup the existing file
if cp ~/.config/lxsession/LXDE-pi/autostart ~/.config/lxsession/LXDE-pi/autostart.backup; then
    log_message "Autostart file backed up"
else
    log_message "Error backing up autostart file"
    exit 1
fi

# Write new settings to autostart
{
    echo "@xset s off"
    echo "@xset -dpms"
    echo "@xset s noblank"
    echo "@chromium-browser --kiosk http://localhost"
} > ~/.config/lxsession/LXDE-pi/autostart
log_message "Autostart file updated"

# Cronjob setup
if (crontab -l 2>/dev/null; echo "0 7 * * * ~/scripts/on.sh") | crontab - &&
   (crontab -l 2>/dev/null; echo "0 16 * * * ~/scripts/off.sh") | crontab -; then
    log_message "Cronjobs set up successfully"
else
    log_message "Error setting up cronjobs"
    exit 1
fi

log_message "Installation Script Completed Successfully"
