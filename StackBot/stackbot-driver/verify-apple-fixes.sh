#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# verify-apple-fixes.sh
# Run AFTER fix-apple-review.sh and BEFORE archiving in Xcode.
# Validates all changes are correct.
#
# Usage:
#   chmod +x verify-apple-fixes.sh
#   ./verify-apple-fixes.sh
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

PLIST="ios/App/App/Info.plist"
ENTITLEMENTS="ios/App/App/App.entitlements"
PBXPROJ="ios/App/App.xcodeproj/project.pbxproj"
LAYOUT="src/app/driver/layout.tsx"

PASS=0
FAIL=0
WARN=0

check_pass() {
  echo -e "  ${GREEN}✓ PASS${NC} — $1"
  ((PASS++))
}

check_fail() {
  echo -e "  ${RED}✗ FAIL${NC} — $1"
  ((FAIL++))
}

check_warn() {
  echo -e "  ${YELLOW}⚠ WARN${NC} — $1"
  ((WARN++))
}

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  StackBot Driver — Pre-Submission Verification${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# ── 1. UIBackgroundModes ──────────────────────────────────────────────────────
echo -e "${YELLOW}[1] UIBackgroundModes check${NC}"

if grep -q '<string>location</string>' "$PLIST" 2>/dev/null; then
  check_fail "'location' still present in UIBackgroundModes"
else
  check_pass "No 'location' in UIBackgroundModes"
fi

if grep -q '<string>fetch</string>' "$PLIST" 2>/dev/null; then
  check_pass "'fetch' present in UIBackgroundModes"
else
  check_warn "'fetch' missing from UIBackgroundModes"
fi

if grep -q '<string>remote-notification</string>' "$PLIST" 2>/dev/null; then
  check_pass "'remote-notification' present in UIBackgroundModes"
else
  check_warn "'remote-notification' missing from UIBackgroundModes"
fi
echo ""

# ── 2. Location permission keys ──────────────────────────────────────────────
echo -e "${YELLOW}[2] Location permission keys${NC}"

if grep -q 'NSLocationWhenInUseUsageDescription' "$PLIST" 2>/dev/null; then
  check_pass "NSLocationWhenInUseUsageDescription present"
else
  check_fail "NSLocationWhenInUseUsageDescription MISSING — required for @capacitor/geolocation"
fi

if grep -q 'NSLocationAlwaysUsageDescription' "$PLIST" 2>/dev/null; then
  check_fail "NSLocationAlwaysUsageDescription found — Apple will flag this as background location intent"
else
  check_pass "No NSLocationAlwaysUsageDescription"
fi

if grep -q 'NSLocationAlwaysAndWhenInUseUsageDescription' "$PLIST" 2>/dev/null; then
  check_fail "NSLocationAlwaysAndWhenInUseUsageDescription found — remove it"
else
  check_pass "No NSLocationAlwaysAndWhenInUseUsageDescription"
fi
echo ""

# ── 3. aps-environment ───────────────────────────────────────────────────────
echo -e "${YELLOW}[3] Push notification entitlements${NC}"

APS_ENV=$(grep -A1 'aps-environment' "$ENTITLEMENTS" 2>/dev/null | grep '<string>' | sed 's/.*<string>\(.*\)<\/string>.*/\1/' || echo "not found")

if [ "$APS_ENV" = "production" ]; then
  check_pass "aps-environment = production"
elif [ "$APS_ENV" = "development" ]; then
  check_fail "aps-environment = development — must be 'production' for App Store"
else
  check_warn "Could not detect aps-environment value: '$APS_ENV'"
fi
echo ""

# ── 4. Build version bumped ──────────────────────────────────────────────────
echo -e "${YELLOW}[4] Build & marketing versions${NC}"

BUILD_VER=$(grep 'CURRENT_PROJECT_VERSION' "$PBXPROJ" | head -1 | sed 's/.*= *\(.*\);/\1/' | tr -d ' ')
MARKETING_VER=$(grep 'MARKETING_VERSION' "$PBXPROJ" | head -1 | sed 's/.*= *\(.*\);/\1/' | tr -d ' ')

echo -e "  CURRENT_PROJECT_VERSION = ${CYAN}${BUILD_VER}${NC}"
echo -e "  MARKETING_VERSION       = ${CYAN}${MARKETING_VER}${NC}"

# The rejected version was MARKETING_VERSION=10, CURRENT_PROJECT_VERSION=1.7
if [ "$BUILD_VER" = "1.7" ]; then
  check_fail "CURRENT_PROJECT_VERSION still at 1.7 — must be bumped for resubmission"
else
  check_pass "CURRENT_PROJECT_VERSION bumped from 1.7"
fi

if [ "$MARKETING_VER" = "10" ]; then
  check_warn "MARKETING_VERSION still at 10 — consider bumping if Apple requires a new version number"
else
  check_pass "MARKETING_VERSION updated from 10"
fi
echo ""

# ── 5. Layout file updated ──────────────────────────────────────────────────
echo -e "${YELLOW}[5] Driver layout auth fix${NC}"

if [ ! -f "$LAYOUT" ]; then
  check_fail "$LAYOUT not found"
else
  if grep -q 'AUTH_CHECK_TIMEOUT = 5000' "$LAYOUT" 2>/dev/null; then
    check_pass "AUTH_CHECK_TIMEOUT reduced to 5000ms"
  elif grep -q 'AUTH_CHECK_TIMEOUT = 10000' "$LAYOUT" 2>/dev/null; then
    check_fail "AUTH_CHECK_TIMEOUT still at 10000ms — replace with updated layout.tsx"
  else
    check_warn "Could not detect AUTH_CHECK_TIMEOUT value"
  fi

  if grep -q '/api/driver/check-status' "$LAYOUT" 2>/dev/null; then
    check_pass "REST API fallback present in fallbackGetDoc"
  else
    check_fail "REST API fallback missing — replace with updated layout.tsx"
  fi

  if grep -q 'API_FALLBACK_TIMEOUT' "$LAYOUT" 2>/dev/null; then
    check_pass "API_FALLBACK_TIMEOUT constant present"
  else
    check_fail "API_FALLBACK_TIMEOUT missing — replace with updated layout.tsx"
  fi
fi
echo ""

# ── 6. Capacitor config check ───────────────────────────────────────────────
echo -e "${YELLOW}[6] Capacitor config${NC}"

CAP_CONFIG="capacitor.config.ts"
if [ ! -f "$CAP_CONFIG" ]; then
  CAP_CONFIG="capacitor.config.json"
fi

if [ -f "$CAP_CONFIG" ]; then
  if grep -q 'stackbotglobal.com' "$CAP_CONFIG" 2>/dev/null; then
    check_pass "Server URL points to stackbotglobal.com"
  else
    check_warn "Could not verify server URL in capacitor config"
  fi
else
  check_warn "No capacitor.config.ts or .json found"
fi
echo ""

# ── 7. Bundle ID check ──────────────────────────────────────────────────────
echo -e "${YELLOW}[7] Bundle ID${NC}"

BUNDLE_ID=$(grep 'PRODUCT_BUNDLE_IDENTIFIER' "$PBXPROJ" | head -1 | sed 's/.*= *\(.*\);/\1/' | tr -d ' ')
echo -e "  Bundle ID: ${CYAN}${BUNDLE_ID}${NC}"

if [ "$BUNDLE_ID" = "com.stackbotglobal.app" ]; then
  check_pass "Bundle ID is com.stackbotglobal.app"
else
  check_warn "Bundle ID is '$BUNDLE_ID' — verify this matches App Store Connect"
fi
echo ""

# ── Summary ──────────────────────────────────────────────────────────────────
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
TOTAL=$((PASS + FAIL + WARN))
echo -e "  Results: ${GREEN}${PASS} passed${NC}  ${RED}${FAIL} failed${NC}  ${YELLOW}${WARN} warnings${NC}  (${TOTAL} total)"

if [ $FAIL -gt 0 ]; then
  echo ""
  echo -e "  ${RED}⚠ Fix the failures above before archiving and submitting!${NC}"
  echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
  echo ""
  exit 1
else
  echo ""
  echo -e "  ${GREEN}✓ All critical checks passed — ready to archive in Xcode${NC}"
  echo ""
  echo -e "  Build steps:"
  echo -e "    ${CYAN}npm run build${NC}        # or: npx next build"
  echo -e "    ${CYAN}npx cap sync ios${NC}"
  echo -e "    ${CYAN}npx cap open ios${NC}"
  echo -e "    Xcode → Product → Archive → Distribute App"
  echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
  echo ""
  exit 0
fi
