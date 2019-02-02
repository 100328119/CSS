const { Department } = require('../../model/department');

module.exports.EmbedDepartment = (data) =>{
  return new Promise(
    async function (resolve, reject){
      if(!Array.isArray(data)){
        Department.findOne({_id:data.department}, (err, department)=>{
          if(err) reject(err);
          data.department = department;
          resolve(data);
        })
      }else{
        try{
          for(let i = 0; i < data.length; i++){
              let department_data = await Department.findOne({_id:data[i].department});
              data[i].department = department_data;
           }
           resolve(data);
        }catch(err){
           reject(err);
        }
      }
    }
  )
}
