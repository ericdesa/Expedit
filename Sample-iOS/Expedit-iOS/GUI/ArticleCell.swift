
import UIKit

class ArticleCell: UITableViewCell {

    @IBOutlet weak var titleLabel: UILabel!
    
    func setArticleId(_ articleId: Int) {
        self.titleLabel.text = "Article \(articleId)"
    }
    
}
