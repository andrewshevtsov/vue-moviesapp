<template>
  <div>
    <BContainer>
      <h3 class="list-title">{{ listTitle }}</h3>
      <BRow>
        <template v-if="isMoviesExist">
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
              @emitRemoveItem="onRemoveItem"
              @showModal="onShowMovieInfo"
            />
          </BCol>
        </template>
        <template v-else>
          <h4>Empty movies list</h4>
        </template>
      </BRow>
      <BModal
        body-class="movie-modal-body"
        :id="movieInfoModalId"
        size="xl"
        hide-footer
        hide-header
      >
        <MovieInfoModalContent
          :movie="selectedMovie"
          @closeModal="onCloseModal"
        />
      </BModal>
    </BContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovieItem from '@/components/MovieItem';
import MovieInfoModalContent from '@/components/MovieInfoModalContent';

export default {
  name: 'MoviesList',
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      boxOne: '',
      boxTwo: '',
      movieInfoModalId: 'movie-info',
      selectedMovieId: ''
    };
  },
  components: {
    MovieItem,
    MovieInfoModalContent
  },
  computed: {
    ...mapGetters('moviesStore', ['isSearch']),
    isMoviesExist() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch ? 'Search result:' : 'IMDB Top 250';
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null;
    }
  },
  methods: {
    ...mapActions('moviesStore', ['removeMovie']),
    ...mapActions(['showNotify']),
    onMouseOver(poster) {
      this.$emit('changePoster', poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Are you sure delete ${title}?`
      );

      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: 'Movie deleted successful',
          variant: 'success',
          title: 'Success'
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieId = id;
      this.$bvModal.show(this.movieInfoModalId);
    },
    onCloseModal() {
      this.selectedMovieId = null;
      this.$bvModal.hide(this.movieInfoModalId);
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

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>
