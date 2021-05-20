<template>
  <v-card>
    <v-list three-line>
      <!-- MicropostItem.vueに -->
      <!-- "micropost"というモノを micropostとして送る(:) -->
      <!-- 送る"micropost"は -->
      <!-- (propsで受け取った)micropostsから idをキー にして -->
      <!-- １つずつ生成(v-for) -->
      <micropost-item
        :micropost="micropost"
        v-for="micropost in microposts"
        :key="micropost.id"
      ></micropost-item>
    </v-list>
  </v-card>
</template>

<script>
import MicropostItem from "@/components/MicropostItem";
export default {
  props: {
    microposts: {
      type: Array,
      default: [],
    },
  },
  components: {
    MicropostItem,
  },
};
</script>
