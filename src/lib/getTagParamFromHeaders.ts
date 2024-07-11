export interface GetTagFromHeadersParams {
  headers: Headers
  searchParams: URLSearchParams
}

export function getTagFromHeaders ({ headers, searchParams }: GetTagFromHeadersParams): string | null {
  const referer = headers.get('referer') || ''
  let tag: string | null = null

  try {
    const urlObj = new URL(referer)
    tag = urlObj.searchParams.get('tag')
  } catch (e) {
    // Handle the case where the referer is not a valid URL
    tag = searchParams.get('tag')
  }

  return tag
}
