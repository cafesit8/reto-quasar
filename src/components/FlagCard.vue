<template>
  <article @click="handleClick" class="card">
    <picture class="">
      <img :src="flagUrl" :alt="flagAlt" />
    </picture>
    <div class="content">
      <img :src="flagUrl" :alt="flagAlt" />
      <div class="info">
        <p class="subtitle">
          {{ countryName }}
        </p>
        <p>
          {{ region }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'FlagCard',
  props: {
    flagUrl: {
      type: String,
      required: true
    },
    flagAlt: String,
    countryName: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    countryData: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    const store = useStore()

    function handleClick () {
      store.commit('dialog/setInfo', props.countryData)
      store.commit('dialog/toggleDialog')
    }

    return {
      handleClick
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  cursor: pointer;

  picture {
    width: 100%;
    height: 70%;
    display: block;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    width: 100%;
    gap: 10px;
    align-items: center;
    height: 30%;
    display: flex;
    padding: 0 10px;

    img {
      width: 50px;
      height: 30px;
    }

    .info {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;

      .subtitle {
        color: black;
        font-size: 15px;
        font-weight: 700;
        text-overflow: ellipsis;
      }

      p {
        font-size: 12px;
        line-height: 1.25rem;
        color: #6B7280;
        margin: 0;
      }
    }
  }
}
</style>
