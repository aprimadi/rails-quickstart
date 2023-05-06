type LocationHistoryPage = { url: string }
type LocationHistory = {
  current: () => LocationHistoryPage,
  url: () => string,
  go: (page: LocationHistoryPage, cb?: () => void) => void,
  cancel: (cb: () => void) => void,
  back: (cb: () => void) => void,
  forward: (cb: () => void) => void,
  hasBack: () => boolean,
  hasForward: () => boolean,
  clearForward: (url: string) => void,
  backToFirst: (cb: () => void) => void,
}

export type State = {
  location: LocationHistory,
}
