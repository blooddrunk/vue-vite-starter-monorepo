<template>
  <section>
    <ProductForm
      :add-product="simpleFormStore.addProduct"
      @submitted="handleSubmit"
    ></ProductForm>

    <el-table
      v-loading="simpleFormStore.isProductLoading"
      class="mt-3"
      :data="simpleFormStore.products"
      row-key="id"
    >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="Product Name"></el-table-column>
      <el-table-column
        prop="price"
        label="Product Price"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="inventory"
        label="Inventory"
        width="100"
      ></el-table-column>
      <el-table-column label="Action" width="200">
        <template #default="props">
          <BaseLoadingButton
            type="danger"
            :action="getDeleteAction(props.row)"
            confirm-text="Are you sure?"
          >
            DELETE
            <template #loading> DELETING... </template>
          </BaseLoadingButton>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script lang="ts" setup>
import { Product } from '@/typings';
import { ElMessage } from 'element-plus';

definePage({
  meta: {
    requiresAuth: false,
  },
});

const simpleFormStore = useSimpleFormStore();

const getDeleteAction = (row: Product) => {
  return async () => {
    await simpleFormStore.removeProduct(row);
    ElMessage.success('Deleted successfully');
  };
};

const handleSubmit = () => {
  simpleFormStore.fetchProducts();
};
</script>
