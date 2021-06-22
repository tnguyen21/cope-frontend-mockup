# Testing

Integration and end-to-end tests live in this directory.

Unit tests should live in relevant directory in an `__tests__` sub-directory within the parent directory.

For example, unit tests for a particular component should live within `components/ComponentName/__tests__`.

This helps with managing import statements for tests, code repo readability, and keeping all files related to a particular component cohesive (i.e. you won't have to look all over the repo to find files relating to debugging a component).