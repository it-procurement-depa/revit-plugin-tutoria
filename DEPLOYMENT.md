# Deployment Guide

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended)
Your site will be automatically deployed when you push to GitHub:

1. **Push your code to GitHub**
2. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Set Source to "GitHub Actions"
3. **Your site will be live at**: `https://it-procurement-depa.github.io/revit-plugin-tutoria/`

### Option 2: Netlify (Instant Deploy)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

1. Click the button above
2. Connect your GitHub repository
3. Site will be live in 2-3 minutes with a custom URL

### Option 3: Vercel (One-Click Deploy)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with zero configuration

## Manual Build Instructions

If you need to build locally:

```bash
npm install
npm run build
```

The built files will be in the `dist/` folder.

## Sharing Your Site

Once deployed, you can share these URLs with your team:

- **GitHub Pages**: `https://it-procurement-depa.github.io/revit-plugin-tutoria/`
- **Netlify**: Will provide a custom URL like `https://amazing-site-123456.netlify.app`
- **Vercel**: Will provide a URL like `https://your-site.vercel.app`

## Custom Domain (Optional)

To use your own domain:
1. Configure DNS to point to your hosting provider
2. Add domain in your hosting platform's settings
3. Enable HTTPS (usually automatic)

## Features Included

✅ **Mobile Responsive** - Works on all devices  
✅ **Fast Loading** - Optimized for performance  
✅ **SEO Ready** - Search engine optimized  
✅ **Modern Design** - Professional documentation hub  
✅ **No Authentication** - Public access for all team members  

## Support

If you need help with deployment, check the hosting provider's documentation or create an issue in your repository.