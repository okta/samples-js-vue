<template>
  <div>
  <ConfirmModal
    v-model="isModalVisible"
    @confirm=confirmModal
    @cancel=closeModal
  >
    <template v-slot:title></template>
    <template v-slot:confirm>Yes</template>
    <template v-slot:cancel>Cancel</template>
    <p>Do you want to re-authenticate?</p>
  </ConfirmModal>
  </div>
</template>

<script>
import ConfirmModal from './ConfirmModal.vue';
import { emitter } from '../main';
export default {
  name: 'OnAuthRequiredModal',
  data() {
    return {
      isModalVisible: false,
      oktaAuth: null
    }
  },
  created() {
    emitter.on('_onAuthRequired', (oktaAuth) => {
      this.oktaAuth = oktaAuth;
      if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
        // App initialization stage
        this.confirmModal();
      } else {
        // Ask the user to trigger the login process during token autoRenew process
        this.showModal();
      }
    });
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    confirmModal() {
      this.isModalVisible = false;
      this.oktaAuth.signInWithRedirect();
    },

  },
  components: {
    ConfirmModal
  },
  inheritAttrs: false,
}
</script>