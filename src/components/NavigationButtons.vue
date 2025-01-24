<template>
    <div class="navigation-buttons">
      <button @click="$emit('back')">Indietro</button>
      <button @click="$emit('submit')">Invia</button>
    </div>
  </template>
  
  <style lang="scss" scoped>
 .navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  button {
    padding: 0.75rem 1.5rem; 
    border: none;
    border-radius: 8px; 
    cursor: pointer;
    font-size: 1rem; 
    font-weight: bold; 
    color: #fff; 
    background: linear-gradient(45deg, #ff8a2a, #ff5e5e);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-3px); 
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); 
    }

    &:active {
      transform: translateY(1px); 
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2); 
    }
  }

  /* Pulsante "Indietro" con stile differente */
  button:first-of-type {
    background: linear-gradient(45deg, #6c757d, #495057); 
  }
}

  </style>
  