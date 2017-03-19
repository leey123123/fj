<template>
  <table>
    <tr><th>one</th><th>col2</th><th>col3</th></tr>
    <tr v-for="item in 10">
        <td v-text="item"></td>
    </tr>
</table>
</template>