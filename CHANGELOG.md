# Changelog

## 0.0.11 (09-11-2019)
### Features
* add the ability to specify a prefix on the `controller` field to be able to use multiple storyboard files (ex. `Post.DetailVC` will load the `DetailVC` of `Post.storyboard`)

### Chore
* replace the `UIViewController.loadFromStoryboard` extension with `Route.loadViewController` function

### Breaking changes
* replace the `Routable.viewController` function with a var
* replace the `Routable.path` function with a var

## 0.0.10 (12-31-2018)

#### Fix
* opening a route from RouteManager.open(path: path) cause parameters to be lost ([#2](https://github.com/ericdesa/Expedit/issues/2))
* Using RouteManager.open(path) make the app crash ([#3](https://github.com/ericdesa/Expedit/issues/3))
* The generated regex are missing a "/" before parameter labels ([#4](https://github.com/ericdesa/Expedit/issues/4))
* if the URI start with a "/" the parameter id are offset by 1 ([#5](https://github.com/ericdesa/Expedit/issues/5))

#### Chore
* upgrade dependencies
* add @discardableResult on the open route functions to don't have to assign the result

#### iOS Demo
* update the project to swift 4.2
* add the route "/article/:idArticle/comments" to illustrate deeper navigation