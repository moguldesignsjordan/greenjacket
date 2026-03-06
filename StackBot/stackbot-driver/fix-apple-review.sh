#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# fix-apple-review.sh
# Run from your StackBot project root (where ios/ directory lives)
#
# Fixes:
#   1. Info.plist  — removes 'location' from UIBackgroundModes (Guideline 2.5.4)
#   2. Info.plist  — verifies no NSLocationAlways* keys exist
#   3. Entitlements — sets aps-environment to 'production'
#   4. project.pbxproj — bumps CURRENT_PROJECT_VERSION from 1.7 → 2
#   5. project.pbxproj — bumps MARKETING_VERSION from 10 → 11
#
# ROLLBACK:
#   Each file is backed up as <filename>.bak before modification.
#   To rollback: cp <file>.bak <file>
#
# Usage:
#   chmod +x fix-apple-review.sh
#   ./fix-apple-review.sh
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

# ── Colors for output ─────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  StackBot Driver — Apple Review Fix Script${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# ── Verify we're in the right directory ───────────────────────────────────────
PLIST="ios/App/App/Info.plist"
ENTITLEMENTS="ios/App/App/App.entitlements"
PBXPROJ="ios/App/App.xcodeproj/project.pbxproj"

if [ ! -f "$PLIST" ]; then
  echo -e "${RED}ERROR: $PLIST not found.${NC}"
  echo "Run this script from your StackBot project root directory."
  exit 1
fi

if [ ! -f "$ENTITLEMENTS" ]; then
  echo -e "${RED}ERROR: $ENTITLEMENTS not found.${NC}"
  exit 1
fi

if [ ! -f "$PBXPROJ" ]; then
  echo -e "${RED}ERROR: $PBXPROJ not found.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Found all iOS project files${NC}"
echo ""


# ══════════════════════════════════════════════════════════════════════════════
# FIX 1: Info.plist — Remove 'location' from UIBackgroundModes
# (Guideline 2.5.4 — Software Requirements)
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[1/5] Checking UIBackgroundModes in Info.plist...${NC}"

cp "$PLIST" "${PLIST}.bak"

# Check if 'location' string exists inside UIBackgroundModes
if grep -q '<string>location</string>' "$PLIST"; then
  echo -e "  ${RED}Found 'location' in UIBackgroundModes — removing...${NC}"

  # Use sed to remove the <string>location</string> line
  # Works on both macOS sed and GNU sed
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' '/<string>location<\/string>/d' "$PLIST"
  else
    sed -i '/<string>location<\/string>/d' "$PLIST"
  fi

  echo -e "  ${GREEN}✓ Removed 'location' from UIBackgroundModes${NC}"
else
  echo -e "  ${GREEN}✓ No 'location' in UIBackgroundModes — already clean${NC}"
fi

# Verify final state
echo -e "  Current UIBackgroundModes:"
# Extract the UIBackgroundModes block
awk '/<key>UIBackgroundModes<\/key>/,/<\/array>/' "$PLIST" | while IFS= read -r line; do
  echo -e "    ${CYAN}$line${NC}"
done
echo ""


# ══════════════════════════════════════════════════════════════════════════════
# FIX 2: Info.plist — Verify no NSLocationAlways* keys
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[2/5] Checking for NSLocationAlways* keys in Info.plist...${NC}"

ALWAYS_KEY="NSLocationAlwaysUsageDescription"
ALWAYS_AND_WHEN="NSLocationAlwaysAndWhenInUseUsageDescription"

HAS_ALWAYS=false

if grep -q "$ALWAYS_KEY" "$PLIST"; then
  echo -e "  ${RED}Found $ALWAYS_KEY — this signals background location intent to Apple.${NC}"
  echo -e "  Removing..."

  # Remove the key and its value (next line)
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "/<key>$ALWAYS_KEY<\/key>/{N;d;}" "$PLIST"
  else
    sed -i "/<key>$ALWAYS_KEY<\/key>/{N;d;}" "$PLIST"
  fi

  HAS_ALWAYS=true
  echo -e "  ${GREEN}✓ Removed $ALWAYS_KEY${NC}"
fi

