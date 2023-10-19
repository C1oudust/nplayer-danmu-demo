<script setup>
import { onMounted } from 'vue';
import Player from 'nplayer';
import Danmaku from '@nplayer/danmaku';
onMounted(async () => {
  const { data } = await fetch('http://localhost:3000/api/danmu').then((res) => res.json());

  const items = data.sort((a, b) => a.time - b.time);
  const player = new Player({
    src: 'video.mp4',
    plugins: [
      new Danmaku({
        items,
      }),
    ],
  });
  player.mount('#nplayer');
});
</script>

<template>
  <div class="container">
    <div id="nplayer"></div>
  </div>
</template>

<style scoped>
#dplayer {
  width: 800px;
}
</style>
