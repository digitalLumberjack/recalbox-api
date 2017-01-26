"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _solfegejs = require("solfegejs");

var _solfegejs2 = _interopRequireDefault(_solfegejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An util class to compute the pagination values based on the request
 */
class Pagination {
    /**
     * Constructor
     *
     * @param   {array}                         items       The items
     * @param   {Integer}                       max         The maximum items to paginate
     * @param   {solfege.bundle.server.Request} request     The request
     */
    constructor(items, max, request) {
        this.items = items;

        // Default values
        let page = 1;
        let count = 25;
        let range = null;
        let offset = null;
        let limit = null;
        let total = items.length;

        // Cap the items to return
        if (count > max) {
            count = max;
        }

        // Override the values with the request
        if (!isNaN(request.query.count)) {
            count = parseInt(request.query.count);
        }
        if (!isNaN(request.query.page)) {
            page = parseInt(request.query.page);
        }
        if (request.query.range) {
            // Paginate with the range parameter
            let rangeSplit = request.query.range.split("-");
            if (rangeSplit.length === 2) {
                offset = parseInt(rangeSplit[0]);
                limit = parseInt(rangeSplit[1]);

                // Cap the items to return
                if (limit - offset + 1 > max) {
                    limit = offset + max - 1;
                }

                // Calculate the item count to return
                count = limit - offset + 1;
            }
        }

        // Calculate the offset and limit if the ranger parameter is not used
        if (offset === null) {
            offset = (page - 1) * count;
        }
        if (limit === null) {
            limit = offset + count - 1;
        }

        // The limit cannot exceed the total (obviously)
        if (limit >= total) {
            limit = total - 1;
        }

        // Calculate the page count
        let pageCount = Math.ceil(total / count);

        // Expose the values
        this.count = count;
        this.offset = offset;
        this.limit = limit;
        this.page = page;
        this.pageCount = pageCount;
    }

    /**
     * Get the paginated items
     *
     * @return  {array}     The list
     */
    getList() {
        let list = [];
        let index = this.offset;
        for (; index <= this.limit; index++) {
            list.push(this.items[index]);
        }

        return list;
    }
}
exports.default = Pagination;
module.exports = exports['default'];