//
//  _RouteDetail.swift
//  Expedit-iOS
//
//  Created by Eric De Sa on 10/03/2017.
//  Copyright © 2017 Frianbiz. All rights reserved.
//

import UIKit

class _RouteDetail: _RouteBase {

    var param1: String?
    var param2: String?
    var param3: String?

    static func open(param1: String, param2: String?) -> RouteDetail {
        let route = RouteDetail(withPath: "/hello")
        route.param1 = param1
        route.param1 = param1
        route.param1 = param1
        route.open()
        return route
    }

    override func uri() -> String {
        return "/RouteDetail"
    }
}
