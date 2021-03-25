/**
 * Cache localStores by adding a unique key.
 * Avoid creating multiple.
 */
const ROOT_STORE_MAP = '__IMOOK_ROOT_STORE_MAP__'

declare global {
  interface Window {
    [ROOT_STORE_MAP]: Map<string, any>
  }
}

const rootStoreMap = window[ROOT_STORE_MAP] || (() => (window[ROOT_STORE_MAP] = new Map()))()

export default rootStoreMap
