import UIKit

class _<%= route.fileName %>: RouteHuman {

    override var URI: String { return "<%= route.URI %>" }

    override var path: String {
        <% if (route.hasParameters()) { %>var path = self.URI
        <%= route.parameterArray.map(function (param) { return `if let ` + param.name + ` = self.` + param.name + ` { path = path.replacingOccurrences(of: ":` + param.name + `", with: ` + param.name + `) }` }).join(`
        `)%>

        path = path
            .replacingOccurrences(of: "?", with: "")
            .components(separatedBy: "/").filter({ (param) -> Bool in return param.range(of: ":") == nil })
            .joined(separator: "/")
        <% } else { %>let path = self.URI<% } %>
        return path
    }
    <% if (route.controller !== "") { %>
    override var viewController: UIViewController? {
        return self.loadViewController(fromIdentifier: "<%= route.controller %>")
    }
    <% } %>

    <%= route.parameterArray.map(function (param) { return 'var ' + param.name + ': String?' }).join(`
    `) %>

    <% if (route.hasParameters()) { %>
    convenience init(<%= route.parameterArray.map(function (param) { return param.name + ': String? = nil' }).join(', ') %>) {
        self.init()
        <%= route.parameterArray.map(function (param) { return 'self.' + param.name + ' = ' + param.name }).join(`
        `) %>
    }<% } %>
    override class func isMatching(path: String) -> Bool {
        var isMatching = false
        if let matchRange = path.range(of: "<%= route.regex.split('\\').join('\\\\') %>", options: .regularExpression) {
            isMatching = !matchRange.isEmpty
        }
        return isMatching
    }
    <% if (route.hasParameters()) { %>
    override func setParameters(fromPath path: String) {
        let componentArray = path.components(separatedBy: "/")
        <%= route.parameterArray.map(function (param) { return 'self.' + param.name + ' = componentArray[' + param.uriIndex + ']' }).join(`
        `) %>
    }
    <% } %>
}
