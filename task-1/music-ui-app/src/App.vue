<template>
  <div>
    <header class="main-header">
      <h3>Muisc Library</h3>
    </header>
    <main class="page">
      <Albums />
    </main>
  </div>
</template>

<script>
import Albums from "./components/Albums"

export default {
  name: "app",
  components: {
    Albums,
  },
};
</script>
