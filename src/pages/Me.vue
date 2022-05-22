<template>
  <q-page class="flex flex-center">
     <div v-if="user">
      <div><h5 style="color:blue">Hello {{ user.user_metadata.name }} Happy birthday</h5> </div>
      <div>Grafico aqui</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'PageMe',

  setup () {
    const { user } = useAuthUser()
    return {
      user
    }
  }
})

</script>
