import UIKit

class _<%- route.fileName %>: RouteBase {

    <%- route.parameterArray.map(function (param) { return 'var ' + param.name + ': String?' }).join(`
    `) %>

    init(<%- route.parameterArray.map(function (param) { return param.name + ': String?' }).join(', ') %>) -> <%- route.fileName %> {
        super.init()
        <%- route.parameterArray.map(function (param) { return 'self.' + param.name + ' = ' + param.name }).join(`
        `) %>
    }

    override class func viewController() -> UIViewController? {
        return <%- route.controller %>.loadFromStoryboard(withRoute: self);
    }

    override class func isMatching(path: String) -> Bool {
        let pathRange = string.characters.indices
        let matchRange = string.rangeOfString("<%- route.regex %>", options: .RegularExpressionSearch)
        let isMatching = matchRange == pathRange
        return isMatching
    }
}
