<template>
  <div id="app">
    <Loader />
    <Notification />
    <PosterBg :poster="posterBg" />
    <Header />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header';
import MoviesList from '@/components/MoviesList';
import PosterBg from '@/components/PosterBg';
import MoviesPagination from '@/components/MoviesPagination';
import Loader from '@/components/Loader';
import Notification from '@/components/Notification';

export default {
  name: 'App',
  components: {
    Header,
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader,
    Notification
  },
  data: () => ({
    posterBg: ''
  }),
  computed: {
    ...mapGetters('moviesStore', [
      'moviesList',
      'currentPage',
      'moviesPerPage',
      'moviesLength'
    ])
  },
  watch: {
    '$route.query': {
      handler: 'onPageQueryChange',
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions('moviesStore', ['changeCurrentPage']),
    onChangePoster(poster) {
      this.posterBg = poster;
    },
    onPageQueryChange({ page = 1 } = {}) {
      this.changeCurrentPage(Number(page));
    },
    onPageChanged(page) {
      this.$router.push({ query: { page } });
    }
  }
};
</script>

<style>
#app {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
