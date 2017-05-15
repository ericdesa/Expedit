
import UIKit

class MainNavigationController: UINavigationController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        RouteManager.addObserver { (route) -> Bool in
            
            var isRouteOpened = false
            
            if let vc = route.viewController() {
                self.pushViewController(vc, animated: true)
                isRouteOpened = true
            }
            
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
            _ = RouteManager.open(path: inputTextField!.text!)
        }))
        
        self.present(alert, animated: true, completion: nil)
    }
    
}
