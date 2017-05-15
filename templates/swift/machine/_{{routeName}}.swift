import UIKit

class _<%= route.fileName %>: RouteHuman {

    override var URI: String {
        get {
            return "<%= route.URI %>"
        }
    }

    <%= route.parameterArray.map(function (param) { return 'var ' + param.name + ': String?' }).join(`
    `) %>
    <% if (route.hasParameters()) { %>
    init(<%= route.parameterArray.map(function (param) { return param.name + ': String? = nil' }).join(', ') %>) {
        super.init()
        <%= route.parameterArray.map(function (param) { return 'self.' + param.name + ' = ' + param.name }).join(`
        `) %>
    }<% } %>

    <% if (route.controller !== undefined) { %>
    override func viewController() -> UIViewController? {
        return <%= route.controller %>.loadFromStoryboard(withRoute: self);
    }
    <% } %>
    override class func isMatching(path: String) -> Bool {
        var isMatching = false
        if let matchRange = path.range(of: "<%= route.regex.split('\\').join('\\\\') %>", options: .regularExpression) {
            isMatching = !path.substring(with: matchRange).isEmpty
        }
        return isMatching
    }
    <% if (route.hasParameters()) { %>
    override func setParameters(fromPath path: String) -> Void {
        let componentArray = path.components(separatedBy: "/")
        <%= route.parameterArray.map(function (param) { return 'self.' + param.name + ' = componentArray[' + param.uriIndex + ']' }).join(`
        `) %>
    }
    <% } %>
    override func path() -> String {
        <% if (route.hasParameters()) { %>var path = self.URI
        <%= route.parameterArray.map(function (param) { return `if let ` + param.name + ` = self.` + param.name + ` { path = path.replacingOccurrences(of: ":` + param.name + `", with: ` + param.name + `) }` }).join(`
        `)%>

        path = path
            .replacingOccurrences(of: "?", with: "")
            .components(separatedBy: "/").filter({ (param) -> Bool in return param.range(of: ":") == nil })
            .joined(separator: "/");
        <% } else { %>let path = self.URI<% } %>
        return path
    }
}
