<template>
  <div>

   

    <div class="columns">
      <div class="column">
        <h3>Vue Form Data</h3>
        <br />
        {{ formData }}
      </div>
      <div class="column">
        <h3>Firestore Data</h3>
        <br />
        {{ firebaseData }}
      </div>
    </div>


  <div class="relative pt-1">
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
    <div v-bind:style="{ width: width + '%' }" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
  </div>
</div>
 

    <form @submit.prevent="onUpdate" @input="inputUpdate">
        <div class="shadow overflow-hidden sm:rounded-md content-center	m-auto">
          <div class="px-4 py-5 bg-white sm:p-6 ">
            <div class="grid grid-cols-2 gap-9">

              
                <label for="first_name" class="block text-sm font-medium text-gray-700">Name</label>
                <input  v-model="formData.name" type="text" id="first_name" class="mt-1 px-3 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  rounded-md">

                <label  for="email_address" class="block text-sm font-medium text-gray-700">Email</label>
                <input v-model="formData.email" type="text" id="email_address" class="mt-1 px-3 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">

                <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                <select v-model="formData.country" id="country" class="mt-1 px-3 py-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>India</option>
                  <option>Canada</option>
                  <option>USA</option>
                <option>Indonesia</option>

                </select>

                <label for="street_address" class="block text-sm font-medium text-gray-700">Address</label>
                <input v-model="formData.address" type="text" id="street_address" class="mt-1 px-3 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">

                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <input v-model="formData.city" type="text" id="city" class="mt-1 px-3 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">

               
              </div>
              </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button  @click="SubmitForm()" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>

               <button @click="reset()"  class="inline-flex ml-5 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Clear
            </button>
          </div>
        </div>
      </form>

 

  </div>
</template>

<script>
import { db } from '../firebase';
import { debounce } from 'debounce';

const path = 'Formdata/Form';

export default {


    
  data() {
    return {
      formData: {},
      localData: null,
      firebaseData: null,
      width:0
    };
  },

  firestore() {
    return {
      firebaseData: db.doc(path),
    };
  },

  methods: {

    async onUpdate() {
      try {
        await db.doc(path).set(this.formData);
      } catch (error) {

      console.log(error)
}
    },

  
    inputUpdate() {

    this.debouncedUpdate();

    //To calculate form completion

    var arr=[this.formData.name,this.formData.email,this.formData.address,this.formData.city,this.formData.country]

     var CurrentArr=arr.filter(el=>el!=undefined && el!="")

     this.width= (CurrentArr.length/5)*100

 
    },

    
    debouncedUpdate: debounce(function() {
      this.onUpdate()
    }, 1500)
    ,

    reset(){

this.formData=''

    }
  },

  created: async function () {
    const docRef = db.doc(path);

    let data = (await docRef.get() ).data();

    if (!data) {
      data = { name: '', email: '', address:'', city:'', country:'' }
      docRef.set(data)
    }

    this.localData = { ...data }; 
    this.formData = data;
  },
};
</script>

<style>
h1,
h2,
h3 {
  font-weight: 600;
}

#app {
  font-family: 'sofia-pro', sans-serif;
  text-align: center;
  padding: 10vh 15vw;
}



input{

    border-color: grey;
    border-width: thin;
}
</style>
