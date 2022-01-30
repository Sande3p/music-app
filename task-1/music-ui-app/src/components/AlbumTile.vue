<template>
  <div class="album-tile">
    <figure>
      <img :src="item.artworkUrl100" :alt="item.collectionName" />
    </figure>
    <h5 class="alubm-artist">{{ item.collectionName }}</h5>
  </div>
</template>

<script>
export default {
  name: "AlbumTile",
  props: ["item"],
  data() {
    return {};
  },
  created() { },
};
</script>
