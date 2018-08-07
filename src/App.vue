<template lang="pug">  
.full-width.center-content
  jen-form(:fields="demoForm.fields",:modelObj="demoForm.model",:design="demoForm.design", :modelName="demoForm.modelName" , :validationsObj="demoForm.validations",mode="new")

</template>


<script>

  import HelloComponent from './components/HelloComponent.vue'
  import JenForm from './components/JenForm.vue'
  var demoForm = require ('../design/demoForm.json')
  console.log(demoForm)

  export default {
    components: {
      HelloComponent,
      JenForm
    },
    data(){
      return{
        demoForm:demoForm,
      }
    }
  }
</script>