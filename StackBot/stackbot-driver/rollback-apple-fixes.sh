#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# rollback-apple-fixes.sh
# Restores all .bak files created by fix-apple-review.sh
#
# Usage:
#   chmod +x rollback-apple-fixes.sh
#   ./rollback-apple-fixes.sh
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

FILES=(
  "ios/App/App/Info.plist"
  "ios/App/App/App.entitlements"
  "ios/App/App.xcodeproj/project.pbxproj"
)

echo ""
echo -e "${YELLOW}Rolling back Apple review fixes...${NC}"
echo ""

RESTORED=0

for FILE in "${FILES[@]}"; do
  BAK="${FILE}.bak"
  if [ -f "$BAK" ]; then
    cp "$BAK" "$FILE"
    rm "$BAK"
    echo -e "  ${GREEN}✓ Restored${NC} $FILE"
    ((RESTORED++))
  else
    echo -e "  ${RED}✗ No backup${NC} for $FILE"
  fi
done

echo ""
if [ $RESTORED -gt 0 ]; then
  echo -e "${GREEN}Rolled back $RESTORED file(s).${NC}"
  echo -e "${YELLOW}Don't forget to also revert src/app/driver/layout.tsx if needed.${NC}"
else
  echo -e "${RED}No backup files found. Nothing to rollback.${NC}"
fi
echo ""
