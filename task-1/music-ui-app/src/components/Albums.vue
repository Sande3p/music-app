<template>
  <div class="card text-center m-3">
    <div class="search-bar">
      <input
        class="t-search"
        type="search"
        v-model="q"
        placeholder="Search album"
        v-on:keyup="searchAlbum"
        maxlength=256
      />
    </div>
    <p class="loading">{{ loading ? "Loading..." : "" }}</p>
    <div class="card-body">
      <div v-for="item in albumList" :key="item.collectionId">
        <AlbumTile :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AlbumTile from "./AlbumTile";
import config from "../../config/index";

export default {
  name: "alubms",
  components: {
    AlbumTile,
  },
  data() {
    return {
      fetchedAlbums: [],
      albumList: [],
      q: "",
      loading: true,
    };
  },
  methods: {
    searchAlbum(e) {
      this.albumList = [];
      this.fetchedAlbums.map((item) => {
        item.collectionName &&
          item.collectionName.toLowerCase().indexOf(this.q.toLowerCase()) >=
            0 &&
          this.albumList.push(item);
        return item;
      });
      this.q = e.target.value;
    },
  },
  watch: {
    q: function (newValue) {
      this.$emit("input", newValue);
    },
  },
  created() {
    // Simple GET request using axios
    this.loading = true;
    axios
      .get(config.API_URL + "/album?artist=taylor swift")
      .then((response) => {
        this.fetchedAlbums = response.data ? response.data.results : [];
        this.albumList = { ...this.fetchedAlbums };
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
      });
  },
};
</script>
