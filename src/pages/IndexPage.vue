<template>
  <q-page class="flex column" style="background-color: #e0f2fe; padding: 20px">
    <HeaderComponent />
    <section class="main">
      <div class="container">
        <FlagCard v-for="item in countries" :key="item.name?.common" :flagUrl="item.flags?.png"
          :flagAlt="item.flags?.alt" :countryName="item.name?.common" :region="item.region" :countryData="item" />
      </div>
    </section>
    <DialogModal />
  </q-page>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue'
import FlagCard from 'src/components/FlagCard.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import DialogModal from 'src/components/DialogModal.vue'
import axios from 'axios'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'IndexPage',
  components: {
    FlagCard,
    HeaderComponent,
    DialogModal
  },
  setup () {
    const store = useStore()
    const countries = computed(() => store.getters['countries/listCountries'])

    onMounted(async () => {
      const res = await axios.get('https://restcountries.com/v3.1/all')
      store.commit('countries/setCountries', res.data)
    })
    return {
      countries
    }
  }
})
</script>

<style scoped lang="scss">
.main {
  width: 100%;

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }
}
</style>
