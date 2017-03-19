
import UIKit



class ListVC: UIViewController {

    @IBAction func creditHandler(_ sender: Any) {
        _ = RouteCredit().open()
    }

    @IBAction func manualHandler(_ sender: Any) {
        _ = RouteManual().open()
    }
    
}



extension ListVC: UITableViewDelegate {
    
    public func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        _ = RouteArticle(articleId: "\(indexPath.row)").open()
    }
    
}



extension ListVC: UITableViewDataSource {
    
    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 20
    }
    
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let articleCell = tableView.dequeueReusableCell(withIdentifier: "ArticleCell") as! ArticleCell
        articleCell.setArticleId(indexPath.row + 1)
        return articleCell
    }

}
