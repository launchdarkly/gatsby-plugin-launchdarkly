# Change log

All notable changes to the LaunchDarkly Gatsby plugin will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org).

## Next version

- Update dependencies
- Support for Gatsby 4
- Drop support for Node 10.x
- Add support for Node 16.x
## [1.0.0] - 2023-06-30
The latest version of this SDK supports LaunchDarkly's new custom contexts feature. Contexts are an evolution of a previously-existing concept, "users." For more information please read the [JavaScript SDK's latest release notes](https://github.com/launchdarkly/js-client-sdk/releases/tag/3.0.0).

For detailed information about this version, please refer to the list below. For information on how to upgrade from the previous version, please read the [react migration guide](https://docs.launchdarkly.com/sdk/client-side/react/web-migration-2-to-3).

### Added:

- The `context` configuration option has been added.

### Deprecated:

- The `user` configuration option has been deprecated. Please use `context` instead.

## [0.4.0] - 2022-11-16
### Changed:
- Bumps [launchdarkly-react-client-sdk](https://github.com/launchdarkly/react-client-sdk) from 2.23.3 to 2.29.2.

## [0.4.0] - 2022-11-16
### Changed:
- Bumps [launchdarkly-react-client-sdk](https://github.com/launchdarkly/react-client-sdk) from 2.23.3 to 2.29.2.
