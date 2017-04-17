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
  create the router files from a json description

  parameters:
  --input  ...............  the path to the json file
  --output  ..............  the output directory (optional)
  --scheme  ..............  the app url scheme name used for the deeplink (optional)
  --language  ............  swift, html (swift by default) (optional)

  examples:
  $expedit build --input ./Router.json (build swift routes in the current directory)
  $expedit build --input ./Router.json --output ./Routes/ (build swift routes in another directory)
  $expedit build --input ./Router.json --scheme expedit (build swift routes with deeplink support)
  $expedit build --input ./Router.json --scheme expedit --language html (build deeplink html doc)

template
  usage:
  create a Router.json example file

  parameters:
  --output  ..............  the output directory (the current one by default) (optional)

  examples:
  $expedit template
```


# Features

- [x] Export Swift 3
- [x] Export HTML to test deeplink
- [x] Deeplinking support
- [x] Regex to resolve complexe parameters
- [x] Automaticly create the associated ViewController from a storyboard


# TODO
- [ ] implement multiple observers in the swift target
- [ ] improve the ios sample app
- [ ] prompt a confirmation message when obsolete files will be deleted
- [ ] make a video
- [ ] obj-c target


# Contributors

TODO