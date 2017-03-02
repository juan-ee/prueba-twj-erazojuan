module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    nombre:{
      type:'string',
      unique:true
    },
    version:{
      type:'string'
    },
    tamanio:{
      type:'integer'
    },
    cel: {
      model: 'celular'
    }
  }
};

