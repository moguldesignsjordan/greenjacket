#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# fix-driver-2.5.4.sh
# Permanently fixes Apple Guideline 2.5.4 rejection for StackBot Driver
#
# Run from: ~/StackBot/stackbot-driver
#
# What it does:
#   1. Replaces Info.plist — removes 'location' from UIBackgroundModes
#   2. Removes NSLocationAlways* keys from Info.plist
#   3. Patches project.pbxproj — removes location background mode capability
#      (THIS is the step that prevents Xcode from re-adding it on archive)
#   4. Bumps build number for resubmission
#   5. Verifies everything is clean
#
# Usage:
#   chmod +x fix-driver-2.5.4.sh
#   ./fix-driver-2.5.4.sh
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

PLIST="ios/App/App/Info.plist"
PBXPROJ="ios/App/App.xcodeproj/project.pbxproj"
ENTITLEMENTS="ios/App/App/App.entitlements"

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  StackBot Driver — Guideline 2.5.4 Permanent Fix${NC}"
echo -e "${CYAN}  (Background Location Removal)${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# ── Verify directory ──────────────────────────────────────────────────────────
if [ ! -f "$PLIST" ]; then
  echo -e "${RED}ERROR: $PLIST not found.${NC}"
  echo "Run this from ~/StackBot/stackbot-driver"
  exit 1
fi

echo -e "${GREEN}✓ Found iOS project files${NC}"
echo ""

# ── Backup ────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}[0/5] Creating backups...${NC}"
cp "$PLIST" "${PLIST}.bak-$(date +%Y%m%d)"
cp "$PBXPROJ" "${PBXPROJ}.bak-$(date +%Y%m%d)"
[ -f "$ENTITLEMENTS" ] && cp "$ENTITLEMENTS" "${ENTITLEMENTS}.bak-$(date +%Y%m%d)"
echo -e "  ${GREEN}✓ Backups created${NC}"
echo ""

# ══════════════════════════════════════════════════════════════════════════════
# FIX 1: Remove 'location' from UIBackgroundModes in Info.plist
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[1/5] Removing 'location' from UIBackgroundModes...${NC}"

if grep -q '<string>location</string>' "$PLIST"; then
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' '/<string>location<\/string>/d' "$PLIST"
  else
    sed -i '/<string>location<\/string>/d' "$PLIST"
  fi
  echo -e "  ${GREEN}✓ Removed 'location' from UIBackgroundModes${NC}"
else
  echo -e "  ${GREEN}✓ Already clean — no 'location' in UIBackgroundModes${NC}"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════════
# FIX 2: Remove NSLocationAlways* keys from Info.plist
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[2/5] Removing NSLocationAlways* keys...${NC}"

for KEY in "NSLocationAlwaysUsageDescription" "NSLocationAlwaysAndWhenInUseUsageDescription"; do
  if grep -q "$KEY" "$PLIST"; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i '' "/<key>$KEY<\/key>/{N;d;}" "$PLIST"
    else
      sed -i "/<key>$KEY<\/key>/{N;d;}" "$PLIST"
    fi
    echo -e "  ${GREEN}✓ Removed $KEY${NC}"
  else
    echo -e "  ${GREEN}✓ $KEY already absent${NC}"
  fi
done

# Verify NSLocationWhenInUseUsageDescription still exists
if grep -q "NSLocationWhenInUseUsageDescription" "$PLIST"; then
  echo -e "  ${GREEN}✓ NSLocationWhenInUseUsageDescription present (required)${NC}"
else
  echo -e "  ${RED}⚠ WARNING: NSLocationWhenInUseUsageDescription missing!${NC}"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════════
# FIX 3: Remove 'location' from Background Modes in project.pbxproj
# THIS IS THE KEY FIX — prevents Xcode from re-adding it on build/archive
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[3/5] Patching project.pbxproj to remove location background mode...${NC}"

# The pbxproj stores background modes as a SystemCapabilities dict entry
# Look for com.apple.BackgroundModes with location = 1 and set to 0
if grep -q 'com.apple.BackgroundModes' "$PBXPROJ"; then
  echo -e "  Found BackgroundModes in project settings"
  
  # Also check for any explicit "location" capability references
  # Xcode stores these as enabled/disabled flags
  if grep -q '"location"' "$PBXPROJ" || grep -q 'location = 1' "$PBXPROJ"; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # Disable location in background modes capability
      sed -i '' 's/location = 1/location = 0/g' "$PBXPROJ"
    else
      sed -i 's/location = 1/location = 0/g' "$PBXPROJ"
    fi
    echo -e "  ${GREEN}✓ Disabled location in BackgroundModes capability${NC}"
  else
    echo -e "  ${GREEN}✓ No location=1 found in project capabilities${NC}"
  fi
