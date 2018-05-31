
import UIKit

class Route: NSObject, RouteProtocol {
    var URI: String {
        return ""
    }

    func open() -> Bool {
        if self.canOpen() {
            return RouteManager.open(route: (self as? RouteHuman)!)
        } else {
            return false
        }
    }

    func canOpen() -> Bool {
        return true
    }

    
    // MARK: - <RouteProtocol>

    func viewController() -> UIViewController? {
        return nil
    }

    class func isMatching(path: String) -> Bool {
        return false
    }

    func setParameters(fromPath path: String) {
    }

    func path() -> String {
        return ""
    }
}
