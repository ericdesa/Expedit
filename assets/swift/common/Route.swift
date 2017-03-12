
import UIKit

class _RouteBase: NSObject {

    class func isMatching(path: String) -> Bool {
        // implemented in subclass
        return false
    }

    func open() -> void {
        // call the delegate
    }

    class func viewController() -> UIViewController? {
        // implemented in subclass
        return nil;
    }

    class func openRoute(path: String) -> Bool {
        if let route = self.findRoute(path) {
            route.open()
            return true
        } else {
            return false
        }
    }

    class func findRoute(_ path: String) -> _RouteBase? {

        let allRoutes = [
            <%- routeArray.map(function (route) { return route.fileName + `
        ` }) %>
        ];

        var findedRoute: _RouteBase?

        for route in allRoutes {
            if(route.isMatching(path: path)) {
                findedRoute = route
                break
            }
        }

        if let findedRoute = findedRoute {
            findedRoute.open();
        }

        return findedRoute
    }

    func path(parameters: String...) -> String {
        return URI
    }

}
