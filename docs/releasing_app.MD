# RELEASE APP #

## GENERATING KEYTOOL (only when first time generating) ##

keytool -genkey -v -keystore hospitalme.keystore -alias hospitalme -keyalg RSA -keysize 2048 -validity 10000

### PASSWORD TO KEYSTORE ###

pragma123

## RELEASING ##

cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /home/mlip/projects/pragma/hospitalMe/myApp/certs/hospitalme.keystore /home/mlip/projects/pragma/hospitalMe/myApp/platforms/android/ant-build/MainActivity-release-unsigned.apk hospitalme
zipalign -v 4 /home/mlip/projects/pragma/hospitalMe/myApp/platforms/android/ant-build/MainActivity-release-unsigned.apk /home/mlip/projects/pragma/hospitalMe/myApp/platforms/android/ant-build/HospitalMe.apk

## DEPLOYING ON PHONE ##

Copy generated file HospitalMe.apk to your phone