<template>
  <div
    class="min-h-screen bg-linear-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
  >
    <DashboardHeader />

    <main class="mx-auto max-w-4xl px-4 py-6">
      <slot />
    </main>

    <DashboardNavigation />
  </div>
</template>
