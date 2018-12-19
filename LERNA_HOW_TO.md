## How to use

After cloning project, you need to do these things

-   `npm install`
-   `npm run bootstrap` (running `lerna bootstrap`)
-   `npm run test`

If everything went well, every tests should be ok.

For more information, see https://github.com/lerna/lerna

To run any lerna command, just do `npm run lerna -- <command here>`

To publish

-   Prepare changelog, commit and tags but do not push `npm run lerna -- version 1.0.0-beta.0 --conventional-commits --no-push prepatch --preid beta --exact`
-   Publish to npm `npm run lerna -- publish from-git --npm-tag beta --registry http://localhost:4873/`
-   Push tags and branches `git push --follow-tags origin master`

Also, to make tests on local repository, see https://michaljanaszek.com/blog/lerna-conventional-commits