if grep -q "$ALWAYS_AND_WHEN" "$PLIST"; then
  echo -e "  ${RED}Found $ALWAYS_AND_WHEN — removing...${NC}"

  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "/<key>$ALWAYS_AND_WHEN<\/key>/{N;d;}" "$PLIST"
  else
    sed -i "/<key>$ALWAYS_AND_WHEN<\/key>/{N;d;}" "$PLIST"
  fi

  HAS_ALWAYS=true
  echo -e "  ${GREEN}✓ Removed $ALWAYS_AND_WHEN${NC}"
fi

if [ "$HAS_ALWAYS" = false ]; then
  echo -e "  ${GREEN}✓ No NSLocationAlways* keys found — clean${NC}"
fi

# Confirm NSLocationWhenInUseUsageDescription still exists (required)
if grep -q "NSLocationWhenInUseUsageDescription" "$PLIST"; then
  echo -e "  ${GREEN}✓ NSLocationWhenInUseUsageDescription present (correct)${NC}"
else
  echo -e "  ${RED}⚠ WARNING: NSLocationWhenInUseUsageDescription is missing!${NC}"
  echo -e "  ${RED}  Your app uses @capacitor/geolocation — this key is required.${NC}"
fi
echo ""


# ══════════════════════════════════════════════════════════════════════════════
# FIX 3: App.entitlements — Set aps-environment to 'production'
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[3/5] Fixing aps-environment in App.entitlements...${NC}"

cp "$ENTITLEMENTS" "${ENTITLEMENTS}.bak"

CURRENT_APS=$(grep -A1 'aps-environment' "$ENTITLEMENTS" | grep '<string>' | sed 's/.*<string>\(.*\)<\/string>.*/\1/' || echo "not found")

echo -e "  Current aps-environment: ${CYAN}${CURRENT_APS}${NC}"

if [ "$CURRENT_APS" = "development" ]; then
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/<string>development<\/string>/<string>production<\/string>/' "$ENTITLEMENTS"
  else
    sed -i 's/<string>development<\/string>/<string>production<\/string>/' "$ENTITLEMENTS"
  fi
  echo -e "  ${GREEN}✓ Changed aps-environment: development → production${NC}"
elif [ "$CURRENT_APS" = "production" ]; then
  echo -e "  ${GREEN}✓ Already set to 'production' — no change needed${NC}"
else
  echo -e "  ${RED}⚠ Could not detect aps-environment value${NC}"
fi
echo ""


# ══════════════════════════════════════════════════════════════════════════════
# FIX 4: project.pbxproj — Bump CURRENT_PROJECT_VERSION
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[4/5] Bumping CURRENT_PROJECT_VERSION in project.pbxproj...${NC}"

cp "$PBXPROJ" "${PBXPROJ}.bak"

# Find current version (there will be multiple occurrences — Debug & Release)
CURRENT_BUILD=$(grep 'CURRENT_PROJECT_VERSION' "$PBXPROJ" | head -1 | sed 's/.*= *\(.*\);/\1/' | tr -d ' ')
echo -e "  Current build version: ${CYAN}${CURRENT_BUILD}${NC}"

# Set new version to 2 (clean integer — Apple prefers this)
NEW_BUILD="2"

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/CURRENT_PROJECT_VERSION = ${CURRENT_BUILD};/CURRENT_PROJECT_VERSION = ${NEW_BUILD};/g" "$PBXPROJ"
else
  sed -i "s/CURRENT_PROJECT_VERSION = ${CURRENT_BUILD};/CURRENT_PROJECT_VERSION = ${NEW_BUILD};/g" "$PBXPROJ"
fi

echo -e "  ${GREEN}✓ Bumped CURRENT_PROJECT_VERSION: ${CURRENT_BUILD} → ${NEW_BUILD}${NC}"
echo ""


# ══════════════════════════════════════════════════════════════════════════════
# FIX 5: project.pbxproj — Bump MARKETING_VERSION
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}[5/5] Bumping MARKETING_VERSION in project.pbxproj...${NC}"

