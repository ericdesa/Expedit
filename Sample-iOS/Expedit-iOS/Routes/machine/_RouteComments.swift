import UIKit

class _RouteComments: RouteHuman {

    override var URI: String { return "article/:articleId/comments" }

    override var path: String {
        var path = self.URI
        if let articleId = self.articleId { path = path.replacingOccurrences(of: ":articleId", with: articleId) }

        path = path
            .replacingOccurrences(of: "?", with: "")
            .components(separatedBy: "/").filter({ (param) -> Bool in return param.range(of: ":") == nil })
            .joined(separator: "/")
        
        return path
    }
    
    override var viewController: UIViewController? {
        return self.loadViewController(fromIdentifier: "CommentsVC")
    }
    

    var articleId: String?

    
    convenience init(articleId: String? = nil) {
        self.init()
        self.articleId = articleId
    }
    override class func isMatching(path: String) -> Bool {
        var isMatching = false
        if let matchRange = path.range(of: "/?article/\\d+/comments/?", options: .regularExpression) {
            isMatching = !matchRange.isEmpty
        }
        return isMatching
    }
    
    override func setParameters(fromPath path: String) {
        let componentArray = path.components(separatedBy: "/")
        self.articleId = componentArray[1]
    }
    
}
