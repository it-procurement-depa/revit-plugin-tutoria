# GitHub Pages Deployment Fix

## Problem
The website was showing a blank screen with the error:
```
Loading module from "https://it-procurement-depa.github.io/src/main.tsx" was blocked because of a disallowed MIME type ("text/html").
```

## Root Cause
The issue occurred because:
1. GitHub Actions was looking for build output in `./build` but Vite outputs to `./dist`
2. Vite wasn't configured with the correct base path for GitHub Pages deployment
3. The index.html was using absolute paths instead of relative paths

## Fixes Applied

### 1. Updated GitHub Actions Workflow
Fixed `.github/workflows/static.yml` to look for build output in the correct directory:
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: './dist'  # Changed from './build'
```

### 2. Configured Vite Base Path
Updated `vite.config.ts` to include the repository name in the base path:
```typescript
export default defineConfig({
  base: '/revit-plugin-tutoria/',  // Added this line
  // ... rest of config
});
```

### 3. Fixed Index.html Paths
Changed absolute paths to relative paths in `index.html`:
```html
<link href="./src/main.css" rel="stylesheet" />  <!-- Changed from /src/main.css -->
<script type="module" src="./src/main.tsx"></script>  <!-- Changed from /src/main.tsx -->
```

## Deployment Steps

1. **Commit and push these changes** to your GitHub repository
2. **Ensure GitHub Pages is configured**:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"
3. **The workflow will automatically run** and deploy your site
4. **Your site will be available** at: https://it-procurement-depa.github.io/revit-plugin-tutoria/

## Verification
After deployment, the site should load properly without the MIME type error. The build process will:
- Compile TypeScript to JavaScript
- Bundle all assets with correct paths
- Deploy the static files to GitHub Pages

## Future Deployments
Any future pushes to the main branch will automatically trigger a new deployment.