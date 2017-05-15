import UIKit

class _RouteCredit: RouteHuman {

    override var URI: String {
        get {
            return "credit"
        }
    }

    
    

    
    override func viewController() -> UIViewController? {
        return CreditVC.loadFromStoryboard(withRoute: self);
    }
    
    override class func isMatching(path: String) -> Bool {
        var isMatching = false
        if let matchRange = path.range(of: "/?credit/?", options: .regularExpression) {
            isMatching = !path.substring(with: matchRange).isEmpty
        }
        return isMatching
    }
    
    override func path() -> String {
        let path = self.URI
        return path
    }
}
