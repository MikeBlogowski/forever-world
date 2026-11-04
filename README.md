# The Forever World — Adventurer's Journal

A Minecraft Bedrock Survival quest journal and progress tracker.

## Current status

This is the first standalone app scaffold. It includes:
- Eight progressive campaign chapters with a starter set of quests
- Main and side quest tracking
- Chapter unlocks based on previous chapter main quests
- Adventure points and ranks
- World milestone checklist
- Local progress storage
- JSON export and import backups
- Installable PWA foundation with offline caching

The campaign content is an initial starter set and will be expanded and refined as the project develops.

## Run locally

Open `index.html` in a local web server. For PWA installation and offline support, serve the project over HTTPS (or localhost during development).

## GitHub Pages

In the repository settings, open **Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save. GitHub will publish the site at the Pages URL shown there.

## Progress and privacy

Progress is stored in the browser's local storage on the device. It is not uploaded to GitHub or any cloud service. Export a JSON backup regularly. Clearing browser/site data can erase local progress.

## Compatibility

Designed for Minecraft Bedrock Edition. Farm and redstone guides should be checked for Bedrock-specific mechanics.

## Roadmap

- Improve the campaign quest library and balancing
- Add world profiles and richer collection tracking
- Add custom quests and optional community quest packs
- Improve mobile experience and accessibility
- Consider optional sync only if needed
