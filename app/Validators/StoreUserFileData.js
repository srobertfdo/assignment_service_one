'use strict'

class StoreUserFileData {
  get rules () {
    return {
      name: 'required|string|min:3|max:200',
      dob: 'required|date|dateFormat:YYYY-MM-DD',
      salary: 'required|number|range:100,10000000',
      age: 'required|number|range:18,100',
      fileType: 'required|string|in:csv,xml',
    }
  }

  get messages () {
    return {
      'name.required': 'Name required',
      'name.string': 'Name must be string.',
      'name.min': 'Name must have 3 minumun characters.',
      'name.max': 'Name must have 200 maximum characters.',
      'dob.date': 'DOB must be in YYYY-MM-DD format',
      'dob.dateFormat': 'DOB must be in YYYY-MM-DD format.',
      'dob.required': 'DOB required.',
      'salary.required': 'Salary required.',
      'salary.number': 'Salary must be number.',
      'salary.range': 'Salary must be between 100 to 10000000.',
      'age.required': 'Age required.',
      'age.range': 'Age must be between 18 to 100.',
      'age.number': 'Age must be number.',
      'fileType.required': 'fileType is required in header.',
      'fileType.in': 'fileType must be csv or xml.',
    }
  }

  get data () {
    const requestBody = this.ctx.request.all()
    const fileType = this.ctx.request.header('fileType')

    return Object.assign({}, requestBody, { fileType })
  }

  get sanitizationRules () {
    return {
      salary: 'to_int'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.status(422).send(errorMessages)
  }
}

module.exports = StoreUserFileData
