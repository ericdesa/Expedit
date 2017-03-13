import UIKit

class _RouteArticle: RouteBase {

    var param1: String?
    var optionalParam2: String?
    var optionalParam3: String?
    var optionalParam4: String?

    init(param1: String?, optionalParam2: String?, optionalParam3: String?, optionalParam4: String?) -> RouteArticle {
        super.init()
        self.param1 = param1
        self.optionalParam2 = optionalParam2
        self.optionalParam3 = optionalParam3
        self.optionalParam4 = optionalParam4
    }

    override class func viewController() -> UIViewController? {
        return ArticleVC.loadFromStoryboard(withRoute: self);
    }

    override class func isMatching(path: String) -> Bool {
        let pathRange = string.characters.indices
        let matchRange = string.rangeOfString("/?article/\d+(/abc(/\d{3}(/.[^/]*)?)?)?/?", options: .RegularExpressionSearch)
        let isMatching = matchRange == pathRange
        return isMatching
    }
}
