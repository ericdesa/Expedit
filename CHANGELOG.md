# Changelog

## 0.0.10 (2018-12-31)

#### Bugfixes
* opening a route from RouteManager.open(path: path) cause parameters to be lost (#2)
* Using RouteManager.open(path) make the app crash (#3)
* The generated regex are missing a "/" before parameter labels (#4)
* if the URI start with a "/" the parameter id are offset by 1 (#5)

#### Chore
* upgrade dependencies
* add @discardableResult on the open route functions to don't have to assign the result

#### iOS Demo
* update the project to swift 4.2
* add the route "/article/:idArticle/comments" to illustrate deeper navigation