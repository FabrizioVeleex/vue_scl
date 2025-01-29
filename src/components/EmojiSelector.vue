<template>
    <div class="emoji-selector">
        <button v-for="(e, key) in choice" :key="key" class="emoji-btn"
            :class="[size, { selected: selectedValue === e.id }]" @click="selectEmoji(e.id)">
            <img class="emoji-icon" :src="e.icon" :alt="e.text" />
            <span class="emoji-text">{{ e.text }}</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "EmojiSelector",
    props: {
        choice: {
            type: Object,
            required: true,
        },
        size: {
            type: String,
            default: "large",
        },
    },
    data() {
        return {
            selectedValue: null,
        };
    },
    methods: {
        selectEmoji(id) {
              // Se già selezionato, deseleziona
              if (this.selectedValue === id) {
                this.selectedValue = null;
                this.$emit("select", null); 
            } else {
                // Altrimenti, seleziona l'emoji
                this.selectedValue = id;
                this.$emit("select", id); 
            }
        },
    },
};
</script>


<style lang="scss" scoped>
.emoji-selector {
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding: 0 10px;

    .emoji-btn {
        background: none;
        border: none;
        padding: 0;
        display: flex; 
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        // transition: transform 0.4s ease-in-out;

        img {
            width: 180px;
            height: 180px;
            display: block;
            margin: 4px;
        }

        // &:hover {
        //     transform: scale(1.2);
        // }

        &.selected .emoji-icon{
            // transform: scale(1.2);
            border: 4px solid #3c3c3c;
            border-radius: 50%;
            padding: 2px;
        }

        .emoji-icon {
            transition: transform 0.4s ease-in-out;
            padding: 6px;
        }

        &.small img {
            width: 80px;
            height: 80px;
        }

        &.medium img {
            width: 120px;
            height: 120px;
        }

        &.large img {
            width: 180px;
            height: 180px;
        }

        .emoji-text {
            padding: 4px;
            font-size: 1rem;
            font-weight: bold;
        }
    }
}
</style>