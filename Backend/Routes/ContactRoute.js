import express from "express"
import contactController from "../Controllers/ContactController.js"

const router = express.Router()

router.post("/",contactController.addContact)
router.get("/",contactController.getContact)
router.delete("/:id",contactController.deleteContact)

export default router