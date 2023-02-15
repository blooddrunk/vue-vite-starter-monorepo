<template>
  <section>
    <el-form inline @submit="handleSearch">
      <BaseInput name="query" label="Query" :show-label="false"></BaseInput>

      <el-form-item>
        <BaseSearchButton :loading="isLoading"></BaseSearchButton>
      </el-form-item>
    </el-form>

    <div class="h-[560px]">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <BaseVirtualTable
            class="mt-3"
            :data="data"
            :columns="columns"
            :loading="isLoading"
            :width="width"
            :height="height"
          >
          </BaseVirtualTable>
        </template>
      </el-auto-resizer>
    </div>
  </section>
</template>

<script lang="tsx" setup>
import { useForm } from 'vee-validate';
import { parseISO, format } from 'date-fns';
import { Column, TableV2FixedDir } from 'element-plus';

definePage({
  meta: {
    requiresAuth: false,
  },
});

const { values: filter, handleSubmit } = useForm({
  initialValues: {
    query: 'vue',
  },
});

type ListItem = {
  id: string;
  title: string | null;
  url?: string;
};

const formatDate = (value: string) =>
  format(parseISO(value), 'yyyy-MM-dd HH:ss');

const columns: Column<any>[] = [
  {
    key: 'author',
    dataKey: 'author',
    title: 'Author',
    width: 200,
    fixed: TableV2FixedDir.LEFT,
  },
  { key: 'title', dataKey: 'title', title: 'Title', width: 300 },
  {
    key: 'url',
    dataKey: 'url',
    title: 'Link',
    width: 300,
    cellRenderer: ({ cellData }) => {
      return (
        <a class="text-primary line-clamp-1" href={cellData} target="_blank">
          {cellData}
        </a>
      );
    },
  },
  {
    key: 'created_at',
    dataKey: 'created_at',
    title: 'Created At',
    width: 200,
    cellRenderer: ({ cellData }) => {
      return <span>{formatDate(cellData)}</span>;
    },
  },
];

const { data, execute, isLoading } = useAxios<ListItem[]>(
  [],
  {
    url: 'https://hn.algolia.com/api/v1/search',
    __transformData: (data: any) => data?.hits ?? [],
    __needValidation: false,
  },
  { immediate: false }
);

const handleSearch = handleSubmit(() => {
  execute({
    params: filter,
  });
});

handleSearch();
</script>
