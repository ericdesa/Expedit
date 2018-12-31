
import UIKit

class MainNavigationController: UINavigationController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // the routes are handled here
        // you are responsible to present the associated VC
        RouteManager.addObserver { (route) -> Bool in
            
            var isRouteOpened = false
            
            // some routes build the VC for you ...
            if let vc = route.viewController() {
                self.pushViewController(vc, animated: true)
                isRouteOpened = true
            }
            
            // ... but you can also throw other actions, like a share one
            else if route is RouteManual {
                self.promptRouteManual()
                isRouteOpened = true
            }
            
            print("customRouteFunction value:", route.customRouteFunction())
            
            return isRouteOpened
        }
    }
    
    internal func promptRouteManual() {
        let alert = UIAlertController(title: "Enter a route",
                                      message: "Look at the console to see the available ones",
                                      preferredStyle: .alert)
        
        var inputTextField: UITextField?
        alert.addTextField { (textField) in
            inputTextField = textField
        }
        
        alert.addAction(UIAlertAction(title: "Cancel", style: .default, handler: nil))
        alert.addAction(UIAlertAction(title: "Open", style: .default, handler: { (action) in
            RouteManager.open(path: inputTextField!.text!)
        }))
        
        self.present(alert, animated: true, completion: nil)
    }
    
}
