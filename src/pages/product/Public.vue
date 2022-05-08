<template>
  <q-page padding>
    <div class="row">
      <q-table
       :rows="products"
       :columns="columnsProduct"
       row-key="id"
       class="col-12"
       :loading="loading"
       :filter="filter"
       grid
      >
       <template v-slot:top>
          <span class="text-h6">
            Products
          </span>
          <q-space />
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search" class="q-mr-sm">
            <template v-slot:append>
             <q-icon name="mdi-magnify" />
            </template>
          </q-input>
      </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3" key="card">
              <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)">
                <q-img :src="props.row.img_url" :ratio="4/3" />
                <q-card-section class="text-center">
                  <div class="text-h6">{{ props.row.name }}</div>
                  <div class="text-subtitle2">{{ formatCurrency(props.row.price) }}</div>
                </q-card-section>
              </q-card>
            </div>
        </template>
      </q-table>
    </div>
    <dialog-product-details
      :show="showDialogDetails"
      :product="productDetails"
      @hide-dialog="showDialogDetails = false"
    />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import useApi from 'src/composables/UseApi'
import { useRoute } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import { formatCurrency } from 'src/utils/format'

import { columnsProduct } from './table'
import DialogProductDetails from 'components/DialogProductDetails'

export default defineComponent({
  name: 'PageProductPublic',
  components: {
    DialogProductDetails
  },
  setup () {
    const products = ref([])
    const loading = ref(true)
    const table = 'product'
    const filter = ref('')

    const { listPublic } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()
    const showDialogDetails = ref(false)
    const productDetails = ref({})

    const handlelistProducts = async (userId) => {
      try {
        loading.value = true
        products.value = await listPublic(table, userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleShowDetails = (product) => {
      productDetails.value = product
      showDialogDetails.value = true
    }

    onMounted(() => {
      if (route.params.id) {
        handlelistProducts(route.params.id)
      }
    })

    return {
      columnsProduct,
      products,
      loading,
      filter,
      formatCurrency,
      showDialogDetails,
      productDetails,
      handleShowDetails
    }
  }
})
</script>
