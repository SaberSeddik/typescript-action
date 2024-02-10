import * as core from '@actions/core'

/**
 * The main function for the action.
 */
async function main() {
  const eventName = process.env.GITHUB_EVENT_NAME
  if (eventName !== 'pull_request') {
    core.warning('Only Pull request event are supported')
    process.exit(1)
  }
}

main()
