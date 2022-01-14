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
import ConfirmModal from './ConfirmModal.vue';
import router from '../router';
export default {
  name: 'AuthRequiredModal',
  data() {
    return {
      isModalVisible: false
    }
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
      router.push('/login');
    },
  },
  components: {
    ConfirmModal
  },
  inheritAttrs: false,
}
</script>