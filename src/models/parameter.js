
function Parameter(name, isOptional = false, regex = ".*") {
    this.name = name;
    this.isOptional = isOptional;
    this.regex = regex;
}

module.exports = Parameter;