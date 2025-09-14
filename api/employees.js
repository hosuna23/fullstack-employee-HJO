import express from "express";
const router = express.Router();
export default router;
import { getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee } from "#db/queries/employees";

// TODO

router 
.route("/")
.get(async( req, res) => {
    try {
        const { id } = req.params;
        const response = await getEmployees( { id })
        res.status(200).send(response);

    } catch (error) {
        res.status(400).send(error);
        
    }
})

.post(async (req, res) => {
    try {
        const { name, birthday, salary } = req.body;
        const response = await createEmployee({ id })
        if (!name || !birthday || !salary ) {
            return res.status(400).send("Information is missing")
        }
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send(error);
        
    }
});
router
.route("/:id")
.get(async( req, res) => {  

    try {

        const  id = req.params;
        if (id < 0 ) {
            return res.status(400).send("id must be a positive integer");
        }

        const response = await getEmployee({id});
        if (!response) {
            return res.status(404).send("not a valid employee id");
        }
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send(error);
        
    }
})

.put(async (req, res) => {
    try {
        const { id } = req.params;
        if (id < 0 ) {
            return res.status(400).send("id must be a positive integer");
        }
        const { name, birthday, salary } = req.body;
        if (!name || !birthday || !salary ) {
            return res.status(400).send("Information is missing")
        }
        const response = await updateEmployee({ id, name, birthday, salary })
        
        res.status(200).send(response);

    } catch (error) {
        res.status(400).send(error);  
    }
})

.delete(async (req, res) => {
    try {
        const { id } = req.params;
        if (id < 0 ) {
            return res.status(400).send("id must be a positive integer");
        }
        const response = await deleteEmployee({ id })
         if (!response) {
            return res.status(404).send("employee does not exists");
        }
        res.status(204).send(response);

    } catch (error) {
        res.status(400).send(error);  
    }
});