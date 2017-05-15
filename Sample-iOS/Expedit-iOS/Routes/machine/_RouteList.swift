import UIKit

class _RouteList: RouteHuman {

    override var URI: String {
        get {
            return "list/:filter?"
        }
    }

    var filter: String?
    
    init(filter: String? = nil) {
        super.init()
        self.filter = filter
    }

    
    override func viewController() -> UIViewController? {
        return ListVC.loadFromStoryboard(withRoute: self);
    }
    
    override class func isMatching(path: String) -> Bool {
        var isMatching = false
        if let matchRange = path.range(of: "/?list(/true|plip)?/?", options: .regularExpression) {
            isMatching = !path.substring(with: matchRange).isEmpty
        }
        return isMatching
    }
    
    override func setParameters(fromPath path: String) -> Void {
        let componentArray = path.components(separatedBy: "/")
        self.filter = componentArray[1]
    }
    
    override func path() -> String {
        var path = self.URI
        if let filter = self.filter { path = path.replacingOccurrences(of: ":filter", with: filter) }

        path = path
            .replacingOccurrences(of: "?", with: "")
            .components(separatedBy: "/").filter({ (param) -> Bool in return param.range(of: ":") == nil })
            .joined(separator: "/");
        
        return path
    }
}
