<template>
  <section v-if="!data.id" class="no-selected-item">
    Select a player on the table to see more datails
  </section>
  <div v-else>
    <span class="player-id">#ID: {{ data.id }}</span>
    <section class="main-section">
      <span class="field-aux">Player's Name</span>
      <h1 class="player-name">{{ data.Player }}</h1>
    </section>

    <div class="section-container">
      <section class="stat-section">
        <span class="field-aux">Player's Rank</span>
        <h2 class="field-value">{{ data.Rank || '-' }}</h2>
      </section>
      <section class="stat-section">
        <span class="field-aux">Player's age that year</span>
        <h2 class="field-value">{{ data.AgeThatYear }}</h2>
      </section>
      <section class="stat-section">
        <span class="field-aux">Hits</span>
        <h2 class="field-value">{{ data.Hits }}</h2>
      </section>
      <section class="stat-section">
        <span class="field-aux">Bats</span>
        <h2 class="field-value">{{ data.Bats }}</h2>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsComponent',
  props: {
    data: {
      type: Object,
    },
  },
};
</script>
<style>
.player-id,
.field-aux {
  display: block;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #969696;
}

.player-id {
  font-style: italic;
}

.player-name {
  font-size: 48px;
  overflow-wrap: break-word;
  font-size: 36px;
  font-weight: 800;
  width: 100%;
  white-space: normal;
}

.main-section {
  margin-top: 15px;
  margin-bottom: 25px;
}

.section-container {
  display: grid;
}

.stat-section {
  min-width: 50px;
  margin: 20px;
}

.field-value {
  font-size: 32px;
}
</style>
