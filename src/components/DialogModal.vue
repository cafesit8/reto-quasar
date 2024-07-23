<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="background-color: #eaedef;">
      <q-card-section>
        <div class="text-h6">{{ info.name.common }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <picture>
          <img :src="info.flags.png"
            :alt="info.flags.alt">
        </picture>
        <div>
          <p>Capital: <span class="text-gray-500 font-normal">{{
            info.capital[0] }}</span></p>
          <p>Language: <span class="text-gray-500 font-normal">{{
            info && Object.values(info.languages).join(', ') }}</span></p>
          <p>Population: <span class="text-gray-500 font-normal">
              {{ formatedPopulation(info.population) }} people
            </span></p>
          <p>Status: <span class="text-gray-500 font-normal">{{
            info.status }}</span></p>
          <p>Start of week: <span class="text-gray-500 font-normal">{{
            info.startOfWeek }}</span></p>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="toggleDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue'
import { formatedPopulation } from '../helpers/index'

export default defineComponent({
  name: 'DialogModal',
  setup () {
    const store = useStore()
    const isOpen = computed(() => store.getters['dialog/isDialogOpen'])
    const info = computed(() => store.getters['dialog/info'])
    return {
      isOpen,
      toggleDialog () {
        store.commit('dialog/toggleDialog')
      },
      info,
      formatedPopulation
    }
  }
})
</script>
