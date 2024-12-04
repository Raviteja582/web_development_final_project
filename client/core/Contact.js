import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { createContactForm } from "./apis-contact";

const useStyles = makeStyles((theme) => ({
  formGroup: {
    marginBottom: theme.spacing(1),
  },
  label: {
    display: "block",
    marginBottom: theme.spacing(0.5),
  },
  input: {
    width: "100%",
    padding: theme.spacing(1),
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
  },
  button: {
    padding: "9px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: "none",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    marginLeft: "50%",
    marginBottom: 10,
  },
  card: {
    flex: "50%",
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  content: {
    margin: 10,
  },
  modal: {
    color: "paper",
    width: 300,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    paddingTop: 2,
    paddingX: 4,
    paddingBottom: 3,
  },
}));

function ContactForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobilePhone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    createContactForm(formData).then((resp) => {

      handleOpen();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobilePhone: "",
      });
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <CardContent className={classes.content}>
            <div className={classes.formGroup}>
              <label htmlFor="firstName">First Name:</label>
              <input
                className={classes.input}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
          </CardContent>
          <CardContent className={classes.content}>
            <div className={classes.formGroup}>
              <label htmlFor="lastName">Last Name:</label>
              <input
                className={classes.input}
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardContent className={classes.content}>
            <div className={classes.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                className={classes.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
          </CardContent>
          <CardContent className={classes.content}>
            <div className={classes.formGroup}>
              <label htmlFor="mobilePhone">Mobile Phone:</label>
              <input
                className={classes.input}
                type="tel"
                id="mobilePhone"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
          </CardContent>
          <button className={classes.button} type="submit">
            Submit
          </button>
        </form>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modal}>
          <h2 id="parent-modal-title">Response</h2>
          <p id="parent-modal-description">Submitted Successfully</p>
        </Box>
      </Modal>
    </div>
  );
}

export default ContactForm;
