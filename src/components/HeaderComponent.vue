<template>
  <header>
    <q-form @submit="onSubmit" class="form">
      <q-input class="input" filled v-model="name" label="Search for country" />
      <div>
        <q-btn class="button" label="Search" type="submit" color="primary" />
      </div>
      <!-- <q-popup-proxy>
        <div class="filters">
          <button :disabled="!continentSelected" @click="deleteFilters">Borrar Filtros</button>
          <div v-for="continent in continents" :key="continent" @click="handleClick(continent)">
            <span>{{ continent }}</span>
          </div>
        </div>
      </q-popup-proxy> -->
      <!-- <div class="filters">
        <button :disabled="!continentSelected" @click="deleteFilters">Borrar Filtros</button>
        <div v-for="continent in continents" :key="continent" @click="handleClick(continent)">
          <span>{{ continent }}</span>
        </div>
      </div> -->
    </q-form>
  </header>
</template>

<script>
import axios from 'axios'
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useDebounce } from '../composable/useDebounce'

export default defineComponent({
  name: 'HeaderComponent',
  setup () {
    const continents = ref(['Africa', 'America', 'Asia', 'Europe', 'Oceania'])
    const name = ref('')
    const continentSelected = ref(null)
    const debouncedName = useDebounce(name, 500)
    const store = useStore()

    async function deleteFilters () {
      continentSelected.value = null
      const res = await axios.get('https://restcountries.com/v3.1/all')
      store.commit('countries/setCountries', res.data)
    }

    async function handleClick (continent) {
      continentSelected.value = continent
      const res = await axios.get(`https://restcountries.com/v3.1/region/${continent}`)
      store.commit('countries/setCountries', res.data)
    }
    async function onSubmit () {
      if (name.value) {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${name.value}`)
        store.commit('countries/setCountries', res.data)
      }
    }

    watch(debouncedName, async (newName) => {
      if (newName === '') {
        const res = await axios.get('https://restcountries.com/v3.1/all')
        store.commit('countries/setCountries', res.data)
      } else {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${newName}`)
        store.commit('countries/setCountries', res.data)
      }
    })

    return {
      name,
      onSubmit,
      continents,
      handleClick,
      deleteFilters,
      continentSelected
    }
  }
})
</script>

<style scoped lang="scss">
header {
  margin-bottom: 20px;
  position: relative;

  @media screen and (max-width: 480px) {
    width: 100%;
  }

  .form {
    border-radius: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    background-color: white;
    padding: 15px;
    width: fit-content;
    margin: auto;

    @media screen and (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }

    .input {
      width: 300px;

      @media screen and (max-width: 480px) {
        width: 100%;
      }
    }

    .button {
      width: auto;
      background-color: red;

      @media screen and (max-width: 480px) {
        width: 100%;
      }
    }

    .popup {
      background-color: yellow;
      padding: 10px;
    }

    .filters {
      position: absolute;
      bottom: -135px;
      left: 0;
      width: 100%;
      height: auto;
      background-color: white;
      color: black;
      border-radius: 10px;
      font-size: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 15px;
      padding-top: 35px;

      button {
        position: absolute;
        font-size: 10px;
        top: 10px;
        right: 15px;
      }

      div {
        display: grid;
        place-content: center;
        border: solid 1px;
        border-radius: 5px;
        cursor: pointer;

        span {
          font-weight: 300
        }
      }
    }
  }
}
</style>
