"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const github_1 = require("@actions/github");
const eslint_1 = require("./eslint");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const octokit_1 = require("./utils/octokit");
function run() {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            console.log(JSON.stringify(github_1.context, null, 2));
            console.log(github_1.context.issue);
            console.log(github_1.context.repo);
            const isReadOnly = constants_1.BASE_FULL_NAME !== constants_1.HEAD_FULL_NAME;
            const data = {
                isReadOnly,
                handleForks: true,
                serializer: undefined,
                sha: ((_a = github_1.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.head.sha) || github_1.context.sha,
                issueNumber: constants_1.ISSUE_NUMBER,
                issueSummary: utils_1.processBooleanInput('issueSummary', true),
                issueSummaryType: utils_1.processEnumInput('issueSummaryType', ['full', 'compact'], 'compact'),
                issueSummaryOnlyOnEvent: utils_1.processBooleanInput('issueSummaryOnlyOnEvent', false),
                repoHtmlUrl: (_b = github_1.context.payload.repository) === null || _b === void 0 ? void 0 : _b.html_url,
                prHtmlUrl: (_c = github_1.context.payload.pull_request) === null || _c === void 0 ? void 0 : _c.html_url,
                includeGlob: utils_1.processArrayInput('includeGlob', []),
                ignoreGlob: utils_1.processArrayInput('ignoreGlob', []),
                reportWarningsAsErrors: utils_1.processBooleanInput('reportWarningsAsErrors', false),
                reportIgnoredFiles: utils_1.processBooleanInput('reportIgnoredFiles', false),
                reportSuggestions: utils_1.processBooleanInput('reportSuggestions', true),
                reportWarnings: utils_1.processBooleanInput('reportWarnings', true),
                eslint: {
                    errorOnUnmatchedPattern: utils_1.processBooleanInput('errorOnUnmatchedPattern', false),
                    extensions: utils_1.processArrayInput('extensions', [
                        '.js',
                        '.jsx',
                        '.ts',
                        '.tsx',
                    ]),
                    rulePaths: utils_1.processArrayInput('rulePaths', []),
                    followSymbolicLinks: utils_1.processBooleanInput('followSymbolicLinks', true),
                    useEslintIgnore: utils_1.processBooleanInput('useEslintIgnore', true),
                    ignorePath: utils_1.processInput('ignorePath', null) || undefined,
                    useEslintrc: utils_1.processBooleanInput('useEslintrc', true),
                    configFile: utils_1.processInput('configFile', null) || undefined,
                    fix: utils_1.processBooleanInput('useEslintrc', false),
                },
            };
            core.info(`Context:\n ${JSON.stringify(data, null, 2)}`);
            if (data.isReadOnly && data.handleForks !== true) {
                return;
            }
            yield eslint_1.lintChangedFiles(octokit_1.getOctokitClient(data), data);
        }
        catch (err) {
            core.error(err);
            core.setFailed(err.message);
        }
    });
}
run();
exports.default = run;