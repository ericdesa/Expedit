import UIKit

class _RouteCredit: RouteHuman {

    override var URI: String { return "credit" }

    override var path: String {
        let path = self.URI
        return path
    }
    
    override var viewController: UIViewController? {
        return self.loadViewController(fromIdentifier: "Credit.CreditVC")
    }
    

    

    
    override class func isMatching(path: String) -> Bool {
        var isMatching = false
        if let matchRange = path.range(of: "/?credit/?", options: .regularExpression) {
            isMatching = !matchRange.isEmpty
        }
        return isMatching
    }
    
}
