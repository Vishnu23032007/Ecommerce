

export const createUserValidationSchema = {
    userName : {
        notEmpty : {
            errorMessage : "User Name field must not be empty"
        }
    },
    email : {
        notEmpty : {
            errorMessage : "Email field must not be empty"
        }
    },
    password : {
        notEmpty : {
            errorMessage : "Password field must not be empty"
        }
    }
}

export const addProductValidationSchema = {
    name : {
        notEmpty : {
            errorMessage : "Name field cannot be empty"
        }
    },
    price : {
        notEmpty : {
            errorMessage : "Price field cannot be empty"
        }
    },
    stock : {
        notEmpty : {
            errorMessage : "Stock field cannot be empty"
        }
    }
}