<template>
  <div ref="playVolumeRef" class="player-volume">
    <el-badge
      :hidden="currentPlayerSongList?.length === 0"
      :value="currentPlayerSongList?.length"
    >
      <SvgIcon name="player-list" size="18" @click="handleOpenPlayerList()" />
    </el-badge>
    <el-popover placement="top" trigger="hover">
      <template #reference>
        <SvgIcon
          :name="ToggleTypeInfo[currentPlayerType].icon"
          size="26"
          @click="playerStore.setCurrentPlayerType"
        />
      </template>
      <div style="text-align: center">
        {{ ToggleTypeInfo[currentPlayerType].text }}
      </div>
    </el-popover>
    <SvgIcon
      :name="volume === 0 ? 'player-volume-close' : 'player-volume'"
      size="24"
      @click="handleChangeVolume()"
    />
    <el-slider
      v-model="currentVolume"
      :show-tooltip="false"
      :min="0"
      :max="1"
      :step="0.01"
      class="player-volume-slider"
      @input="handleSongVolumeClick()"
    />
    <el-popover
      placement="top"
      trigger="click"
      :teleported="false"
      content="链接已复制成功，快去分享给你的朋友吧～"
    >
      <template #reference>
        <SvgIcon name="share" size="21" @click="copy()" />
      </template>
    </el-popover>
    <a
      href="https://github.com/limeooo/limeooo_netease_cloud_music"
      target="_blank"
    >
      <SvgIcon name="github" size="24" />
    </a>
    <!-- 歌曲播放列表 -->
    <!-- vue-teleport 将内部内容嵌套到根标签中，
  不受父组件z-index影响布局，导致此组件出现时覆盖了父组件 -->
    <teleport to="#app">
      <PlayerList v-click-outside:[playVolumeRef]="handleClickOutside" />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import PlayerList from './PlayerList.vue'
import SvgIcon from '@/components/base/SvgIcon.vue'

import { ref, withDefaults } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/store'
import { useClipboard } from '@vueuse/core'
import { ToggleTypeInfo } from '@/global/config'

const props = withDefaults(
  defineProps<{
    volume: number
  }>(),
  {}
)

// 监听声音改变更新当前音量
const currentVolume = ref(1)
const emit = defineEmits(['update:volume'])
const handleSongVolumeClick = () => {
  emit('update:volume', currentVolume.value)
}
const handleChangeVolume = () => {
  emit('update:volume', props.volume === 0 ? currentVolume.value : 0)
}

const playerStore = usePlayerStore()
const { currentPlayerSongList, currentPlayerType } = storeToRefs(playerStore)

// 监听播放列表打开事件
const handleOpenPlayerList = () => {
  playerStore.isOpenPlayerList = !playerStore.isOpenPlayerList
}

// handleClickOutside 监听元素外的点击事件
const playVolumeRef = ref<HTMLDivElement>()
const handleClickOutside = () => {
  playerStore.isOpenPlayerList = false
}

// 监听分享事件
const source = ref('http://175.178.164.2/')
const { copy } = useClipboard({ source })
</script>

<style lang="less" scoped>
.player-volume {
  .display-flex(space-between,center);
  width: 320px;
  .icon {
    .display-flex(center,center);
    cursor: pointer;
  }
  .player-volume-slider {
    width: 150px;
    padding-right: 10px;
    :deep(.el-slider__runway) {
      height: 3px;
      .el-slider__bar {
        background-color: @color-main;
        height: 3px;
      }
      .el-slider__button-wrapper {
        .display-flex(center,center);
        .el-slider__button {
          background-color: @color-main;
          height: 15px;
          width: 15px;
          border: 0;
          margin-bottom: 3px;
        }
      }
    }
  }
  :deep(.el-badge__content) {
    transform: translateY(-90%) translateX(110%);
  }
}
</style>
