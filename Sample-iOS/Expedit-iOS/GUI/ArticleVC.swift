
import UIKit

class ArticleVC: UIViewController {
    
    @IBOutlet weak var titleLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.titleLabel.text = self.routeEntry.path
    }
    
    @IBAction func showCommentsHandler() {
        guard let routeArticle = self.routeEntry as? RouteArticle else { return }
        RouteComments(articleId: routeArticle.articleId).open()
    }
}
