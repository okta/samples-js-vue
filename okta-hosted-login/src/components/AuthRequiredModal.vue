<template>
  <div>
  <ConfirmModal
    v-model="isModalVisible"
    @confirm=confirmModal
    @cancel=closeModal
  >
    <template v-slot:title>Auth required</template>
    <template v-slot:confirm>Yes</template>
    <template v-slot:cancel>No</template>
    <p>Do you want to re-authenticate?</p>
  </ConfirmModal>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuth } from '@okta/okta-vue';
import ConfirmModal from './ConfirmModal.vue';

export default {
  name: 'AuthRequiredModal',
  components: {
    ConfirmModal
  },
  inheritAttrs: false,
  setup() {
    const isModalVisible = ref(false);
    const oktaAuth = useAuth();
    const showModal = () => {
      isModalVisible.value = true;
    };
    const closeModal = () => {
      isModalVisible.value = false;
    };
    const confirmModal = () => {
      isModalVisible.value = false;
      oktaAuth.signInWithRedirect();
    };
    return {
      showModal,
      closeModal,
      confirmModal,
      isModalVisible,
    };
  }
}
</script>