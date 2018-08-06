<template  lang="pug">
  .jenForm
    br
    .columns(v-for="row of design.rows") 
      .column(v-for="(column,columnKey) of row" v-bind:class="[row[columnKey].classes]")
        div(v-for="(field,fieldKey) of fields" v-if="columnKey == fieldKey" )
          
          b-field(:label="field.label")

            b-input.fillRight(
                                v-if="field.type == 'text'",
                                v-model="modelToProcess[fieldKey]"
                              )

            b-datepicker.fillRight(
                                    v-if="field.type == 'date'",
                                    v-model="modelToProcess[fieldKey]"
                                  )

            b-select.fillRight(
                                  v-if="field.type == 'multiSelect'",
                                  v-model="modelToProcess[fieldKey]"
                              ) 
              option(
                      v-if="Array.isArray(field.options)",
                      v-for='option in field.options', 
                      :value='option[field.optionLabels.label]', 
                      :key='option[field.optionLabels.value]') {{option[field.optionLabels.label]}}


    button.button(v-if="mode == 'new'" , @click="add()") Add
    button.button(v-if="mode == 'edit'" , @click="edit()")  Delete
    
</template>


<script>
var YYMMDD = function(a){
  return a
}
export default {
  name: "JenForm",
  props: {
    fields: {
      required: true
    },
    validations: {
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
      fieldsToProcess: [],
      cssClassObj:{},
      testClassObj:{
        shit:true,
        shat:true
      },
      model:{},
      modelToProcess:{},
    }
  },
  methods:{
    processValidationsProp(){},
    processModel(){
      for(let field in this.fields){
        if(this.fields[field].format){
          let format = this.fields[field].format
          let processingFunction  = this.processingFunctions[format]
          this.model[field] = processingFunction(this.modelToProcess[field])
        }else{
          this.model[field] = this.modelToProcess[field]
        }
      }
    },
    initModelObj(model){
      for(let field in this.modelObj){
        this.model[field] = ''
        if(!this.fields[field]){
          continue
        }
        this.modelToProcess[field] = this.fields[field].type == 'date' ? null : ''  
      }
    },
    validate(){},
    add(){
      this.validate()
      this.processModel()
      // this.$store.dispatch(this.modelName+'/add', this.model).then((r)=>{

      // })
    },
    update(){
      // this.$store.dispatch(this.modelName+'/update', this.model).then((r)=>{

      // })
    },

  },
  mounted(){
    this.initModelObj()
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