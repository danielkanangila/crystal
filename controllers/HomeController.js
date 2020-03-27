import {render} from "../render"; 
/**
 * @controller
 */
export default class HomeController {
    
    /**
     * @get /
     * @target index
     */
    index() {
        return render(
            "home/index", 
            {message: "Hello word"},
            200
        )
    }

    /**
     * @get /find/:name
     * @target find
     */
    find(req) {
        return {
            message: "Don't touch your screen",
            status: 403
        }
    }

    /**
     * @post /
     * @target create
     */
    create(data) {
        return {
            data,
            received: true
        }
    }
}