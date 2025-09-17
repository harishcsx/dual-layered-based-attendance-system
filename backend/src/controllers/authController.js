import jwt from 'jsonwebtoken';
import { prisma } from '../../config/db';

// login stuff 
export const studentLogin = async (req, res) => {
    try {
        const { rollNumber, password } = req.body;
        if (rollNumber && password) {
            // search them and match them from the db and give access
            // and store student id in the req 
            // generate token 
        } else {
            res.json({msg: "invalid data type"})
        }
    } catch(err) {
        console.log("")
    }
} 

export const teacherLogin = async (req, res) => {
    try {
        const { teacherId, password } = req.body;
        if (teacherId && password) {
            // search them and match them from the db and give access
            // and store teacher id in the req
            // generate token  
        } else {
            console.log("invalid data type")
        }
    } catch(err) {
        console.log("")
    }
}

export const organisationLogin = async (req, res) => {
    try {
        const { organisationId, password } = req.body;
        if (organisationId && password) {
            // search them and match them from the db and give access
            // and store organisation id in the req
            //generate token 
        } else {
            console.log("invalid data type")
        }
    } catch(err) {
        console.log("")
    }
}

// signup stuff 
export const studentSignup = async (req, res) => {
    try {
        const { fullName, rollNumber, password } = req.body;
        if (fullName && rollNumber && password) {
            // check if the rollno exists in the db  
            // if full name exists in the db or not 
            // then set password and fullnmae 
        }else {
            console.log("invalid type or empty field")
        }
    } catch(err) {
        console.log("")
    }
}

export const teacherSignup = async (req, res) => {
    try {
        const { fullName, teacherId, password } = req.body;
        if (fullName && teacherId && password) {
            // check if the rollno exists in the db  
            // if full name exists in the db or not 
            // then set password and fullnmae 
        }else {
            console.log("invalid type or empty field")
        }
    } catch(err) {
        console.log("")
    }
}

export const organisationSignup = async (req, res) => {
    try {
        const { organisationName, organisationId, password } = req.body;
        if (organisationName && organisationId && password) {
            // check if the rollno exists in the db  
            // if full name exists in the db or not 
            // then set password and fullnmae 
        }else {
            console.log("invalid type or empty field")
        }
    } catch(err) {
        console.log("")
    }
}


