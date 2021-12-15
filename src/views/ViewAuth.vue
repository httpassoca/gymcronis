<template>
<div class="auth">
  <Card>
    <p>
      Hi bro! You need to login to use the app.
    </p>
    <p>
      Please take a time for this 🙂
    </p>
    <div class="flex-center">
      <Button
        @click="login"
        class="auth--button"
        type="primary"
        :disabled="isLoading"
      >
        <svg role="img" viewBox="0 0 24 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
        Login with Google
      </Button>
    </div>
  </Card>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card, Button } from 'element-ui';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'ViewAuth',

  components: {
    Card,
    Button,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    ...mapActions({ signUp: 'user/signUp' }),

    async login() {
      this.isLoading = true;
      const user = await this.signUp();
      this.isLoading = false;
      if (user) {
        this.$router.push('/workouts');
      }
    },
  },
});
</script>

<style lang="sass" scoped>
@import '../sass/mixins'
.auth
  @include visitorPage

.flex-center
  display: flex
  justify-content: center
</style>
<style lang="sass">
.auth--button
  margin-top: 12px
  background-color: #BB001B !important
  &.is-disabled
    filter: opacity(.6)
  span
    display: flex
    align-items: center
    svg
      height: 20px
      width: 20px
      margin-right: 12px
</style>
