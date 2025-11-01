# Railway Deployment Guide

This Discord bot is configured to deploy easily to Railway.app.

## Quick Deploy Steps

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for Railway deployment"
   git push
   ```

2. **Go to Railway.app** and sign in with GitHub

3. **Create a New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

4. **Set Environment Variables**:
   Railway will auto-detect the project. Add these environment variables in the Railway dashboard:
   - `DISCORD_TOKEN` - Your Discord bot token
   - `GUILD_ID` - Your Discord server/guild ID
   - `APP_ID` - Your Discord application ID
   - `PUBLIC_KEY` - Your Discord application public key

5. **Deploy**:
   Railway will automatically:
   - Build the Docker image
   - Install dependencies
   - Start the bot using `pnpm start`

## Alternative: Railway CLI

You can also use the Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link your project
railway link

# Set environment variables
railway variables set DISCORD_TOKEN=your_token_here
railway variables set GUILD_ID=your_guild_id
railway variables set APP_ID=your_app_id
railway variables set PUBLIC_KEY=your_public_key

# Deploy
railway up
```

## Environment Variables

Make sure to set these in Railway:
- `DISCORD_TOKEN` - Required
- `GUILD_ID` - Required  
- `APP_ID` - Required
- `PUBLIC_KEY` - Required

## Monitoring

After deployment, you can:
- View logs in the Railway dashboard
- Check deployment status
- Monitor resource usage
- Set up custom domains (if needed)

The bot will automatically restart if it crashes (configured in `railway.json`).

