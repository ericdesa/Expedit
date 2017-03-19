
import UIKit

class ArticleVC: UIViewController {
    
    @IBOutlet weak var titleLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.titleLabel.text = self.routeEntry.path()
    }
}
