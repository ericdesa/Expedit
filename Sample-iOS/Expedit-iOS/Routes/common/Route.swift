
import UIKit

protocol Routable {
    var URI: String { get }

    func path() -> String
    func viewController() -> UIViewController?
    func setParameters(fromPath path: String)

    static func isMatching(path: String) -> Bool
}

class Route: Routable {

    // MARK: - <Routable>

    var URI: String { return "" }

    required convenience init(path: String) {
        self.init()
        self.setParameters(fromPath: path)
    }

    func path() -> String {
        return ""
    }

    func viewController() -> UIViewController? {
        return nil
    }

    func setParameters(fromPath path: String) {
    }

    class func isMatching(path: String) -> Bool {
        return false
    }
    

    // MARK: - Helpers
    
    @discardableResult func open() -> Bool {
        if self.canOpen() {
            return RouteManager.open(route: (self as? RouteHuman)!)
        } else {
            return false
        }
    }

    func canOpen() -> Bool {
        return true
    }
}
