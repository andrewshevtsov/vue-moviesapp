<template>
  <div>
    <BContainer>
      <h3 class="list-title">IMDB Top 250</h3>
      <BRow>
        <template v-if="isMoviesExist">
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
            />
          </BCol>
        </template>
        <template v-else>
          <h4>Empty movies list</h4>
        </template>
      </BRow>
    </BContainer>
  </div>
</template>

<script>
import MovieItem from '@/components/MovieItem';

export default {
  name: 'MoviesList',
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    MovieItem
  },
  computed: {
    isMoviesExist() {
      return Boolean(Object.keys(this.list).length);
    }
  },
  methods: {
    onMouseOver(poster) {
      this.$emit('changePoster', poster);
    }
  }
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>