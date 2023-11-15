# The Shell

[![Development](https://github.com/cofoundly/calmulate.git/actions/workflows/development.yml/badge.svg?branch=develop)](https://github.com/cofoundly/calmulate.git/actions/workflows/development.yml)
[![Deploy Staging](https://github.com/cofoundly/calmulate.git/actions/workflows/deploy-staging.yml/badge.svg)](https://github.com/cofoundly/calmulate.git/actions/workflows/deploy-staging.yml)
[![Release](https://github.com/cofoundly/calmulate.git/actions/workflows/release.yml/badge.svg)](https://github.com/cofoundly/calmulate.git/actions/workflows/release.yml)
[![Deploy Production](https://github.com/cofoundly/calmulate.git/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/cofoundly/calmulate.git/actions/workflows/deploy-production.yml)

---

## What is it?

The ultimate boilerplate for building SAAS applications with React, Typescript, Tailwind CSS, Firebase and Stripe 😛 Set up your next project/prototype with minimal input, so you can do what you do best, build and test amazing new products 🔥

Transform `8 weeks` of development a few hours 🚀

---

## What's in the box?

- [React](https://reactjs.org/) ⚛️
- [Typescript](https://www.typescriptlang.org/) 📘
- [tailwindcss](https://tailwindcss.com/) for super easy styling 🎨
- [vite](https://vitejs.dev/) for blazingly fast development 🚀
- [Firebase](https://firebase.google.com/) for the backend and deployment ⚡️
- Auth flows, dashboard, settings, billing and team management ✅
- [Stripe](https://stripe.com/) integration ([that actually works](https://github.com/vercel/nextjs-subscription-payments/issues)) 💳
- A super simple, dark mode out of the box and accessible component library 🔀
- [Figma component library](https://www.figma.com/file/F26nt2RDzvDTqbwvKbZV8l/Ultimate-B2B-Saas-Boilerplate-UI) 🎨
- Automatic light and dark modes 🌓
- Mobile friendly 📱
- Looks ~~good~~ **farking beautiful** out of the box ✨
- Almost perfect [Lighthouse](https://github.com/GoogleChrome/lighthouse) scores 🏆
- [framer-motion](framer.com/motion/) animations 🎬
- [Resend](https://resend.com/) for transactional emails ⚡️
- [React Email](https://react.email/) for quick and easy email staging ✉️❤️
- [react-router-dom](https://reactrouter.com/en/main) for routing with a pre-configured Router 🧭
- [react-query](https://tanstack.com/query/latest/) for declarative query management 🦅
- [jotai](https://jotai.org/) for super simple state management 👻
- [Mixpanel](https://mixpanel.com/) for analytics 📊
- [Sentry](https://sentry.io/) for error logging 🪲
- [prettier](https://prettier.io/) for consistent formatting 💅
- [eslint](https://eslint.org/) for linting 🕵️‍♂️
- [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) for staged linting 🚫💩
- [Github Actions](https://github.com/features/actions) for CI running `lint`, `test` and `build` on every commit 🔄
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for integration testing 🐙
- [Cypress](https://www.cypress.io/) for E2E testing 🌲
- [vitest](https://github.com/vitest-dev/vitest) for testing 🔎
- [Asset and theme generation](#generating-public-assets) 🖼️
- [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) for svg support 🔗
- [react-hot-toast](https://react-hot-toast.com/) for easy to use toast notifications 🍞
- [heroicons](https://heroicons.com/) for beautiful icons 🙂
- [Storybook](https://storybook.js.org/)

---

## Setup

### Definitions

- $TEMPLATE_URL: The url of the template app, e.g. "https://github.com/cofoundly/calmulate.git.git"
- $TEMPLATE_APP_NAME: The name of the template app, e.g. `the-shell`
- $APP_NAME: The name of your app, e.g. `cofoundly`
- $GITHUB_APP_URL: The url of your Github app, e.g. "https://github.com/cofoundly/cofoundly.git"
- $ENVIRONMENT: The environment, e.g. `development`, `staging` or `production`
- $VALUE: The value of an environment variable, e.g. `1234567890`
- $DB_LOCATION: The location of your Firebase db, e.g. `us-central1`
- $SENTRY_ORG: The Sentry organisation slug, e.g. `cofoundly`

### Prequisites

- [git](https://git-scm.com/downloads)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Node.js](https://nodejs.org/en)
- [Github account](https://github.com/signup)
- [Google account](https://accounts.google.com/signup/v2/createaccount)
- [Firebase cli](https://firebase.google.com/docs/cli#install_the_firebase_cli)
- [Stripe account](https://dashboard.stripe.com/register)
- [Stripe cli](https://stripe.com/docs/stripe-cli#install)
- [Github cli](https://github.com/cli/cli#installation)
- [Sentry account](https://sentry.io/signup/)
- 2x [Resend accounts](https://resend.com/signup), one for staging and one for production
- [Mixpanel account](https://mixpanel.com/) with 2x projects, one for staging and one for production, e.g. $APP_NAME-$ENVIRONMENT
- [Figma account](https://www.figma.com/)

### Environments

We support 3 environments out of the box:

- Development: (any branch) Local development using the Firebase emulator
- Staging (`develop` branch): Remote development
- Production (`master` branch): Live environment

### Domains

- App (staging) => app.staging.$APP_NAME.com
- Web (staging) => staging.$APP_NAME.com
- Storybook (components) => storybook.$APP_NAME.com
- App (production) => app.$APP_NAME.com
- Web (production) => $APP_NAME.com

### Basic Setup

1. Clone the repo:

```
git clone $TEMPLATE_URL $APP_NAME
cd $APP_NAME
```

2. Reset the git history:

```
rm -rf .git
git init
```

3. Setup future upgrades:

```
git remote add $TEMPLATE_APP_NAME $TEMPLATE_URL
```

To apply future upgrades, see [Upgrading](#upgrading).

4. Install dependencies:

```
yarn
```

5. In this file, replace all instances of $TEMPLATE_URL with $GITHUB_APP_URL. This will ensure that your Github Actions status badges are correct.

6. In [LICENSE.md](./LICENSE.md), replace $COPYRIGHT_HOLDER with your $APP_NAME.

7. [Create a new repo in Github](https://github.com/new).

8. Push the code to Github:

```
git add .
git commit -m "feat: initial commit"
git remote add origin $GITHUB_APP_URL
git push -u origin master
```

9. The default branch, `master` will be used for production deployments. Therefore, we need to create a branch for staging, e.g. `develop`:

```
git checkout -b develop
git push -u origin develop
```

At this stage, you should see your Github actions running but the deployments will fail as we haven't setup Firebase yet.

---

### Setup Firebase

1. Login to the Firebase cli

```
firebase login
```

2. Create two Firebase projects, one for staging and one for production.

If this is the first project you're creating for this account, you'll need to create the staging project in the Firebase console first so that the Firebase terms are accepted (feel free to disable Google Analytics). Then you can use the cli to create the production project as per the command below. If you already have a project, you can skip this step.

```
firebase projects:create $APP_NAME-staging
firebase projects:create $APP_NAME-production
```

3. For each project, enable Cloud Firestore by visiting https://console.firebase.google.com/project/_/firestore and clicking "Create database". It's best to choose a location that is closest to your userbase. Feel free to "Start in production mode", the firebase rules and indices will be deployed automatically when you merge into `develop` (staging) or `master` (production).

4. For each project, [enable the Blaze plan](https://console.firebase.google.com/project/_/usage/details). This is required for Firebase Functions. You will not be charged unless you exceed the free tier. You can also set a spending limit.

5. Create your `app`, `functions` and `website` env files:

```
cp ./packages/app/.env.example ./packages/app/.env.development
cp ./packages/app/.env.example ./packages/app/.env.staging
cp ./packages/app/.env.example ./packages/app/.env.production
cp ./packages/functions/.env.example ./packages/functions/.env.development
cp ./packages/functions/.env.example ./packages/functions/.env.staging
cp ./packages/functions/.env.example ./packages/functions/.env.production
cp ./packages/website/env/.env.example ./packages/website/env/.env.development
cp ./packages/website/env/.env.example ./packages/website/env/.env.staging
cp ./packages/website/env/.env.example ./packages/website/env/.env.production
```

6. For each project, create web apps by visiting https://console.firebase.google.com/project/_/settings/general/web and clicking "Add app", a good name is simply "app". Select "Also set up Firebase Hosting for this app". You can use the same config for `development` and `staging`. Copy the config for each app and paste them into [app/.env.development](packages/app/.env.development), [website/.env.development](packages/website/.env.development), [app/.env.staging](./packages/app/.env.staging), [wesbite/.env.staging](./packages/website/.env.staging), [app/.env.production](./packages/app/.env.production) and [website/.env.production](./packages/website/.env.production).

7. Set the MODE env var in the website env files to the relevant $ENVIRONMENT, e.g. in [website/.env.development](./packages/website/.env.development) set `MODE=development`.

8. For each project, [Enable Email/Password Sign-in](https://console.firebase.google.com/u/0/project/_/authentication/providers) by clicking on "Get started" => "Add new provider" => "Email/Password" => "Enable".

9. For each project, set the emails Action URL by vising https://console.firebase.google.com/u/0/project/_/authentication/emails, click any email template, click the edit icon, click "Customize action URL" at the bottom and set it to https://$APP_NAME-$ENVIRONMENT.web.app/user-management.

10. Create a site for your Storybook by visiting https://console.firebase.google.com/u/0/project/$APP_NAME-staging/hosting/main, scrolling to the bottom of the page, clicking "Add another site" and following the instructions. A good name for this site is `$APP_NAME-storybook`. FYI you only need a storybook site for your staging environment.

11. For each project, create another site for your Website by visiting https://console.firebase.google.com/u/0/project/_/hosting/main, scrolling to the bottom of the page, clicking "Add another site" and following the instructions. A good name for this site is `$APP_NAME-$ENVIRONMENT-website`.

12. Recreate the [.firebaserc](./.firebaserc) with the following command:

```
cp ./.firebaserc.example ./.firebaserc
```

13. Replace all instances of the $TEMPLATE_APP_NAME with your $APP_NAME.

14. For each project, create a new service account at https://console.cloud.google.com/iam-admin/serviceaccounts. Select your project, click "CREATE SERVICE ACCOUNT", add a name, e.g. "github-actions", click "CREATE AND CONTINUE", select the "Owner" role, click "CONTINUE", click "DONE", click on the service account you just created, click "KEYS", click "ADD KEY", click "Create new key", select "JSON", click "CREATE" and download to the root as `service-account-staging.json` and `service-account-production.json`.

15. Add the paths of your service accounts to [website/env/.env.development](./packages/website/env/.env.development), [website/env/.env.staging](./packages/website/env/.env.staging) and [website/env/.env.production](./packages/website/env/.env.production) as `GOOGLE_APPLICATION_CREDENTIALS`. You can use the same one for `development` and `staging`.

16. Push your service accounts to Github so that the deploy workflows can fetch data for the website deployment:

```
gh auth login
gh secret set GOOGLE_APPLICATION_CREDENTIALS_STAGING < ./service-account-staging.json
gh secret set GOOGLE_APPLICATION_CREDENTIALS_PRODUCTION < ./service-account-production.json
```

17. Add the relavant hosting url's to [website/.env.staging](./packages/website/.env.staging) and [website/.env.production](./packages/website/.env.production) as `NEXT_PUBLIC_URL` (your website domain), `NEXT_PUBLIC_APP_URL` (your app url), `NEXT_PUBLIC_APP_SIGN_IN_URL` (your app sign in page) and `NEXT_PUBLIC_APP_SIGN_UP_URL` (your app sign up page). Set the [website/.env.development](<(./packages/website/.env.development)>) `NEXT_PUBLIC_URL` to `http://localhost:3000` and the `NEXT_PUBLIC_APP_*` urls to `http://localhost:5173`, ie. the url you're serving the local `app` on.

#### Using a custom domain

1. For each project and for each site, connect your custom domain by visiting https://console.firebase.google.com/u/0/project/_/hosting/main, clicking "Add custom domain", adding your domain and following the instructions. A good system for subdomains can be found in the [Domains](#domains) section.

2. Update the website urls in [website/.env.staging](./packages/website/.env.staging) and [website/.env.production](./packages/website/.env.production) and push your env files to Github again.

3. For each project, add your domain to the whitelisted domains by visiting https://console.firebase.google.com/u/0/project/_/authentication/settings, clicking "Authorized domains" and adding your domain.

4. For each project, update the emails Action URL by vising https://console.firebase.google.com/u/0/project/_/authentication/emails, click any email template, click the edit icon, click "Customize action URL" at the bottom and set it to https://$CUSTOM_DOMAIN/user-management.

5. If you already deployed your Firebase functions before adding your custom domain, you'll need to delete them and redeploy (I know right 😅).

---

### Setup Stripe

1. Enable Test mode in the [Stripe dashboard](https://dashboard.stripe.com/test/dashboard).

2. [Upgrade the Stripe API version](https://dashboard.stripe.com/test/developers) to the latest version, `2022-11-15`. By doing this, we ensure that our functions use the same version of Stripe.

3. Login into the Stripe cli:

```
stripe login
```

---

#### Stripe webhooks

The Stripe webhook will ensure that any activity in Stripe is updated in your Firebase db's, e.g. if a product is created in the Stripe test environment, add it to the products collection in the Firebase development and staging environments and if a product is created in the Stripe live environment, add it to the products collection in the Firebase production environment. The same applies to customer and subscription related activity.

##### Connect test Stripe webhook to development

The following steps will setup your Firebase development environment with your Stripe test environment.

1. Run the stripe webhook listener locally:

```
cd ./packages/functions
yarn dev:stripe
```

2. Once your Stripe webhook is created, copy the Signing secret.

3. Grab your [test Stripe API key](https://dashboard.stripe.com/test/apikeys) (Secret key).

4. Add the secrets to [functions/.env.development](./packages/functions/.env.development).

---

##### Connect test Stripe webhook to staging

The following steps will setup your Firebase staging environment with your Stripe test environment.

1. In [test Stripe webhooks](https://dashboard.stripe.com/test/webhooks/create), paste your **staging** stripe-webhook firebase functions url, e.g. https://$DB_LOCATION-$APP_NAME-staging.cloudfunctions.net/stripeWebhookFunction, add a description, click "Select Events", check "Select all events", click "Add events" and click "Add endpoint".

2. Once your Stripe webhook is created, copy the Signing secret.

3. Add the secrets to [functions/.env.staging](./packages/functions/.env.staging).

---

##### Connect live Stripe webhook to production

The following steps will setup your Firebase production environment with your Stripe live environment.

1. In [live Stripe webhooks](https://dashboard.stripe.com/test/webhooks/create), paste your **production** stripe-webhook firebase functions url, e.g. https://$DB_LOCATION-$APP_NAME-production.cloudfunctions.net/stripeWebhookFunction, add a description, click "Select Events", check "Select all events", click "Add events" and click "Add endpoint".

2. Once your Stripe webhook is created, copy the Signing secret.

3. Grab your [live Stripe API key](https://dashboard.stripe.com/apikeys) (Secret key).

4. Add the secrets to [functions/.env.production](./packages/functions/.env.production).

---

#### Creating products in Stripe

##### Team Plan

To enable the teams feature, users must have a subscription on the team plan. To create a team plan, simply add the `teamPlan` property to the relevant product's **metadata**:

```ts
{
  teamPlan: true
}
```

##### Feature List

When adding features that populate the pricing cards, we do not use Stripe's `Feature list` property but rather the product's **metadata** as follows:

```ts
{
  features: string[];
}
```

##### Free trials

We support free trials out of the box. To add a free trial to a product, simply add the `freeTrialDays` property to the relevant product's **metadata**:

```ts
{
  freeTrialDays: number
}
```

---

### Setup Sentry

1. Create a single project in [Sentry](https://sentry.io/projects/new/) and name it $APP_NAME. Select "React" as the platform.

2. Copy the `dsn` key. This is your `VITE_SENTRY_DSN`.

3. [Create a Sentry Auth Token](https://$SENTRY_ORG.sentry.io/settings/auth-tokens/new-token/). This is your `VITE_SENTRY_AUTH_TOKEN`.

4. Grab your "Organization Slug" from [Settings](https://sentry.io/settings/organization/). This is your `VITE_SENTRY_ORG`.

5. Your `VITE_SENTRY_PROJECT` is simply $APP_NAME (as in Step 1).

6. Your `VITE_SENTRY_ENV` is simply $ENVIRONMENT.

7. Add the secrets to [app/.env.staging](./packages/app/.env.staging) and [app/.env.production](./packages/app/.env.production).

8. Push the secrets to Github so that the deploy workflows can deploy sentry releases.

```
gh secret set SENTRY_AUTH_TOKEN --body $VALUE
gh secret set SENTRY_ORG --body $VALUE
gh secret set SENTRY_PROJECT --body $VALUE
```

9. [Connect your Github repo to Sentry](https://cofoundly.sentry.io/settings/integrations/github/) by clicking "Add Installation".

### Setup Resend

1. Add an API key to each of your Resend accounts (staging and production).

2. Add the secrets to [functions/.env.development](./packages/functions/.env.development), [functions/.env.staging](./packages/functions/.env.staging) and [functions/.env.production](./packages/functions/.env.production). You can use the same one for `development` and `staging`.

3. Add and verify your custom domain with Resend by visiting https://resend.com/domains, clicking "Add domain" and following the instructions. It's good practice to use a subdomain, e.g. `transactional.$APP_NAME.com`.

---

### Setup Mixpanel

1. Grab your staging and production project tokens from your "Project Settings" - "Access Keys" - "Project Token" and them to the respective files at [app/.env.staging](./packages/app/.env.staging), [app/.env.production](./packages/app/.env.production), [website/.env.staging](./packages/website/env/.env.staging), [website/.env.production](./packages/website/env/.env.production).

---

### Test your local setup

At this point, it's a good idea to test that everything is working. Run the following command in the root folder to spin up your `app`, `functions` and `website`.

```
yarn firebase:use development
yarn dev
```

You can also test if you're able to deploy at this stage. The functions deployment usually fails the first time but if it does, just retry.

```
yarn deploy:staging
```

### Setup Figma

1. Duplicate the [Figma component library](https://www.figma.com/file/F26nt2RDzvDTqbwvKbZV8l/Ultimate-B2B-Saas-Boilerplate-UI) to your own workspace by right clicking on the file name and clicking "Duplicate to your drafts".

2. Follow the steps in [Figma Development](#figma).

3. Update the Logo component in Figma with your new logo.

### Setup automated deploys

1. Combine your env files:

```
cat ./packages/app/.env.staging > .env.staging
cat ./packages/app/.env.production > .env.production
echo >> .env.staging
echo >> .env.production
cat ./packages/functions/.env.staging >> .env.staging
cat ./packages/functions/.env.production >> .env.production
echo >> .env.staging
echo >> .env.production
cat ./packages/website/env/.env.staging >> .env.staging
cat ./packages/website/env/.env.production >> .env.production
```

2. Remove the local GOOGLE_APPLICATION_CREDENTIALS env variable:

```
sed -i '' '/GOOGLE_APPLICATION_CREDENTIALS/d' .env.staging
sed -i '' '/GOOGLE_APPLICATION_CREDENTIALS/d' .env.production
```

3. Push the env files to Github:

```
gh secret set ENV_FILE_STAGING < .env.staging
gh secret set ENV_FILE_PRODUCTION < .env.production
rm .env.staging .env.production
```

Every time you push to `develop`, the app will be deployed to staging.

### Setup automated releases

1. Create a [Github personal access token](https://github.com/settings/tokens/new) with the `repo` scope and push it to Github:

```
gh secret set GH_TOKEN --body $VALUE
```

That's it, you're done! Every time you push to `master`, a release will automatically be created and the app will be deployed to production.

### Make it your own

1. Update [app.json](./packages/config/src/app.json).

2. Generate your theme colors where `themeColor` and `neutralColor` are any of the [tailwind colors](https://tailwindcss.com/docs/customizing-colors):

```
cd ./packages/scripts
yarn build:theme --themeColor teal --neutralColor gray
```

3. Update [logo.svg](./packages/config/src/logo.svg) with your logo. If you don't have a logo, just grab an icon from https://heroicons.com/ and move on with life. It should be a **square svg**, size does not count in this case 😉 The outermost `fill` or `stroke` attribute should be set to `currentColor`.

4. Run the script:

```
yarn build:assets
```

And boom 💣🎆, you have all the optimised public assets you'll need 😎✅

---

### Test your remote setup

1. Push your changes to `develop`:

```
git add .
git commit -m "feat: initial setup"
git push -u origin develop
```

2. Check that your Github Actions are running and that your app is deployed to Firebase.

---

## Development

Run the following command to start the app development server, Storybook server, Firebase emulator and Stripe listener:

```
yarn dev
```

To start the email development server, run:

```
cd ./packages/emails
yarn dev:emails
```

---

### Figma

When updating your theme using the [generateTheme](./packages/scripts/src/generateTheme/index.ts) script, you'll need to update your color styles in Figma. If you have not updated the `neutral` color, you only need to update the `brand` colors in the `theme` and `dark-theme` folders. You can do this by simply copy and pasting from [the themeColors file](./packages/config/src/themeColors.json) into the Figma color styles.

---

### Website blog

To add a new blog post, create a new markdown file in [website/blog](./packages/website/src/blog/posts) and add the following frontmatter:

---

date:
image:
title:
description:
authorImage:
authorName:
authorTitle:

---

It will automatically be added to the blog page.

### Testing

Our testing approach is to focus on testing user interactions and avoid testing implementation details. Unit tests are added for utils, util hooks and hooks that integrate with other hooks. Integration tests are added for components and their integration with api hooks. E2E tests are added for user flows.

### Test Cases

These are the test cases that we should cover (manually for now):

- app
  - auth
    - sign up
    - forgot password
      - sign in old password should fail
      - sign in new password
  - account settings
    - change name
    - change email
    - change password
    - delete account
  - billing
    - purchase subscription with trial => can access dashboard, can see billing details, can manage plan, cannot add seats, cannot access teams
    - purchase normal subscription => can access dashboard, can see billing details, can manage plan, cannot add seats, cannot access teams
    - purchase subscription with team plan => can access dashboard, can manage plan, can see billing details, can add seats, can access teams
  - teams
    - change team name
    - add subscription seats
    - invite team member (new user)
      - new user can sign up and view team
      - should see Subscription managed by another user in Subscriptions page
      - team member cannot add invite, manage team members or change team name
    - invite team member (existing user)
      - existing user can sign in and view team
      - should see Subscription managed by another user in Subscriptions page
      - team member cannot add invite, manage team members or change team name
    - change team member role to admin
      - team member can add invite, manage team members and change team name
    - remove team member
  - errors
    - are errors captured in sentry in the correct env?
  - analytics
    - are events captured in mixpanel in the correct project?
- website
  - billing
    - purchase any subscription (new user)
    - purchase any subscription (existing user)
- storybook
  - are all components rendered correctly?✅

---

### Upgrading

To upgrade your project with commits from the template, run the following command where $REMOTE_BRANCH is the branch you'd like to pull from, e.g. $TEMPLATE_APP_NAME/master:

```
./packages/scripts/src/upgrade.sh $REMOTE_BRANCH
```

You can also add another remote to your local repo and pull from that, e.g.:

```
git remote add cofoundly SOME_URL
./packages/scripts/src/upgrade.sh cofoundly/master
```
