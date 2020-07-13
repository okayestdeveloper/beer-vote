#! /bin/zsh
# https://firebase.google.com/docs/emulator-suite/connect_firestore#import_and_export_data
firebase emulators:start --only functions,hosting,firestore --import=./backup

