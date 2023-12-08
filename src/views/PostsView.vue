<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import debounce from "lodash/debounce";
import Card from "@/components/UI/Card.vue";
import getFetchPosts from "@/api/posts.ts";
import { ref, watch } from "vue";

// pagination

const router = useRouter();
const route = useRoute();
const currentPage = ref<number>(Number(route.query.page) || 1);
const postsToShow = 10;
let skipProducts = localStorage.skip || 0;

const search = ref<string>("");

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string
}

type Posts = Post[]

const posts = ref<Posts>(await getFetchPosts(skipProducts, postsToShow, search.value));

const handleCurrentChange = async (page: number) => {
  router.push(`/?page=${page}`);
  posts.value = await getFetchPosts(page * 10 - 10, postsToShow, search.value);
  localStorage.skip = page * 10 - 10;
};

// pagination

// searchPosts

watch(
  search,
  debounce(async () => {
    posts.value = await getFetchPosts(skipProducts, postsToShow, search.value);
  }, 500)
);

// searchPosts

// sortPosts

const sortPosts = () => {
  posts.value.sort((a: Post, b: Post) => a.title.localeCompare(b.title));
};

// sortPosts
</script>

<template>
  <section class="posts">
    <div class="container">
      <h1 class="posts__title title">Posts</h1>
      <input
        type="text"
        class="input"
        placeholder="Search..."
        v-model="search"
      />
      <div class="posts__top">
        <button @click="sortPosts">
          <el-button color="#626aef" class="posts__top-btn">Sort</el-button>
        </button>
        <el-pagination
          v-model:current-page="currentPage"
          background
          layout="prev, pager, next, total"
          :pager-count="5"
          :total="100"
          @current-change="handleCurrentChange"
          class="posts__pagination"
          v-if="!search"
        />
      </div>
      <div class="posts__cards">
        <Card
          class="posts__card"
          v-for="item in posts"
          :key="item.id"
          :info="item"
          :data-count="item.id"
        >
          <RouterLink class="posts__btn" :to="'/comments/' + item.id">
            <el-button color="#626aef">Visit comment</el-button>
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
