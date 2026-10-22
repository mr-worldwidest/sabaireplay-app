# sabaireplay.app — website

Static site for the Sabai Replay iOS app: `index.html`, `terms.html`, `privacy.html`, `support.html`.

## The app is a separate repo

The iOS app is `mr-worldwidest/sabai-round-replay`, checked out at `~/GitHub/sabai-round-replay` (read its `CLAUDE.md`). Each repo keeps its own branches, commits and PRs.

These pages are part of the app's App Store compliance, so check the app before changing them:
- `terms.html` — the app's paywall links here (`AppConfig.termsURL`), and App Store Connect uses the same terms.
- `privacy.html` — must match the app's `PrivacyInfo.xcprivacy` and App Store privacy labels: Supabase (Apple user ID, email, name), Mixpanel (usage events, onboarding answers, coarse location from IP), RevenueCat (purchases). Training videos never leave the phone.
- `support.html` — restore, cancel and delete-account steps must match the app's real flows.

All pages must stay public with no login: App Review opens them.
