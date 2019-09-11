import UIKit

class _RouteList: RouteHuman {

    override var URI: String { return "list/:filter?" }

    override var path: String {
        var path = self.URI
        if let filter = self.filter { path = path.replacingOccurrences(of: ":filter", with: filter) }

        path = path
            .replacingOccurrences(of: "?", with: "")
            .components(separatedBy: "/").filter({ (param) -> Bool in return param.range(of: ":") == nil })
            .joined(separator: "/")
        
        return path
    }
    
    override var viewController: UIViewController? {
        return self.loadViewController(fromIdentifier: "ListVC")
    }
    

    var filter: String?

    
    convenience init(filter: String? = nil) {
        self.init()
        self.filter = filter
    }
    override class func isMatching(path: String) -> Bool {
        var isMatching = false
        if let matchRange = path.range(of: "/?list(/true|plip)?/?", options: .regularExpression) {
            isMatching = !matchRange.isEmpty
        }
        return isMatching
    }
    
    override func setParameters(fromPath path: String) {
        let componentArray = path.components(separatedBy: "/")
        self.filter = componentArray[1]
    }
    
}
