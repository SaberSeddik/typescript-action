import * as core from '@actions/core'
import * as fs from 'fs'
import * as needle from 'needle'

const options = {
  json: true,
  compressed: true,
  headers: {
    Authorization: 'token ' + process.env.GITHUB_TOKEN
  }
}

/**
 * The main function for the action.
 */
async function main() {
  const eventName = process.env.GITHUB_EVENT_NAME
  if (eventName !== 'pull_request' && eventName !== 'pull_request_review') {
    core.warning('Only Pull request event are supported !!!')
    process.exit(1)
  }
  const eventPath = process.env.GITHUB_EVENT_PATH
  if (!eventPath) {
    console.log("Couldn't find the event file path.")
    process.exit(1)
  }

  const eventData = fs.readFileSync(eventPath, 'utf8')
  const eventObj = JSON.parse(eventData)
  const url = eventObj.pull_request._links.commits.href
  console.log(url)
  needle.request('get', url, null, options, function (err, res) {
    if (err) {
      console.log(err)
      return
    }
    console.log(res.body)
    //var data = JSON.parse(res.body)
    //console.log(data)
  })
}

main()
