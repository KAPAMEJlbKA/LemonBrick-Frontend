<template>
  <div v-if="visible">
    <!-- Форма для редактирования имени продукта -->
    <input v-model="editedName" type="text" placeholder="Новое имя продукта" />
    <button @click="updateItemName">Сохранить</button>
    <button @click="closeDialog">Отмена</button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    visible: Boolean,
    item: Object // Предполагается, что item - это объект товара, который будет редактироваться
  },
  setup(props, { emit }) {
    const $store = useStore();
    const editedName = ref("");

    const updateItemName = async () => {
      try {
        const response = await fetch(`https://cabinet.unnamedproject.by/api/shop/item/id/${props.item.id}/setlimitations`, {
          method: "POST",
          body: JSON.stringify({
            displayName: editedName.value,
            description: props.item.description // Предположим, что описание товара не изменяется
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        console.log(data); // Возможно, вы захотите что-то сделать с ответом, например, обновить список товаров
        // Закрыть диалоговое окно
        closeDialog();
      } catch (error) {
        console.error("Ошибка при обновлении имени товара:", error);
      }
    };

    const closeDialog = () => {
      emit("update:visible", false);
      editedName.value = ""; // Очистить поле ввода после закрытия диалога
    };

    return {
      editedName,
      updateItemName,
      closeDialog
    };
  }
});
</script>
