"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_WORKSPACE = exports.ISSUE_NUMBER = exports.REPO = exports.OWNER = exports.HEAD_FULL_NAME = exports.BASE_FULL_NAME = exports.SERIALIZED_ROUTES = exports.NAME = void 0;
const tslib_1 = require("tslib");
const github = tslib_1.__importStar(require("@actions/github"));
const guards_1 = require("./guards");
const context = github.context;
exports.NAME = 'ESLint Results';
exports.SERIALIZED_ROUTES = [
    '/repos/:owner/:repo/check-runs',
    '/repos/:owner/:repo/check-runs/:check_run_id',
];
exports.BASE_FULL_NAME = guards_1.isPullRequestPayload(context.payload)
    ? context.payload.pull_request.base.repo.full_name
    : undefined;
exports.HEAD_FULL_NAME = guards_1.isPullRequestPayload(context.payload)
    ? context.payload.pull_request.head.repo.full_name
    : undefined;
_a = github.context.issue, exports.OWNER = _a.owner, exports.REPO = _a.repo, exports.ISSUE_NUMBER = _a.number;
exports.GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;