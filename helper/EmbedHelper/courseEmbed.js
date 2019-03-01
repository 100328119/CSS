const { Course } = require('../../model/course');

module.exports.EmbedCourse  = (calendar) =>{
  return new Promise(
    async function (resolve, reject){
      if(Array.isArray(calendar)){
        try{
          for(let i = 0; i < calendar.length; i++){
            if(calendar[i].sections != undefined && Array.isArray(calendar[i].sections)){
                for(let j = 0; j < calendar[i].sections.length; j++){
                  let course_data = await Course.findOne({_id:calendar[i].sections[j].course});
                  calendar[i].sections[j].course = course_data;
                }
              }
            }
          resolve(calendar);
        }catch(err){
          reject(err);
        }
      }else{
        if(calendar.sections != undefined && Array.isArray(calendar.sections)){
          try{
            for(let i = 0; i < calendar.sections.length; i++){
              let course_data = await Course.findOne({_id:calendar.sections[i].course});
              calendar.sections[i].course = course_data;
            }
            resolve(calendar);
          }catch(err){
            reject(err);
          }
        }else{
          let error = "calendar.sections is undefined/not an array";
          reject(error);
        }
      }
    }
  )
}

module.exports.EmbedPrerequisites = (course) =>{
  return new Promise(
    async function (resolve, reject){
      if(Array.isArray(course)){
        try{
          for(let i = 0; i < course.length; i++){
            let prerequisites = course[i].prerequisites;
            for(let j = 0; j < prerequisites.length; j++){
              let course_data = await Course.findOne({_id:prerequisites[j]});
              console.log(course_data);
              prerequisites[j] = course_data
            }
            course[i].prerequisites = prerequisites;
          }
          resolve(course);
        }catch(err){
          reject(err);
        }
      }
    }
  )
}
