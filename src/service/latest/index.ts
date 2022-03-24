import requset from '../index'
import { translateTopSong } from './translate'
import type { ISong } from './types'

enum REQUEST_URL {
  SongList = '/top/song?type='
}

// 最新音乐
function requestTopSongList(type: number) {
  return requset.get<ISong[]>({
    url: REQUEST_URL.SongList + type,
    interceptors: {
      responseInterceptor(res: any): ISong[] {
        return translateTopSong(res)
      }
    }
  })
}

export { requestTopSongList }