else
  echo -e "  ${CYAN}ℹ No BackgroundModes capability block in pbxproj (managed via plist only)${NC}"
fi

echo ""

# ══════════════════════════════════════════════════════════════════════════════
# FIX 4: Bump build number
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[4/5] Bumping build version...${NC}"

CURRENT_BUILD=$(grep 'CURRENT_PROJECT_VERSION' "$PBXPROJ" | head -1 | sed 's/.*= *\(.*\);/\1/' | tr -d ' ')
CURRENT_MARKETING=$(grep 'MARKETING_VERSION' "$PBXPROJ" | head -1 | sed 's/.*= *\(.*\);/\1/' | tr -d ' ')

echo -e "  Current: MARKETING_VERSION=${CYAN}${CURRENT_MARKETING}${NC}  BUILD=${CYAN}${CURRENT_BUILD}${NC}"

# Increment build number by 1 (handle both int and decimal)
if [[ "$CURRENT_BUILD" =~ ^[0-9]+$ ]]; then
  NEW_BUILD=$((CURRENT_BUILD + 1))
elif [[ "$CURRENT_BUILD" =~ ^[0-9]+\.[0-9]+$ ]]; then
  # e.g. 1.7 -> 2
  MAJOR=$(echo "$CURRENT_BUILD" | cut -d. -f1)
  NEW_BUILD=$((MAJOR + 1))
else
  NEW_BUILD="4"
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/CURRENT_PROJECT_VERSION = ${CURRENT_BUILD}/CURRENT_PROJECT_VERSION = ${NEW_BUILD}/g" "$PBXPROJ"
else
  sed -i "s/CURRENT_PROJECT_VERSION = ${CURRENT_BUILD}/CURRENT_PROJECT_VERSION = ${NEW_BUILD}/g" "$PBXPROJ"
fi

echo -e "  ${GREEN}✓ Build bumped: ${CURRENT_BUILD} → ${NEW_BUILD}${NC}"

# Bump marketing version: 3.3 -> 3.4
if [[ "$CURRENT_MARKETING" =~ ^[0-9]+\.[0-9]+$ ]]; then
  MAJOR=$(echo "$CURRENT_MARKETING" | cut -d. -f1)
  MINOR=$(echo "$CURRENT_MARKETING" | cut -d. -f2)
  NEW_MINOR=$((MINOR + 1))
  NEW_MARKETING="${MAJOR}.${NEW_MINOR}"
elif [[ "$CURRENT_MARKETING" =~ ^[0-9]+$ ]]; then
  NEW_MARKETING=$((CURRENT_MARKETING + 1))
else
  NEW_MARKETING="3.4"
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/MARKETING_VERSION = ${CURRENT_MARKETING}/MARKETING_VERSION = ${NEW_MARKETING}/g" "$PBXPROJ"
else
  sed -i "s/MARKETING_VERSION = ${CURRENT_MARKETING}/MARKETING_VERSION = ${NEW_MARKETING}/g" "$PBXPROJ"
fi

echo -e "  ${GREEN}✓ Version bumped: ${CURRENT_MARKETING} → ${NEW_MARKETING}${NC}"
echo ""

# ══════════════════════════════════════════════════════════════════════════════
# FIX 5: Verify entitlements
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[5/5] Checking entitlements...${NC}"

if [ -f "$ENTITLEMENTS" ]; then
  APS_ENV=$(grep -A1 'aps-environment' "$ENTITLEMENTS" 2>/dev/null | grep '<string>' | sed 's/.*<string>\(.*\)<\/string>.*/\1/' || echo "not found")
  if [ "$APS_ENV" = "production" ]; then
    echo -e "  ${GREEN}✓ aps-environment = production${NC}"
  elif [ "$APS_ENV" = "development" ]; then
    echo -e "  ${YELLOW}⚠ aps-environment = development — changing to production${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i '' 's/<string>development<\/string>/<string>production<\/string>/' "$ENTITLEMENTS"
    else
      sed -i 's/<string>development<\/string>/<string>production<\/string>/' "$ENTITLEMENTS"
    fi
    echo -e "  ${GREEN}✓ Changed to production${NC}"
  fi
else
  echo -e "  ${CYAN}ℹ No App.entitlements file found${NC}"
fi
echo ""

