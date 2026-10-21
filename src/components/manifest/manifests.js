/*
 * Where the site's manifest editor reads manifests and their JSON Schemas from: GitHub, at the same
 * addresses that a manifest repository's checks use, so that a page always shows the current files.
 * raw.githubusercontent.com allows any web site to read them (Access-Control-Allow-Origin: *).
 */

// the JSON Schema of each SAM kind, which the Smarter platform publishes (smarter.apps.api.v1.contract).
export const SAM_SCHEMAS =
  'https://raw.githubusercontent.com/smarter-sh/smarter/main/smarter/smarter/apps/api/v1/contract/sam'

/**
 * A manifest repository on GitHub, e.g. smarter-sh/stackademy.
 *
 * @param {string} repository - "owner/name"
 * @param {string} branch
 */
export const githubRepository = (repository, branch = 'main') => ({
  repository,
  branch,
  url: `https://github.com/${repository}`,
  // a file's page on GitHub, with its history and blame
  pageUrl: (path) => `https://github.com/${repository}/blob/${branch}/${path}`,
  // a file's text
  rawUrl: (path) => `https://raw.githubusercontent.com/${repository}/${branch}/${path}`,
})

/** The JSON Schema of a kind, e.g. LLMClient. */
export const schemaUrl = (kind) => `${SAM_SCHEMAS}/${kind}.schema.json`

// each url's answer, once per page view, so that opening a manifest again doesn't download it again.
const cache = new Map()

const fetchOnce = (url, read) => {
  if (!cache.has(url)) {
    const request = fetch(url).then((response) => {
      if (!response?.ok) throw new Error(`${url} answered ${response?.status}`)
      return read(response)
    })
    // a failed request may be tried again
    request.catch(() => cache.delete(url))
    cache.set(url, request)
  }
  return cache.get(url)
}

/** Forget every answer: for tests. */
export const clearCache = () => cache.clear()

/**
 * A manifest's YAML.
 *
 * @param {string} url
 * @returns {Promise<string>}
 */
export const fetchManifest = (url) => fetchOnce(url, (response) => response.text())

/**
 * A kind's JSON Schema.
 *
 * @param {string} kind
 * @returns {Promise<object>}
 */
export const fetchSchema = (kind) =>
  fetchOnce(schemaUrl(kind), (response) => response.json())
