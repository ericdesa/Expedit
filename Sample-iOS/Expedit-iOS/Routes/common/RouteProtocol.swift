import UIKit

protocol RouteProtocol {

    var URI: String { get }

    static func isMatching(path: String) -> Bool

    func path() -> String
    func viewController() -> UIViewController?
    func setParameters(fromPath path: String)
}
