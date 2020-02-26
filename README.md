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
module.exports = {
  plugins: [
    ...
    'gatsby-plugin-launchdarkly',
    ...
  ],
}
```

This plugin uses [LaunchDarkly's client-side JavaScript
SDK](https://docs.launchdarkly.com/docs/js-sdk-reference). The SDK requires a
**client-side ID** which you can retreive from your [LaunchDarkly Project
settings page](https://app.launchdarkly.com/settings/projects). This
**client-side ID** needs to be stored in a [Gatsby environment
variable](https://www.gatsbyjs.org/docs/environment-variables/). In your
`.env.development` or `.env.production` add the following environment variables:

```bash
LD_CLIENT_ID=<Your LaunchDarkly Client-Side ID>
LD_CLIENT_OPTIONS=<Additional SDK options>  # For example: {"bootstrap": "localstorage"}
```

The `LD_CLIENT_OPTIONS` variable is for [additional SDK
options](https://docs.launchdarkly.com/docs/js-sdk-reference#section-customizing-your-client).
You can omit this variable if you don't have additional options to supply. This
value should be a stringified JSON object.

## Basic usage

In order to use a LaunchDarkly feature flag in your component, you'll need to
first import the `LaunchDarklyContext`. This plugin makes use of [React
Context](https://reactjs.org/docs/context.html) to make the LaunchDarkly SDK
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

In addition to the `useFlags` hook, there's also the
[`useLDClient`](https://docs.launchdarkly.com/sdk/client-side/react#hooks) hook
which gives you direct access to the LaunchDarkly client.

```jsx
import React from 'react';
import { useFlags, useLDClient } from 'gatsby-plugin-launchdarkly';

const HooksDemo = () => {
  const { someNewFeature } = useFlags();
  const ldClient = useLDClient();

  const onLoginSuccessful = () => ldClient.identify({ key: 'aa0ceb' });

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

This plugin assumes that the user viewing your site is anonymous -- likely the
case for most Gatsby sites. In this case, the LaunchDarkly SDK will uniquely
track your a client so it remembers what variation of the flag was served to it.
This is transparent and you don't need to do anything else to make it work this
way.

However, there might be a case where you actually have a logged in user (not an
anonymous user) and you may want to let LaunchDarkly know that in case you may
want to target that user for a feature. In this case, you'll want to access the
`ldclient` object directly:

```jsx
import React from 'react';
import { useFlags, useLDClient } from 'gatsby-plugin-launchdarkly';

const HooksDemo = () => {
  const { someNewFeature } = useFlags();
  const ldClient = useLDClient();

  // Calling `identify` will cause the flags to be re-evaluated for the new
  // user that's logged in. Changes in flag values will stream in and could
  // cause your component to re-render.
  const onLoginSuccessful = (user) => ldClient.identify({
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

More information about [changing the user context can be found
here](https://docs.launchdarkly.com/docs/js-sdk-reference#section-changing-the-user-context).

## Contributing

This plugin is maintained by LaunchDarkly, but is not currently supported.
Please feel free to fork and send PRs our way.
