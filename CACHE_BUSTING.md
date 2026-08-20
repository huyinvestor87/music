# Cache busting

Every deployment increments the asset query version.

Current deployment: `v=5`

Update `styles.css?v=N`, `app.js?v=N`, and ES module imports to the same version before merging each deployment.
