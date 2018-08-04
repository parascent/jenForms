<template  lang="pug">
  .jenForm
    br
    .columns(v-for="row of design.rows") 
      .column(v-for="(column,columnKey) of row" v-bind:class="[row[columnKey].classes]")
        div(v-for="(field,fieldKey) of fields" v-if="columnKey == fieldKey" )
          b-field(:label="field.label")
            b-input.fillRight(v-if="field.type == 'text'",v-model="modelToProcess[fieldKey]")
            b-datepicker.fillRight(v-if="field.type == 'date'",v-model="modelToProcess[fieldKey]")
            b-select.fillRight(v-if="field.type == 'multiSelect'",v-model="modelToProcess[fieldKey]") 
              option(v-if="Array.isArray(field.options)",v-for='option in field.options', :value='option[field.optionLabels.label]', :key='option[field.optionLabels.value]') {{option[field.optionLabels.label]}}
    
</template>


<script>
import {cloneDeep} from 'lodash'

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
    }
  },
  data(){
    return {
      fieldClasses:{},
      propsToCompute: {},
      cssClassObj:{},
      testClassObj:{
        shit:true,
        shat:true
      },
      model:{},
      modelToProcess:{},
      hasToProcess:false,
    }
  },
  methods:{
    processFieldsProp(){},
    processValidationsProp(){},
    initModelObj(model){
      for(let field in this.modelObj){
        this.model[field] = ''
        if(!this.modelToProcess[field]){
          continue
        }
        this.modelToProcess[field] = this.fields[field].type == 'date' ? null : ''  
        if(this.fields[field].format){
          this.hasToProcess = true
        }
      }
    },
    add(){
      
    },
    update(){},

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