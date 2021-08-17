<template>
  <div class="base" id="base">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Base",
  components: {
  },
  data() {
    return {
      msg: "Base",
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  watch: {},
};
</script>
