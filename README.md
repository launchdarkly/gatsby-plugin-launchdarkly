# gatsby-plugin-launchdarkly

A simple plugin that integrates [LaunchDarkly](https://launchdarkly.com) into
your Gatsby site. This will allow you to use feature flags to rollout new
features on your site.

## Installation

Add plugin to your Gatsby site:

```bash
npm install gatsby-plugin-launchdarkly
```

Then in your `gatsby-config.js`:

```js
// gatsby-config.js
...
  plugins: [
    ...
    {
      resolve: 'gatsby-plugin-launchdarkly',
      options: {
        clientSideID: '<your-launchdarkly-project-client-side-id>',
        options: {
          // any LaunchDarkly options you may want to implement
          bootstrap: 'localStorage', // caches flag values in localStorage
        },
      },
    },
    ...
  ]
...
```

This plugin uses [LaunchDarkly's React
SDK](https://docs.launchdarkly.com/sdk/client-side/react/react-web). The SDK requires a
**client-side ID** which you can retrieve from your [LaunchDarkly Project
settings page](https://app.launchdarkly.com/settings/projects). This
**client-side ID** needs to be stored in your
[gatsby-config.js](https://www.gatsbyjs.org/docs/api-files-gatsby-config/).

Behind the scenes, this plugin uses the React SDK's `withLDProvider` function to initialize the client. Read the documentation on [`Initializing the React SDK`](https://docs.launchdarkly.com/sdk/client-side/react/react-web#initializing-the-react-sdk) to understand other configuration options you can provide.

To learn more about the configuration options available in the plugin's `options` property, read the documentation on [configuration in the JavaScript SDK](https://docs.launchdarkly.com/sdk/features/config#javascript).

## Basic usage

To use a LaunchDarkly feature flag in your component, first import the `LaunchDarklyContext`. This plugin uses [React Context](https://reactjs.org/docs/context.html) to make the LaunchDarkly SDK
available to your Gatbsy components.

```js
import { useFlags } from 'gatsby-plugin-launchdarkly'
```

Then within your component, you can do the following:

```jsx
// In a functional component...
const Header = ({ siteTitle }) => {
  // The following contains all of the client-side flags. Flag names are
  // automatically converted to snake-case which will allow you to pull out
  // one or more flags directly through destructuring.
  const flags = useFlags()

  return (
    <header
      style={{
        background: flags.someNewFeature ? 'green' : 'gray'
      }}
    >
...
```

*Note that the LaunchDarkly SDK will automatically convert flag names to
snake-case.*

In addition to the `useFlags` hook, the [`useLDClient`](https://docs.launchdarkly.com/sdk/client-side/react/react-web#hooks) hook gives you direct access to the LaunchDarkly client:

```jsx
import React from 'react';
import { useFlags, useLDClient } from 'gatsby-plugin-launchdarkly';

const HooksDemo = () => {
  const { someNewFeature } = useFlags();
  const ldClient = useLDClient();

  const onLoginSuccessful = () => ldClient.identify({ kind: 'user', key: 'user-key-123abc' });

  return (
    <div>{someNewFeature ? 'Flag on' : 'Flag off'}</div>
  );
};

export default HooksDemo;
```

If you're using class components, you can use the `withLDConsumer` higher-order
component to do this instead:

```jsx
import { withLDConsumer } from 'gatsby-plugin-launchdarkly'

// In your class component...
class MyComponent extends React.Component {
  render() {
    // Wrapping your class component with the withLDConsumer HOC injects the
    // flags and ldClient props into your component
    const { flags, ldClient } = this.props;

    return
      <header
        style={{
          background: flags.someNewFeature ? 'green' : 'gray'
      }}
    ...
    >
  }
}

export default withLDConsumer()(MyComponent)
```

The `withLDConsumer` HOC injects the `flags` and `ldClient` as props to your
class component.

## Advanced usage

This plugin assumes that the end user viewing your site is anonymous, which is likely the
case for most Gatsby sites. In this situation, the LaunchDarkly SDK uniquely
tracks each end user and remembers what variation of each flag was served to them.
This is transparent and you don't need to do anything else to make it work this
way.

If you have a logged-in end user, and can identify that end user to LaunchDarkly and then target that end user for a feature. To do this, access the `LDClient` object directly:

```jsx
import React from 'react';
import { useFlags, useLDClient } from 'gatsby-plugin-launchdarkly';

const HooksDemo = () => {
  const { someNewFeature } = useFlags();
  const ldClient = useLDClient();

  // Calling `identify` will cause the flags to be re-evaluated for the
  // new end user that's logged in. Changes in flag values will stream in and
  // could cause your component to re-render.
  const onLoginSuccessful = (user) => ldClient.identify({
    kind: 'user',
    key: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    anonymous: false,
  });

  return (
    <div>{someNewFeature ? 'Flag on' : 'Flag off'}</div>
  );
};

export default HooksDemo;
```

To learn more about changing the user context, read the [`identify` documentation for the JavaScript SDK](https://docs.launchdarkly.com/sdk/features/identify#javascript).

## Contributing

We encourage pull requests and other contributions from the community. Check out our [contributing guidelines](CONTRIBUTING.md) for instructions on how to contribute to this plugin.

## About LaunchDarkly

* LaunchDarkly is a continuous delivery platform that provides feature flags as a service and allows developers to iterate quickly and safely. We allow you to easily flag your features and manage them from the LaunchDarkly dashboard.  With LaunchDarkly, you can:
    * Roll out a new feature to a subset of your users (like a group of users who opt-in to a beta tester group), gathering feedback and bug reports from real-world use cases.
    * Gradually roll out a feature to an increasing percentage of users, and track the effect that the feature has on key metrics (for instance, how likely is a user to complete a purchase if they have feature A versus feature B?).
    * Turn off a feature that you realize is causing performance problems in production, without needing to re-deploy, or even restart the application with a changed configuration file.
    * Grant access to certain features based on user attributes, like payment plan (eg: users on the ‘gold’ plan get access to more features than users in the ‘silver’ plan). Disable parts of your application to facilitate maintenance, without taking everything offline.
* LaunchDarkly provides feature flag SDKs for a wide variety of languages and technologies. Read [our documentation](https://docs.launchdarkly.com/sdk) for a complete list.
* Explore LaunchDarkly
    * [launchdarkly.com](https://www.launchdarkly.com/ "LaunchDarkly Main Website") for more information
    * [docs.launchdarkly.com](https://docs.launchdarkly.com/  "LaunchDarkly Documentation") for our documentation and SDK reference guides
    * [apidocs.launchdarkly.com](https://apidocs.launchdarkly.com/  "LaunchDarkly API Documentation") for our API documentation
    * [blog.launchdarkly.com](https://blog.launchdarkly.com/  "LaunchDarkly Blog Documentation") for the latest product updates

