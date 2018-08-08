<template  lang="pug">
  .jenForm
    br
    .columns(v-for="row of design.rows") 
      .column(v-for="(column,columnKey) of row" v-bind:class="[row[columnKey].classes]")
        div(v-for="(field,fieldKey) of fields" v-if="columnKey == fieldKey" )
          
          b-field(:label="field.label")

            b-input.fillRight(
                                v-if="field.type == 'text'",
                                v-model="formFields[fieldKey]['model']"
                                @blur="validateField(fieldKey)"
                              )

            b-datepicker.fillRight(
                                    v-if="field.type == 'date'",
                                    v-model="formFields[fieldKey]['model']"
                                  )

            b-select.fillRight(
                                  v-if="field.type == 'multiSelect'",
                                  v-model="formFields[fieldKey]['model']"
                              ) 
              option(
                      v-if="Array.isArray(field.options)",
                      v-for='option in field.options', 
                      :value='option[field.optionLabels.label]', 
                      :key='option[field.optionLabels.value]') {{option[field.optionLabels.label]}}

            template(v-if="validationErrors[fieldKey]")
            .help.is-danger(v-for="error in validationErrors[fieldKey]") {{error}}


    button.button(v-if="mode == 'new'" , @click="add()") Add
    button.button(v-if="mode == 'edit'" , @click="edit()")  Delete
    

</template>


<script>
import validationDefinitions from '../helpers/validationDefinitions'
import Vue from 'vue'

var YYMMDD = function(a){
  return a
}

var modelToProcess = {}

export default {
  name: "JenForm",
  props: {
    fields: {
      required: true
    },
    validationsObj: {
        required: false,
    },
    modelObj: {
      required : true,
    },
    design: {
      required:false,
    },
    modelName:{
      required: true,
    },
    mode:{
      required: true
    }
  },


  data(){
    return {
      fieldClasses:{},
      processingFunctions:{
        "YYMMDD" : YYMMDD
      },
      cssClassObj:{},
      testClassObj:{
        shit:true,
        shat:true
      },
      model:{},
      formFields:{},
      validationErrors:[],
      
    }
  },


  methods:{

    processFormFields(){
      for(let field in this.fields){
        if(this.fields[field].format){
          let format = this.fields[field].format
          let processingFunction  = this.processingFunctions[format]
          this.model[field] = processingFunction(this.formFields[field].model)
        }else{
          this.model[field] = this.formFields[field].model
        }
      }
    },

    validateField(field){
      console.log(field)
      let formField = this.formFields[field]
      let fieldValidations = formField.validations

      if(fieldValidations){

        let existingErrors = this.validationErrors[field]
        if(existingErrors){
          this.validationErrors[field] = null
          this.$forceUpdate()
        }

        for(let validation in fieldValidations){

          let validationFunc = fieldValidations[validation]
          let validationResult = validationFunc(formField.model)
          if(validationResult !== true){
            if(!this.validationErrors[field])
              this.validationErrors[field] = {}
            this.validationErrors[field][validation] = validationResult
            this.$forceUpdate()
          }

        }
      }

    },

    validateAllFields(){
      this.validationErrors = []
      for(let field in this.formFields){
        this.validateField(field)
      }
    },

    initModelObj(model){
      let validationDefs = validationDefinitions()
      for(let field in this.modelObj){
        this.model[field] = ''

        //if model field not in form fields then skip
        if(!this.fields[field])
        {
          continue
        }

        //
        let processingField = this.fields[field]

        //make form field
        this.formFields[field] = {}
        //asign currentformfield to var
        let currentFormField = this.formFields[field]

        currentFormField['model'] = processingField.type == 'date' ? null : ''

        //associate validation functions
        if(processingField.validations){
          currentFormField['validations'] = {}
          for(let validation in processingField.validations){
            if(processingField.validations[validation] == true){
              currentFormField.validations[validation] = validationDefs[validation]
            }
            else{
              currentFormField.validations[validation] = validationDefs[validation](processingField.validations[validation], )
            }
          }
        }

      }

    },

    add(){
      console.log('Add')
      this.validateAllFields()
      // this.processFormFields()
      // this.$store.dispatch(this.modelName+'/add', this.model).then((r)=>{

      // })
    },

    update(){
      // this.$store.dispatch(this.modelName+'/update', this.model).then((r)=>{

      // })
    },

  },
  created(){
    this.initModelObj()
    // this.initValidationObject()
    console.log('fields',this.fields)
    console.log('model',this.model)
    console.log('design',this.design)
  }
}
</script>


<style lang="stylus" scoped>
.jenForm
  padding 10px
  .fillRight
    select 
      width 100%

</style>