# ══════════════════════════════════════════════════════════════════════════════
# FINAL VERIFICATION
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  VERIFICATION${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

PASS=0
FAIL=0

verify() {
  if [ "$1" = "pass" ]; then
    echo -e "  ${GREEN}✓${NC} $2"
    ((PASS++))
  else
    echo -e "  ${RED}✗${NC} $2"
    ((FAIL++))
  fi
}

# Check UIBackgroundModes
if grep -q '<string>location</string>' "$PLIST"; then
  verify "fail" "UIBackgroundModes still has 'location'"
else
  verify "pass" "No 'location' in UIBackgroundModes"
fi

if grep -q '<string>fetch</string>' "$PLIST"; then
  verify "pass" "'fetch' in UIBackgroundModes"
fi

if grep -q '<string>remote-notification</string>' "$PLIST"; then
  verify "pass" "'remote-notification' in UIBackgroundModes"
fi

# Check location keys
if grep -q 'NSLocationAlwaysUsageDescription' "$PLIST"; then
  verify "fail" "NSLocationAlwaysUsageDescription still present"
else
  verify "pass" "No NSLocationAlwaysUsageDescription"
fi

if grep -q 'NSLocationAlwaysAndWhenInUseUsageDescription' "$PLIST"; then
  verify "fail" "NSLocationAlwaysAndWhenInUseUsageDescription still present"
else
  verify "pass" "No NSLocationAlwaysAndWhenInUseUsageDescription"
fi

if grep -q 'NSLocationWhenInUseUsageDescription' "$PLIST"; then
  verify "pass" "NSLocationWhenInUseUsageDescription present"
else
  verify "fail" "NSLocationWhenInUseUsageDescription MISSING"
fi

echo ""
echo -e "  ${GREEN}${PASS} passed${NC}  ${RED}${FAIL} failed${NC}"
echo ""

if [ $FAIL -gt 0 ]; then
  echo -e "${RED}  ⚠ Some checks failed — review above${NC}"
  exit 1
fi

echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  All checks passed!${NC}"
echo ""
echo -e "  ${YELLOW}CRITICAL XCODE STEP (do this BEFORE archiving):${NC}"
echo ""
echo -e "  1. Open Xcode:  ${CYAN}npx cap open ios${NC}"
echo -e "  2. Select ${CYAN}App${NC} target → ${CYAN}Signing & Capabilities${NC} tab"
echo -e "  3. Under ${CYAN}Background Modes${NC}, verify:"
echo -e "     ${GREEN}✅${NC} Background fetch"
echo -e "     ${GREEN}✅${NC} Remote notifications"
echo -e "     ${RED}❌${NC} Location updates  ← ${RED}MUST BE UNCHECKED${NC}"
echo -e "  4. If 'Location updates' is checked, ${RED}UNCHECK IT${NC}"
echo -e "  5. Then: Product → Archive → Distribute App"
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${YELLOW}App Store Connect Review Notes (paste these):${NC}"
echo -e "  ─────────────────────────────────────────────────────────────"
cat << 'REVIEW_NOTES'

Test Account:
  Phone: +1 (555) 555-0100
  OTP: 123456

Steps to Test:
1. Open app → sign in with test phone number
2. Tap "Conectarse" (Go Online) — location permission requested here
3. Location is used ONLY in foreground for delivery navigation
4. No background location tracking is performed
5. Tap "Entrega Activa" for active delivery view
6. Tap "Historial" for delivery history
7. Tap "Ganancias" for earnings

Notes:
- Location permission (When In Use only) is requested when driver
  taps "Go Online" to accept deliveries. Used only in foreground
  for real-time delivery navigation. No background location.
- App language defaults to Spanish (Dominican Republic market).
- Internet connection required.

REVIEW_NOTES
echo -e "  ─────────────────────────────────────────────────────────────"
echo ""
echo -e "  ${YELLOW}Apple Reply Template:${NC}"
echo -e "  ─────────────────────────────────────────────────────────────"
cat << 'APPLE_REPLY'

Guideline 2.5.4 — Background Location:
We have removed "location" from UIBackgroundModes and removed
NSLocationAlwaysAndWhenInUseUsageDescription. The app now only
declares NSLocationWhenInUseUsageDescription for foreground-only
location access. Background Modes are limited to "fetch" and
"remote-notification" for push notifications.

Location is requested only when the driver taps "Conectarse"
(Go Online) and is used exclusively in the foreground for
delivery navigation. No background location tracking is performed.

APPLE_REPLY
echo ""
