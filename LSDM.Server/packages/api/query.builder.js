class QueryBuilder {
    constructor() {
        this.params = {};
    }
    add(name, value) {
        if (value != null) {
            this.params[name] = value;
        }
        return this;
    }
    build() {
        return this.params;
    }
}
module.exports = QueryBuilder;