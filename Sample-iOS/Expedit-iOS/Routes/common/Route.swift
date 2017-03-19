
import UIKit

class Route: NSObject {

    func open() -> Bool {
        return RouteManager.open(route: self)
    }

}

extension Route: RouteProtocol {
    var URI: String {
        get {
            return ""
        }
    }

    func viewController() -> UIViewController? {
        return nil
    }

    class func isMatching(path: String) -> Bool {
        return false
    }

    func setParameters(fromPath path: String) -> Void {
    }

    func path() -> String {
        return ""
    }
}