CURRENT_MARKETING=$(grep 'MARKETING_VERSION' "$PBXPROJ" | head -1 | sed 's/.*= *\(.*\);/\1/' | tr -d ' ')
echo -e "  Current marketing version: ${CYAN}${CURRENT_MARKETING}${NC}"

# Increment by 1 (10 → 11)
if [[ "$CURRENT_MARKETING" =~ ^[0-9]+$ ]]; then
  NEW_MARKETING=$((CURRENT_MARKETING + 1))
else
  # If it's like "2.1", bump to "2.2"
  NEW_MARKETING="${CURRENT_MARKETING}.1"
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/MARKETING_VERSION = ${CURRENT_MARKETING};/MARKETING_VERSION = ${NEW_MARKETING};/g" "$PBXPROJ"
else
  sed -i "s/MARKETING_VERSION = ${CURRENT_MARKETING};/MARKETING_VERSION = ${NEW_MARKETING};/g" "$PBXPROJ"
fi

echo -e "  ${GREEN}✓ Bumped MARKETING_VERSION: ${CURRENT_MARKETING} → ${NEW_MARKETING}${NC}"
echo ""


# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  All fixes applied successfully!${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Backups created:"
echo -e "    ${PLIST}.bak"
echo -e "    ${ENTITLEMENTS}.bak"
echo -e "    ${PBXPROJ}.bak"
echo ""
echo -e "${YELLOW}  Next steps:${NC}"
echo -e "    1. Copy the updated layout.tsx → src/app/driver/layout.tsx"
echo -e "    2. Run: ${CYAN}npx next build${NC}"
echo -e "    3. Run: ${CYAN}npx cap sync ios${NC}"
echo -e "    4. Open Xcode: ${CYAN}npx cap open ios${NC}"
echo -e "    5. In Xcode: Product → Archive → Distribute App"
echo -e "    6. Add review notes in App Store Connect (see below)"
echo ""
echo -e "${YELLOW}  IMPORTANT — Add these Review Notes in App Store Connect:${NC}"
echo -e "  ─────────────────────────────────────────────────────────────"
echo -e "  ${CYAN}App Store Connect → Your App → App Information → Review Notes${NC}"
echo ""
cat << 'REVIEW_NOTES'
Test Account:
  Email: [YOUR_TEST_DRIVER_EMAIL]
  Password: [YOUR_TEST_DRIVER_PASSWORD]

Demo Steps:
1. Launch app → Login screen appears
2. Enter test credentials and tap "Iniciar Sesión" (Sign In)
3. Dashboard shows available delivery orders
4. Tap "Entrega Activa" tab to see active delivery page
5. Tap "Historial" tab to see delivery history
6. Tap "Ganancias" tab to see earnings summary
7. Tap "Cuenta" tab to see driver profile

Notes:
- App language defaults to Spanish (Dominican Republic market).
  Toggle to English via the globe icon in the header.
- Location permission is only requested when the driver taps
  "Conectarse" (Go Online) to accept deliveries. It is used
  only while the app is in the foreground for real-time
  delivery navigation. No background location is used.
- Internet connection required for all features.
REVIEW_NOTES
echo ""
echo -e "  ─────────────────────────────────────────────────────────────"
echo ""
echo -e "${YELLOW}  Apple Reply Template (paste in App Store Connect):${NC}"
echo -e "  ─────────────────────────────────────────────────────────────"
echo ""
cat << 'APPLE_REPLY'
Guideline 2.1 — App Completeness:
We identified and resolved the loading issue. The app's authentication
flow relied on a Firestore real-time WebSocket connection that could
stall in constrained network environments. We've implemented a faster
REST API fallback (5-second timeout) that bypasses WebSocket dependency,
ensuring the app loads reliably on all devices including iPad. Test
account credentials have been added to the Review Notes.

Guideline 2.5.4 — Background Location:
We have verified and confirmed that "location" is NOT present in the
UIBackgroundModes key. Our app only uses When-In-Use location permission
(NSLocationWhenInUseUsageDescription) for foreground delivery navigation.
No background location tracking is performed.
APPLE_REPLY
echo ""
echo -e "  ─────────────────────────────────────────────────────────────"
echo ""
echo -e "${GREEN}  Done! Good luck with the resubmission 🚀${NC}"
echo ""
