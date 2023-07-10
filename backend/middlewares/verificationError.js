const handleVerification = (err, req, res, next) => {
    console.log("is error ka naam hia ", err)
    if (err && err.errors) {
        let validationErrors = [];
   
       for (let field in err.errors) {
           const newField = err.errors[field]
           
           if(newField.name === "ValidatorError"){
               validationErrors.push(newField.message)
           }
           else if (newField.name === "CastError"){
               validationErrors.push("The write datatype for " + newField.path + " is " + newField.kind )
           }
           else {
             validationErrors.push(err)
           }
       }
   
       res.status(400).send( {validationErrors} );
     } else {
       next(err);
     }
   next()
}

module.exports = {handleVerification}