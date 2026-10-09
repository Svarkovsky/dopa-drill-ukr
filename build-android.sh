#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

export JAVA_HOME="$DIR/android/tools/jdk"
export ANDROID_HOME="$DIR/android/tools/android-sdk"
export PATH="$JAVA_HOME/bin:$PATH"

echo "=== 1. Preparing game web assets ==="
node build-android-assets.mjs

echo "=== 2. Building native Android APK ==="
./android/tools/gradle/bin/gradle -p android assembleDebug --no-daemon

APK_SRC="$DIR/android/app/build/outputs/apk/debug/app-debug.apk"
APK_OUT="$DIR/android/dopa-drill.apk"
cp "$APK_SRC" "$APK_OUT"

echo "=== BUILD COMPLETE! ==="
ls -lh "$APK_OUT"
echo "Ready APK path: $APK_OUT"
