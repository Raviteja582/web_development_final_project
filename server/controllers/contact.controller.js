import Contact from "../models/contact.model";
import errorHandler from "../helpers/dbErrorHandler";

const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  createContact,
};
