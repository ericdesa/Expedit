
import Foundation
import UIKit

var routeEntryKey: UInt8 = 0 // We still need this boilerplate

extension UIViewController {

    var routeEntry: RouteHuman {

        get {
            return associatedObject(base: self, key: &routeEntryKey, initialiser: { () -> RouteHuman in
                return RouteHuman()
            })
        }
        set {
            associateObject(base: self, key: &routeEntryKey, value: newValue)
        }
    }

    class func loadFromStoryboard(withRoute route: RouteHuman, andStoryboardName storyboardName: String = "Main") -> UIViewController {
        let storyboard = UIStoryboard(name: storyboardName, bundle: nil)

        let className = NSStringFromClass(self)
        let packageName = className.components(separatedBy: ".").first!
        let identifier = className.replacingOccurrences(of: "\(packageName).", with: "")

        let vc = storyboard.instantiateViewController(withIdentifier: identifier)
        vc.routeEntry = route
        return vc
    }
}

// https://medium.com/@ttikitu/swift-extensions-can-add-stored-properties-92db66bce6cd#.k4wmfldgv
func associatedObject<ValueType: AnyObject>(
    base: AnyObject,
    key: UnsafePointer<UInt8>,
    initialiser: () -> ValueType)
    -> ValueType {
        if let associated = objc_getAssociatedObject(base, key) as? ValueType { return associated }
        let associated = initialiser()
        objc_setAssociatedObject(base, key, associated, .OBJC_ASSOCIATION_RETAIN)
        return associated
}

func associateObject<ValueType: AnyObject>(
    base: AnyObject,
    key: UnsafePointer<UInt8>,
    value: ValueType) {
    objc_setAssociatedObject(base, key, value, .OBJC_ASSOCIATION_RETAIN)
}