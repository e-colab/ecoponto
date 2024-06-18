<template>
  <div class="autocomplete">
    <input
      type="text"
      v-model="search"
      class="autocomplete-input"
      @input="onChange"
    />
    <ul class="autocomplete-results" v-show="isOpen">
      <li
        v-for="(result, i) in results"
        :key="i"
        class="autocomplete-results__item"
        @click="setResult(result)"
      >
        {{ result }}
      </li>
    </ul>
    <div class="autocomplete-selected" v-show="searchList.length > 0">
      <div
        class="autocomplete-selected__item"
        v-for="(item, i) in searchList"
        :key="i"
      >
        <div class="autocomplete-selected__item-text">
          <p>{{ item }}</p>
        </div>
        <button @click="removeElement(i)">
          <img
            :src="require(`../../assets/close.svg`)"
            class="autocomplete-selected__item-close"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const items = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pear",
  "Peach",
  "Grape",
  "Tangerine",
  "Pineapple",
];

export default {
  name: "AutocompleteSearch",
  data() {
    return {
      search: "",
      items: items,
      results: [],
      searchList: [],
      isOpen: false,
    };
  },
  methods: {
    setResult(result) {
      //   this.search = result;
      if (!this.searchList.includes(result)) {
        this.searchList = [...this.searchList, result];
      }
      this.isOpen = false;
      this.search = "";
    },
    filterResults() {
      this.results = this.items.filter(
        (item) => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.search = "";
      }
    },
    removeElement(index) {
      this.searchList.splice(index, 1);
      console.log(this.searchList);
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style lang="scss">
.autocomplete {
  position: relative;

  &-input {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 0.3px solid black;
    padding: 0 7px;
  }

  &-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    min-height: 1em;
    max-height: 6em;
    overflow: auto;
    transition: 0.2s;

    &__item {
      list-style: none;
      text-align: left;
      padding: 4px 2px;
      cursor: pointer;

      &:hover {
        background-color: #f7f7f7;
        transition: 0.2s;
      }
    }
  }

  &-selected {
    background-color: #f7f7f7;
    padding: 9px 16px;
    margin-top: 9px;
    border-radius: 2px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    &__item {
      background-color: white;
      border-radius: 50px;
      display: flex;
      justify-content: space-between;

      p {
        margin: 0;
      }

      &-close {
        width: 15px;
        height: 15px;
      }

      &-text {
        padding: 3px 0 3px 8px;
      }

      button {
        background-color: transparent;
        border: none;
        border-left: 0.5px solid black;
        margin-left: 5px;
        display: flex;
        align-items: center;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
