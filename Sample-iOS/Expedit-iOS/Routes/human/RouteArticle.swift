import UIKit

class RouteArticle: _RouteArticle {
    
    override func canOpen() -> Bool {
        return true
    }
    
    override func customRouteFunction() -> Bool {
        return true
    }
}
