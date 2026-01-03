import Contact from "../Models/ContactModel.js"


//controller for Adding new Contact
const addContact = async (req, res) => {
    try {

        const { name, email, phone, message } = req.body
        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "Please fill all mandetory details"
            })
        }
        //check if the inputed contact already existed or not
        const duplicateContact = await Contact.findOne({
            isDeleted: false,
            $or: [{ email }, { phone }]
        });
        if (duplicateContact) {
            return res.status(409).json({
                status: 409,
                message: "Contact already existed"
            })
        }

        //create a new contact
        const newContact = await Contact.create(
            {
                name: name,
                email: email,
                phone: phone,
                message: message || null
            }
        )

        if (newContact) {
            return res.status(201).json({
                status: 201,
                data: {
                    id: newContact._id,
                    name: newContact.name,
                    email: newContact.email,
                    phone: newContact.phone,
                    message: newContact.message || null,
                },
                message: "contact added successfully.."
            })
        }

    }
    catch (err) {

        console.log(err.message)
        return res.status(503).json({
            status: 503,
            message: "Server Error"
        })

    }
}


//Controller for Deleting Contact

const deleteContact = async (req, res) => {
    try {

        const contactId = req.params.id

        if (!contactId) {
            return res.status(400).json({
                status: 400,
                message: "Contact ID required"
            })
        }

        const contact = await Contact.findById(contactId)

        if (!contact) {
            return res.status(404).json({
                status: 404,
                message: "Contact not found"
            })
        }

        //doing soft delete because in future i will to give user permision to undo their delete action
        if (contact) {
            contact.isDeleted = true
            await contact.save()
            return res.status(200).json({
                status: 200,
                message: "Contact deleted successfully"
            })

        }


    }
    catch (err) {
        console.log(err.message)
        return res.status(503).json({
            status: 503,
            message: "Server Error"
        })

    }
}

//Controller to fetch all contacts
const getContact = async (req, res) => {
    try {

        const contacts = await Contact.find({ isDeleted: false })

        if (!contacts || contacts.length == 0) {
            return res.status(404).json({
                status: 404,
                message: "No contacts added yet"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "All contacts fetched successfull",
            contacts: contacts
        })

    }
    catch (err) {
        console.log(err.message)
        return res.status(503).json({
            status: 503,
            message: "Server Error"
        })
    }
}


export default { addContact, deleteContact, getContact }
