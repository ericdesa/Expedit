# /!\ WORK IN PROGRESS /!\

# Expedit what ?

Route builder for iOS


# Installation

```
npm install -g expedit
```


# Usage

```
build
  usage:
  create the router files

  parameters:
  --input        the path to the json file
  --language     swift, html (optional, swift by default)
  --output       the output directory (optional)
  --scheme       the app url scheme name used for the deeplink (optional)

  examples:
  $expedit build --input ./Router.json (build swift routes in the current directory)
  $expedit build --input ./Router.json --output ./Routes/ (build swift routes in another directory)
  $expedit build --input ./Router.json --scheme expedit (build swift routes with deeplink support)
  $expedit build --input ./Router.json --scheme expedit --language html (build deeplink html doc)

template
  usage:
  create a Router.json example file

  parameters:
  --output       the output directory (optional)

  examples:
  $expedit template
```


# Features

- [x] Export Swift 3
- [x] Export HTML to test deeplink
- [x] Deeplinking support
- [x] Regex to resolve complexe parameters
- [x] Automaticly create the associated ViewController from a storyboard
- [ ] Multiple observers


# Contributors

TODO