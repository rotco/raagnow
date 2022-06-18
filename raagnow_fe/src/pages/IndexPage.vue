<template>
  <q-page class="flex flex-center">
    <!-- <div v-for="item in items" :key="item.id">
      <img :src="item.snippet.thumbnails.medium.url" />
    </div> -->
    <iframe
      v-if="items"
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      :src="getYouTubeVideoLink(this.items)"
      frameborder="0"
    ></iframe>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default {
  setup() {
    const SEARCH_KEYWORD_ENDPOINT =
      "https://youtube.googleapis.com/youtube/v3/search";
    const API_KEY = "AIzaSyAJZfeg5w_gEsV8kEvrh4-RHd7QeuUMuts";
    const items = ref(null);
    fetch(
      `${SEARCH_KEYWORD_ENDPOINT}?part=snippet&maxResults=25&q=eveningraag&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("res", res);
        items.value = res.items;
      });
    const getYouTubeVideoLink = (items) => {
      let item = items[Math.round(Math.random() * 25)];
      console.log("getYouTubeVideoLink item", item.id.videoId);
      return `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`;
    };
    return {
      items,
      getYouTubeVideoLink,
    };
  },

  mounted() {
    console.log(this.count); // 0
  },
};

//
</script>
