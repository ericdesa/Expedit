import Foundation

class RouteManager {

    //MARK - Callback

    typealias RouteCallback = (Route) -> Bool

    static var observerArray: [RouteCallback] = []

    class func addObserver(_ callback : @escaping RouteCallback) -> Void {
        RouteManager.observerArray.append(callback)
    }

    class func open(route: Route) -> Bool {
        for (index, callback) in RouteManager.observerArray.enumerated() {
            if callback(route) {
                printDebug("\(route.path()) has been used by the callback \(index)")
                return true
            }
        }
        printDebug("no callback has responded to the route \(route.path)")
        return false
    }

    class func open(path: String) -> Bool {
        if let route = RouteManager.findRoute(path) {
            printDebug("\(route.self) match \(path)")
            return route.open()
        } else {
            printDebug("no route match with \(path)")
            return false
        }
    }

    class func findRoute(_ path: String) -> Route? {
        let allRoutes: [RouteProtocol.Type] = [
            RouteArticle.self,
            RouteList.self,
            RouteCredit.self,
            RouteManual.self
            ];

        var findedRoute: Route?

        for route in allRoutes {
            if route.isMatching(path: path) {
                findedRoute = (route as! NSObject.Type).init() as? Route
                break
            }
        }

        return findedRoute
    }

    //MARK - Debug

    enum RouteDebugMode {
        case verbose
        case none
    }

    internal static var debugMode = RouteDebugMode.none

    class func setDebugMode(_ debugMode: RouteDebugMode) {
        RouteManager.debugMode = debugMode

        if debugMode == .verbose {
            print("====================")
            printDebugVersion()
            printDebugAvailableURI()
            print("====================")
        }
    }

    internal class func printDebugVersion() -> Void {
         print("Expedit Version : 0.0.1")
    }

    internal class func printDebugAvailableURI() -> Void {
        let routes: [String] = [
            "article/:articleId",
            "list/:filter?",
            "credit",
            "manual"
            ];

        printDebug(routes.joined(separator: "\n"))
    }

    internal class func printDebug(_ message: String) {
        if debugMode == .verbose {
            print("Expedit : \(message)")
        }
    }
}
