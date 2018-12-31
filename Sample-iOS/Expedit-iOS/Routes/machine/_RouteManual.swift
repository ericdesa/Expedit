import UIKit

class _RouteManual: RouteHuman {

    override var URI: String {
        return "manual"
    }

    

    
    
    override class func isMatching(path: String) -> Bool {
        var isMatching = false
        if let matchRange = path.range(of: "/?manual/?", options: .regularExpression) {
            isMatching = !matchRange.isEmpty
        }
        return isMatching
    }
    
    override func path() -> String {
        let path = self.URI
        return path
    }
}
