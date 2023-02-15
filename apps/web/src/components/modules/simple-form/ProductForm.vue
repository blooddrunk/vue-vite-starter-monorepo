<template>
  <div class="max-w-lg p-3 shadow-md">
    <h1 class="text-semibold tw py-2 text-xl">Enter Product</h1>

    <el-form
      status-icon
      label-width="130px"
      @submit="onSubmit"
      @reset="onReset"
    >
      <BaseInput name="name" label="Product Name" required>
        <template #label>
          <span class="text-teal-600">Product Name</span>
        </template>
      </BaseInput>

      <BaseInput name="price" label="Price" required>
        <template #label>
          <span class="text-blue-600">Price</span>
        </template>

        <template #prepend> $ </template>
      </BaseInput>

      <BaseNumberInput
        class="w-full"
        name="inventory"
        label="Inventory"
        required
        controls-position="right"
        :min="0"
        :max="9999"
        :precision="0"
      >
      </BaseNumberInput>

      <BaseCheckboxGroup
        name="tags"
        label="Tags"
        :items="tagList"
      ></BaseCheckboxGroup>

      <BaseSelectLegacy
        name="location"
        label="Location"
        :items="locationList"
        clearable
        placeholder="Location"
      >
      </BaseSelectLegacy>

      <BaseSelect
        name="location2"
        label="Location2"
        :options="locationList"
        clearable
        placeholder="Location with virtualized select"
      >
      </BaseSelect>

      <BaseCheckbox name="terms" label="Terms" :show-label="false" required>
        Agree to terms and conditions
      </BaseCheckbox>

      <div class="flex justify-end py-3">
        <el-button native-type="reset">RESET</el-button>
        <el-button
          type="primary"
          native-type="submit"
          :loading="isSubmitting"
          :disabled="invalid || isSubmitting"
        >
          SUBMIT
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { Product } from '@/typings';
import { ElMessage } from 'element-plus';
import { useForm } from 'vee-validate';

const props = defineProps<{
  addProduct: (p: Product) => void;
}>();
const emit = defineEmits<{
  (e: 'submitted', value: Product): void;
}>();

const validationSchema = {
  name: 'required|min:5|max:10',
  price: 'required|numeric|min_value:1|max_value:9999999',
  inventory: 'required',
  terms: 'required',
  tags: 'required',
  location: 'required',
  location2: 'required',
};

const { meta, isSubmitting, handleSubmit, resetForm } = useForm<Product>({
  validationSchema,
  initialValues: {
    name: '',
    price: 1,
    inventory: 1,
    terms: false,
    tags: ['book'],
    location: '',
    location2: '',
  },
});

const invalid = computed(() => !meta.value.valid && meta.value.dirty);

const onSubmit = handleSubmit(async (values) => {
  try {
    await props.addProduct(values);
    emit('submitted', values);
  } catch (error: any) {
    ElMessage({
      message: error.message,
      type: 'error',
    });
  }
});

const onReset = (e: Event) => {
  e.preventDefault();

  resetForm();
};

const tagList = ref([
  {
    label: 'Phone',
    value: 'phone',
  },
  {
    label: 'Book',
    value: 'book',
  },
]);

const locationList = ref([
  {
    label: 'UP',
    value: 'up',
  },
  {
    label: 'DOWN',
    value: 'down',
  },
]);
</script>
