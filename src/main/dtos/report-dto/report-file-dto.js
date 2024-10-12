class ReportFileDto {
    constructor(paths) {
        this.paths = paths;
    }
    isEmpty() {
        return !Array.isArray(this.paths) || this.paths.length === 0;
    }
}

module.exports = ReportFileDto;