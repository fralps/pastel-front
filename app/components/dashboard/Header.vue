<template>
  <UHeader :toggle="false">
    <template #title>
      <span class="text-primary text-2xl">Pastel</span>
    </template>


    <template #right>
      <UColorModeButton />

      <LocaleSelect />
    </template>
  </UHeader>
</template>