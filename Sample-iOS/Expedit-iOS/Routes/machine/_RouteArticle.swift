import UIKit

class _RouteArticle: RouteHuman {

    override var URI: String {
        get {
            return "article/:articleId"
        }
    }

    var articleId: String?
    
    init(articleId: String? = nil) {
        super.init()
        self.articleId = articleId
    }

    
    override func viewController() -> UIViewController? {
        return ArticleVC.loadFromStoryboard(withRoute: self);
    }
    
    override class func isMatching(path: String) -> Bool {
        var isMatching = false
        if let matchRange = path.range(of: "/?article/\\d+/?", options: .regularExpression) {
            isMatching = !path.substring(with: matchRange).isEmpty
        }
        return isMatching
    }
    
    override func setParameters(fromPath path: String) -> Void {
        let componentArray = path.components(separatedBy: "/")
        self.articleId = componentArray[1]
    }
    
    override func path() -> String {
        var path = self.URI
        if let articleId = self.articleId { path = path.replacingOccurrences(of: ":articleId", with: articleId) }

        path = path
            .replacingOccurrences(of: "?", with: "")
            .components(separatedBy: "/").filter({ (param) -> Bool in return param.range(of: ":") == nil })
            .joined(separator: "/");
        
        return path
    }
}
