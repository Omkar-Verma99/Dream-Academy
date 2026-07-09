# DREAM Academy — Sanity CLI setup (run once after `npx sanity login`)
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

if (-not $env:NEXT_PUBLIC_SANITY_PROJECT_ID) {
  $env:NEXT_PUBLIC_SANITY_PROJECT_ID = "r7loshm7"
}
$env:NEXT_PUBLIC_SANITY_DATASET = "production"

Write-Host "`n=== DREAM Academy Sanity setup ===" -ForegroundColor Cyan
Write-Host "Project ID: $env:NEXT_PUBLIC_SANITY_PROJECT_ID`n"

Write-Host "Checking CLI login..."
$prevEap = $ErrorActionPreference
$ErrorActionPreference = "Continue"
$debug = npx sanity debug 2>&1 | Out-String
$ErrorActionPreference = $prevEap
if ($debug -match "Not logged in") {
  Write-Host "ERROR: Not logged in. Run this first (choose Google, same account as Sanity dashboard):" -ForegroundColor Red
  Write-Host "  npx sanity login`n"
  exit 1
}

Write-Host "Adding CORS for local dev..."
npx sanity cors add http://localhost:3000 --credentials 2>&1 | Out-Null
npx sanity cors add http://localhost:3001 --credentials 2>&1 | Out-Null
Write-Host "  OK localhost:3000 and :3001"

Write-Host "Deploying content schema..."
npx sanity schema deploy
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if ($env:SANITY_API_TOKEN) {
  Write-Host "Seeding sample camps and events..."
  node scripts/seed-sanity.mjs
} else {
  Write-Host "Skip seed: add SANITY_API_TOKEN to .env to auto-seed (optional)."
}

Write-Host "`n=== Done ===" -ForegroundColor Green
Write-Host "1. Restart: npm run dev"
Write-Host "2. Open:  http://localhost:3000/studio"
Write-Host "3. Invite editors at https://www.sanity.io/manage`n"
