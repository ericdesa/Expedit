
import UIKit

protocol Routable {
    var URI: String { get }
    var path: String { get }
    var viewController: UIViewController? { get }

    func setParameters(fromPath path: String)
    static func isMatching(path: String) -> Bool
}

class Route: Routable {

    // MARK: - <Routable>

    var URI: String { return "" }
    var path: String { return "" }
    var viewController: UIViewController? { return nil }

    required convenience init(path: String) {
        self.init()
        self.setParameters(fromPath: path)
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

    func loadViewController(fromIdentifier identifier: String) -> UIViewController? {
        let components = identifier.split(separator: ".")
        var storyboardName: String?
        var vcIdentifier: String?
        
        switch components.count {
            case 0: // empty identifier
                break
                
            case 1: // without storyboard prefix
                storyboardName = "Main"
                vcIdentifier = String(components[0])
                break

            case 2: // with storyboard prefix
                storyboardName = String(components[0])
                vcIdentifier = String(components[1])
                break
            
            default:
                fatalError("unsupported identifier format (\(identifier))")
                break
        }
        
        if let storyboardName = storyboardName, let vcIdentifier = vcIdentifier {
            let storyboard = UIStoryboard(name: storyboardName, bundle: nil)
            let viewController = storyboard.instantiateViewController(withIdentifier: vcIdentifier)
            if let routeHuman = self as? RouteHuman {
                viewController.routeEntry = routeHuman
            }
            return viewController
        }
        else {
            return nil
        }
    }
}
