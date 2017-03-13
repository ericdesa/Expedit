import UIKit

class _RouteList: RouteBase {

    

    init() -> RouteList {
        super.init()
        
    }

    override class func viewController() -> UIViewController? {
        return ListVC.loadFromStoryboard(withRoute: self);
    }

    override class func isMatching(path: String) -> Bool {
        let pathRange = string.characters.indices
        let matchRange = string.rangeOfString("/?list/?", options: .RegularExpressionSearch)
        let isMatching = matchRange == pathRange
        return isMatching
    }
}
