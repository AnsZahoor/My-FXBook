Write-Host "Cleaning project..." -ForegroundColor Yellow

# Remove build artifacts
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue

# Clear caches
npm cache clean --force

Write-Host "Reinstalling dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Clean complete!" -ForegroundColor Green