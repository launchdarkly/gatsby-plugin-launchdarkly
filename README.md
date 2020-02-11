# gatsby-plugin-launchdarkly

A simple plugin that integrates [LaunchDarkly](https://launchdarkly.com) into
your Gatsby site. This will allow you to use feature flags to rollout new features
on your site.

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

This plugin uses [LaunchDarkly's client-side JavaScript SDK](https://docs.launchdarkly.com/docs/js-sdk-reference).
The SDK requires a **client-side ID** which you can retreive from your
[LaunchDarkly Project settings page](https://app.launchdarkly.com/settings/projects). This **client-side ID**
needs to be stored in a [Gatsby environment variable](https://www.gatsbyjs.org/docs/environment-variables/).
In your `.env.development` or `.env.production` add the following environment variables:

```bash
LD_CLIENT_ID=<Your LaunchDarkly Client-Side ID>
LD_CLIENT_OPTIONS=<Additional SDK options>  # For example: {"bootstrap": "localstorage"}
```

The `LD_CLIENT_OPTIONS` variable is for
[additional SDK options](https://docs.launchdarkly.com/docs/js-sdk-reference#section-customizing-your-client).
You can omit this variable if you don't have additional options to supply. This value should be a stringified JSON
object.

## Basic usage

In order to use a LaunchDarkly feature flag in your component, you'll need to first import the `LaunchDarklyContext`.
This plugin makes use of [React Context](https://reactjs.org/docs/context.html) to make the LaunchDarkly SDK available
to your Gatbsy components.

```js
import { LaunchDarklyContext } from 'gatsby-plugin-launchdarkly'
```

Then within your component, you can do the following:

```jsx
// In a functional component...
const Header = ({ siteTitle }) => {
  const { variation } = useContext(LaunchDarklyContext)

  return (
    <header
      style={{
        background: variation('some-new-feature', false) ? 'green' : 'gray'
      }}
    >
...
```

In addition to the `variation('<flag-key>', <default-value>)` function, the `LaunchDarklyContext` also contains the current state of all `flags` and the `ldclient` (the [initialized LaunchDarkly client SDK](https://docs.launchdarkly.com/docs/js-sdk-reference#section-initializing-the-client)).

If you're using class components, you can do this instead:

```jsx
import { LaunchDarklyContext } from 'gatsby-plugin-launchdarkly'

// In your class component...
class MyClass extends React.Component {
  static contextType = LaunchDarklyContext;
  render() {
    const { variation } = this.context;
    return
      <header
        style={{
          background: variation('some-new-feature', false) ? 'green' : 'gray'
      }}
    ...
    >
  }
}
```

## Advanced usage

This plugin assumes that the user viewing your site is anonymous -- likely the case for most Gatsby sites.
In this case, the LaunchDarkly SDK will uniquely track your a client so it remembers what variation of the flag
was served to it. This is transparent and you don't need to do anything else to make it work this way.

However, there might be a case where you actually have a logged in user (not an anonymous user) and you may want to
let LaunchDarkly know that in case you may want to target that user for a feature. In this case, you'll want to
access the `ldclient` object directly:

```jsx
// In a functional component...
const Header = ({ siteTitle }) => {
  const { ldclient } = useContext(LaunchDarklyContext)
  ldclient.identify({
    key: <a unique key for your user>,
    ...
    <any other properties you'd like LaunchDarkly to know about so you can target users that match those properties>
    ...
  })

  return (
    <header
      style={{
        background: variation('some-new-feature', false) ? 'green' : 'gray'
      }}
    >
...
```

More information about
[changing the user context can be found here](https://docs.launchdarkly.com/docs/js-sdk-reference#section-changing-the-user-context).

## Contributing

This plugin is maintained by LaunchDarkly, but is not currently supported. Please feel free to fork and send PRs our way.
