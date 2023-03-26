<script lang="ts">
  import companies from '$lib/components/stores/glue/companies.js';
  import {writable} from 'svelte/store';
  import {currentUser, pb} from '$lib/glue/pocketbase';

  const searchTerm = writable('');

  function handleInput(event:InputEvent) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    searchTerm.set(input.value);
  }

  $: filteredCompanies = searchCompanies();

  function searchCompanies() {
    console.log('searchCompanies called');
    // get the current value of searchTerm
    const term = $searchTerm;
    console.log('term', term);
    // filter the list of companies based on the search term
    return companies.filter(company => company.name.toLowerCase().includes(term)); 
  }
</script>

<div class="container mx-auto my-4">
  <h1 class="text-4xl font-bold mb-4">List of Companies</h1>
  <p class="mb-2">Here are some companies:</p>

  <div class="flex mb-4">
    <input type="text" class="flex-1 p-2 rounded-l-md border border-gray-400" bind:value={$searchTerm} on:input={handleInput} placeholder="Search for a company" />
    <button class="bg-primary hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-r-md" on:click|preventDefault={() => filteredCompanies = searchCompanies()}>Search</button>
  </div>

  {#if filteredCompanies.length > 0}
    <ul class="grid grid-cols-3 gap-4">
      {#each filteredCompanies as company}
        <li>
            <label for="my-modal-6" class="border border-gray-500 hover:bg-violet-600 font-bold p-1 block text-center rounded-md shadow-md">{company.name}</label>
            <!-- Put this part before </body> tag -->
            {#if $currentUser}
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal">
              <div class="modal-box w-11/12 max-w-5xl">
                <h3 class="font-bold text-lg">Submit Referral Application.</h3>
                <p class="py-4">Company Name: {company.name}</p>
                <h4 class="font-bold text-lg">Job URL:</h4>
                <input type="text" class="border w-full border-gray-400 p-2 rounded-md shadow-md" placeholder="https://www.example.com" />
                <h4 class="font-bold text-lg">Add Resume:</h4>
                <input type="file" class="border w-full border-gray-400 p-2 rounded-md shadow-md" />
                <div class="modal-action">
                  <label for="my-modal-6" class="btn">Yay!</label>
                </div>
              </div>
            </div>
            {/if}
              {#if !$currentUser}
              <input type="checkbox" id="my-modal-6" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box w-11/12 max-w-5xl">
                  <h3 class="font-bold text-lg">Please login to submit a referral application.</h3>
                  <div class="modal-action">
                    <label for="my-modal-6" class="btn">Close</label>
                  </div>
                </div>
              </div>
                {/if}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No companies found</p>
  {/if}
</div>

<style>
  
</style>
