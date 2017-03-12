
import Foundation
import UIKit

extension UIViewController {

    private var routeEntryKey: UInt8 = 0 // We still need this boilerplate

    var routeEntry: Route {
        get {
            return associatedObject(base: self, key: &routeEntryKey)
        }
        set {
            associateObject(base: self, key: &routeEntryKey, value: newValue)
        }
    }

    class func loadFromStoryboard(withRoute route: Route, andStoryboardName storyboardName: String = "Main") -> UIViewController {
        let storyboard = UIStoryboard(name: storyboardName, bundle: nil)
        let identifier = NSStringFromClass(self)
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