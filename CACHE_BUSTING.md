# Cache busting

Every deployment must increment `ASSET_VERSION` in asset URLs.

For deployment V5, use `?v=5` on CSS, app entrypoint, and ES-module imports. Future deploys should increment the value (`v=6`, `v=7`, ...).
