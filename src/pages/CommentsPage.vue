<script setup lang="ts">
import { useRoute } from "vue-router";
import debounce from "lodash/debounce";
import Card from "@/components/UI/Card.vue";
import getFetchComments from "@/api/comments";
import { computed, ref, watch } from "vue";

// infinite scroll

const route = useRoute();

const count = ref<number>(0);
const loading = ref<boolean>(false);

const search = ref<string>("");

const commentsToShow = 2;

type Comment = {
  body: string,
  email: string;
  id: number;
  name: string;
  postId: number;
};

type Comments = Comment[]

const comments = ref<Comments>(
  await getFetchComments(+route.params.id, commentsToShow, 0, search.value)
);

const noMore = computed(() => count.value >= comments.value?.length);
const disabled = computed(() => noMore.value);

const load = async () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 300);
  const newPosts = await getFetchComments(
    +route.params.id,
    commentsToShow,
    comments.value?.length,
    search.value
  );
  comments.value.push(...newPosts);
};

// infinite scroll

// searchAuthor

watch(
  search,
  debounce(async () => {
    comments.value = await getFetchComments(
      +route.params.id,
      commentsToShow,
      0,
      search.value
    );
    load();
  }, 500)
);

// searchAuthor
console.log(comments.value);
</script>

<template>
  <section class="comments">
    <div class="container">
      <h1 class="comments__title title">Comments</h1>
      <input
        type="text"
        class="input"
        placeholder="Search..."
        v-model="search"
      />
      <div class="comments__cards" style="overflow: auto">
        <ul
          class="comments__cards-list"
          v-infinite-scroll="load"
          :infinite-scroll-disabled="disabled"
        >
          <li
            class="comments__cards-item"
            v-for="(item, index) in comments"
            :key="item.id"
          >
            <Card :info="item" :data-count="index + 1" />
          </li>
        </ul>
        <p v-if="loading" style="text-align: center">
          <el-icon :size="30" class="is-loading"><Loading /></el-icon>
        </p>
        <p v-if="noMore" style="font-size: 20px; text-align: center">
          Tugadi 😁
        </p>
      </div>
    </div>
  </section>
</template>
